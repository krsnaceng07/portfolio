
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorage() {
    const bucketName = 'resumes';

    console.log(`Checking storage bucket: ${bucketName}...`);

    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error('Error listing buckets:', listError);
        return;
    }

    const existingBucket = buckets.find(b => b.name === bucketName);

    if (existingBucket) {
        console.log(`Bucket '${bucketName}' already exists.`);
    } else {
        console.log(`Creating bucket '${bucketName}'...`);
        const { data, error } = await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 5242880, // 5MB limit
            allowedMimeTypes: ['application/pdf'],
        });

        if (error) {
            console.error('Error creating bucket:', error);
            return;
        }
        console.log(`Bucket '${bucketName}' created successfully.`);
    }

    // Update Public Policy (Wait, setting public: true in createBucket handles public read access generally for objects? 
    // Actually "public: true" means the bucket is public, so files are accessible without a signed URL if we know the path.
    // We still might need an RLS policy for insert/update restrictions)

    // NOTE: Storage policies usually need to be set via SQL or Dashboard for granular control (e.g. only authenticated users can upload).
    // But given I have the service key here, I can do admin operations. 
    // For the frontend client (which will upload), we need a policy allowing authenticated uploads.

    console.log('Ensure you have set Storage Policies in Supabase Dashboard (or via SQL) to allow:');
    console.log('1. SELECT for "public" (handled by public bucket setting usually, but good to verify)');
    console.log('2. INSERT/UPDATE/DELETE for "authenticated" users (or specific admin email)');

    console.log('\nResume Storage Setup Complete!');
}

setupStorage();

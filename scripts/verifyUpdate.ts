
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verify() {
    const timestamp = Date.now();
    const newTagline = `VERIFIED-BY-SCRIPT-${timestamp}`;

    console.log(`[1] Updating tagline to: ${newTagline}`);
    const { data, error } = await supabase
        .from('profile')
        .update({ tagline: newTagline })
        .eq('email', process.env.ADMIN_EMAIL)
        .select();

    if (error) {
        console.error('Update failed:', error);
        process.exit(1);
    }

    const count = data?.length || 0;

    if (count === 0) {
        console.error('❌ FAILURE: No rows updated. Check email match.');
        process.exit(1);
    }

    console.log(`[Admin] ✅ Profile Updated Successfully in Database.`);
    console.log(`[Admin] ⏳ Waiting 2 seconds for server to serve new request...`);
    await new Promise(r => setTimeout(r, 2000));

    // Try fetching multiple times to ensure it's not a race condition
    for (let i = 0; i < 3; i++) {
        console.log(`[Frontend] 🌍 Visiting Homepage (Attempt ${i + 1})...`);
        const res = await fetch('http://localhost:3000', {
            cache: 'no-store'
        });
        const html = await res.text();

        if (html.includes(newTagline)) {
            console.log('---------------------------------------------------');
            console.log(`✅ SUCCESS: The Frontend IS displaying the new data!`);
            console.log(`   Expected: "${newTagline}"`);
            console.log(`   Found:    "${newTagline}"`);
            console.log('---------------------------------------------------');
            process.exit(0);
        } else {
            console.log('   ...not found yet, checking again...');
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    console.error('❌ FAILURE: Frontend is showing OLD data. Caching is still active.');
    process.exit(1);
}

verify();

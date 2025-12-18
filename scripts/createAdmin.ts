import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminEmail = process.env.ADMIN_EMAIL!;
// Explicitly using the password provided by the user
const adminPassword = 'Krsna@5455';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
    console.log(`Checking user: ${adminEmail}`);

    // 1. Try to create user
    const { data, error } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true, // Auto-confirm
    });

    if (error) {
        if (error.message.includes('already registered')) {
            console.log('User already exists. Updating password to ensure access...');
            // 2. If exists, update password to match exactly what we are testing
            const { data: userData } = await supabase.auth.admin.listUsers();
            const user = userData.users.find(u => u.email === adminEmail);

            if (user) {
                const { error: updateError } = await supabase.auth.admin.updateUserById(
                    user.id,
                    { password: adminPassword }
                );
                if (updateError) {
                    console.error('Failed to update password:', updateError);
                } else {
                    console.log('Password updated successfully.');
                }
            }
        } else {
            console.error('Error creating user:', error);
        }
    } else {
        console.log('Admin user created and confirmed:', data.user.id);
    }
}

createAdmin();

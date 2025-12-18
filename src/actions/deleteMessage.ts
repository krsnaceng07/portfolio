'use server';

import { createClient } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';

// formData is passed by the form action but we don't need it
export async function deleteMessage(messageId: string, _formData: FormData) {
    const supabase = await createClient();

    // 1. Verify User
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Perform Soft Delete (Update deleted_at)
    const { error } = await supabase
        .from('contact_messages')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', messageId);

    if (error) {
        console.error('Delete error:', error);
        return { success: false, error: 'Failed to delete message' };
    }

    // 3. Revalidate path to refresh UI
    revalidatePath('/admin');
    return { success: true };
}

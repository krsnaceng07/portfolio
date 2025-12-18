'use server';

import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Validation Schema
const ContactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

export type ContactState = {
    success?: boolean;
    error?: string | null;
    validationErrors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

export async function sendMessage(prevState: ContactState, formData: FormData): Promise<ContactState> {
    // 1. Validate Input
    const validatedFields = ContactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            error: 'Validation failed. Please check your inputs.',
            validationErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, message } = validatedFields.data;

    try {
        // 2. Rate Limiting (Simple check: limit 2 messages per email per minute)
        // Using supabaseAdmin to read purely for rate limiting logic (bypassing RLS if needed, though RLS allows admin select)
        const { count, error: countError } = await supabaseAdmin
            .from('contact_messages')
            .select('*', { count: 'exact', head: true })
            .eq('email', email)
            .gte('created_at', new Date(Date.now() - 60 * 1000).toISOString()); // Last 1 minute

        if (countError) {
            console.error('Rate limit check failed:', countError);
            return { success: false, error: 'System busy. Please try again later.' };
        }

        if (count && count >= 2) {
            return { success: false, error: 'Too many messages. Please take a breather.' };
        }

        // 3. Store Message
        const { error: insertError } = await supabaseAdmin
            .from('contact_messages')
            .insert({
                name,
                email,
                message,
            });

        if (insertError) {
            console.error('Database insertion error:', insertError);
            return { success: false, error: 'Failed to send message. Please try again.' };
        }

        return { success: true, error: null };
    } catch (err) {
        console.error('Unexpected error:', err);
        return { success: false, error: 'An unexpected error occurred.' };
    }
}

'use server';

import { createClient } from '@/lib/supabaseServer';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

const TABLES = ['profile', 'skills', 'experience', 'education', 'projects', 'workshops'] as const;
type TableName = typeof TABLES[number];

// --- Generic Helper to Check Admin ---
async function checkAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        throw new Error('Unauthorized');
    }
    return supabase;
}

// --- Generic Fetch (Public) ---
export async function getItems(table: TableName) {
    noStore(); // Opt-out of caching
    const supabase = await createClient();
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (error) console.error(`Fetch error for ${table}:`, error);
    return data || [];
}

// Special case for Profile (Single Item)
export async function getProfile() {
    noStore(); // Opt-out of caching
    const supabase = await createClient();
    const { data, error } = await supabase.from('profile').select('*').limit(1).single();
    if (error) console.error('Fetch profile error:', error);
    // Return null or data. If null, UI should handle it.
    return data;
}

// --- CRUD Actions (Admin Only) ---

// CREATE
export async function createItem(table: TableName, formData: any) {
    try {
        const supabase = await checkAdmin();
        const { error } = await supabase.from(table).insert(formData);
        if (error) throw error;
        revalidatePath('/', 'layout');
        revalidatePath('/admin', 'layout');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// UPDATE
export async function updateItem(table: TableName, id: string, formData: any) {
    try {
        const supabase = await checkAdmin();
        // For profile, we might not have ID if we just want to update the "single" row, 
        // but best practice is to pass ID.
        const { error } = await supabase.from(table).update(formData).eq('id', id);
        if (error) throw error;
        revalidatePath('/', 'layout');
        revalidatePath('/admin', 'layout');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// DELETE
export async function deleteItem(table: TableName, id: string) {
    try {
        const supabase = await checkAdmin();
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) throw error;
        revalidatePath('/', 'layout');
        revalidatePath('/admin', 'layout');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

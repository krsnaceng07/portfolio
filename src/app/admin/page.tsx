import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { AdminDashboard } from './components/AdminDashboard';
import { MessagesTab } from './components/MessagesTab';
import { getItems, getProfile } from '@/actions/cms';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const supabase = await createClient();

    // 1. Check Auth
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        redirect('/login');
    }

    // 2. Fetch All Data Parallelly
    const [
        messagesRes,
        profile,
        skills,
        experience,
        education,
        projects,
        workshops
    ] = await Promise.all([
        supabase.from('contact_messages').select('*').is('deleted_at', null).order('created_at', { ascending: false }),
        getProfile(),
        getItems('skills'),
        getItems('experience'), // 'experience' | 'education' | 'projects' | 'workshops'
        getItems('education'),
        getItems('projects'),
        getItems('workshops')
    ]);

    const messages = messagesRes.data || [];

    const cmsData = {
        profile,
        skills,
        experience,
        education,
        projects,
        workshops
    };

    return <AdminDashboard data={cmsData} messagesComp={<MessagesTab messages={messages} />} />;
}

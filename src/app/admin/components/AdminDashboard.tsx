'use client';

import { useState } from 'react';
import { AdminTabs, TabName } from './AdminTabs';
import { CMSSection } from './CMSSection';
import { ResumeUpload } from './ResumeUpload';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Re-using the types from data files would be better, but for now defining simplified columns
const SKILLS_COLS = [
    { key: 'category', label: 'Category' },
    { key: 'items', label: 'Items (comma separated)', isList: true, type: 'textarea' as const },
];

const EXPER_COLS = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'description', label: 'Description', type: 'textarea' as const },
    { key: 'skills', label: 'Skills Used', isList: true },
];

const EDU_COLS = [
    { key: 'degree', label: 'Degree' },
    { key: 'institution', label: 'Institution' },
    { key: 'year', label: 'Year' },
    { key: 'status', label: 'Status' },
];

const PROJ_COLS = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'description', label: 'Description', type: 'textarea' as const },
    { key: 'tools', label: 'Tools', isList: true },
    { key: 'outcome', label: 'Outcome' },
    { key: 'link', label: 'Link' },
];

const WORK_COLS = [
    { key: 'title', label: 'Title' },
    { key: 'organizer', label: 'Organizer' },
    { key: 'year', label: 'Year' },
    { key: 'description', label: 'Description', type: 'textarea' as const },
];

// Profile is special, single form
const PROFILE_COLS = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'description', label: 'Description', type: 'textarea' as const },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Availability Status' },
];

export function AdminDashboard({ data, messagesComp }: { data: any, messagesComp: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState<TabName>('messages');
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-dark text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        CMS Dashboard
                    </h1>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-sm"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>

                <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="bg-black/20 rounded-xl border border-white/5 p-6 md:p-8 min-h-[500px]">
                    {activeTab === 'messages' && messagesComp}

                    {activeTab === 'profile' && (
                        <CMSSection
                            title="Edit Profile"
                            table="profile"
                            initialData={data.profile ? [data.profile] : []}
                            columns={PROFILE_COLS} // Note: The generic CMSSection expects a list. Profile is single. 
                        // We'll treat it as a list of 1 for simplicity in this MVP.
                        />
                    )}

                    {activeTab === 'skills' && (
                        <CMSSection title="Skills" table="skills" initialData={data.skills || []} columns={SKILLS_COLS as any} />
                    )}

                    {activeTab === 'experience' && (
                        <CMSSection title="Experience" table="experience" initialData={data.experience || []} columns={EXPER_COLS as any} />
                    )}

                    {activeTab === 'education' && (
                        <CMSSection title="Education" table="education" initialData={data.education || []} columns={EDU_COLS as any} />
                    )}

                    {activeTab === 'projects' && (
                        <CMSSection title="Projects" table="projects" initialData={data.projects || []} columns={PROJ_COLS as any} />
                    )}

                    {activeTab === 'workshops' && (
                        <CMSSection title="Workshops" table="workshops" initialData={data.workshops || []} columns={WORK_COLS as any} />
                    )}

                    {activeTab === 'resume' && data.profile && (
                        <ResumeUpload
                            profileId={data.profile.id}
                            currentResumeUrl={data.profile.resume_link}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { User, Code, Briefcase, GraduationCap, FolderGit2, Calendar, MessageSquare, FileText } from 'lucide-react';

export type TabName = 'messages' | 'profile' | 'skills' | 'experience' | 'education' | 'projects' | 'workshops' | 'resume';

interface AdminTabsProps {
    activeTab: TabName;
    onTabChange: (tab: TabName) => void;
}

export function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
    const tabs = [
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'workshops', label: 'Workshops', icon: Calendar },
        { id: 'resume', label: 'Resume', icon: FileText },
    ];

    return (
        <div className="flex overflow-x-auto gap-2 border-b border-white/10 mb-8 pb-1 no-scrollbar">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id as TabName)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all whitespace-nowrap ${isActive
                            ? 'bg-primary/10 text-primary border-b-2 border-primary font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

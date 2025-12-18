'use client';

import { deleteMessage } from '@/actions/deleteMessage';
import { User, Mail, Calendar, Trash2 } from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
    deleted_at: string | null;
}

export function MessagesTab({ messages }: { messages: Message[] }) {
    if (!messages || messages.length === 0) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-gray-400">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No new messages found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {messages.map((msg, index) => (
                <div
                    key={msg.id || index}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all group"
                >
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <User className="w-4 h-4 text-secondary" /> {msg.name}
                            </h3>
                            <a href={`mailto:${msg.email}`} className="text-primary hover:underline text-sm flex items-center gap-2">
                                <Mail className="w-3 h-3" /> {msg.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(msg.created_at).toLocaleString()}
                            </span>

                            <form action={async () => {
                                await deleteMessage(msg.id, new FormData());
                            }}>
                                <button
                                    className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                                    title="Delete Message"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono border border-white/5">
                        {msg.message}
                    </div>
                </div>
            ))}
        </div>
    );
}

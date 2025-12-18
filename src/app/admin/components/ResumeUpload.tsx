'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Upload, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';
import { updateItem } from '@/actions/cms';
// import { toast } from 'sonner';

// Check if sonner or toast is available. If not, I'll use local state for feedback.
// AdminDashboard.tsx didn't show toast usage, but let's check package.json or imports.
// I'll stick to local state for now to be safe.

interface ResumeUploadProps {
    profileId: string;
    currentResumeUrl?: string | null;
}

export function ResumeUpload({ profileId, currentResumeUrl }: ResumeUploadProps) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState<string | null>(currentResumeUrl || null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setMessage(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setMessage(null);

        // Debug: Check Auth Session
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        console.log('Current User:', user);
        console.log('Auth Error:', authError);

        if (!user) {
            setMessage({ type: 'error', text: 'Authentication failed. Please refresh or login again.' });
            setUploading(false);
            return;
        }

        try {
            const fileName = `resume_${Date.now()}.pdf`; // Simple versioning
            const { data, error } = await supabase.storage
                .from('resumes')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false // New file for every upload to avoid cache issues
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(fileName);

            // Update Profile
            // We use the server action updateItem to ensure cache revalidation happens on server
            const updateResult = await updateItem('profile', profileId, { resume_link: publicUrl });

            if (!updateResult.success) {
                // If DB update fails, maybe rename/delete file? For now just show error.
                throw new Error(updateResult.error || 'Failed to update profile link');
            }

            setUrl(publicUrl);
            setFile(null);
            setMessage({ type: 'success', text: 'Resume uploaded successfully!' });

        } catch (err: any) {
            console.error('Upload error:', err);
            setMessage({ type: 'error', text: err.message || 'Upload failed' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-black/20 rounded-xl border border-white/5 p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Resume Management
            </h2>

            <div className="space-y-6">
                {/* Current Resume Display */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <span className="block text-gray-400 text-sm mb-1">Current Resume</span>
                        {url ? (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium break-all"
                            >
                                {url.split('/').pop()} (Click to View)
                            </a>
                        ) : (
                            <span className="text-gray-500 italic">No resume uploaded yet</span>
                        )}
                    </div>
                    {url && <Check className="w-5 h-5 text-green-500" />}
                </div>

                {/* Upload Section */}
                <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-primary/50 transition-colors bg-white/5">
                    <input
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />

                    {!file ? (
                        <label
                            htmlFor="resume-upload"
                            className="flex flex-col items-center gap-3 cursor-pointer"
                        >
                            <Upload className="w-10 h-10 text-gray-400 group-hover:text-primary" />
                            <span className="text-gray-300 font-medium">Click to select PDF</span>
                            <span className="text-gray-500 text-sm">PDF Files only (Max 5MB)</span>
                        </label>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-white bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                                <FileText className="w-4 h-4 text-primary" />
                                {file.name}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" /> Upload Quote
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setFile(null)}
                                    disabled={uploading}
                                    className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Message */}
                {message && (
                    <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                        {message.type === 'success' ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}

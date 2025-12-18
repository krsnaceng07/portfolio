'use client';

import dynamic from 'next/dynamic';
import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';

// Lazy load 3D scene with specific loading parameters
const Scene3D = dynamic(() => import('@/components/3d/SceneContainer'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-dark to-gray-900 rounded-lg border border-white/5">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

export function Hero({ profile }: { profile: any }) {
    if (!profile) return null;

    return (
        <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-dark/80 to-dark/90 z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content (Priority 1) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-4">
                        {profile.status}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                        Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{profile.name}</span>
                    </h1>

                    <h2 className="text-2xl md:text-3xl text-gray-300 font-medium">
                        {profile.role}
                    </h2>

                    <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                        {profile.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a
                            href="#contact"
                            className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all hover:scale-105"
                        >
                            Contact Me <ArrowRight className="w-4 h-4" />
                        </a>

                        <a
                            href={profile.resume_link || "/resume.pdf"}
                            className="flex items-center gap-2 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all"
                        >
                            Download Resume <Download className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>

                {/* 3D Visual (Priority 2) - Subtle & Non-blocking */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-[400px] lg:h-[600px] w-full relative"
                >
                    <Scene3D />
                </motion.div>
            </div>
        </section>
    );
}

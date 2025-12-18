'use client';

import { motion } from 'framer-motion';

export function About({ profile }: { profile: any }) {
    return (
        <section id="about" className="py-20 bg-dark relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-4">
                        About Me
                    </h2>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-primary/30 transition-colors">
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            {profile.description}
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {profile.tagline}
                        </p>

                        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-8">
                            <div>
                                <span className="block text-sm text-gray-500 mb-1">Location</span>
                                <span className="text-white font-medium">{profile.location}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500 mb-1">Open For</span>
                                <span className="text-primary font-medium">{profile.status}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

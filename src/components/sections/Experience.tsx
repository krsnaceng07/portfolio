'use client';

import { motion } from 'framer-motion';
import { Network, Terminal } from 'lucide-react';

export function Experience({ experience }: { experience: any[] }) {
    if (!experience) return null;

    return (
        <section id="experience" className="py-20 bg-dark/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-primary pl-4">
                        Practical Experience
                    </h2>
                    <p className="text-gray-400">Academic projects and hands-on lab work.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={exp.id || index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                    {index % 2 === 0 ? <Network className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
                                </div>
                                <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded">
                                    {exp.type}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                            <p className="text-gray-400 mb-6 min-h-[3rem]">{exp.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {exp.skills?.map((skill: string) => (
                                    <span
                                        key={skill}
                                        className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

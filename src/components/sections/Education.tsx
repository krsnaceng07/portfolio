'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

export function Education({ education }: { education: any[] }) {
    if (!education) return null;

    return (
        <section id="education" className="py-20 bg-dark relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-primary pl-4">
                        Education
                    </h2>
                </motion.div>

                <div className="space-y-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.id || index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 border-l-2 border-white/10 hover:border-primary transition-colors py-2"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-dark border-2 border-primary" />

                            <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                <span className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20 font-mono">
                                    {edu.status}
                                </span>
                            </div>

                            <div className="text-primary/80 font-medium mb-2 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                {edu.institution}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-mono">
                                <Calendar className="w-3 h-3" />
                                {edu.year}
                            </div>

                            <p className="text-gray-400 text-sm">
                                {edu.details}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

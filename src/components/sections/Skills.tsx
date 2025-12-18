'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function Skills({ skills }: { skills: any[] }) {
    if (!skills) return null;

    return (
        <section id="skills" className="py-20 bg-dark/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-primary pl-4">
                        Technical Skills
                    </h2>
                    <p className="text-gray-400">A comprehensive overview of my technical toolset.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((category, index) => (
                        <motion.div
                            key={category.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-semibold text-primary mb-4">{category.category}</h3>
                            <ul className="space-y-3">
                                {category.items?.map((item: string) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                        <span className="text-gray-300 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

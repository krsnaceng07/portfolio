'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export function Workshops({ workshops }: { workshops: any[] }) {
    if (!workshops) return null;

    return (
        <section id="workshops" className="py-20 bg-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-primary pl-4">
                        Workshops & Training
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {workshops.map((shop, index) => (
                        <motion.div
                            key={shop.id || index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-4 items-start p-4 hover:bg-white/5 rounded-lg transition-colors border-l-2 border-transparent hover:border-primary"
                        >
                            <div className="mt-1">
                                <Award className="w-8 h-8 text-secondary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{shop.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <span>{shop.organizer}</span>
                                    <span>•</span>
                                    <span>{shop.year}</span>
                                </div>
                                <p className="text-gray-400 text-sm">{shop.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

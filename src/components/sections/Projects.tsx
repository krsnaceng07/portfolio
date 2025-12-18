'use client';

import { motion } from 'framer-motion';
import { FolderGit2, ArrowUpRight } from 'lucide-react';

export function Projects({ projects }: { projects: any[] }) {
    if (!projects) return null;

    return (
        <section id="projects" className="py-20 bg-dark/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-primary pl-4">
                        Projects
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <FolderGit2 className="w-8 h-8 text-accent mb-4" />
                                <a href={project.link || "#"} className="text-gray-500 hover:text-white transition-colors">
                                    <ArrowUpRight className="w-5 h-5" />
                                </a>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 text-sm mb-4 flex-grow">
                                {project.description}
                            </p>

                            <div className="space-y-3">
                                <div className="text-xs font-mono text-secondary">
                                    <span className="text-gray-500 block mb-1">Outcome:</span>
                                    {project.outcome}
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                                    {project.tools?.map((tool: string) => (
                                        <span key={tool} className="text-xs text-gray-500">#{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

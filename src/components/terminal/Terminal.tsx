
'use client';

import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from '@/hooks/useTerminal';
import { TerminalInput } from './TerminalInput';
import { useEffect, useRef } from 'react';

export function Terminal() {
    const { isOpen, toggleTerminal, history, executeCommand, setIsOpen } = useTerminal();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new history
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isOpen]);

    // Keyboard shortcut (Ctrl + `)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === '`') {
                toggleTerminal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleTerminal]);

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={toggleTerminal}
                    className="fixed bottom-6 right-6 z-50 bg-black/80 border border-primary/50 text-primary p-3 rounded-full hover:bg-primary/20 hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,255,0,0.3)]"
                    title="Open Terminal (Ctrl + `)"
                >
                    <TerminalIcon className="w-6 h-6" />
                </button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 md:inset-auto md:bottom-10 md:right-10 md:w-[600px] md:h-[400px] z-50 flex flex-col font-mono text-sm shadow-2xl"
                    >
                        {/* Terminal Window */}
                        <div className="flex-1 bg-black/95 backdrop-blur-md rounded-lg border border-primary/30 flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.1)]">

                            {/* Title Bar */}
                            <div className="bg-white/5 border-b border-white/5 px-4 py-2 flex items-center justify-between handle cursor-move">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <TerminalIcon className="w-4 h-4" />
                                    <span className="text-xs">visitor@krishna-sec:~</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setIsOpen(false)} className="hover:text-white text-gray-500"><Minus className="w-3 h-3" /></button>
                                    <button className="hover:text-white text-gray-500"><Square className="w-3 h-3" /></button>
                                    <button onClick={() => setIsOpen(false)} className="hover:text-red-500 text-gray-500"><X className="w-3 h-3" /></button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div
                                ref={scrollRef}
                                className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent text-gray-300 space-y-2"
                                onClick={() => document.querySelector('input')?.focus()}
                            >
                                {history.map((item) => (
                                    <div key={item.id} className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500">visitor@krishna:~$</span>
                                            <span className="text-white">{item.command}</span>
                                        </div>
                                        <div className="pl-4 text-gray-300">
                                            {item.output}
                                        </div>
                                    </div>
                                ))}

                                <TerminalInput onSubmit={executeCommand} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

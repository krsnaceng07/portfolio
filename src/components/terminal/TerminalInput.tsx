
'use client';

import { useRef, useEffect } from 'react';

interface TerminalInputProps {
    onSubmit: (cmd: string) => void;
}

export function TerminalInput({ onSubmit }: TerminalInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus logic
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit(e.currentTarget.value);
            e.currentTarget.value = '';
        }
    };

    return (
        <div className="flex items-center gap-2 text-primary font-mono mt-2">
            <span className="text-green-500">visitor@krishna:~$</span>
            <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0"
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                autoComplete="off"
            />
        </div>
    );
}

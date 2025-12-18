
import { useState, useCallback, useEffect } from 'react';

type CommandHandler = (args: string[]) => string | JSX.Element;

interface Command {
    name: string;
    description: string;
    handler: CommandHandler;
}

interface HistoryItem {
    id: string;
    command: string;
    output: string | JSX.Element;
}

export const useTerminal = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Standard welcome message
    useEffect(() => {
        if (history.length === 0) {
            setHistory([{
                id: 'init',
                command: 'welcome',
                output: "Welcome to Krishna.SEC Terminal [v1.0.0]. Type 'help' for available commands."
            }]);
        }
    }, []);

    const commands: Record<string, Command> = {
        help: {
            name: 'help',
            description: 'List available commands',
            handler: () => (
                <div className= "space-y-1" >
                <p className="text-primary font-bold"> Available Commands: </p>
          {
        Object.values(commands).map(cmd => (
            <div key= { cmd.name } className = "grid grid-cols-[100px_1fr] gap-2" >
            <span className="text-secondary" > { cmd.name } </span>
        < span className = "text-gray-400" > { cmd.description } </span>
        </div>
        ))
    }
    </div>
      )
    },
clear: {
    name: 'clear',
        description: 'Clear the terminal output',
            handler: () => {
                setHistory([]);
                return '';
            }
},
whoami: {
    name: 'whoami',
        description: 'Display current user',
            handler: () => "visitor@krishnasec.portfolio"
},
ls: {
    name: 'ls',
        description: 'List files and sections',
            handler: () => (
                <div className= "grid grid-cols-2 md:grid-cols-4 gap-2 text-blue-400" >
                <span>resume.pdf </span>
                < span > skills.txt </span>
                < span > projects / </span>
                < span > contact.exe </span>
                < span > about.md </span>
                </div>
        )
},
date: {
    name: 'date',
        description: 'Display current date-time',
            handler: () => new Date().toString()
}
  };

// Add more dynamic commands later (cat, etc.)

const executeCommand = useCallback((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const [cmdName, ...args] = trimmed.split(' ');
    const command = commands[cmdName.toLowerCase()];

    let output: string | JSX.Element;

    if (command) {
        if (cmdName.toLowerCase() === 'clear') {
            command.handler(args);
            return; // Special case for clear
        }
        output = command.handler(args);
    } else {
        output = <span className="text-red-500" > Command not found: { cmdName }. Type 'help' for list.</span>;
    }

    setHistory(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        command: trimmed,
        output
    }]);
}, []);

const toggleTerminal = () => setIsOpen(prev => !prev);

return {
    history,
    executeCommand,
    isOpen,
    toggleTerminal,
    setIsOpen
};
};

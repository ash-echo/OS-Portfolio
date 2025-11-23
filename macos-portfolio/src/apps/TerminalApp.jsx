import React, { useState, useRef, useEffect } from 'react';

const TerminalApp = ({ onOpenApp }) => {
    const [history, setHistory] = useState([
        { type: 'info', text: `Last login: ${new Date().toDateString()} on ttys000` },
        { type: 'output', text: 'Welcome to Ashwath\'s Portfolio Terminal!' },
        { type: 'output', text: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const commands = {
        help: () => ({
            type: 'output',
            text: `Available commands:
  open safari      - Open Safari browser
  open finder      - Open Finder
  open photos      - Open Photos app
  open about       - Open About Me app
  open resume      - Open Resume
  open projects    - Open Projects/Work
  open pokemon     - Open Pokemon Fire Red
  open sonic       - Open Sonic 2
  ls               - List available apps
  whoami           - Display user information
  clear            - Clear terminal screen
  help             - Show this help message`
        }),
        
        ls: () => ({
            type: 'output',
            text: `Available Apps:
  safari       photos      finder      about
  resume       projects    pokemon     sonic
  terminal     trash`
        }),
        
        whoami: () => ({
            type: 'output',
            text: `Ashwath - Full Stack Developer
GitHub: github.com/ash-echo
Portfolio: ashwathp-portfolio.vercel.app`
        }),
        
        clear: () => null,
        
        open: (args) => {
            const appMap = {
                'safari': 'safari',
                'browser': 'safari',
                'finder': 'finder',
                'photos': 'photos',
                'about': 'contacts',
                'contacts': 'contacts',
                'resume': 'resume',
                'projects': 'work',
                'work': 'work',
                'pokemon': 'pokemon',
                'sonic': 'sonic2',
                'sonic2': 'sonic2',
                'terminal': 'terminal',
                'trash': 'trash'
            };
            
            const appName = args[0]?.toLowerCase();
            const appId = appMap[appName];
            
            if (appId && onOpenApp) {
                // Pass flag to indicate it was opened from terminal (for Safari auto-refresh)
                onOpenApp(appId, true);
                return { type: 'success', text: `Opening ${appName}...` };
            }
            return { type: 'error', text: `Unknown app: ${appName}. Type "ls" to see available apps.` };
        }
    };

    const handleCommand = (cmd) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        const newHistory = [...history, { type: 'command', text: trimmed }];

        const parts = trimmed.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (command === 'clear') {
            setHistory([]);
            return;
        }

        if (commands[command]) {
            const result = commands[command](args);
            if (result) {
                newHistory.push(result);
            }
        } else {
            newHistory.push({
                type: 'error',
                text: `Command not found: ${command}. Type "help" for available commands.`
            });
        }

        setHistory(newHistory);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div 
            ref={terminalRef}
            className="bg-[#1e1e1e] text-[#33ff00] font-mono p-4 h-full text-sm overflow-auto selection:bg-white/20"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((entry, index) => (
                <div key={index} className="mb-1">
                    {entry.type === 'command' && (
                        <div>
                            <span className="text-blue-400 font-bold">user@macbook</span>
                            <span className="text-blue-200">:~</span>
                            <span className="text-white">$ {entry.text}</span>
                        </div>
                    )}
                    {entry.type === 'output' && (
                        <div className="text-white whitespace-pre-line">{entry.text}</div>
                    )}
                    {entry.type === 'success' && (
                        <div className="text-green-400">{entry.text}</div>
                    )}
                    {entry.type === 'error' && (
                        <div className="text-red-400">{entry.text}</div>
                    )}
                    {entry.type === 'info' && (
                        <div className="text-gray-400 opacity-70">{entry.text}</div>
                    )}
                </div>
            ))}
            
            <div className="flex items-center">
                <span className="text-blue-400 font-bold">user@macbook</span>
                <span className="text-blue-200">:~</span>
                <span className="text-white">$ </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-[#33ff00] ml-1 caret-[#33ff00]"
                    autoFocus
                    spellCheck={false}
                />
            </div>
        </div>
    );
};

export default TerminalApp;

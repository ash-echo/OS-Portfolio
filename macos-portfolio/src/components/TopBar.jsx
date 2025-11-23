import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Search, Command, Sliders, Power } from 'lucide-react';
import BatteryPanel from './panels/BatteryPanel';
import WiFiPanel from './panels/WiFiPanel';
import ControlCenterPanel from './panels/ControlCenterPanel';
import CalendarPanel from './panels/CalendarPanel';
import AppleMenuPanel from './panels/AppleMenuPanel';
import SearchOverlay from './panels/SearchOverlay';

const TopBar = ({ onOpenWindow, desktopItems, windows, apps }) => {
    const [time, setTime] = useState(new Date());
    const [activePanel, setActivePanel] = useState(null); // 'battery', 'wifi', 'control', 'calendar', 'apple'
    const [searchOpen, setSearchOpen] = useState(false);

    const batteryRef = useRef(null);
    const wifiRef = useRef(null);
    const controlRef = useRef(null);
    const calendarRef = useRef(null);
    const appleIconRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Cmd/Ctrl + Space to open search
            if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
                e.preventDefault();
                setSearchOpen(true);
                setActivePanel(null);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const togglePanel = (panelName) => {
        setActivePanel(activePanel === panelName ? null : panelName);
    };

    const getPanelPosition = (ref) => {
        if (!ref.current) return { right: 20, top: 40 };
        const rect = ref.current.getBoundingClientRect();
        return {
            right: window.innerWidth - rect.right,
            top: rect.bottom + 5
        };
    };

    const handleSearchSelect = (item) => {
        if (item.type === 'folder') {
            onOpenWindow && onOpenWindow('finder', item.name || item.title);
        } else if (item.type === 'file') {
            // Open file in text editor
            onOpenWindow && onOpenWindow('file', item);
        } else if (item.type === 'app') {
            onOpenWindow && onOpenWindow(item.id);
        } else if (item.type === 'window') {
            // Focus existing window
            // This would need a focusWindow function passed down
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-8 bg-transparent backdrop-blur-md flex items-center justify-between px-4 z-[100] text-sm font-medium text-white select-none shadow-sm">
                <div className="flex items-center gap-4">
                    <div
                        ref={appleIconRef}
                        onClick={() => togglePanel('apple')}
                        className="cursor-pointer"
                    >
                        <Power size={24} className="h-6 w-6 hover:bg-white/20 rounded transition-colors" />
                    </div>
                    <a 
                        href="https://github.com/ash-echo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hidden sm:block cursor-pointer hover:bg-white/20 px-2 rounded transition-colors"
                    >
                        Ashwath's Github
                    </a>
                    <div className="hidden sm:flex gap-4 text-white/90">
                        <span
                            onClick={() => onOpenWindow && onOpenWindow('work')}
                            className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors"
                        >
                            Projects
                        </span>
                        <span 
                            onClick={() => onOpenWindow && onOpenWindow('contacts')}
                            className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors"
                        >
                            Contact
                        </span>
                        <span 
                            onClick={() => onOpenWindow && onOpenWindow('resume')}
                            className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors"
                        >
                            Resume
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div
                        ref={batteryRef}
                        onClick={() => togglePanel('battery')}
                        className="hidden sm:flex items-center gap-2 hover:bg-white/20 px-2 rounded cursor-pointer transition-colors"
                    >
                        <Battery size={18} className="rotate-90" />
                    </div>
                    <div
                        ref={wifiRef}
                        onClick={() => togglePanel('wifi')}
                        className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors"
                    >
                        <Wifi size={18} />
                    </div>
                    <div
                        onClick={() => {
                            setSearchOpen(true);
                            setActivePanel(null);
                        }}
                        className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors"
                    >
                        <Search size={16} />
                    </div>
                    <div
                        ref={controlRef}
                        onClick={() => togglePanel('control')}
                        className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors"
                    >
                        <div className="w-4 h-4 bg-white/20 rounded-full border border-white/40"></div>
                    </div>
                    <div
                        ref={calendarRef}
                        onClick={() => togglePanel('calendar')}
                        className="flex items-center gap-2 hover:bg-white/20 px-2 rounded cursor-pointer transition-colors"
                    >
                        <span>{formatDate(time)}</span>
                        <span>{formatTime(time)}</span>
                    </div>
                </div>
            </div>

            {/* Panels */}
            <BatteryPanel
                isOpen={activePanel === 'battery'}
                onClose={() => setActivePanel(null)}
                position={getPanelPosition(batteryRef)}
            />
            <WiFiPanel
                isOpen={activePanel === 'wifi'}
                onClose={() => setActivePanel(null)}
                position={getPanelPosition(wifiRef)}
            />
            <ControlCenterPanel
                isOpen={activePanel === 'control'}
                onClose={() => setActivePanel(null)}
                position={getPanelPosition(controlRef)}
            />
            <CalendarPanel
                isOpen={activePanel === 'calendar'}
                onClose={() => setActivePanel(null)}
                position={getPanelPosition(calendarRef)}
            />
            <AppleMenuPanel
                isOpen={activePanel === 'apple'}
                onClose={() => setActivePanel(null)}
                position={{ left: 10, top: 40 }}
                onOpenAbout={() => {
                    // TODO: Open about window
                    setActivePanel(null);
                }}
            />
            <SearchOverlay
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                onOpenItem={handleSearchSelect}
                desktopItems={desktopItems || []}
                windows={windows || []}
                apps={apps || []}
            />
        </>
    );
};

export default TopBar;

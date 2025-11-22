import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, Command, Sliders, Power } from 'lucide-react';

const TopBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-8 bg-transparent backdrop-blur-md flex items-center justify-between px-4 z-[100] text-sm font-medium text-white select-none shadow-sm">
            <div className="flex items-center gap-4">
                <Power size={24} className="h-6 w-6 hover:bg-white/20 rounded cursor-pointer transition-colors" />
                <div className="font-bold hidden sm:block cursor-pointer hover:bg-white/20 px-2 rounded transition-colors">Ashwath's Portfolio</div>
                <div className="hidden sm:flex gap-4 text-white/90">
                    <span className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">Projects</span>
                    <span className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">Contact</span>
                    <span className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">Resume</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">
                    <Battery size={18} className="rotate-90" />
                </div>
                <div className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">
                    <Wifi size={18} />
                </div>
                <div className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">
                    <Search size={16} />
                </div>
                <div className="hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">
                    <div className="w-4 h-4 bg-white/20 rounded-full border border-white/40"></div>
                </div>
                <div className="flex items-center gap-2 hover:bg-white/20 px-2 rounded cursor-pointer transition-colors">
                    <span>{formatDate(time)}</span>
                    <span>{formatTime(time)}</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;

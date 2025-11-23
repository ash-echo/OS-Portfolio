import React, { useState } from 'react';
import { Volume2, Sun, Moon, Monitor } from 'lucide-react';
import BasePanel from './BasePanel';

const ControlCenterPanel = ({ isOpen, onClose, position }) => {
    const [volume, setVolume] = useState(50);
    const [brightness, setBrightness] = useState(75);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <BasePanel isOpen={isOpen} onClose={onClose} position={position} width={320}>
            <div className="p-4">
                {/* Header */}
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Control Center</h3>

                {/* Volume Control */}
                <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Volume2 size={18} className="text-gray-700" />
                        <span className="text-sm font-medium text-gray-700">Volume</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #d1d5db ${volume}%, #d1d5db 100%)`
                            }}
                        />
                        <span className="text-xs text-gray-600 w-8 text-right">{volume}%</span>
                    </div>
                </div>

                {/* Brightness Control */}
                <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Sun size={18} className="text-yellow-600" />
                        <span className="text-sm font-medium text-gray-700">Brightness</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={brightness}
                            onChange={(e) => setBrightness(e.target.value)}
                            className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #eab308 0%, #eab308 ${brightness}%, #d1d5db ${brightness}%, #d1d5db 100%)`
                            }}
                        />
                        <span className="text-xs text-gray-600 w-8 text-right">{brightness}%</span>
                    </div>
                </div>

                {/* Quick Toggles */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Dark Mode */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-3 rounded-xl transition-all ${darkMode
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Moon size={20} />
                            <span className="text-xs font-medium">Dark Mode</span>
                        </div>
                    </button>

                    {/* Display */}
                    <button className="p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center gap-2">
                            <Monitor size={20} />
                            <span className="text-xs font-medium">Display</span>
                        </div>
                    </button>
                </div>
            </div>
        </BasePanel>
    );
};

export default ControlCenterPanel;

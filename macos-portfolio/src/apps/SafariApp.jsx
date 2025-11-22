import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home, Lock } from 'lucide-react';

const SafariApp = () => {
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
    const [inputUrl, setInputUrl] = useState('https://www.google.com/webhp?igu=1');
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigate = () => {
        let finalUrl = inputUrl;

        // Add https:// if no protocol specified
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = 'https://' + finalUrl;
        }

        setUrl(finalUrl);
        setIsLoading(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNavigate();
        }
    };

    const handleHome = () => {
        const homeUrl = 'https://www.google.com/webhp?igu=1';
        setInputUrl(homeUrl);
        setUrl(homeUrl);
        setIsLoading(true);
    };

    const quickLinks = [
        { name: 'Google', url: 'https://www.google.com/webhp?igu=1' },
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
        { name: 'MDN Docs', url: 'https://developer.mozilla.org' },
    ];

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f5f5] border-b border-gray-200">
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Back">
                    <ChevronLeft size={18} className="text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Forward">
                    <ChevronRight size={18} className="text-gray-600" />
                </button>
                <button
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    title="Reload"
                    onClick={() => {
                        setIsLoading(true);
                        setUrl(url + '?reload=' + Date.now());
                    }}
                >
                    <RotateCw size={18} className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <button
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    title="Home"
                    onClick={handleHome}
                >
                    <Home size={18} className="text-gray-600" />
                </button>

                {/* Address Bar */}
                <div className="flex-1 flex items-center gap-2 bg-white rounded-md px-3 py-1.5 border border-gray-300 focus-within:border-blue-500 transition-colors">
                    <Lock size={14} className="text-gray-400" />
                    <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 outline-none text-sm text-gray-700"
                        placeholder="Enter URL or search..."
                    />
                </div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
                {quickLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => {
                            setInputUrl(link.url);
                            setUrl(link.url);
                            setIsLoading(true);
                        }}
                        className="px-3 py-1 text-xs bg-white hover:bg-gray-100 border border-gray-200 rounded transition-colors"
                    >
                        {link.name}
                    </button>
                ))}
            </div>

            {/* Browser Content - iframe */}
            <div className="flex-1 relative bg-white">
                <iframe
                    src={url}
                    className="w-full h-full border-0"
                    title="Browser"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    onLoad={() => setIsLoading(false)}
                />

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <div className="flex items-center gap-2">
                            <RotateCw size={20} className="animate-spin text-blue-500" />
                            <span className="text-sm text-gray-600">Loading...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Note about CORS and Cursor */}
            <div className="px-3 py-1 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-800">
                ⚠️ Custom cursor only works outside iframe. Some sites may not load due to CORS restrictions.
            </div>
        </div>
    );
};

export default SafariApp;

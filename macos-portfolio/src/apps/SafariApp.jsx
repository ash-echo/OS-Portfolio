import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home, Lock, ExternalLink, AlertCircle, X } from 'lucide-react';

const SafariApp = ({ openedFromTerminal }) => {
    const [url, setUrl] = useState('https://github.com/ash-echo');
    const [inputUrl, setInputUrl] = useState('https://github.com/ash-echo');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState(['https://github.com/ash-echo']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [useProxy, setUseProxy] = useState(true);
    const iframeRef = useRef(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Auto-refresh when opened from terminal
    useEffect(() => {
        if (openedFromTerminal) {
            setRefreshKey(prev => prev + 1);
        }
    }, [openedFromTerminal]);

    // CORS proxy options - allorigins as default
    const proxyServices = [
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest=',
    ];
    const [currentProxyIndex, setCurrentProxyIndex] = useState(0);

    const getProxiedUrl = (targetUrl) => {
        // Direct connection for your portfolio (same origin, no CORS issues)
        if (targetUrl.includes('ashwathp-portfolio.vercel.app')) {
            return targetUrl;
        }
        // Use proxy for other sites if enabled
        if (!useProxy) return targetUrl;
        return proxyServices[currentProxyIndex] + encodeURIComponent(targetUrl);
    };

    const handleNavigate = () => {
        let finalUrl = inputUrl.trim();

        // Search if not a URL
        if (!finalUrl.includes('.') && !finalUrl.startsWith('http')) {
            finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}&igu=1`;
        }
        // Add https:// if no protocol specified
        else if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = 'https://' + finalUrl;
        }

        setError(null);
        setUrl(finalUrl);
        setIsLoading(true);

        // Update history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(finalUrl);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNavigate();
        }
    };

    const handleBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const prevUrl = history[newIndex];
            setUrl(prevUrl);
            setInputUrl(prevUrl);
            setIsLoading(true);
            setError(null);
        }
    };

    const handleForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            const nextUrl = history[newIndex];
            setUrl(nextUrl);
            setInputUrl(nextUrl);
            setIsLoading(true);
            setError(null);
        }
    };

    const handleHome = () => {
        const homeUrl = 'https://github.com/ash-echo';
        setInputUrl(homeUrl);
        setUrl(homeUrl);
        setIsLoading(true);
        setError(null);
    };

    const handleRefresh = () => {
        setIsLoading(true);
        setError(null);
        setUrl(url + '?reload=' + Date.now());
    };

    const handleOpenInNewTab = () => {
        window.open(url, '_blank');
    };

    const handleTryNextProxy = () => {
        const nextIndex = (currentProxyIndex + 1) % proxyServices.length;
        setCurrentProxyIndex(nextIndex);
        setError(null);
        setIsLoading(true);
        setUrl(url + '?proxy=' + nextIndex);
    };

    const quickLinks = [
        { name: 'My GitHub', url: 'https://github.com/ash-echo' },
        { name: 'My Portfolio', url: 'https://ashwathp-portfolio.vercel.app' },
        { name: 'Wikipedia', url: 'https://en.wikipedia.org' },
        { name: 'MDN', url: 'https://developer.mozilla.org' },
    ];

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f5f5] border-b border-gray-200">
                <button
                    className={`p-1.5 hover:bg-gray-200 rounded transition-colors ${historyIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                    title="Back"
                    onClick={handleBack}
                    disabled={historyIndex === 0}
                >
                    <ChevronLeft size={18} className="text-gray-600" />
                </button>
                <button
                    className={`p-1.5 hover:bg-gray-200 rounded transition-colors ${historyIndex === history.length - 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
                    title="Forward"
                    onClick={handleForward}
                    disabled={historyIndex === history.length - 1}
                >
                    <ChevronRight size={18} className="text-gray-600" />
                </button>
                <button
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    title="Reload"
                    onClick={handleRefresh}
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

                <button
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    title="Open in new tab"
                    onClick={handleOpenInNewTab}
                >
                    <ExternalLink size={18} className="text-gray-600" />
                </button>
            </div>

            {/* Quick Links */}
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    {quickLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                setInputUrl(link.url);
                                setUrl(link.url);
                                setIsLoading(true);
                                setError(null);
                            }}
                            className="px-3 py-1 text-xs bg-white hover:bg-gray-100 border border-gray-200 rounded transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
                <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded">
                    💡 Not loading? Try reload or different proxy
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="px-3 py-2 bg-red-50 border-b border-red-200 flex items-start gap-2">
                    <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs text-red-800">{error}</p>
                        <button
                            onClick={handleTryNextProxy}
                            className="mt-1 text-xs text-red-600 hover:text-red-800 underline"
                        >
                            Try different proxy ({currentProxyIndex + 1}/{proxyServices.length})
                        </button>
                        <button
                            onClick={() => handleOpenInNewTab()}
                            className="ml-3 mt-1 text-xs text-red-600 hover:text-red-800 underline"
                        >
                            Open in new browser tab
                        </button>
                    </div>
                    <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Browser Content - iframe */}
            <div className="flex-1 relative bg-white">
                <iframe
                    key={refreshKey}
                    ref={iframeRef}
                    src={getProxiedUrl(url)}
                    className="w-full h-full border-0"
                    title="Browser"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                    onLoad={() => {
                        setIsLoading(false);
                        setError(null);
                    }}
                    onError={() => {
                        setIsLoading(false);
                        setError('Failed to load website. The site may block embedding or the proxy might be unavailable.');
                    }}
                />

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <RotateCw size={24} className="animate-spin text-blue-500" />
                            <span className="text-sm text-gray-600">Loading...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs">
                <div className="text-gray-600">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {url.includes('ashwathp-portfolio.vercel.app') ? 
                            'Direct connection' : 
                            `Proxy: ${proxyServices[currentProxyIndex].split('://')[1].split('/')[0]}`
                        }
                    </span>
                </div>
                <div className="text-gray-500">
                    Custom cursor disabled in iframe • Some sites may block embedding
                </div>
            </div>
        </div>
    );
};

export default SafariApp;

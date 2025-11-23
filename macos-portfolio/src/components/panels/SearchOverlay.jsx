import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Search, Folder, FileText, Monitor, X } from 'lucide-react';

const SearchOverlay = ({ isOpen, onClose, onOpenItem, desktopItems, windows, apps }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setSearchQuery('');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Filter results
    const folders = desktopItems.filter(item =>
        item.type === 'folder' && (item.name || item.title).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const files = desktopItems.filter(item =>
        item.type === 'file' && item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openWindows = windows.filter(w =>
        w.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const applications = apps.filter(app =>
        app.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const hasResults = searchQuery && (folders.length > 0 || files.length > 0 || openWindows.length > 0 || applications.length > 0);

    const handleSelectItem = (item, type) => {
        if (type === 'folder' || type === 'file') {
            onOpenItem(item);
        } else if (type === 'app') {
            onOpenItem({ type: 'app', id: item.id });
        } else if (type === 'window') {
            onOpenItem({ type: 'window', id: item.id });
        }
        onClose();
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-2xl mx-4">
                {/* Search Box */}
                <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                        <Search size={20} className="text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for files, folders, and apps..."
                            className="flex-1 text-lg bg-transparent outline-none placeholder-gray-400 text-gray-800"
                        />
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={18} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Results */}
                    {searchQuery && (
                        <div className="max-h-96 overflow-y-auto p-2">
                            {hasResults ? (
                                <>
                                    {/* Folders */}
                                    {folders.length > 0 && (
                                        <div className="mb-3">
                                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Folders
                                            </div>
                                            {folders.map((folder) => (
                                                <button
                                                    key={folder.id}
                                                    onClick={() => handleSelectItem(folder, 'folder')}
                                                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                                                >
                                                    <Folder size={20} className="text-blue-500" />
                                                    <span className="text-sm text-gray-800">{folder.name || folder.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Files */}
                                    {files.length > 0 && (
                                        <div className="mb-3">
                                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Files
                                            </div>
                                            {files.map((file) => (
                                                <button
                                                    key={file.id}
                                                    onClick={() => handleSelectItem(file, 'file')}
                                                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                                                >
                                                    <FileText size={20} className="text-green-500" />
                                                    <span className="text-sm text-gray-800">{file.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Applications */}
                                    {applications.length > 0 && (
                                        <div className="mb-3">
                                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Applications
                                            </div>
                                            {applications.map((app) => (
                                                <button
                                                    key={app.id}
                                                    onClick={() => handleSelectItem(app, 'app')}
                                                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                                                >
                                                    {typeof app.icon === 'string' ? (
                                                        <img src={app.icon} alt={app.title} className="w-5 h-5" />
                                                    ) : (
                                                        <app.icon size={20} className="text-gray-600" />
                                                    )}
                                                    <span className="text-sm text-gray-800">{app.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Open Windows */}
                                    {openWindows.length > 0 && (
                                        <div className="mb-3">
                                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Open Windows
                                            </div>
                                            {openWindows.map((window) => (
                                                <button
                                                    key={window.id}
                                                    onClick={() => handleSelectItem(window, 'window')}
                                                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left"
                                                >
                                                    <Monitor size={20} className="text-purple-500" />
                                                    <span className="text-sm text-gray-800">{window.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                    <Search size={48} className="mb-3 opacity-30" />
                                    <p className="text-sm">No results found for "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    )}

                    {!searchQuery && (
                        <div className="p-8 text-center text-gray-400">
                            <Search size={48} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm"    >Start typing to search...</p>
                        </div>
                    )}
                </div>

                {/* Keyboard Hint */}
                <div className="mt-4 text-center text-white/60 text-sm">
                    Press <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> to close
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SearchOverlay;

import React, { useState, memo } from 'react';
import { Image as ImageIcon, X, Maximize2, PlayCircle } from 'lucide-react';

// Move data outside component to prevent recreation
const PHOTOS = [
    // Project 1: OS Portfolio
    { id: 'p1-1', url: '/proj1/desktop.png', title: 'OS Desktop', type: 'image' },
    { id: 'p1-2', url: '/proj1/portfolio.png', title: 'Portfolio Showcase', type: 'image' },
    { id: 'p1-3', url: '/proj1/games and apps.png', title: 'Games & Apps', type: 'image' },
    { id: 'p1-4', url: '/proj1/gif3.gif', title: 'Window Management', type: 'gif' },
    { id: 'p1-5', url: '/proj1/gif4.gif', title: 'Interactive Demo', type: 'gif' },

    // Project 2: EvalGenius
    { id: 'p2-1', url: '/proj2/hero.png', title: 'EvalGenius Hero', type: 'image' },
    { id: 'p2-2', url: '/proj2/upload-ui.png', title: 'Upload Interface', type: 'image' },
    { id: 'p2-3', url: '/proj2/workflow.png', title: 'Agentic Workflow', type: 'image' },
    { id: 'p2-4', url: '/proj2/analyze.png', title: 'Vision Analysis', type: 'image' },
    { id: 'p2-5', url: '/proj2/architecture.png', title: 'System Architecture', type: 'image' },
    { id: 'p2-6', url: '/proj2/gif1.gif', title: 'Grading Demo', type: 'gif' },
    { id: 'p2-7', url: '/proj2/gif2.gif', title: 'Results Demo', type: 'gif' },
];

// Memoized Photo Item Component
const PhotoItem = memo(({ photo, onContextMenu, onClick, isPlaying, onPlay }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleItemClick = () => {
        if (photo.type === 'gif') {
            if (!isPlaying) {
                onPlay(photo.id);
            } else {
                onClick(photo);
            }
        } else {
            onClick(photo);
        }
    };

    return (
        <div
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-md transition-all border border-gray-200"
            onContextMenu={(e) => onContextMenu(e, photo)}
            onClick={handleItemClick}
        >
            {photo.type === 'gif' && !isPlaying ? (
                // GIF Placeholder
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500 p-2 text-center">
                    <PlayCircle size={32} className="mb-2 text-blue-500" />
                    <span className="text-xs font-medium">{photo.title}</span>
                    <span className="text-[10px] mt-1 bg-gray-300 px-1.5 py-0.5 rounded text-gray-600">GIF</span>
                </div>
            ) : (
                // Image or Playing GIF
                <>
                    <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        onLoad={() => setIsLoaded(true)}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                    )}
                </>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                <Maximize2 className="text-white drop-shadow-md" size={24} />
            </div>

            {/* Type Badge */}
            {photo.type === 'gif' && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 text-white text-[10px] font-bold rounded backdrop-blur-sm">
                    {isPlaying ? 'PLAYING' : 'GIF'}
                </div>
            )}
        </div>
    );
});

const PhotosApp = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [playingGifId, setPlayingGifId] = useState(null);

    const handleContextMenu = (e, photo) => {
        e.preventDefault();
        setSelectedImage(photo);
    };

    return (
        <div className="w-full h-full flex bg-white font-sans">
            {/* Sidebar - Simplified */}
            <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col pt-4">
                <div className="px-4 mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Library</span>
                </div>
                <div className="flex flex-col gap-1 px-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md text-sm font-medium">
                        <ImageIcon size={16} />
                        <span>All Photos</span>
                    </div>
                </div>
                <div className="mt-auto p-4 text-xs text-gray-400 text-center">
                    Click to view details
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white overflow-y-auto p-6">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">All Photos</h2>
                        <p className="text-sm text-gray-500 mt-1">{PHOTOS.length} items</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {PHOTOS.map((photo) => (
                        <PhotoItem
                            key={photo.id}
                            photo={photo}
                            onContextMenu={handleContextMenu}
                            onClick={setSelectedImage}
                            isPlaying={playingGifId === photo.id}
                            onPlay={setPlayingGifId}
                        />
                    ))}
                </div>
            </div>

            {/* Full Screen Modal */}
            {selectedImage && (
                <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-200">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="w-full h-full p-8 flex items-center justify-center">
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                        />
                    </div>

                    <div className="absolute bottom-6 left-0 right-0 text-center">
                        <h3 className="text-white text-lg font-medium">{selectedImage.title}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotosApp;

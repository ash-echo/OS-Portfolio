import React from 'react';
import { Sidebar, Heart, Image as ImageIcon, Users, MapPin, Clock, Download } from 'lucide-react';

const PhotosApp = () => {
    const photos = [
        { id: 1, url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=500&q=60', date: 'Today' },
        { id: 2, url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?auto=format&fit=crop&w=500&q=60', date: 'Today' },
        { id: 3, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=60', date: 'Yesterday' },
        { id: 4, url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=60', date: 'Yesterday' },
        { id: 5, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60', date: 'Mon, Aug 12' },
        { id: 6, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=500&q=60', date: 'Mon, Aug 12' },
        { id: 7, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=60', date: 'Sun, Aug 11' },
        { id: 8, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=500&q=60', date: 'Sun, Aug 11' },
    ];

    return (
        <div className="w-full h-full flex bg-white">
            {/* Sidebar */}
            <div className="w-48 bg-[#f3f3f3]/80 backdrop-blur-xl border-r border-[#d1d1d1] flex flex-col pt-4 pb-4">
                <div className="px-4 mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Library</span>
                </div>
                <div className="flex flex-col gap-1 px-2">
                    <div className="flex items-center gap-2 px-2 py-1.5 bg-blue-500 text-white rounded-md text-sm cursor-default">
                        <ImageIcon size={16} />
                        <span>Library</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-gray-700 hover:bg-black/5 rounded-md text-sm cursor-default transition-colors">
                        <Heart size={16} />
                        <span>Favorites</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-gray-700 hover:bg-black/5 rounded-md text-sm cursor-default transition-colors">
                        <Users size={16} />
                        <span>People</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-gray-700 hover:bg-black/5 rounded-md text-sm cursor-default transition-colors">
                        <MapPin size={16} />
                        <span>Places</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-gray-700 hover:bg-black/5 rounded-md text-sm cursor-default transition-colors">
                        <Clock size={16} />
                        <span>Recents</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-gray-700 hover:bg-black/5 rounded-md text-sm cursor-default transition-colors">
                        <Download size={16} />
                        <span>Imports</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white overflow-y-auto p-6">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Library</h2>
                    <div className="flex gap-2">
                        <button className="text-xs font-medium px-3 py-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors">Years</button>
                        <button className="text-xs font-medium px-3 py-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors">Months</button>
                        <button className="text-xs font-medium px-3 py-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors">Days</button>
                        <button className="text-xs font-medium px-3 py-1 bg-gray-800 text-white rounded-full shadow-sm">All Photos</button>
                    </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                    {photos.map((photo) => (
                        <div key={photo.id} className="aspect-square bg-gray-100 overflow-hidden cursor-pointer group relative">
                            <img src={photo.url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-gray-400 text-sm font-medium">
                    {photos.length} Photos, 0 Videos
                </div>
            </div>
        </div>
    );
};

export default PhotosApp;

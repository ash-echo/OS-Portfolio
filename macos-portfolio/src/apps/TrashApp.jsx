import React from 'react';
import { Trash2, File, Folder } from 'lucide-react';

const TrashApp = () => {
    const deletedItems = [
        { id: 1, name: 'old_resume.pdf', type: 'file', size: '2.4 MB', date: 'Yesterday, 10:23 AM' },
        { id: 2, name: 'Untitled Folder', type: 'folder', size: '--', date: 'Mon, Aug 12, 4:15 PM' },
        { id: 3, name: 'screenshot_2023.png', type: 'file', size: '1.2 MB', date: 'Sun, Aug 11, 9:00 AM' },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* Toolbar */}
            <div className="h-12 bg-[#f5f5f5] border-b border-[#d1d1d1] flex items-center justify-between px-4 shrink-0">
                <div className="font-semibold text-gray-700">Trash</div>
                <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-medium text-gray-700 transition-colors border border-gray-300">
                    Empty Trash
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 font-medium border-b border-gray-200 bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 font-medium w-1/2">Name</th>
                            <th className="px-4 py-2 font-medium">Date Deleted</th>
                            <th className="px-4 py-2 font-medium">Size</th>
                            <th className="px-4 py-2 font-medium">Kind</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deletedItems.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-500/10 group cursor-default">
                                <td className="px-4 py-2 flex items-center gap-2 text-gray-700 group-hover:text-black">
                                    {item.type === 'folder' ? (
                                        <Folder size={16} className="text-blue-400 fill-blue-400/20" />
                                    ) : (
                                        <File size={16} className="text-gray-400" />
                                    )}
                                    {item.name}
                                </td>
                                <td className="px-4 py-2 text-gray-500">{item.date}</td>
                                <td className="px-4 py-2 text-gray-500">{item.size}</td>
                                <td className="px-4 py-2 text-gray-500 capitalize">{item.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {deletedItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <Trash2 size={48} className="mb-2 opacity-20" />
                        <span>Trash is empty</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="h-6 bg-[#f5f5f5] border-t border-[#d1d1d1] flex items-center px-4 text-xs text-gray-500">
                {deletedItems.length} items
            </div>
        </div>
    );
};

export default TrashApp;

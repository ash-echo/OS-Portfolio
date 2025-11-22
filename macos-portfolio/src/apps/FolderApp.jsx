import React, { useState } from 'react';
import { Folder, FileText, Plus } from 'lucide-react';

const FolderApp = ({ folderName, folderContent = { files: [], folders: [] }, onCreateFile, onCreateFolder, onOpenItem }) => {
    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleCreateNewFolder = () => {
        const name = prompt('Enter folder name:');
        if (name && onCreateFolder) {
            onCreateFolder(folderName, { id: Date.now().toString(), name, type: 'folder' });
        }
        setContextMenu(null);
    };

    const handleCreateNewFile = () => {
        const name = prompt('Enter file name:');
        if (name && onCreateFile) {
            onCreateFile(folderName, { id: Date.now().toString(), name, content: '', type: 'file' });
        }
        setContextMenu(null);
    };

    const handleItemDoubleClick = (item) => {
        if (onOpenItem) {
            onOpenItem(folderName, item);
        }
    };

    return (
        <div
            className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 overflow-auto"
            onContextMenu={handleContextMenu}
            onClick={() => setContextMenu(null)}
        >
            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="fixed bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={handleCreateNewFolder}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2"
                    >
                        <Folder size={16} /> New Folder
                    </button>
                    <button
                        onClick={handleCreateNewFile}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2"
                    >
                        <FileText size={16} /> New File
                    </button>
                </div>
            )}

            {/* Folder Title */}
            <h2 className="text-2xl font-bold text-white mb-6">{folderName}</h2>

            {/* Content Grid */}
            <div className="grid grid-cols-4 gap-4">
                {/* Folders */}
                {folderContent.folders?.map((folder) => (
                    <div
                        key={folder.id}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                        onDoubleClick={() => handleItemDoubleClick(folder)}
                    >
                        <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <Folder size={40} className="text-blue-400" />
                        </div>
                        <span className="text-white text-sm text-center">{folder.name}</span>
                    </div>
                ))}

                {/* Files */}
                {folderContent.files?.map((file) => (
                    <div
                        key={file.id}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors"
                        onDoubleClick={() => handleItemDoubleClick(file)}
                    >
                        <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <FileText size={40} className="text-green-400" />
                        </div>
                        <span className="text-white text-sm text-center">{file.name}</span>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {(!folderContent.files || folderContent.files.length === 0) &&
                (!folderContent.folders || folderContent.folders.length === 0) && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <Folder size={64} className="mb-4 opacity-50" />
                        <p className="text-lg">This folder is empty</p>
                        <p className="text-sm">Right-click to create files or folders</p>
                    </div>
                )}
        </div>
    );
};

export default FolderApp;

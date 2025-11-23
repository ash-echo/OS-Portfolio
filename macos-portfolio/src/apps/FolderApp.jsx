import React, { useState } from 'react';
import { Folder, FileText, Plus } from 'lucide-react';
import NameDialog from '../components/NameDialog';

const FolderApp = ({ folderName, folderContent = { files: [], folders: [] }, onCreateFile, onCreateFolder, onOpenItem }) => {
    const [contextMenu, setContextMenu] = useState(null);
    const [nameDialog, setNameDialog] = useState({
        isOpen: false,
        type: null,
        title: '',
        placeholder: ''
    });

    const handleContextMenu = (e) => {
        e.preventDefault();
        // Adjust for custom cursor offset (-3px, -3px)
        setContextMenu({ x: e.clientX + 3, y: e.clientY + 3 });
    };

    const handleCreateNewFolder = () => {
        setNameDialog({
            isOpen: true,
            type: 'folder',
            title: 'Create New Folder',
            placeholder: 'Enter folder name'
        });
        setContextMenu(null);
    };

    const handleCreateNewFile = () => {
        setNameDialog({
            isOpen: true,
            type: 'file',
            title: 'Create New File',
            placeholder: 'Enter file name'
        });
        setContextMenu(null);
    };

    const handleNameDialogConfirm = (name) => {
        if (nameDialog.type === 'folder') {
            if (onCreateFolder) {
                onCreateFolder(folderName, name);
            }
        } else if (nameDialog.type === 'file') {
            if (onCreateFile) {
                onCreateFile(folderName, name);
            }
        }
        setNameDialog({ isOpen: false, type: null, title: '', placeholder: '' });
    };

    const handleItemDoubleClick = (item) => {
        if (onOpenItem) {
            onOpenItem(folderName, item);
        }
    };

    return (
        <div
            className="h-full w-full bg-gray-50 p-6 overflow-auto relative"
            onContextMenu={handleContextMenu}
            onClick={() => setContextMenu(null)}
        >
            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="fixed bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={handleCreateNewFolder}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                        <Folder size={16} /> New Folder
                    </button>
                    <button
                        onClick={handleCreateNewFile}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
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
                        className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        onDoubleClick={() => handleItemDoubleClick(folder)}
                    >
                        <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <Folder size={40} className="text-blue-500" />
                        </div>
                        <span className="text-sm text-gray-700 text-center">{folder.name}</span>
                    </div>
                ))}

                {/* Files */}
                {folderContent.files?.map((file) => (
                    <div
                        key={file.id}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        onDoubleClick={() => handleItemDoubleClick(file)}
                    >
                        <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <FileText size={40} className="text-green-500" />
                        </div>
                        <span className="text-sm text-gray-700 text-center">{file.name}</span>
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

            {/* Name Dialog */}
            <NameDialog
                isOpen={nameDialog.isOpen}
                onClose={() => setNameDialog({ isOpen: false, type: null, title: '', placeholder: '' })}
                onConfirm={handleNameDialogConfirm}
                title={nameDialog.title}
                placeholder={nameDialog.placeholder}
            />
        </div>
    );
};

export default FolderApp;

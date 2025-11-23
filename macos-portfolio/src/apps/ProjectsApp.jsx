import React, { useState } from 'react';
import { Folder, FileText, Clock, Briefcase, User, Trash2, Home, ChevronRight, Plus } from 'lucide-react';
import ReactDOM from 'react-dom';
import ResumeApp from './ResumeApp';
import WorkApp from './WorkApp';
import AboutMeApp from './AboutMeApp';
import NameDialog from '../components/NameDialog';

const ProjectsApp = ({
    allFolders = [],
    folderData = {},
    initialPath = null,
    onCreateFolder,
    onCreateFile,
    onOpenFolder,
    onOpenFile,
    onDeleteItem
}) => {
    const [activeTab, setActiveTab] = useState(initialPath ? 'folder-view' : 'resume');
    const [currentPath, setCurrentPath] = useState(initialPath); // null = root/main view
    const [contextMenu, setContextMenu] = useState(null);
    const [itemContextMenu, setItemContextMenu] = useState(null); // For right-clicking on specific items
    const [nameDialog, setNameDialog] = useState({
        isOpen: false,
        type: null,
        title: '',
        placeholder: ''
    });

    const sidebarItems = [
        {
            section: 'Favorites',
            items: [
                { id: 'work', label: 'Work', icon: Briefcase },
                { id: 'about', label: 'About me', icon: User },
                { id: 'resume', label: 'Resume', icon: FileText },
                { id: 'trash', label: 'Trash', icon: Trash2 },
            ],
        },
        {
            section: 'Folders',
            items: allFolders.map(folder => ({
                id: `folder-${folder.id}`,
                label: folder.name || folder.title,
                icon: Folder,
                color: 'text-blue-500',
                isFolder: true,
                folderName: folder.name || folder.title
            })),
        },
    ];


    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ x: e.clientX + 3, y: e.clientY + 3 });
        setItemContextMenu(null); // Close item context menu if open
    };

    const handleItemContextMenu = (e, item, itemType) => {
        e.preventDefault();
        e.stopPropagation();
        setItemContextMenu({
            x: e.clientX + 3,
            y: e.clientY + 3,
            item,
            itemType
        });
        setContextMenu(null); // Close background context menu if open
    };

    const handleDeleteItem = () => {
        if (onDeleteItem && itemContextMenu) {
            onDeleteItem(currentPath, itemContextMenu.item, itemContextMenu.itemType);
        }
        setItemContextMenu(null);
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
                onCreateFolder(currentPath, name);
            }
        } else if (nameDialog.type === 'file') {
            if (onCreateFile) {
                onCreateFile(currentPath, name);
            }
        }
        setNameDialog({ isOpen: false, type: null, title: '', placeholder: '' });
    };

    const handleFolderClick = (folderName) => {
        setCurrentPath(folderName);
        setActiveTab('folder-view');
    };

    const handleBack = () => {
        if (currentPath && currentPath.includes('/')) {
            // Go to parent folder
            const parts = currentPath.split('/');
            parts.pop();
            setCurrentPath(parts.join('/') || null);
        } else {
            setCurrentPath(null);
            setActiveTab('resume');
        }
    };

    const renderFolderView = () => {
        const folder = folderData[currentPath] || { files: [], folders: [] };

        return (
            <div
                className="h-full w-full bg-gray-50 p-6 overflow-auto relative"
                onContextMenu={handleContextMenu}
                onClick={() => {
                    setContextMenu(null);
                    setItemContextMenu(null);
                }}
            >
                {/* Context Menu */}
                {contextMenu && ReactDOM.createPortal(
                    <div
                        className="fixed bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-[9999]"
                        style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
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
                    </div>,
                    document.body
                )}

                {/* Item Context Menu (for specific files/folders) */}
                {itemContextMenu && ReactDOM.createPortal(
                    <div
                        className="fixed bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-[9999]"
                        style={{ left: `${itemContextMenu.x}px`, top: `${itemContextMenu.y}px` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleDeleteItem}
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>,
                    document.body
                )}

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <button onClick={handleBack} className="hover:text-blue-600 flex items-center gap-1">
                        <Home size={16} /> Home
                    </button>
                    {currentPath && currentPath.split('/').map((part, idx, arr) => (
                        <React.Fragment key={idx}>
                            <ChevronRight size={14} />
                            <span className={idx === arr.length - 1 ? 'text-gray-900 font-medium' : ''}>
                                {part}
                            </span>
                        </React.Fragment>
                    ))}
                </div>

                {/* Folder Contents */}
                <div className="grid grid-cols-4 gap-4">
                    {/* Folders */}
                    {folder.folders?.map((subFolder) => (
                        <div
                            key={subFolder.id}
                            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                            onDoubleClick={() => {
                                const nestedPath = currentPath ? `${currentPath}/${subFolder.name}` : subFolder.name;
                                handleFolderClick(nestedPath);
                            }}
                            onContextMenu={(e) => handleItemContextMenu(e, subFolder, 'folder')}
                        >
                            <Folder size={48} className="text-blue-500" />
                            <span className="text-sm text-gray-700 text-center">{subFolder.name}</span>
                        </div>
                    ))}

                    {/* Files */}
                    {folder.files?.map((file) => (
                        <div
                            key={file.id}
                            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                            onDoubleClick={() => {
                                if (onOpenFile) {
                                    onOpenFile(file, currentPath);
                                }
                            }}
                            onContextMenu={(e) => handleItemContextMenu(e, file, 'file')}
                        >
                            <FileText size={48} className="text-green-500" />
                            <span className="text-sm text-gray-700 text-center">{file.name}</span>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {(!folder.files || folder.files.length === 0) &&
                    (!folder.folders || folder.folders.length === 0) && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
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

    const content = {
        'folder-view': renderFolderView(),
        resume: <ResumeApp />,
        work: <WorkApp />,
        about: <AboutMeApp />,
        trash: (
            <div className="h-full w-full bg-gray-100 p-8 overflow-auto flex items-center justify-center">
                <div className="text-center text-gray-400">
                    <Trash2 size={64} className="mx-auto mb-4" />
                    <p className="text-xl">Trash is empty</p>
                </div>
            </div>
        ),
    };

    return (
        <div className="h-full flex bg-white" >
            {/* Sidebar */}
            < div className="w-48 bg-gray-50 border-r border-gray-200 p-4 overflow-auto" >
                {
                    sidebarItems.map((section, idx) => (
                        <div key={idx} className="mb-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">{section.section}</h3>
                            {section.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        if (item.isFolder) {
                                            handleFolderClick(item.folderName);
                                        } else {
                                            setActiveTab(item.id);
                                            setCurrentPath(null);
                                        }
                                    }}
                                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${(activeTab === item.id || (currentPath && currentPath.startsWith(item.folderName)))
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <item.icon size={16} className={item.color || ''} />
                                    <span className="truncate">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    ))
                }
            </div >

            {/* Main Content */}
            < div className="flex-1 overflow-hidden" >
                {content[activeTab] || content['folder-view']}
            </div >
        </div >
    );
};

export default ProjectsApp;

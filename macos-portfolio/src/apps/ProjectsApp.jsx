import React, { useState } from 'react';
import { Folder, FileText, Clock, Briefcase, User, Trash2, Home, ChevronRight, Plus } from 'lucide-react';
import ReactDOM from 'react-dom';

const ProjectsApp = ({
    allFolders = [],
    folderData = {},
    initialPath = null,
    onCreateFolder,
    onCreateFile,
    onOpenFolder,
    onOpenFile
}) => {
    const [activeTab, setActiveTab] = useState(initialPath ? 'folder-view' : 'resume');
    const [currentPath, setCurrentPath] = useState(initialPath); // null = root/main view
    const [contextMenu, setContextMenu] = useState(null);

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
    };

    const handleCreateNewFolder = () => {
        if (onCreateFolder) {
            onCreateFolder(currentPath);
        }
        setContextMenu(null);
    };

    const handleCreateNewFile = () => {
        if (onCreateFile) {
            onCreateFile(currentPath);
        }
        setContextMenu(null);
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
                onClick={() => setContextMenu(null)}
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
                                    onOpenFile(file);
                                }
                            }}
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
            </div>
        );
    };

    const content = {
        'folder-view': renderFolderView(),
        resume: (
            <div className="h-full w-full bg-white p-8 overflow-auto">
                <div className="max-w-3xl mx-auto shadow-lg border border-gray-200 p-10 bg-white min-h-[1000px]">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-1">Full Name</h1>
                            <p className="text-gray-500">front-end developer</p>
                        </div>
                        <div className="text-right text-sm text-blue-600">
                            <p>linkedin.com/in/fullname</p>
                            <p>github.com/fullname</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">
                            Work Experience
                        </h2>
                        <div className="mb-6">
                            <div className="flex justify-between mb-1">
                                <h3 className="font-bold text-gray-800">Front-end Developer</h3>
                                <span className="text-gray-600 font-medium">New York, USA</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p className="text-gray-500 italic">Company Inc.</p>
                                <p className="text-gray-500">02/2022 – Current</p>
                            </div>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                <li>Built responsive React applications</li>
                                <li>Implemented complex UI components with Tailwind CSS</li>
                                <li>Collaborated with backend team for API integration</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">
                            Education
                        </h2>
                        <div>
                            <div className="flex justify-between mb-1">
                                <h3 className="font-bold text-gray-800">Bachelor of Computer Science</h3>
                                <span className="text-gray-600 font-medium">New York, USA</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-500 italic">University Name</p>
                                <p className="text-gray-500">09/2018 – 06/2022</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">
                            Skills
                        </h2>
                        <div className="space-y-2">
                            <div>
                                <p className="font-medium text-gray-800">Languages:</p>
                                <p className="text-gray-700">JavaScript, TypeScript, Python, HTML, CSS</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Frameworks:</p>
                                <p className="text-gray-700">React, Next.js, Node.js, Express</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Tools:</p>
                                <p className="text-gray-700">Git, Docker, VS Code, Figma</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        work: (
            <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Work Projects</h1>
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { name: 'Nike Ecommerce', desc: 'Full-stack e-commerce platform' },
                        { name: 'AI Resume Analyzer', desc: 'ML-powered resume analysis' },
                        { name: 'Food Delivery App', desc: 'Real-time food delivery platform' },
                    ].map((project) => (
                        <div key={project.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                            <p className="text-gray-600">{project.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
        about: (
            <div className="h-full w-full bg-gradient-to-br from-purple-50 to-blue-50 p-8 overflow-auto">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">About Me</h1>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        I'm a passionate full-stack developer with expertise in building modern web applications.
                        I love creating intuitive user interfaces and solving complex problems.
                    </p>
                </div>
            </div>
        ),
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

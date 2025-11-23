import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import TopBar from './TopBar';
import Dock from './Dock';
import Window from './Window';
import CustomCursor from './CustomCursor';
import ContextMenu from './ContextMenu';
import { Smile, Compass, Image as ImageIcon, User, Terminal, Trash2, Folder, FileText } from 'lucide-react';
import ProjectsApp from '../apps/ProjectsApp';
import AboutMeApp from '../apps/AboutMeApp';
import TerminalApp from '../apps/TerminalApp';
import SafariApp from '../apps/SafariApp';
import PhotosApp from '../apps/PhotosApp';
import TrashApp from '../apps/TrashApp';
import gsap from 'gsap';
import PokemonApp from '../apps/PokemonApp';
import Sonic2App from '../apps/Sonic2App';
import FolderApp from '../apps/FolderApp';
import TextEditorApp from '../apps/TextEditorApp';
import DocumentViewerApp from '../apps/DocumentViewerApp';

const Desktop = () => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [bootSequence, setBootSequence] = useState(true);
    const [contextMenu, setContextMenu] = useState(null);
    const desktopRef = useRef(null);

    // Dynamic desktop items (created by user)
    const [desktopItems, setDesktopItems] = useState([]);

    // Refresh animation state
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Folder content (nested files and folders)
    const [folderData, setFolderData] = useState({
        'Nike Ecommerce\nWebsite Application': {
            files: [
                { id: 'nike-readme', name: 'README.md', content: 'Nike Ecommerce Website Application\n\nA full-stack e-commerce platform built with React and Node.js.\n\nFeatures:\n- Product catalog with filtering\n- Shopping cart functionality\n- Secure checkout process\n- User authentication\n- Order tracking\n\nTech Stack: React, Node.js, Express, MongoDB', type: 'file' }
            ],
            folders: []
        },
        'AI Resume Analyzer': {
            files: [
                { id: 'ai-readme', name: 'README.md', content: 'AI Resume Analyzer\n\nAn intelligent resume analysis tool powered by machine learning.\n\nFeatures:\n- Resume parsing and analysis\n- Skill matching\n- Job recommendation\n- ATS optimization\n- Score generation\n\nTech Stack: Python, TensorFlow, Flask, React', type: 'file' }
            ],
            folders: []
        },
        'Food Delivery App': {
            files: [
                { id: 'food-readme', name: 'README.md', content: 'Food Delivery App\n\nA comprehensive food delivery platform connecting restaurants and customers.\n\nFeatures:\n- Restaurant browsing\n- Real-time order tracking\n- Multiple payment options\n- Rating and reviews\n- Delivery scheduling\n\nTech Stack: React Native, Node.js, MongoDB, Socket.io', type: 'file' }
            ],
            folders: []
        }
    });

    const apps = [
        { id: 'finder', title: 'Finder', icon: '/1.png', color: 'bg-transparent', content: ProjectsApp },
        { id: 'safari', title: 'Browser', icon: '/safari-icon.png', color: 'bg-transparent', content: SafariApp },
        { id: 'photos', title: 'Photos', icon: '/3.png', color: 'bg-white text-pink-500', content: PhotosApp },
        { id: 'contacts', title: 'Contacts', icon: '/4.png', color: 'bg-gray-500', content: AboutMeApp },
        { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'bg-gray-900', content: TerminalApp },
        { id: 'trash', title: 'Trash', icon: '/5.png', color: 'bg-gray-200 text-gray-600', content: TrashApp },
        { id: 'pokemon', title: 'Pokemon Fire Red', icon: '/poke.png', color: 'bg-red-600', content: PokemonApp },
        { id: 'sonic2', title: 'Sonic 2', icon: '/sonic.png', color: 'bg-blue-600', content: Sonic2App },
    ];

    const desktopIcons = [
        { id: 'nike', title: 'Nike Ecommerce\nWebsite Application', icon: Folder, type: 'folder' },
        { id: 'ai', title: 'AI Resume Analyzer', icon: Folder, type: 'folder' },
        { id: 'food', title: 'Food Delivery App', icon: Folder, type: 'folder' },
        { id: 'pokemon', title: 'Pokemon Fire Red', icon: '/poke.png', type: 'app' },
        { id: 'sonic2', title: 'Sonic 2', icon: '/sonic.png', type: 'app' },
    ];


    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setBootSequence(false);
                gsap.set('.desktop-content', { clearProps: 'transform,opacity,scale' });
            },
        });
        tl.fromTo('.boot-bar', { width: '0%' }, { width: '100%', duration: 1.2, ease: 'power2.out' })
            .to('.boot-screen', { opacity: 0, duration: 0.5 }, '+=0.2')
            .fromTo('.desktop-content', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    }, []);

    // Memoize the ProjectsApp content to avoid recreating it on every render
    const createFinderContent = (folderName) => {
        const allFolders = [...desktopIcons.filter(i => i.type === 'folder'), ...desktopItems.filter(i => i.type === 'folder')];

        return (
            <ProjectsApp
                key={folderName || 'finder'}
                allFolders={allFolders}
                folderData={folderData}
                initialPath={folderName}
                onCreateFolder={(path) => {
                    const name = prompt('Enter folder name:');
                    if (!name) return;
                    if (!folderName && !path) {
                        const newItem = { id: Date.now().toString(), name, icon: Folder, type: 'folder' };
                        setDesktopItems((prev) => [...prev, newItem]);
                        setFolderData((prev) => ({ ...prev, [name]: { files: [], folders: [] } }));
                    } else {
                        const targetPath = path || folderName;
                        setFolderData((prev) => {
                            const folder = prev[targetPath] || { files: [], folders: [] };
                            return { ...prev, [targetPath]: { ...folder, folders: [...folder.folders, { id: Date.now().toString(), name, type: 'folder' }] } };
                        });
                    }
                }}
                onCreateFile={(path) => {
                    const name = prompt('Enter file name:');
                    if (!name) return;
                    if (!folderName && !path) {
                        const id = Date.now().toString();
                        const newItem = { id, name, icon: FileText, type: 'file', content: '' };
                        setDesktopItems((prev) => [...prev, newItem]);
                    } else {
                        const targetPath = path || folderName;
                        setFolderData((prev) => {
                            const folder = prev[targetPath] || { files: [], folders: [] };
                            return { ...prev, [targetPath]: { ...folder, files: [...folder.files, { id: Date.now().toString(), name, content: '', type: 'file' }] } };
                        });
                    }
                }}
                onOpenFolder={() => { }}
                onOpenFile={(file) => {
                    const windowId = `file-${file.id}`;
                    setWindows((prevWin) => {
                        const existingFileWindow = prevWin.find((w) => w.id === windowId);
                        if (existingFileWindow) {
                            if (existingFileWindow.minimized) {
                                setActiveWindowId(windowId);
                                return prevWin.map((w) => (w.id === windowId ? { ...w, minimized: false } : w));
                            }
                            setActiveWindowId(windowId);
                            return prevWin;
                        }
                        const fileContent = () => <TextEditorApp
                            fileName={file.name}
                            initialContent={file.content || ''}
                            onSave={(newContent) => {
                                // Update the file content in folderData
                                setFolderData((prev) => {
                                    const targetPath = folderName;
                                    const folder = prev[targetPath];
                                    if (!folder) return prev;

                                    return {
                                        ...prev,
                                        [targetPath]: {
                                            ...folder,
                                            files: folder.files.map(f =>
                                                f.id === file.id ? { ...f, content: newContent } : f
                                            )
                                        }
                                    };
                                });
                            }}
                        />;
                        const newFileWindow = {
                            id: windowId,
                            title: file.name,
                            content: fileContent,
                            zIndex: prevWin.length + 1,
                            minimized: false,
                        };
                        setActiveWindowId(windowId);
                        return [...prevWin, newFileWindow];
                    });
                }}
                onDeleteItem={(path, item, itemType) => {
                    setFolderData((prev) => {
                        const targetPath = path || folderName;
                        const folder = prev[targetPath];
                        if (!folder) return prev;

                        if (itemType === 'folder') {
                            return {
                                ...prev,
                                [targetPath]: {
                                    ...folder,
                                    folders: folder.folders.filter(f => f.id !== item.id)
                                }
                            };
                        } else {
                            return {
                                ...prev,
                                [targetPath]: {
                                    ...folder,
                                    files: folder.files.filter(f => f.id !== item.id)
                                }
                            };
                        }
                    });
                }}
            />
        );
    };

    // Update finder windows only when folderData actually changes
    useEffect(() => {
        let hasChanges = false;
        const updatedWindows = windows.map(window => {
            const isFinder = window.id === 'finder' || window.id.startsWith('finder-');
            if (isFinder) {
                const folderName = window.id === 'finder' ? null : window.id.replace('finder-', '');
                const newContent = createFinderContent(folderName);
                hasChanges = true;
                return { ...window, content: newContent };
            }
            return window;
        });

        if (hasChanges) {
            setWindows(updatedWindows);
        }
    }, [folderData]);


    const openWindow = (appId, folderName = null) => {
        const app = apps.find((a) => a.id === appId);
        if (!app) return;

        // Folder windows - use ProjectsApp with sidebar
        if (appId === 'finder' && folderName) {
            const windowId = `${appId}-${folderName}`;
            const allFolders = [...desktopIcons.filter(i => i.type === 'folder'), ...desktopItems.filter(i => i.type === 'folder')];

            const content = (
                <ProjectsApp
                    key={folderName}
                    allFolders={allFolders}
                    folderData={folderData}
                    initialPath={folderName}
                    onCreateFolder={(path) => {
                        const name = prompt('Enter folder name:');
                        if (!name) return;
                        handleCreateFolder(path || folderName, { id: Date.now().toString(), name, type: 'folder' });
                    }}
                    onCreateFile={(path) => {
                        const name = prompt('Enter file name:');
                        if (!name) return;
                        handleCreateFile(path || folderName, { id: Date.now().toString(), name, content: '', type: 'file' });
                    }}
                    onOpenFolder={(folderPath) => {
                        // Navigate handled internally by ProjectsApp
                    }}
                    onOpenFile={(file) => {
                        const windowId = `file-${file.id}`;
                        const existingFileWindow = windows.find((w) => w.id === windowId);
                        if (existingFileWindow) {
                            if (existingFileWindow.minimized) {
                                setWindows(windows.map((w) => (w.id === windowId ? { ...w, minimized: false } : w)));
                            }
                            setActiveWindowId(windowId);
                            focusWindow(windowId);
                            return;
                        }
                        const fileContent = () => <DocumentViewerApp fileName={file.name} fileContent={file.content} />;
                        const newFileWindow = {
                            id: windowId,
                            title: file.name,
                            content: fileContent,
                            zIndex: windows.length + 1,
                            minimized: false,
                        };
                        setWindows([...windows, newFileWindow]);
                        setActiveWindowId(windowId);
                    }}
                    onDeleteItem={(path, item, itemType) => {
                        // Delete item from folderData
                        setFolderData((prev) => {
                            const targetPath = path || folderName;
                            const folder = prev[targetPath];
                            if (!folder) return prev;

                            if (itemType === 'folder') {
                                return {
                                    ...prev,
                                    [targetPath]: {
                                        ...folder,
                                        folders: folder.folders.filter(f => f.id !== item.id)
                                    }
                                };
                            } else {
                                return {
                                    ...prev,
                                    [targetPath]: {
                                        ...folder,
                                        files: folder.files.filter(f => f.id !== item.id)
                                    }
                                };
                            }
                        });
                    }}
                />
            );

            const existingWindow = windows.find((w) => w.id === windowId);
            if (existingWindow) {
                setWindows(windows.map((w) =>
                    w.id === windowId ? { ...w, content } : w
                ));
                if (existingWindow.minimized) {
                    setWindows(windows.map((w) => (w.id === windowId ? { ...w, minimized: false } : w)));
                }
                setActiveWindowId(windowId);
                focusWindow(windowId);
                return;
            }
            const newWindow = { id: windowId, title: folderName, content, zIndex: windows.length + 1, minimized: false };
            setWindows([...windows, newWindow]);
            setActiveWindowId(windowId);
            return;
        }

        // Normal app windows
        const windowId = appId;
        const existingWindow = windows.find((w) => w.id === windowId);
        if (existingWindow) {
            if (existingWindow.minimized) {
                setWindows(windows.map((w) => (w.id === windowId ? { ...w, minimized: false } : w)));
            }
            setActiveWindowId(windowId);
            focusWindow(windowId);
            return;
        }

        // For Finder, wrap with props
        let content = app.content;
        if (appId === 'finder') {
            const allFolders = [...desktopIcons.filter(i => i.type === 'folder'), ...desktopItems.filter(i => i.type === 'folder')];
            content = (
                <ProjectsApp
                    key="finder"
                    allFolders={allFolders}
                    folderData={folderData}
                    onCreateFolder={(path) => {
                        const name = prompt('Enter folder name:');
                        if (!name) return;
                        const targetFolder = path || 'desktop';
                        if (targetFolder === 'desktop') {
                            // Create on desktop
                            createNewFolder();
                        } else {
                            // Create in specific folder
                            handleCreateFolder(path, { id: Date.now().toString(), name, type: 'folder' });
                        }
                    }}
                    onCreateFile={(path) => {
                        const name = prompt('Enter file name:');
                        if (!name) return;
                        const targetFolder = path || 'desktop';
                        if (targetFolder === 'desktop') {
                            // Create on desktop
                            createNewFile();
                        } else {
                            // Create in specific folder
                            handleCreateFile(path, { id: Date.now().toString(), name, content: '', type: 'file' });
                        }
                    }}
                    onOpenFolder={(folderName) => {
                        // Just update the path within Finder, handled internally
                    }}
                    onOpenFile={(file) => {
                        // Open file in viewer
                        const windowId = `file-${file.id}`;
                        const existingFileWindow = windows.find((w) => w.id === windowId);
                        if (existingFileWindow) {
                            if (existingFileWindow.minimized) {
                                setWindows(windows.map((w) => (w.id === windowId ? { ...w, minimized: false } : w)));
                            }
                            setActiveWindowId(windowId);
                            focusWindow(windowId);
                            return;
                        }
                        const fileContent = () => <DocumentViewerApp fileName={file.name} fileContent={file.content} />;
                        const newFileWindow = {
                            id: windowId,
                            title: file.name,
                            content: fileContent,
                            zIndex: windows.length + 1,
                            minimized: false,
                        };
                        setWindows([...windows, newFileWindow]);
                        setActiveWindowId(windowId);
                    }}
                    onDeleteItem={(path, item, itemType) => {
                        // Delete item from folderData
                        setFolderData((prev) => {
                            const folder = prev[path];
                            if (!folder) return prev;

                            if (itemType === 'folder') {
                                return {
                                    ...prev,
                                    [path]: {
                                        ...folder,
                                        folders: folder.folders.filter(f => f.id !== item.id)
                                    }
                                };
                            } else {
                                return {
                                    ...prev,
                                    [path]: {
                                        ...folder,
                                        files: folder.files.filter(f => f.id !== item.id)
                                    }
                                };
                            }
                        });
                    }}
                />
            );
        }

        const newWindow = {
            id: windowId,
            title: app.title,
            content,
            zIndex: windows.length + 1,
            minimized: false,
        };
        setWindows([...windows, newWindow]);
        setActiveWindowId(windowId);
    };

    // Desktop context menu handlers
    const createNewFolder = () => {
        const name = prompt('Enter folder name:');
        if (!name) return;
        const newItem = { id: Date.now().toString(), name, icon: Folder, type: 'folder' };
        setDesktopItems((prev) => [...prev, newItem]);
        // Initialize empty folder in folderData
        setFolderData((prev) => ({ ...prev, [name]: { files: [], folders: [] } }));
    };

    const createNewFile = () => {
        const name = prompt('Enter file name:');
        if (!name) return;
        const id = Date.now().toString();
        const newItem = { id, name, icon: FileText, type: 'file', content: '' };
        setDesktopItems((prev) => [...prev, newItem]);
    };

    // Handlers for creating items inside folders
    const handleCreateFile = (folderName, file) => {
        setFolderData((prev) => {
            const folder = prev[folderName] || { files: [], folders: [] };
            return { ...prev, [folderName]: { ...folder, files: [...folder.files, file] } };
        });
    };

    const handleCreateFolder = (folderName, newFolder) => {
        setFolderData((prev) => {
            const folder = prev[folderName] || { files: [], folders: [] };
            return { ...prev, [folderName]: { ...folder, folders: [...folder.folders, newFolder] } };
        });
    };

    // Handler for opening items from within folders
    const handleOpenItem = (folderName, item) => {
        if (item.type === 'folder') {
            // Open nested folder
            const nestedFolderName = `${folderName}/${item.name}`;
            // Initialize nested folder data if it doesn't exist
            if (!folderData[nestedFolderName]) {
                setFolderData((prev) => ({ ...prev, [nestedFolderName]: { files: [], folders: [] } }));
            }
            openWindow('finder', nestedFolderName);
        } else if (item.type === 'file') {
            // Open file in viewer
            const windowId = `file-${item.id}`;
            const existingWindow = windows.find((w) => w.id === windowId);
            if (existingWindow) {
                if (existingWindow.minimized) {
                    setWindows(windows.map((w) => (w.id === windowId ? { ...w, minimized: false } : w)));
                }
                setActiveWindowId(windowId);
                focusWindow(windowId);
                return;
            }
            const content = () => <DocumentViewerApp fileName={item.name} fileContent={item.content} />;
            const newWindow = {
                id: windowId,
                title: item.name,
                content,
                zIndex: windows.length + 1,
                minimized: false,
            };
            setWindows([...windows, newWindow]);
            setActiveWindowId(windowId);
        }
    };

    const closeWindow = (id) => {
        setWindows(windows.filter((w) => w.id !== id));
    };

    const minimizeWindow = (id) => {
        setWindows(windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
        setActiveWindowId(null);
    };

    const focusWindow = (id) => {
        setActiveWindowId(id);
        setWindows((prev) => {
            const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
            return prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w));
        });
    };

    const handleDeleteItem = (id) => {
        setDesktopItems(prev => prev.filter(item => item.id !== id));
        setContextMenu(null);
    };

    const handleContextMenu = (e, item = null) => {
        e.preventDefault();
        e.stopPropagation();

        // Only allow deletion for user-created items (in desktopItems), not pre-existing icons (in desktopIcons)
        const isUserCreated = item && desktopItems.some(i => i.id === item.id);

        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            itemId: item ? item.id : null,
            onDelete: isUserCreated ? () => handleDeleteItem(item.id) : null
        });
    };

    // Handle refresh with icon blink animation
    const handleRefresh = () => {
        setIsRefreshing(true);
        setContextMenu(null);

        // Reset after animation completes
        setTimeout(() => {
            setIsRefreshing(false);
        }, 300);
    };


    return (
        <div className="w-full h-screen overflow-hidden relative select-none font-sans bg-black">
            <CustomCursor />

            {/* Boot Screen */}
            <div className={`boot-screen absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black z-[9999] flex flex-col items-center justify-center ${!bootSequence ? 'hidden' : ''}`}>
                {/* Logo */}
                <img
                    src="/logo.png"
                    alt="logo"
                    className="boot-logo w-48 h-48 mb-20 drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]"
                />

                {/* Loading Text */}
                <div className="text-white text-3xl font-light mb-10 tracking-widest">
                    Loading...
                </div>

                {/* Progress Bar Container */}
                <div className="w-96 h-3 bg-gray-800 rounded-full overflow-hidden relative shadow-lg">
                    {/* Progress Bar */}
                    <div className="boot-bar h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-full relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                </div>

                {/* Copyright Text */}
                <div className="absolute bottom-8 text-gray-500 text-sm">
                    © 2025 Ashwath's Portfolio
                </div>
            </div>

            {/* Desktop Content */}
            <div
                ref={desktopRef}
                className="desktop-content w-full h-full relative bg-cover bg-center"
                style={{ backgroundImage: "url('/wall.png')" }}
                onContextMenu={handleContextMenu}
            >
                {/* Hero Text */}
                < div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0" >
                    <div className="mb-4 pointer-events-none">
                        <h2 className="text-3xl font-light mb-3 tracking-wide text-white/80">
                            Hey, I'm{' '}
                            <span className="font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                                Ashwath
                            </span>
                            !
                        </h2>
                        <p className="text-xl text-white/70 font-light tracking-wider">welcome to my</p>
                    </div>
                    <h1 className="text-9xl font-black tracking-tighter bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer pointer-events-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(147,51,234,0.6)] active:scale-95">
                        portfolio.
                    </h1>
                    <div className="mt-6 flex items-center justify-center gap-4 pointer-events-none">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                        <p className="text-sm text-white/60 font-medium tracking-widest uppercase">Full Stack Developer</p>
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    </div>
                </div >

                <TopBar
                    onOpenWindow={openWindow}
                    desktopItems={[...desktopIcons, ...desktopItems]}
                    windows={windows}
                    apps={apps}
                />

                {/* Desktop Icons - Draggable */}
                {
                    // Render static desktop icons first, then user-created items
                    [...desktopIcons, ...desktopItems].map((icon, index) => {
                        const ITEM_HEIGHT = 130;
                        const START_Y = 50;
                        const itemsPerColumn = Math.max(1, Math.floor((window.innerHeight - START_Y - 50) / ITEM_HEIGHT));
                        const colIndex = Math.floor(index / itemsPerColumn);
                        const rowIndex = index % itemsPerColumn;

                        return (
                            <Rnd
                                key={icon.id}
                                default={{
                                    x: window.innerWidth - 120 - (colIndex * 120),
                                    y: START_Y + (rowIndex * ITEM_HEIGHT),
                                    width: 100,
                                    height: 100,
                                }}
                                enableResizing={false}
                                bounds="parent"
                                className="z-0"
                            >
                                <div
                                    className={`flex flex-col items-center gap-1 group cursor-move w-24 transition-opacity duration-150 ${isRefreshing ? 'opacity-0' : 'opacity-100'}`}
                                    onContextMenu={(e) => handleContextMenu(e, icon)}
                                    onDoubleClick={() => {
                                        if (icon.type === 'folder') {
                                            openWindow('finder', icon.name || icon.title);
                                        } else if (icon.type === 'app') {
                                            openWindow(icon.id);
                                        } else if (icon.type === 'file') {
                                            // Open file in TextEditorApp for editing
                                            const windowId = `file-${icon.id}`;
                                            const existingWindow = windows.find((w) => w.id === windowId);
                                            if (existingWindow) {
                                                if (existingWindow.minimized) {
                                                    setWindows(windows.map((w) => (w.id === windowId ? { ...w, minimized: false } : w)));
                                                }
                                                setActiveWindowId(windowId);
                                                focusWindow(windowId);
                                                return;
                                            }
                                            const content = () => <TextEditorApp fileName={icon.name} initialContent={icon.content || ''} onSave={(content) => {
                                                setDesktopItems(prev => prev.map(item => item.id === icon.id ? { ...item, content } : item));
                                            }} />;
                                            const newWindow = { id: windowId, title: icon.name, content, zIndex: windows.length + 1, minimized: false };
                                            setWindows([...windows, newWindow]);
                                            setActiveWindowId(windowId);
                                        }
                                    }}
                                >
                                    <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-blue-300/30 shadow-lg transition-all group-hover:bg-blue-400/30 group-hover:border-blue-300/50">
                                        {typeof icon.icon === 'string' ? (
                                            <img
                                                src={icon.icon}
                                                alt={icon.title || icon.name}
                                                className="w-10 h-10 object-contain pointer-events-none"
                                                draggable={false}
                                                onDragStart={(e) => e.preventDefault()}
                                            />
                                        ) : (
                                            <icon.icon size={40} className="text-blue-200 fill-blue-400/30" strokeWidth={1.5} />
                                        )}
                                    </div>
                                    <span className="text-white text-xs font-medium text-center drop-shadow-md px-1 rounded bg-black/0 group-hover:bg-blue-600/80 transition-colors leading-tight whitespace-pre-line">
                                        {icon.title || icon.name}
                                    </span>
                                </div>
                            </Rnd>
                        );
                    })
                }

                <div className="relative z-10 w-full h-full pointer-events-none">
                    {windows.map((window) =>
                        !window.minimized && (
                            <div key={window.id} className="pointer-events-auto">
                                <Window
                                    id={window.id}
                                    title={window.title}
                                    content={window.content}
                                    onClose={closeWindow}
                                    onMinimize={minimizeWindow}
                                    isFocused={activeWindowId === window.id}
                                    onFocus={() => focusWindow(window.id)}
                                    initialPosition={{ x: 100 + windows.indexOf(window) * 30, y: 100 + windows.indexOf(window) * 30 }}
                                />
                            </div>
                        )
                    )}
                </div>

                <Dock apps={apps} openApps={windows.map((w) => w.id.split('-')[0])} onOpenApp={openWindow} />

                {/* Context Menu */}
                {
                    contextMenu && (
                        <ContextMenu
                            x={contextMenu.x}
                            y={contextMenu.y}
                            onClose={() => setContextMenu(null)}
                            onNewFolder={createNewFolder}
                            onNewFile={createNewFile}
                            onDelete={contextMenu.onDelete}
                            onRefresh={handleRefresh}
                        />
                    )
                }
            </div >
        </div >
    );
};

export default Desktop;

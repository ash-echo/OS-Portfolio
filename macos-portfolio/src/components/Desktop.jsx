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
        { id: 'safari', title: 'Safari', icon: '/safari-icon.png', color: 'bg-transparent', content: SafariApp },
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

    const openWindow = (appId, folderName = null) => {
        const app = apps.find((a) => a.id === appId);
        if (!app) return;

        // Folder windows
        if (appId === 'finder' && folderName) {
            const content = () => (
                <FolderApp
                    folderName={folderName}
                    folderContent={folderData[folderName]}
                    onCreateFile={handleCreateFile}
                    onCreateFolder={handleCreateFolder}
                    onOpenItem={handleOpenItem}
                />
            );
            const windowId = `${appId}-${folderName}`;
            const existingWindow = windows.find((w) => w.id === windowId);
            if (existingWindow) {
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
        const newWindow = {
            id: windowId,
            title: app.title,
            content: app.content,
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

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="w-full h-screen overflow-hidden relative select-none font-sans bg-black">
            <CustomCursor />

            {/* Boot Screen */}
            <div className={`boot-screen absolute inset-0 bg-black z-[9999] flex flex-col items-center justify-center ${!bootSequence ? 'hidden' : ''}`}>
                <div className="boot-progress mb-4">
                    <div className="boot-bar"></div>
                </div>
                <img src="/logo.png" alt="logo" className="boot-logo w-24 h-24" />
            </div>

            {/* Desktop Content */}
            <div
                ref={desktopRef}
                className="desktop-content w-full h-full relative bg-cover bg-center"
                style={{ backgroundImage: "url('/wall.png')" }}
                onContextMenu={handleContextMenu}
            >
                {/* Hero Text */}
                <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0">
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
                </div>

                <TopBar />

                {/* Desktop Icons - Draggable */}
                {[...desktopIcons, ...desktopItems].map((icon, index) => (
                    <Rnd
                        key={icon.id}
                        default={{
                            x: window.innerWidth - 120,
                            y: 50 + index * 150, // Increased vertical spacing to prevent overlap
                            width: 100,
                            height: 100,
                        }}
                        enableResizing={false}
                        bounds="parent"
                        className="z-0"
                    >
                        <div
                            className="flex flex-col items-center gap-1 group cursor-move w-24"
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
                                    <img src={icon.icon} alt={icon.title || icon.name} className="w-10 h-10 object-contain" />
                                ) : (
                                    <icon.icon size={40} className="text-blue-200 fill-blue-400/30" strokeWidth={1.5} />
                                )}
                            </div>
                            <span className="text-white text-xs font-medium text-center drop-shadow-md px-1 rounded bg-black/0 group-hover:bg-blue-600/80 transition-colors leading-tight whitespace-pre-line">
                                {icon.title || icon.name}
                            </span>
                        </div>
                    </Rnd>
                ))}

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
                {contextMenu && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={() => setContextMenu(null)}
                        onNewFolder={createNewFolder}
                        onNewFile={createNewFile}
                    />
                )}
            </div>
        </div>
    );
};

export default Desktop;

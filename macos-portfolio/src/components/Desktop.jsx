import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import TopBar from './TopBar';
import Dock from './Dock';
import Window from './Window';
import CustomCursor from './CustomCursor';
import ContextMenu from './ContextMenu';
import NameDialog from './NameDialog';
import { Smile, Compass, Image as ImageIcon, User, Terminal, Trash2, Folder, FileText, Briefcase } from 'lucide-react';
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
import ResumeApp from '../apps/ResumeApp';
import WorkApp from '../apps/WorkApp';
import OSPortfolioApp from '../apps/OSPortfolioApp';
import EvalGeniusApp from '../apps/EvalGeniusApp';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } from 'docx';
import { saveAs } from 'file-saver';

const Desktop = () => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [bootSequence, setBootSequence] = useState(true);
    const [contextMenu, setContextMenu] = useState(null);
    const desktopRef = useRef(null);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const getIconComponent = (icon) => {
        if (typeof icon === 'string') {
            if (icon.startsWith('/')) return icon; // image path
            if (icon === 'folder') return Folder;
            if (icon === 'file') return FileText;
            return icon; // fallback
        }
        return icon; // component
    };

    // Dynamic desktop items (created by user)
    const [desktopItems, setDesktopItems] = useState(() => {
        try {
            const saved = localStorage.getItem('desktopItems_v5');
            return saved ? JSON.parse(saved).map(item => ({
                ...item,
                icon: (typeof item.icon === 'string' ? item.icon : null) || (item.type === 'folder' ? 'folder' : 'file')
            })) : [];
        } catch (error) {
            console.error('Error loading desktop items from localStorage:', error);
            return [];
        }
    });

    // Store custom icon positions
    const [iconPositions, setIconPositions] = useState(() => {
        try {
            const saved = localStorage.getItem('iconPositions_v5');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Error loading icon positions from localStorage:', error);
            return {};
        }
    });

    // Long press state for mobile
    const [longPressTimer, setLongPressTimer] = useState(null);
    const [longPressTarget, setLongPressTarget] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Name dialog state
    const [nameDialog, setNameDialog] = useState({
        isOpen: false,
        type: null, // 'folder' or 'file'
        title: '',
        placeholder: ''
    });

    const initialFolderData = {
        'Tutorial': {
            files: [
                {
                    id: 'tutorial-readme',
                    name: 'README.md',
                    content: '# Welcome to MacOS Portfolio\n\nThis interactive portfolio mimics the MacOS desktop environment, running entirely in your browser.\n\n## Features & Capabilities\n\n*   **Desktop Environment**: A full desktop experience with a top bar, dock, and wallpaper.\n*   **Window Management**: Open, close, minimize, maximize, and drag windows just like a real OS.\n*   **File System**: Create folders, text files, and organize your content.\n*   **Apps**:\n    *   **Finder**: Browse your files and projects.\n    *   **Terminal**: Use commands like `ls`, `cd`, `cat`, and `help`.\n    *   **Safari**: Browse the web (simulated).\n    *   **Trash**: Delete and restore files.\n    *   **Text Editor**: Write and save notes.\n    *   **Games**: Play Pokemon Fire Red and Sonic 2.\n\n## How to Use\n\n1.  **Navigation**: Click icons on the desktop or dock to open apps.\n2.  **Window Control**: Drag windows by their title bar. Use the traffic light buttons (top left) to close, minimize, or maximize.\n3.  **Context Menu**: Right-click on the desktop to create new folders or files.\n4.  **Terminal**: Open the Terminal app and type `help` to see available commands.\n5.  **Resume**: Click the PDF icon on the desktop to download my resume.\n\nEnjoy exploring!',
                    type: 'file'
                }
            ],
            folders: []
        }
    };

    // Folder content (nested files and folders)
    const [folderData, setFolderData] = useState(() => {
        try {
            const saved = localStorage.getItem('folderData_v5');
            return saved ? JSON.parse(saved) : initialFolderData;
        } catch (error) {
            console.error('Error loading folder data from localStorage:', error);
            return initialFolderData;
        }
    });

    const apps = [
        { id: 'finder', title: 'Finder', icon: '/1.png', color: 'bg-transparent', content: 'finder' }, // Special handling in openWindow
        { id: 'safari', title: 'Browser', icon: '/safari-icon.png', color: 'bg-transparent', content: (props) => <SafariApp {...props} /> },
        { id: 'photos', title: 'Photos', icon: '/3.png', color: 'bg-white text-pink-500', content: PhotosApp },
        { id: 'contacts', title: 'About Me', icon: '/4.png', color: 'bg-gray-500', content: AboutMeApp },
        { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'bg-gray-900', content: (props) => <TerminalApp {...props} onOpenApp={openWindow} onResetSession={resetSession} /> },
        { id: 'trash', title: 'Trash', icon: '/5.png', color: 'bg-gray-200 text-gray-600', content: TrashApp },
        { id: 'pokemon', title: 'Pokemon Fire Red', icon: '/poke.png', color: 'bg-red-600', content: PokemonApp },
        { id: 'sonic2', title: 'Sonic 2', icon: '/sonic.png', color: 'bg-blue-600', content: Sonic2App },
    ];

    // Apps that can be opened but not shown in dock
    const hiddenApps = [
        { id: 'resume', title: 'Resume', icon: FileText, color: 'bg-blue-500', content: ResumeApp },
        { id: 'work', title: 'Projects', icon: Briefcase, color: 'bg-purple-600', content: WorkApp },
        { id: 'os-portfolio', title: 'OS Portfolio', icon: '/portfolio.png', color: 'bg-gray-900', content: OSPortfolioApp },
        { id: 'eval-genius', title: 'EvalGenius', icon: '/eval.png', color: 'bg-indigo-600', content: EvalGeniusApp },
    ];

    const resetSession = () => {
        setDesktopItems([]);
        setFolderData(initialFolderData);
        setIconPositions({});
        localStorage.removeItem('desktopItems_v5');
        localStorage.removeItem('folderData_v5');
        localStorage.removeItem('iconPositions_v5');
    };

    const desktopIcons = [
        { id: 'resume-file', title: 'Ashwath_Resume.pdf', icon: 'file', type: 'resume-file' },
        { id: 'nike', title: 'EvalGenius - AI Evaluator', icon: 'folder', type: 'app' },
        { id: 'os-portfolio', title: 'OS Inspired Portfolio', icon: 'folder', type: 'app' },
        { id: 'tutorial', title: 'Tutorial', icon: 'folder', type: 'folder' },
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

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            setWindowSize({
                width: newWidth,
                height: newHeight
            });
            setIsMobile(newWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Save desktopItems to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('desktopItems_v5', JSON.stringify(desktopItems));
        } catch (error) {
            console.error('Error saving desktop items to localStorage:', error);
        }
    }, [desktopItems]);

    // Save folderData to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('folderData_v5', JSON.stringify(folderData));
        } catch (error) {
            console.error('Error saving folder data to localStorage:', error);
        }
    }, [folderData]);

    // Save iconPositions to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('iconPositions_v5', JSON.stringify(iconPositions));
        } catch (error) {
            console.error('Error saving icon positions to localStorage:', error);
        }
    }, [iconPositions]);

    // Memoize the ProjectsApp content to avoid recreating it on every render
    const createFinderContent = (folderName) => {
        const allFolders = [...desktopIcons.filter(i => i.type === 'folder'), ...desktopItems.filter(i => i.type === 'folder')];

        return (
            <ProjectsApp
                key={folderName || 'finder'}
                allFolders={allFolders}
                folderData={folderData}
                initialPath={folderName}
                onCreateFolder={(path, name) => {
                    const id = Date.now().toString();
                    const newFolder = { id, name, type: 'folder' };
                    if (!folderName && !path) {
                        const newItem = { id, name, icon: 'folder', type: 'folder' };
                        setDesktopItems((prev) => [...prev, newItem]);
                        setFolderData((prev) => ({ ...prev, [name]: { files: [], folders: [] } }));
                    } else {
                        const targetPath = path || folderName;
                        setFolderData((prev) => {
                            const folder = prev[targetPath] || { files: [], folders: [] };
                            return { ...prev, [targetPath]: { ...folder, folders: [...folder.folders, newFolder] } };
                        });
                    }
                }}
                onCreateFile={(path, name) => {
                    const id = Date.now().toString();
                    const newFile = { id, name, content: '', type: 'file' };
                    if (!folderName && !path) {
                        const newItem = { id, name, icon: 'file', type: 'file', content: '' };
                        setDesktopItems((prev) => [...prev, newItem]);
                    } else {
                        const targetPath = path || folderName;
                        setFolderData((prev) => {
                            const folder = prev[targetPath] || { files: [], folders: [] };
                            return { ...prev, [targetPath]: { ...folder, files: [...folder.files, newFile] } };
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

    const allApps = [...apps, ...hiddenApps];

    const openWindow = (appId, folderNameOrTerminalFlag = null, openedFromTerminal = false) => {
        // Handle the case where second parameter is a boolean (from terminal)
        const folderName = typeof folderNameOrTerminalFlag === 'string' ? folderNameOrTerminalFlag : null;
        openedFromTerminal = typeof folderNameOrTerminalFlag === 'boolean' ? folderNameOrTerminalFlag : openedFromTerminal;

        const app = allApps.find((a) => a.id === appId);
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
                    onCreateFolder={(path, name) => {
                        handleCreateFolder(path || folderName, { id: Date.now().toString(), name, type: 'folder' });
                    }}
                    onCreateFile={(path, name) => {
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
        // If opened from terminal, create a new window with timestamp to make it unique
        const windowId = openedFromTerminal ? `${appId}-${Date.now()}` : appId;

        // Only check for existing window if NOT opened from terminal
        if (!openedFromTerminal) {
            const existingWindow = windows.find((w) => w.id === appId);
            if (existingWindow) {
                if (existingWindow.minimized) {
                    setWindows(windows.map((w) => (w.id === appId ? { ...w, minimized: false } : w)));
                }
                setActiveWindowId(appId);
                focusWindow(appId);
                return;
            }
        }

        // Prepare content based on app type
        let finalContent;

        if (appId === 'finder' || app.content === 'finder') {
            // For Finder, always wrap with props
            const allFolders = [...desktopIcons.filter(i => i.type === 'folder'), ...desktopItems.filter(i => i.type === 'folder')];
            finalContent = (
                <ProjectsApp
                    key={`finder-${windowId}`}
                    allFolders={allFolders}
                    folderData={folderData}
                    onCreateFolder={(path, name) => {
                        const targetFolder = path || 'desktop';
                        if (targetFolder === 'desktop') {
                            // Create on desktop
                            const id = Date.now().toString();
                            const newItem = { id, name, icon: 'folder', type: 'folder' };
                            setDesktopItems((prev) => [...prev, newItem]);
                            setFolderData((prev) => ({ ...prev, [name]: { files: [], folders: [] } }));
                        } else {
                            // Create in specific folder
                            handleCreateFolder(path, { id: Date.now().toString(), name, type: 'folder' });
                        }
                    }}
                    onCreateFile={(path, name) => {
                        const targetFolder = path || 'desktop';
                        if (targetFolder === 'desktop') {
                            // Create on desktop
                            const id = Date.now().toString();
                            const newItem = { id, name, icon: 'file', type: 'file', content: '' };
                            setDesktopItems((prev) => [...prev, newItem]);
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
                        const fileWindowId = `file-${file.id}`;
                        const existingFileWindow = windows.find((w) => w.id === fileWindowId);
                        if (existingFileWindow) {
                            if (existingFileWindow.minimized) {
                                setWindows(windows.map((w) => (w.id === fileWindowId ? { ...w, minimized: false } : w)));
                            }
                            setActiveWindowId(fileWindowId);
                            focusWindow(fileWindowId);
                            return;
                        }
                        const fileContent = () => <DocumentViewerApp fileName={file.name} fileContent={file.content} />;
                        const newFileWindow = {
                            id: fileWindowId,
                            title: file.name,
                            content: fileContent,
                            zIndex: windows.length + 1,
                            minimized: false,
                        };
                        setWindows([...windows, newFileWindow]);
                        setActiveWindowId(fileWindowId);
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
        } else if (appId === 'safari' && openedFromTerminal && typeof app.content === 'function') {
            // Pass openedFromTerminal flag to Safari if opened from terminal
            finalContent = app.content({ openedFromTerminal: true });
        } else {
            // For other apps, use content as-is
            finalContent = typeof app.content === 'function' ? app.content() : app.content;
        }

        const newWindow = {
            id: windowId,
            title: app.title,
            content: finalContent,
            zIndex: windows.length + 1,
            minimized: false,
        };
        setWindows([...windows, newWindow]);

        // If opened from terminal, keep terminal active. Otherwise focus the new window
        if (!openedFromTerminal) {
            setActiveWindowId(windowId);
        }
    };

    // Desktop context menu handlers
    const createNewFolder = () => {
        setNameDialog({
            isOpen: true,
            type: 'folder',
            title: 'Create New Folder',
            placeholder: 'Enter folder name'
        });
        setContextMenu(null);
    };

    const createNewFile = () => {
        setNameDialog({
            isOpen: true,
            type: 'file',
            title: 'Create New File',
            placeholder: 'Enter file name'
        });
        setContextMenu(null);
    };

    // Handle dialog confirm
    const handleNameDialogConfirm = (name) => {
        if (nameDialog.type === 'folder') {
            const id = Date.now().toString();
            const newItem = { id, name, icon: 'folder', type: 'folder' };
            setDesktopItems((prev) => [...prev, newItem]);
            // Initialize empty folder in folderData
            setFolderData((prev) => ({ ...prev, [name]: { files: [], folders: [] } }));
        } else if (nameDialog.type === 'file') {
            const id = Date.now().toString();
            const newItem = { id, name, icon: 'file', type: 'file', content: '' };
            setDesktopItems((prev) => [...prev, newItem]);
        }
        setNameDialog({ isOpen: false, type: null, title: '', placeholder: '' });
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



    const handleDownloadResumePDF = () => {
        try {
            setContextMenu(null);
            const link = document.createElement('a');
            link.href = 'Ashwath_P Resume.pdf';
            link.download = 'Ashwath_P Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('PDF download error:', error);
            alert('Failed to download PDF. Please try again.');
        }
    };

    const handleDownloadResume = async () => {
        // Create a Word document with proper formatting
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    // Name
                    new Paragraph({
                        text: "ASHWATH",
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        text: "Full Stack Developer",
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    }),

                    // Contact Information
                    new Paragraph({
                        text: "CONTACT INFORMATION",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Email: ", bold: true }),
                            new TextRun("ashwath@example.com")
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Phone: ", bold: true }),
                            new TextRun("+1 (555) 123-4567")
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Location: ", bold: true }),
                            new TextRun("San Francisco, CA")
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "GitHub: ", bold: true }),
                            new TextRun("github.com/ash-echo")
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "LinkedIn: ", bold: true }),
                            new TextRun("linkedin.com/in/ashwath")
                        ],
                        spacing: { after: 200 }
                    }),

                    // Professional Summary
                    new Paragraph({
                        text: "PROFESSIONAL SUMMARY",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        text: "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and modern web technologies. Strong problem-solving skills and commitment to writing clean, maintainable code. Proven track record of delivering high-quality projects on time and collaborating effectively with cross-functional teams.",
                        spacing: { after: 200 }
                    }),

                    // Technical Skills
                    new Paragraph({
                        text: "TECHNICAL SKILLS",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Frontend: ", bold: true }),
                            new TextRun("React, Next.js, JavaScript, TypeScript, Tailwind CSS, HTML5, CSS3")
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Backend: ", bold: true }),
                            new TextRun("Node.js, Express, Python, MongoDB, PostgreSQL, REST APIs, GraphQL")
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Tools & DevOps: ", bold: true }),
                            new TextRun("Git, Docker, AWS, Vercel, CI/CD, Jest, Webpack")
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Other: ", bold: true }),
                            new TextRun("Agile, Scrum, UI/UX Design, Mobile Development, Responsive Design")
                        ],
                        spacing: { after: 200 }
                    }),

                    // Work Experience
                    new Paragraph({
                        text: "WORK EXPERIENCE",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Senior Full Stack Developer", bold: true })
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Tech Company Inc.", italic: true }),
                            new TextRun(" | 2022 - Present")
                        ],
                        spacing: { after: 100 }
                    }),
                    new Paragraph({ text: "• Led development of a React-based e-commerce platform serving 100K+ users", spacing: { after: 50 } }),
                    new Paragraph({ text: "• Architected and implemented RESTful APIs using Node.js and Express", spacing: { after: 50 } }),
                    new Paragraph({ text: "• Reduced page load times by 40% through code optimization and lazy loading", spacing: { after: 50 } }),
                    new Paragraph({ text: "• Mentored 3 junior developers and conducted code reviews", spacing: { after: 150 } }),

                    new Paragraph({
                        children: [
                            new TextRun({ text: "Full Stack Developer", bold: true })
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Startup Solutions", italic: true }),
                            new TextRun(" | 2020 - 2022")
                        ],
                        spacing: { after: 100 }
                    }),
                    new Paragraph({ text: "• Built and deployed 10+ client projects using React, Node.js, and MongoDB", spacing: { after: 50 } }),
                    new Paragraph({ text: "• Implemented responsive designs with Tailwind CSS and mobile-first approach", spacing: { after: 50 } }),
                    new Paragraph({ text: "• Integrated third-party APIs including Stripe, Google Maps, and Auth0", spacing: { after: 50 } }),
                    new Paragraph({ text: "• Collaborated with designers and product managers in Agile environment", spacing: { after: 150 } }),

                    new Paragraph({
                        children: [
                            new TextRun({ text: "Junior Web Developer", bold: true })
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Digital Agency", italic: true }),
                            new TextRun(" | 2019 - 2020")
                        ],
                        spacing: { after: 100 }
                    }),
                    new Paragraph({ text: "• Developed responsive websites using HTML, CSS, JavaScript, and React", spacing: { after: 50 } }),
                    new Paragraph({ text: "• Worked on bug fixes and feature enhancements for existing applications", spacing: { after: 50 } }),
                    new Paragraph({ text: "• Participated in daily stand-ups and sprint planning meetings", spacing: { after: 200 } }),

                    // Education
                    new Paragraph({
                        text: "EDUCATION",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Bachelor of Science in Computer Science", bold: true })
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "University of Technology", italic: true }),
                            new TextRun(" | 2015 - 2019")
                        ],
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "GPA: 3.8/4.0 | Dean's List | Computer Science Club President",
                        spacing: { after: 200 }
                    }),

                    // Certifications
                    new Paragraph({
                        text: "CERTIFICATIONS",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({ text: "• AWS Certified Developer - Associate", spacing: { after: 50 } }),
                    new Paragraph({ text: "• MongoDB Certified Developer", spacing: { after: 50 } }),
                    new Paragraph({ text: "• React Advanced Certification", spacing: { after: 50 } })
                ]
            }]
        });

        // Generate and download the document
        const blob = await Packer.toBlob(doc);
        saveAs(blob, "Ashwath_Resume.docx");
        setContextMenu(null);
    };

    const handleTouchStart = (e, item = null) => {
        if (!isMobile) return;

        setLongPressTarget(item);
        const timer = setTimeout(() => {
            handleContextMenu(e, item);
            setLongPressTimer(null);
        }, 500); // 500ms long press

        setLongPressTimer(timer);
    };

    const handleTouchEnd = (e, item = null) => {
        if (!isMobile) return;

        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);

            // If it was a short tap and we have an item, handle the click
            if (item && !longPressTarget) {
                if (item.type === 'folder') {
                    openWindow('finder', item.name || item.title);
                } else if (item.type === 'app') {
                    openWindow(item.id);
                } else if (item.type === 'resume-file') {
                    openWindow('resume');
                } else if (item.type === 'file') {
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
                    const content = () => <TextEditorApp fileName={item.name} initialContent={item.content || ''} onSave={(content) => {
                        setDesktopItems(prev => prev.map(i => i.id === item.id ? { ...i, content } : i));
                    }} />;
                    const newWindow = { id: windowId, title: item.name, content, zIndex: windows.length + 1, minimized: false };
                    setWindows([...windows, newWindow]);
                    setActiveWindowId(windowId);
                }
            }
        }
        setLongPressTarget(null);
    };

    const handleTouchMove = (e) => {
        if (!isMobile) return;

        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
        }
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

    const handleDeleteItem = (id) => {
        const item = desktopItems.find(i => i.id === id);
        if (item && item.type === 'folder') {
            setFolderData(prev => {
                const newData = { ...prev };
                delete newData[item.name];
                return newData;
            });
        }
        setDesktopItems(prev => prev.filter(item => item.id !== id));
        setContextMenu(null);
    };

    const handleContextMenu = (e, item = null) => {
        e.preventDefault(); // Prevent browser's default context menu
        e.stopPropagation(); // Prevent event from bubbling to parent elements
        const rect = desktopRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        console.log('Right clicked item:', item);
        console.log('Desktop items:', desktopItems);

        // Check if the item exists in desktopItems (user-created)
        // We check by ID to be safe
        const isUserCreated = item && desktopItems.some(i => i.id === item.id);
        console.log('Is user created:', isUserCreated);

        // Also allow deleting if it's explicitly a folder or file type that isn't a system app
        // This acts as a fallback if the ID check fails for some reason but it's clearly a user type
        const isDeletable = isUserCreated || (item && (item.type === 'folder' || item.type === 'file') && !['nike', 'ai', 'food'].includes(item.id));
        console.log('Is deletable:', isDeletable);

        const menuState = {
            x: e.clientX,
            y: e.clientY,
            onDelete: isDeletable ? () => handleDeleteItem(item.id) : null,
            onDownload: item && item.type === 'resume-file' ? handleDownloadResumePDF : null
        };
        console.log('Setting context menu:', menuState);
        setContextMenu(menuState);
    };

    return (
        <div className="w-full h-screen overflow-hidden relative select-none font-sans bg-black">
            {!isMobile && <CustomCursor />}

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
                onTouchStart={(e) => handleTouchStart(e)}
                onTouchEnd={(e) => handleTouchEnd(e)}
                onTouchMove={handleTouchMove}
            >
                {/* Hero Text */}
                <div className={`absolute ${isMobile ? 'top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0 px-4' : 'top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0'}`}>
                    <div className="mb-4 pointer-events-none">
                        <h2 className={`${isMobile ? 'text-lg' : 'text-3xl'} font-light mb-3 tracking-wide text-white/80`}>
                            Hey, I'm{' '}
                            <span className="font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                                Ashwath
                            </span>
                            !
                        </h2>
                        <p className={`${isMobile ? 'text-sm' : 'text-xl'} text-white/70 font-light tracking-wider`}>welcome to my</p>
                    </div>
                    <h1 className={`${isMobile ? 'text-3xl sm:text-4xl' : 'text-7xl lg:text-9xl'} font-black tracking-tighter bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer pointer-events-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(147,51,234,0.6)] active:scale-95`}>
                        portfolio.
                    </h1>
                    <div className="mt-6 flex items-center justify-center gap-4 pointer-events-none">
                        <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60 font-medium tracking-widest uppercase`}>Full Stack Developer</p>
                        <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    </div>
                </div>

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
                        const START_Y = isMobile ? 280 : 50; // Move icons further down on mobile to avoid hero text
                        const itemsPerColumn = Math.max(1, Math.floor((windowSize.height - START_Y - 50) / ITEM_HEIGHT));
                        const colIndex = Math.floor(index / itemsPerColumn);
                        const rowIndex = index % itemsPerColumn;

                        // Use custom position if manually dragged, otherwise use calculated position
                        const defaultX = windowSize.width - 120 - (colIndex * 120);
                        const defaultY = START_Y + (rowIndex * ITEM_HEIGHT) + (index === 1 ? -12 : 0);
                        const position = iconPositions[icon.id] || { x: defaultX, y: defaultY };

                        return (
                            <Rnd
                                key={icon.id}
                                position={position}
                                onDragStop={(e, d) => {
                                    setIconPositions(prev => ({
                                        ...prev,
                                        [icon.id]: { x: d.x, y: d.y }
                                    }));
                                }}
                                enableResizing={false}
                                bounds="parent"
                                className="z-0"
                                disableDragging={isMobile} // Disable dragging on mobile
                            >
                                <div
                                    className={`flex flex-col items-center gap-1 group ${isMobile ? 'cursor-pointer' : 'cursor-move'} w-24 transition-opacity duration-150 ${isRefreshing ? 'opacity-0' : 'opacity-100'}`}
                                    onContextMenu={(e) => handleContextMenu(e, icon)}
                                    onTouchStart={(e) => handleTouchStart(e, icon)}
                                    onTouchEnd={(e) => handleTouchEnd(e, icon)}
                                    onTouchMove={handleTouchMove}
                                    onDoubleClick={() => {
                                        if (icon.type === 'folder') {
                                            openWindow('finder', icon.name || icon.title);
                                        } else if (icon.type === 'app') {
                                            if (icon.id === 'nike') {
                                                openWindow('eval-genius');
                                            } else if (icon.id === 'os-portfolio') {
                                                openWindow('os-portfolio');
                                            } else {
                                                openWindow(icon.id);
                                            }
                                        } else if (icon.type === 'resume-file') {
                                            // Open resume app
                                            openWindow('resume');
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
                                        {(() => {
                                            const IconComponent = getIconComponent(icon.icon);
                                            return typeof IconComponent === 'string' ? (
                                                <img
                                                    src={IconComponent}
                                                    alt={icon.title || icon.name}
                                                    className="w-10 h-10 object-contain pointer-events-none"
                                                    draggable={false}
                                                    onDragStart={(e) => e.preventDefault()}
                                                />
                                            ) : (
                                                <IconComponent size={40} className="text-blue-200 fill-blue-400/30" strokeWidth={1.5} />
                                            );
                                        })()}
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
                                    isMobile={isMobile}
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
                            onDownload={contextMenu.onDownload}
                        />
                    )
                }

                {/* Name Dialog */}
                <NameDialog
                    isOpen={nameDialog.isOpen}
                    onClose={() => setNameDialog({ isOpen: false, type: null, title: '', placeholder: '' })}
                    onConfirm={handleNameDialogConfirm}
                    title={nameDialog.title}
                    placeholder={nameDialog.placeholder}
                />
            </div >
        </div >
    );
};

export default Desktop;

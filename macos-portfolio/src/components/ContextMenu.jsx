import React, { useEffect } from 'react';
import { RefreshCw, FolderPlus, FileText, Image, SortAsc, Grid3x3, List } from 'lucide-react';

const ContextMenu = ({ x, y, onClose, onNewFolder, onNewFile }) => {
    useEffect(() => {
        const handleClick = () => onClose();
        const handleScroll = () => onClose();

        document.addEventListener('click', handleClick);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [onClose]);

    const menuItems = [
        { icon: FolderPlus, label: 'New Folder', action: onNewFolder },
        { icon: FileText, label: 'New File', action: onNewFile },
        { divider: true },
        { icon: SortAsc, label: 'Sort By', submenu: true },
        { icon: Grid3x3, label: 'View', submenu: true },
        { divider: true },
        { icon: RefreshCw, label: 'Refresh', action: () => window.location.reload() },
    ];

    return (
        <div
            className="fixed bg-white/90 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200/50 py-1 min-w-[200px] z-[100000]"
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={(e) => e.stopPropagation()}
        >
            {menuItems.map((item, index) => {
                if (item.divider) {
                    return <div key={index} className="h-px bg-gray-200 my-1" />;
                }

                return (
                    <button
                        key={index}
                        onClick={item.action}
                        className="w-full px-3 py-2 flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-colors text-left text-sm group"
                    >
                        {item.icon && <item.icon size={16} className="text-gray-600 group-hover:text-white" />}
                        <span className="flex-1">{item.label}</span>
                        {item.submenu && <span className="text-gray-400 group-hover:text-white">›</span>}
                    </button>
                );
            })}
        </div>
    );
};

export default ContextMenu;

import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, FolderPlus, FileText, Image, SortAsc, Grid3x3, List, Trash2 } from 'lucide-react';

const ContextMenu = ({ x, y, onClose, onNewFolder, onNewFile, onDelete, onRefresh }) => {
    const menuRef = useRef(null);
    const [position, setPosition] = useState({ x, y });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Add slight delay to prevent immediate close from the opening click
        setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }, 100);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    useEffect(() => {
        if (menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let adjustedX = x;
            let adjustedY = y;

            // Check if menu overflows right edge
            if (x + menuRect.width > viewportWidth) {
                adjustedX = viewportWidth - menuRect.width - 10; // 10px padding
            }

            // Check if menu overflows bottom edge
            if (y + menuRect.height > viewportHeight) {
                adjustedY = viewportHeight - menuRect.height - 10; // 10px padding
            }

            // Check if menu overflows left edge
            if (adjustedX < 10) {
                adjustedX = 10;
            }

            // Check if menu overflows top edge
            if (adjustedY < 10) {
                adjustedY = 10;
            }

            setPosition({ x: adjustedX, y: adjustedY });
        }
    }, [x, y]);

    const menuItems = [
        { icon: FolderPlus, label: 'New Folder', action: onNewFolder },
        { icon: FileText, label: 'New File', action: onNewFile },
        { divider: true },
        { icon: RefreshCw, label: 'Refresh', action: onRefresh || (() => window.location.reload()) },
        ...(onDelete ? [
            { divider: true },
            { icon: Trash2, label: 'Delete', action: onDelete, danger: true }
        ] : [])
    ];

    return (
        <div
            ref={menuRef}
            className="fixed bg-white/90 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200/50 py-1 min-w-[200px] z-[100000]"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
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
                        className={`w-full px-3 py-2 flex items-center gap-3 transition-colors text-left text-sm group ${item.danger
                            ? 'hover:bg-red-500 hover:text-white text-red-600'
                            : 'hover:bg-blue-500 hover:text-white text-gray-700'
                            }`}
                    >
                        {item.icon && <item.icon size={16} className={`${item.danger ? 'text-red-500 group-hover:text-white' : 'text-gray-600 group-hover:text-white'
                            }`} />}
                        <span className="flex-1">{item.label}</span>
                        {item.submenu && <span className="text-gray-400 group-hover:text-white">›</span>}
                    </button>
                );
            })}
        </div>
    );
};

export default ContextMenu;

import React from 'react';
import { Power, Settings, LogOut, Lock, User } from 'lucide-react';
import BasePanel from './BasePanel';

const AppleMenuPanel = ({ isOpen, onClose, position, onOpenAbout }) => {
    const menuItems = [
        { icon: User, label: 'About This Portfolio', action: onOpenAbout },
        { divider: true },
        { icon: Settings, label: 'System Preferences...', action: () => { } },
        { divider: true },
        { icon: Lock, label: 'Lock Screen', action: () => { }, shortcut: '⌃⌘Q' },
        { icon: LogOut, label: 'Log Out...', action: () => { }, shortcut: '⇧⌘Q' },
        { divider: true },
        { icon: Power, label: 'Shut Down...', action: () => { }, danger: true },
    ];

    return (
        <BasePanel isOpen={isOpen} onClose={onClose} position={position} width={240}>
            <div className="py-1">
                {menuItems.map((item, index) => {
                    if (item.divider) {
                        return <div key={index} className="h-px bg-gray-200 my-1" />;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                item.action();
                                onClose();
                            }}
                            className={`w-full px-4 py-2 flex items-center gap-3 transition-colors text-left text-sm ${item.danger
                                    ? 'hover:bg-red-500 hover:text-white text-red-600'
                                    : 'hover:bg-blue-500 hover:text-white text-gray-700'
                                }`}
                        >
                            <item.icon size={16} className={item.danger ? 'text-red-500' : 'text-gray-600'} />
                            <span className="flex-1">{item.label}</span>
                            {item.shortcut && (
                                <span className="text-xs text-gray-400">{item.shortcut}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </BasePanel>
    );
};

export default AppleMenuPanel;

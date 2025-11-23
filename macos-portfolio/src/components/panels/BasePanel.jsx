import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const BasePanel = ({
    isOpen,
    onClose,
    position,
    children,
    className = '',
    width = 300
}) => {
    const panelRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
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
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const panelStyle = {
        position: 'fixed',
        right: position?.right !== undefined ? `${position.right}px` : 'auto',
        left: position?.left !== undefined ? `${position.left}px` : 'auto',
        top: position?.top !== undefined ? `${position.top}px` : '40px',
        width: `${width}px`,
        zIndex: 99999,
    };

    return ReactDOM.createPortal(
        <div
            ref={panelRef}
            style={panelStyle}
            className={`bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-200 ${className}`}
        >
            {children}
        </div>,
        document.body
    );
};

export default BasePanel;

import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const updateCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            // Hide cursor when hovering over iframe
            if (e.target.tagName === 'IFRAME') {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        const handleMouseOut = (e) => {
            // Show cursor when leaving iframe
            if (e.target.tagName === 'IFRAME') {
                setIsVisible(true);
            }
        };

        window.addEventListener('mousemove', updateCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="custom-cursor-image"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-3px, -3px)',
            }}
        >
            <img src="/cursor.png" alt="cursor" className="w-8 h-8" />
        </div>
    );
};

export default CustomCursor;

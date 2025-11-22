import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Icon = ({ title, icon: IconComponent, onClick, isOpen, color, disableHover }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (disableHover) return; // Skip individual hover setup if disabled

        const icon = iconRef.current;
        const hoverAnimation = gsap.to(icon, {
            y: -10,
            duration: 0.3,
            paused: true,
            ease: "power2.out"
        });

        icon.addEventListener('mouseenter', () => hoverAnimation.play());
        icon.addEventListener('mouseleave', () => hoverAnimation.reverse());

        return () => {
            icon.removeEventListener('mouseenter', () => hoverAnimation.play());
            icon.removeEventListener('mouseleave', () => hoverAnimation.reverse());
        };
    }, [disableHover]);

    return (
        <div className="flex flex-col items-center gap-1 group relative">
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-md text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-lg z-50">
                {title}
            </div>

            <div
                ref={iconRef}
                onClick={onClick}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer relative overflow-hidden border border-white/10 ${typeof IconComponent === 'string' ? 'bg-transparent' : (color || 'bg-gray-800')}`}
            >
                {/* Gloss Effect - only for non-image icons */}
                {typeof IconComponent !== 'string' && (
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                )}

                {typeof IconComponent === 'string' ? (
                    <img src={IconComponent} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <IconComponent size={32} className="text-white relative z-10 drop-shadow-md" />
                )}
            </div>

            {/* Active Indicator */}
            <div className={`w-1 h-1 rounded-full bg-white/80 shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
    );
};

export default Icon;

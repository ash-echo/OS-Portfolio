import React, { useRef } from 'react';
import Icon from './Icon';
import gsap from 'gsap';

const Dock = ({ apps, openApps, onOpenApp }) => {
    const dockRef = useRef(null);

    const handleMouseMove = (e) => {
        const dock = dockRef.current;
        if (!dock) return;
        const icons = dock.querySelectorAll('.dock-icon');
        const mouseX = e.clientX;
        icons.forEach((icon) => {
            const rect = icon.getBoundingClientRect();
            // Hover only if mouse is within the horizontal bounds of the icon
            const isHover = mouseX >= rect.left && mouseX <= rect.right;
            const scale = isHover ? 1.5 : 1;
            gsap.to(icon, {
                scale: scale,
                duration: 0.2,
                overwrite: true,
                ease: 'power2.out',
            });
        });
    };

    const handleMouseLeave = () => {
        const dock = dockRef.current;
        if (!dock) return;
        const icons = dock.querySelectorAll('.dock-icon');
        icons.forEach((icon) => {
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                overwrite: true,
                ease: 'elastic.out(1, 0.3)',
            });
        });
    };

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] mb-2">
            <div
                ref={dockRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="flex items-end gap-4 px-6 py-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2rem] shadow-2xl"
            >
                {apps.map((app) => (
                    <div key={app.id} className="dock-icon origin-bottom transition-all will-change-transform">
                        <Icon
                            title={app.title}
                            icon={app.icon}
                            color={app.color}
                            isOpen={openApps.includes(app.id)}
                            onClick={() => onOpenApp(app.id)}
                            // Disable internal hover effects of Icon since Dock handles it
                            disableHover={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dock;

import React, { useRef, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Maximize2 } from 'lucide-react';
import gsap from 'gsap';

const Window = ({ id, title, content: Content, onClose, onMinimize, isFocused, onFocus, initialSize, initialPosition, isMobile }) => {
    const windowRef = useRef(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const rndRef = useRef(null);

    useEffect(() => {
        // Open animation
        gsap.fromTo(windowRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" }
        );

        // Auto-maximize on mobile
        if (isMobile) {
            setTimeout(() => {
                handleMaximize();
            }, 100); // Small delay to ensure component is fully mounted
        }
    }, []);

    const handleMaximize = () => {
        if (isMaximized) {
            rndRef.current.updateSize(initialSize || { width: 800, height: 500 });
            rndRef.current.updatePosition(initialPosition || { x: 100, y: 100 });
        } else {
            rndRef.current.updateSize({ width: window.innerWidth, height: window.innerHeight - 120 });
            rndRef.current.updatePosition({ x: 0, y: 30 });
        }
        setIsMaximized(!isMaximized);
    };

    return (
        <Rnd
            ref={rndRef}
            default={{
                x: initialPosition?.x || 100,
                y: initialPosition?.y || 100,
                width: initialSize?.width || (isMobile ? 320 : 800),
                height: initialSize?.height || (isMobile ? 240 : 500),
            }}
            minWidth={isMobile ? 280 : 300}
            minHeight={isMobile ? 200 : 200}
            bounds="window"
            onDragStart={onFocus}
            onResizeStart={onFocus}
            className={`absolute rounded-xl shadow-2xl overflow-hidden bg-white flex flex-col transition-shadow duration-300 border border-black/10 ${isFocused ? 'z-50 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'z-10 shadow-md'}`}
            dragHandleClassName="window-header"
            enableResizing={!isMaximized}
            disableDragging={isMaximized}
        >
            <div
                ref={windowRef}
                className="h-full w-full flex flex-col"
                onClick={onFocus}
            >
                {/* Window Header */}
                <div className={`window-header ${isMobile ? 'h-14' : 'h-10'} bg-[#e8e8e8] border-b border-[#d1d1d1] flex items-center ${isMobile ? 'px-6' : 'px-4'} justify-between select-none cursor-move rounded-t-xl`}>
                    <div className={`flex ${isMobile ? 'gap-4' : 'gap-2'} group`}>
                        <button onClick={(e) => { e.stopPropagation(); onClose(id); }} onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => { e.stopPropagation(); onClose(id); }} className={`${isMobile ? 'w-6 h-6' : 'w-3 h-3'} rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 active:bg-[#FF5F56]/60 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors border border-black/10 touch-manipulation`}>
                            <X size={isMobile ? 12 : 8} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onMinimize(id); }} onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => { e.stopPropagation(); onMinimize(id); }} className={`${isMobile ? 'w-6 h-6' : 'w-3 h-3'} rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 active:bg-[#FFBD2E]/60 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors border border-black/10 touch-manipulation`}>
                            <Minus size={isMobile ? 12 : 8} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleMaximize(); }} onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => { e.stopPropagation(); handleMaximize(); }} className={`${isMobile ? 'w-6 h-6' : 'w-3 h-3'} rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 active:bg-[#27C93F]/60 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors border border-black/10 touch-manipulation`}>
                            <Maximize2 size={isMobile ? 12 : 8} />
                        </button>
                    </div>
                    <div className={`${isMobile ? 'text-sm' : 'text-xs'} font-semibold text-gray-500 font-sans flex items-center gap-1`}>
                        {title}
                    </div>
                    <div className={`${isMobile ? 'w-16' : 'w-14'}`}></div> {/* Spacer for centering */}
                </div>

                {/* Window Content */}
                <div className="flex-1 overflow-hidden bg-white relative">
                    {typeof Content === 'function' ? <Content /> : Content}
                </div>
            </div>
        </Rnd>
    );
};

export default Window;

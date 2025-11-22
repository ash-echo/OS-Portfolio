import React, { useRef, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Maximize2 } from 'lucide-react';
import gsap from 'gsap';

const Window = ({ id, title, content: Content, onClose, onMinimize, isFocused, onFocus, initialSize, initialPosition }) => {
    const windowRef = useRef(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const rndRef = useRef(null);

    useEffect(() => {
        // Open animation
        gsap.fromTo(windowRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" }
        );
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
                width: initialSize?.width || 800,
                height: initialSize?.height || 500,
            }}
            minWidth={300}
            minHeight={200}
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
                <div className="window-header h-10 bg-[#e8e8e8] border-b border-[#d1d1d1] flex items-center px-4 justify-between select-none cursor-move rounded-t-xl">
                    <div className="flex gap-2 group">
                        <button onClick={(e) => { e.stopPropagation(); onClose(id); }} className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors border border-black/10">
                            <X size={8} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onMinimize(id); }} className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors border border-black/10">
                            <Minus size={8} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleMaximize(); }} className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors border border-black/10">
                            <Maximize2 size={8} />
                        </button>
                    </div>
                    <div className="text-xs font-semibold text-gray-500 font-sans flex items-center gap-1">
                        {title}
                    </div>
                    <div className="w-14"></div> {/* Spacer for centering */}
                </div>

                {/* Window Content */}
                <div className="flex-1 overflow-hidden bg-white relative">
                    {Content && <Content />}
                </div>
            </div>
        </Rnd>
    );
};

export default Window;

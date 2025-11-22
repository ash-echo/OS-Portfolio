import React from 'react';

const Sonic2App = () => {
    return (
        <div className="w-full h-full bg-black flex items-center justify-center">
            <iframe
                src="/games/sonic2/index.html"
                className="w-full h-full border-none"
                title="Sonic 2"
                allow="autoplay; fullscreen"
            />
        </div>
    );
};

export default Sonic2App;

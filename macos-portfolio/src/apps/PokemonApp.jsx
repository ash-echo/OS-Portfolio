import React from 'react';

const PokemonApp = () => {
    return (
        <div className="w-full h-full bg-black flex items-center justify-center">
            <iframe
                src="/games/pokemon-firered/index.html"
                className="w-full h-full border-none"
                title="Pokemon Fire Red"
                allow="autoplay; fullscreen"
            />
        </div>
    );
};

export default PokemonApp;

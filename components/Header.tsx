
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-neutral-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 shadow-lg shadow-black/20">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-teal-400 tracking-wider">
          Algeria Intel Agent
        </h1>
        <p className="text-sm md:text-base text-gray-400">AI-Powered Entity Discovery</p>
      </div>
    </header>
  );
};

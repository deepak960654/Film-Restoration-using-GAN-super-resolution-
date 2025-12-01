
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        GAN Image Restorer
      </h1>
      <p className="mt-2 text-lg text-gray-400">Bring your old photos back to life with AI</p>
    </header>
  );
};

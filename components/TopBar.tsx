import React from 'react';
import { LockIcon } from './icons/LockIcon';

export const TopBar: React.FC = () => {
  return (
    <header className="bg-panel border-b border-border px-4 py-2 flex justify-between items-center h-14 shrink-0">
      <div className="flex items-center space-x-2 text-accent">
        <LockIcon className="w-4 h-4" />
        <span className="font-semibold text-sm">SECURE // AGENT-002</span>
      </div>
      <div className="flex items-center space-x-3 text-text-secondary text-sm">
        <span className="text-text-primary font-semibold cursor-pointer p-1">EN</span>
        <span className="cursor-pointer hover:text-text-primary p-1">FR</span>
        <span className="cursor-pointer hover:text-text-primary p-1">AR</span>
      </div>
    </header>
  );
};
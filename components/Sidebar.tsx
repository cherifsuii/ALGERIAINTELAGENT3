import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { SearchIcon } from './icons/SearchIcon';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => {
  const baseClasses = "flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors duration-200 text-sm font-medium";
  const activeClasses = "bg-accent/10 text-accent";
  const inactiveClasses = "text-text-secondary hover:bg-gray-700/50 hover:text-text-primary";

  return (
    <div className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-panel border-r border-border p-4 flex flex-col shrink-0 hidden md:flex">
      <div className="flex items-center space-x-3 mb-8">
        <LogoIcon className="w-8 h-8 text-accent" />
        <h1 className="text-lg font-bold tracking-wider text-text-primary">IntelAgent</h1>
      </div>

      <nav className="flex flex-col space-y-2">
        <NavItem icon={<SearchIcon className="w-5 h-5" />} label="New Search" active />
      </nav>

    </aside>
  );
};
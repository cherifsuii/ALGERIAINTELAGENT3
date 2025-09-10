import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-panel border-t border-border px-4 py-1.5 text-xs text-text-secondary flex justify-between items-center h-8 shrink-0">
      <div>
        <span>IntelAgent v4.0 // Geospatial Intelligence Platform</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span>Status: Nominal</span>
      </div>
    </footer>
  );
};
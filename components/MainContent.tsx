import React from 'react';
import type { Entity, Wilaya, Category } from '../types';
import { SearchForm } from './SearchForm';
import { ResultsTable } from './ResultsTable';
import { exportToCsv } from '../utils';
import { DownloadIcon } from './icons/DownloadIcon';
import { SearchIcon } from './icons/SearchIcon';
import { EmergencyIcon } from './icons/EmergencyIcon';

interface MainContentProps {
  onSearch: (wilaya: Wilaya, category: Category) => void;
  entities: Entity[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  addLog: (message: string) => void;
}

const Placeholder: React.FC<{ icon: React.ReactNode; title: string, message: string }> = ({ icon, title, message }) => (
    <div className="text-center p-12 text-text-secondary">
        <div className="w-12 h-12 bg-panel mx-auto rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mt-1 text-sm">{message}</p>
    </div>
);


export const MainContent: React.FC<MainContentProps> = ({ onSearch, entities, isLoading, error, hasSearched, addLog }) => {
  
  const handleExport = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `intel-report-${timestamp}.csv`;
    exportToCsv(entities, filename);
    addLog(`> [SYS] Exported ${entities.length} records to ${filename}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Placeholder icon={<div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>} title="Searching..." message="Acquiring targets from geospatial database." />;
    }
  
    if (error) {
      return <Placeholder icon={<EmergencyIcon className="w-6 h-6 text-danger"/>} title="Search Failed" message={error} />;
    }
    
    if (!hasSearched) {
      return <Placeholder icon={<SearchIcon className="w-6 h-6 text-text-secondary"/>} title="Awaiting Parameters" message="Define search parameters to begin your sweep." />;
    }
    
    if (entities.length === 0) {
        return <Placeholder icon={<SearchIcon className="w-6 h-6 text-text-secondary"/>} title="No Results Found" message="Your search completed but returned no matching entities." />;
    }

    return (
      <>
        <div className="flex justify-between items-center p-4">
            <span className="font-semibold text-sm text-text-primary">{entities.length} Entities Found</span>
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 text-sm border border-accent text-accent hover:bg-accent/10 font-semibold py-1.5 px-3 rounded-md transition-colors duration-200"
            >
                <DownloadIcon className="w-4 h-4" />
                <span>Export CSV</span>
            </button>
        </div>
        <ResultsTable entities={entities} />
      </>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
        <div className="bg-panel border border-border rounded-lg">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-text-primary">Search Configuration</h2>
            </div>
            <SearchForm onSearch={onSearch} isLoading={isLoading} />
        </div>
        <div className="bg-panel border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-text-primary">Intelligence Results</h2>
            </div>
            {renderContent()}
        </div>
    </div>
  );
};
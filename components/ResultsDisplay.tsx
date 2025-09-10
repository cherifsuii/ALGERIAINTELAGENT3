
import React from 'react';
import { unparse } from 'papaparse';
import type { Entity } from '../types';
import { EntityCard } from './EntityCard';
import { Spinner } from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultsDisplayProps {
  entities: Entity[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

const InitialState: React.FC = () => (
    <div className="text-center py-16 px-4 bg-neutral-800 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-300">Ready to Begin Investigation</h3>
        <p className="text-gray-400 mt-2">Your intelligence report will appear here.</p>
    </div>
);

const NoResults: React.FC = () => (
    <div className="text-center py-16 px-4 bg-neutral-800 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-300">No Entities Found</h3>
        <p className="text-gray-400 mt-2">Try a different wilaya or category to expand your search.</p>
    </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ entities, isLoading, error, hasSearched }) => {
  if (isLoading) {
    return <Spinner message="Searching for entities in the selected area..." />;
  }

  if (error) {
    return <div className="text-center p-8 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{error}</div>;
  }
  
  if (!hasSearched) {
      return <InitialState />;
  }
  
  if (entities.length === 0) {
      return <NoResults />;
  }

  const handleExport = () => {
    const csv = unparse(entities, {
        columns: ['name', 'address', 'phone', 'website', 'facebook', 'lat', 'lon'],
        header: true,
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'intelligence-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-neutral-700">
            <h2 className="text-2xl font-bold text-teal-400">Intelligence Report</h2>
            <button
                onClick={handleExport}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-all duration-300 ease-in-out"
                aria-label="Export results to CSV"
            >
                <DownloadIcon className="w-5 h-5 mr-2" />
                <span>Export</span>
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {entities.map((entity) => (
            <EntityCard key={entity.id} entity={entity} />
        ))}
        </div>
    </div>
  );
};

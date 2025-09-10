
import React from 'react';
import type { Entity } from '../types';
import { EntityCard } from './EntityCard';
import { Spinner } from './Spinner';

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

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-teal-400 border-b-2 border-neutral-700 pb-2">Intelligence Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {entities.map((entity) => (
            <EntityCard key={entity.id} entity={entity} />
        ))}
        </div>
    </div>
  );
};

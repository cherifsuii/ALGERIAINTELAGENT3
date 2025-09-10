import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { searchPlaces } from './services/geoapifyService';
import type { Entity, Wilaya, Category } from './types';

const App: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (wilaya: Wilaya, category: Category) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setEntities([]);

    try {
      const results = await searchPlaces(wilaya, category);
      setEntities(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch intelligence data. An unknown error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-400 mb-8 animate-fade-in">
            Select an Algerian Wilaya and a business category to gather intelligence on local entities. Our AI will provide a summary for each discovered entity.
          </p>
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          <ResultsDisplay
            entities={entities}
            isLoading={isLoading}
            error={error}
            hasSearched={hasSearched}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

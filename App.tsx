import React, { useState, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { ActivityMonitor } from './components/ActivityMonitor';
import { Footer } from './components/Footer';
import { searchPlaces } from './services/geoapifyService';
import type { Entity, Wilaya, Category } from './types';

const App: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '> [SYS] System Initialized. Awaiting search parameters.',
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleSearch = useCallback(async (wilaya: Wilaya, category: Category) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setEntities([]);
    addLog(`> [CMD] Starting intelligence sweep for "${category.name}" in "${wilaya.name}".`);

    try {
      const results = await searchPlaces(wilaya, category);
      setEntities(results);
      addLog(`> [SYS] Sweep complete. Found ${results.length} entities.`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown Error';
      setError(`Data fetch failed: ${errorMessage}`);
      addLog(`> [ERR] Sweep failed: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    <MainContent
                        onSearch={handleSearch}
                        entities={entities}
                        isLoading={isLoading}
                        error={error}
                        hasSearched={hasSearched}
                        addLog={addLog}
                    />
                </main>
                <ActivityMonitor logs={logs} />
            </div>
            <Footer />
        </div>
    </div>
  );
};

export default App;
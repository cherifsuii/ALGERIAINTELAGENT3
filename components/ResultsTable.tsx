import React from 'react';
import type { Entity } from '../types';

export const ResultsTable: React.FC<{ entities: Entity[] }> = ({ entities }) => {
  
  const renderLink = (url: string | undefined, text: string) => {
    if (!url) return <span className="text-text-secondary">N/A</span>;
    return (
        <a href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            {text}
        </a>
    );
  };
  
  return (
    <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
            <thead className="bg-background text-xs text-text-secondary uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Address</th>
                    <th className="px-6 py-3 font-medium">Website</th>
                    <th className="px-6 py-3 font-medium">Phone</th>
                    <th className="px-6 py-3 font-medium">Facebook</th>
                    <th className="px-6 py-3 font-medium">Source</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border">
                {entities.map((entity) => (
                    <tr key={entity.id} className="hover:bg-gray-800/50 transition-colors duration-200">
                        <td className="px-6 py-4 font-medium text-text-primary whitespace-nowrap" title={entity.name}>{entity.name}</td>
                        <td className="px-6 py-4 text-text-secondary whitespace-nowrap" title={entity.address}>{entity.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{renderLink(entity.website, 'Visit Link')}</td>
                        <td className="px-6 py-4 text-text-secondary">{entity.phone || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{renderLink(entity.facebook, 'Visit Page')}</td>
                        <td className="px-6 py-4 text-text-secondary">GeoDB</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import type { Entity } from '../types';
import { getSummaryForEntity } from '../services/geminiService';
import { InfoIcon } from './icons/InfoIcon';

interface EntityCardProps {
  entity: Entity;
}

const AISummary: React.FC<{ entity: Entity }> = ({ entity }) => {
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSummary = async () => {
            setIsLoading(true);
            const result = await getSummaryForEntity(entity);
            setSummary(result);
            setIsLoading(false);
        };

        fetchSummary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entity]);

    if (isLoading) {
        return (
            <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-teal-400"></div>
                <span>Analyzing...</span>
            </div>
        );
    }

    return (
        <p className="text-gray-400 text-sm">{summary}</p>
    );
};


export const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
  const { name, address, website, phone, facebook, lat, lon } = entity;
  const gmapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

  const renderLink = (url: string, text: string) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 break-all">{text}</a>
  );

  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg p-5 flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-teal-500/10">
      <div>
        <h3 className="text-xl font-bold text-gray-100">{name}</h3>
        <p className="text-sm text-gray-400 mb-4">{address}</p>

        <div className="space-y-2 text-sm mb-4">
          {website && <div>🌐 {renderLink(website, website)}</div>}
          {phone && <div>📞 <span className="text-gray-300">{phone}</span></div>}
          {facebook && <div>👍 {renderLink(facebook, 'Facebook Page')}</div>}
          <div>📍 {renderLink(gmapsLink, 'View on Map')}</div>
        </div>
      </div>

      <div className="border-t border-neutral-700 pt-4 mt-auto">
        <h4 className="font-semibold text-teal-400 mb-2 flex items-center">
            <InfoIcon className="h-5 w-5 mr-2"/>
            AI Analysis
        </h4>
        <AISummary entity={entity} />
      </div>
    </div>
  );
};

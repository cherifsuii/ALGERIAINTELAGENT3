
import React, { useState } from 'react';
import { ALGERIAN_WILAYAS, CATEGORIES } from '../constants';
import type { Wilaya, Category } from '../types';
import { SearchIcon } from './icons/SearchIcon';

interface SearchFormProps {
  onSearch: (wilaya: Wilaya, category: Category) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya>(ALGERIAN_WILAYAS[15]); // Default to Algiers
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedWilaya, selectedCategory);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-800 p-6 rounded-lg shadow-xl animate-fade-in mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="wilaya-select" className="block text-sm font-medium text-gray-300 mb-1">Wilaya (State)</label>
          <select
            id="wilaya-select"
            value={selectedWilaya.code}
            onChange={(e) => {
                const wilaya = ALGERIAN_WILAYAS.find(w => w.code === parseInt(e.target.value));
                if (wilaya) setSelectedWilaya(wilaya);
            }}
            className="w-full bg-neutral-700 text-white border-neutral-600 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          >
            {ALGERIAN_WILAYAS.map((wilaya) => (
              <option key={wilaya.code} value={wilaya.code}>{wilaya.code} - {wilaya.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-300 mb-1">Entity Category</label>
          <select
            id="category-select"
            value={selectedCategory.value}
             onChange={(e) => {
                const category = CATEGORIES.find(c => c.value === e.target.value);
                if (category) setSelectedCategory(category);
            }}
            className="w-full bg-neutral-700 text-white border-neutral-600 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-neutral-600 disabled:cursor-not-allowed transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gathering Intel...
          </>
        ) : (
          <>
            <SearchIcon className="h-5 w-5 mr-2" />
            Search Entities
          </>
        )}
      </button>
    </form>
  );
};

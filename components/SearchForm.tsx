import React, { useState } from 'react';
import { ALGERIAN_WILAYAS, CATEGORIES } from '../constants';
import type { Wilaya, Category } from '../types';

interface SearchFormProps {
  onSearch: (wilaya: Wilaya, category: Category) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya>(ALGERIAN_WILAYAS[30]); // Default to Oran
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedWilaya, selectedCategory);
  };

  const selectStyles = "w-full bg-background text-text-primary border border-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200";
  const labelStyles = "block text-sm font-medium mb-1 text-text-secondary";

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
            <label htmlFor="category-select" className={labelStyles}>Category</label>
            <select
                id="category-select"
                value={selectedCategory.value}
                onChange={(e) => {
                    const category = CATEGORIES.find(c => c.value === e.target.value);
                    if (category) setSelectedCategory(category);
                }}
                disabled={isLoading}
                className={selectStyles}
            >
                {CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>{category.name}</option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="wilaya-select" className={labelStyles}>Location (Wilaya)</label>
            <select
                id="wilaya-select"
                value={selectedWilaya.code}
                onChange={(e) => {
                    const wilaya = ALGERIAN_WILAYAS.find(w => w.code === parseInt(e.target.value));
                    if (wilaya) setSelectedWilaya(wilaya);
                }}
                disabled={isLoading}
                className={selectStyles}
            >
                {ALGERIAN_WILAYAS.map((wilaya) => (
                    <option key={wilaya.code} value={wilaya.code}>{wilaya.name}</option>
                ))}
            </select>
        </div>
        
        <div className="w-full">
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-white font-semibold text-base py-2 px-6 rounded-md hover:bg-accent-hover transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Searching...' : 'Run Search'}
            </button>
        </div>
      </div>
    </form>
  );
};
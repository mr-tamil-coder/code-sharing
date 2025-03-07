// components/SearchBox.tsx
import React, { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 outline-none"
          placeholder="Enter snippet number (e.g., CS101-1)"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
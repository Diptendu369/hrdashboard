import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    className="w-full p-2 border rounded focus:outline-none focus:ring"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder || 'Search...'}
    aria-label="Search"
  />
);

export default SearchBar; 
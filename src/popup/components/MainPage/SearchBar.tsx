import React from 'react';
import { useSearchBarLogic } from '../../hooks/useSearchBarLogic';

interface SearchBarProps {
  index: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ index }) => {
  const { searchQuery, handleChange, handleSubmit } = useSearchBarLogic(index);

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        autoFocus={index === 0}
        tabIndex={0}
        id={`search-bar-${index}`}
      />
    </form>
  );
};

export default SearchBar;

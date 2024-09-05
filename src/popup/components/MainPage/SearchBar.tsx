import React, { useEffect } from 'react';
import { usePopupContext } from '../../context/PopupContext';

interface SearchBarProps {
  index: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ index }) => {
  const { searchQueries, setSearchQueries, incrementMatch } = usePopupContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'highlight',
      searchQuery: searchQueries[index],
      queryIndex: index,
    });
  }, [searchQueries[index]]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueries((prev) => {
      const newQueries = [...prev];
      newQueries[index] = event.target.value;
      return newQueries;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    incrementMatch(index);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={searchQueries[index]}
        onChange={handleChange}
        autoFocus={index === 0}
        tabIndex={0}
      />
    </form>
  );
};

export default SearchBar;

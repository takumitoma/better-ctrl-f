import React, { useEffect } from 'react';
import { usePopupContext } from '../../context/PopupContext';

interface SearchBarProps {
  index: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ index }) => {
  const { searchQueries, setSearchQueries, incrementMatch, decrementMatch } = usePopupContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'highlight',
      searchQuery: searchQueries[index],
      queryIndex: index,
    });
  }, [searchQueries[index]]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const targetElement = document.getElementById(`search-bar-${index}`);

      if (document.activeElement === targetElement) {
        console.log("calling 2");
        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault();
          decrementMatch(index);
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [decrementMatch]);

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
        id={`search-bar-${index}`}
      />
    </form>
  );
};

export default SearchBar;

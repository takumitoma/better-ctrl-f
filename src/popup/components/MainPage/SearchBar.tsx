import React, { useEffect } from 'react';
import { useSearchContext } from '../../context';

interface SearchBarProps {
  index: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ index }) => {
  const { state, dispatch } = useSearchContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'highlight',
      searchQuery: state.searchQueries[index],
      queryIndex: index,
    });
  }, [state.searchQueries[index]]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const targetElement = document.getElementById(`search-bar-${index}`);

      if (document.activeElement === targetElement) {
        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault();
          dispatch({ type: 'DECREMENT_MATCH', payload: index });
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQueries = [...state.searchQueries];
    newQueries[index] = event.target.value;
    dispatch({ type: 'SET_SEARCH_QUERIES', payload: newQueries });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'INCREMENT_MATCH', payload: index });
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={state.searchQueries[index]}
        onChange={handleChange}
        autoFocus={index === 0}
        tabIndex={0}
        id={`search-bar-${index}`}
      />
    </form>
  );
};

export default SearchBar;

import { useEffect } from 'react';
import { useSearchContext } from '../context';

export function useSearchBarLogic(index: number) {
  const { state, dispatch } = useSearchContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'highlight',
      searchQuery: state.searchQueries[index],
      queryIndex: index,
    });
  }, [state.searchQueries[index], index]);

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
  }, [dispatch, index]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQueries = [...state.searchQueries];
    newQueries[index] = event.target.value;
    dispatch({ type: 'SET_SEARCH_QUERIES', payload: newQueries });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'INCREMENT_MATCH', payload: index });
  };

  return {
    searchQuery: state.searchQueries[index],
    handleChange,
    handleSubmit,
  };
}
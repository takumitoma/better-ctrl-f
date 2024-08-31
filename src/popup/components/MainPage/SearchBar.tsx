import React, { useEffect } from 'react';
import { usePopupContext } from '../../context/PopupContext';

const SearchBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    incrementMatch,
  } = usePopupContext();

  useEffect(() => {
    chrome.storage.local.get(['lastSearchQuery'], (res) => {
      setSearchQuery(res.lastSearchQuery);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'highlight',
      searchQuery,
    });
  }, [searchQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    incrementMatch();
  };

  return (
    <form onSubmit={handleSubmit} id="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        autoFocus
      />
    </form>
  );
};

export default SearchBar;

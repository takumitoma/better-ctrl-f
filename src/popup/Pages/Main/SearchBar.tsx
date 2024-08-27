import React, { useEffect, useRef } from 'react';
import { usePopupContext } from '../../PopupContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery, incrementMatch } = usePopupContext();
  const isMounted = useRef(false);

  useEffect(() => {
    chrome.storage.local.get(['lastSearchQuery'], (res) => {
      setSearchQuery(res.lastSearchQuery);
    })
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    incrementMatch();
  }

  useEffect(() => {
    if (isMounted.current) {
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'highlight',
        searchQuery: searchQuery,
      });
    } else {
      isMounted.current = true;
    }
  }, [searchQuery]);

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
}

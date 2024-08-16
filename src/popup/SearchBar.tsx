import React, { useEffect, useRef } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const isMounted = useRef(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
  }

  useEffect(() => {
    if (isMounted.current) {
      chrome.runtime.sendMessage({ 
        target: 'background', 
        action: 'highlight', 
        searchQuery: searchQuery 
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
  )
}
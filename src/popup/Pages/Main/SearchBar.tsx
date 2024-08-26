import React, { useEffect, useRef } from "react";
import { usePopupContext } from "../../PopupContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery, incrementMatch } = usePopupContext();
  const isMounted = useRef(false);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "popup" });
    port.onMessage.addListener((message) => {
      if (message.action === "setStoredQuery") {
        setSearchQuery(message.query);
      }
    });
    return () => port.disconnect();
  }, [setSearchQuery]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    chrome.runtime.sendMessage({
      target: "background",
      action: "storeQuery",
      searchQuery: newQuery,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    incrementMatch();
  }

  useEffect(() => {
    if (isMounted.current) {
      chrome.runtime.sendMessage({
        target: "background",
        action: "highlight",
        searchQuery: searchQuery,
      });
    } else {
      isMounted.current = true;
    }
  }, [searchQuery]);

  return (
    <form onSubmit={handleSubmit} id="search-bar">
      <input type="text" value={searchQuery} onChange={handleChange} autoFocus />
    </form>
  );
}

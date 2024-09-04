import React, { useEffect, useRef } from 'react';
import { usePopupContext } from '../../context/PopupContext';

const SearchOptions: React.FC = () => {
  const {
    isCaseSensitive,
    setIsCaseSensitive,
    searchDiacritics,
    setSearchDiacritics,
  } = usePopupContext();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'updateIsCaseSensitive',
        isCaseSensitive,
      });
    }
  }, [isCaseSensitive]);

  useEffect(() => {
    if (isMounted.current) {
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'updateSearchDiacritics',
        searchDiacritics,
      });
    }
  }, [searchDiacritics]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <div id="search-options">
      <label>
        <input
          type="checkbox"
          tabIndex={0}
          checked={isCaseSensitive}
          onChange={(e) => setIsCaseSensitive(e.target.checked)}
        />
        Case sensitive
      </label>
      <label>
        <input
          type="checkbox"
          tabIndex={0}
          checked={searchDiacritics}
          onChange={(e) => setSearchDiacritics(e.target.checked)}
        />
        Diacritics
      </label>
    </div>
  );
};

export default SearchOptions;

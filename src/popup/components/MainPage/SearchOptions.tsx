import React, { useState, useEffect } from 'react';

const SearchOptions: React.FC = () => {
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [searchDiacritics, setSearchDiacritics] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get(
      ['lastIsCaseSensitive', 'lastSearchDiacritics'],
      (res) => {
        setIsCaseSensitive(res.lastIsCaseSensitive || false);
        setSearchDiacritics(res.lastSearchDiacritics || false);
      },
    );
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateIsCaseSensitive',
      isCaseSensitive
    });
  }, [isCaseSensitive]);

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateSearchDiacritics',
      searchDiacritics
    });
  }, [searchDiacritics]);

  return (
    <div id="search-options">
      <label>
        <input
          type="checkbox"
          checked={isCaseSensitive}
          onChange={(e) => setIsCaseSensitive(e.target.checked)}
        />
        Case sensitive
      </label>
      <label>
        <input
          type="checkbox"
          checked={searchDiacritics}
          onChange={(e) => setSearchDiacritics(e.target.checked)}
        />
        Diacritics
      </label>
    </div>
  );
};

export default SearchOptions;

import React from 'react';
import { usePopupContext } from '../../context/PopupContext';

const SearchOptions: React.FC = () => {
  const {
    isCaseSensitive,
    setIsCaseSensitive,
    searchDiacritics,
    setSearchDiacritics,
  } = usePopupContext();

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

import React from 'react';
import { useSettingsContext } from '../../context';
import { useSearchOptionsLogic } from '../../hooks/useSearchOptionsLogic';

const SearchOptions: React.FC = () => {
  const {
    isCaseSensitive,
    setIsCaseSensitive,
    searchDiacritics,
    setSearchDiacritics,
  } = useSettingsContext();

  useSearchOptionsLogic({ isCaseSensitive, searchDiacritics });

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

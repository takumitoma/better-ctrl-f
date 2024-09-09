import React from 'react';
import { useSettingsContext, useNavigationContext } from '../../../context';
import { useSearchOptionsLogic } from '../../../hooks';
import './SearchOptions.css';

const SearchOptions: React.FC = () => {
  const {
    isCaseSensitive,
    setIsCaseSensitive,
    searchDiacritics,
    setSearchDiacritics,
  } = useSettingsContext();
  const { setPage } = useNavigationContext();

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
      <button
        className="goto-help"
        onClick={() => setPage('Help')}
        tabIndex={0}
      >
        <p>Help</p>
      </button>
    </div>
  );
};

export default SearchOptions;

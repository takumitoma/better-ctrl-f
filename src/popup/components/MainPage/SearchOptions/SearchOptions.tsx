import React from 'react';
import { useSettingsContext, useNavigationContext } from '@context';
import { useSearchOptionsLogic } from '@hooks';
import ThemeToggleButton from './ThemeToggleButton/ThemeToggleButton';
import './SearchOptions.css';

const SearchOptions: React.FC = () => {
  const {
    isCaseSensitive,
    setIsCaseSensitive,
    isDiacriticsSensitive,
    setIsDiacriticsSensitive,
  } = useSettingsContext();
  const { setPage } = useNavigationContext();

  useSearchOptionsLogic({ isCaseSensitive, isDiacriticsSensitive });

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
          checked={isDiacriticsSensitive}
          onChange={(e) => setIsDiacriticsSensitive(e.target.checked)}
        />
        Diacritics sensitive
      </label>
      <button
        className="goto-help"
        onClick={() => setPage('Help')}
        tabIndex={0}
      >
        <p>Help</p>
      </button>
      <ThemeToggleButton />
    </div>
  );
};

export default SearchOptions;

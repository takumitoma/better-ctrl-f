import React from 'react';
import SearchBar from './MainPage/SearchBar';
import MatchCounter from './MainPage/MatchCounter';
import Divider from './common/Divider';
import MatchNavigation from './MainPage/MatchNavigation';
import Button from './common/Button';
import SearchOptions from './MainPage/SearchOptions';
import { usePopupContext } from '../context/PopupContext';
import { useHighlightColorSync } from '../hooks/useHighlightColorSync';
import { useFocusColorSync } from '../hooks/useFocusColorSync';

const MainPage: React.FC = () => {
  const { highlightColor, focusColor, setPage } = usePopupContext();
  useHighlightColorSync();
  useFocusColorSync();

  return (
    <div id="main">
      <div className="search-query-row">
        <SearchBar />
        <MatchCounter />
        <Divider />
        <MatchNavigation />
        <Button
          className="goto-color-button"
          style={{ backgroundColor: highlightColor }}
          onClick={() => setPage('SetHighlight')}
        />
        <Button
          className="goto-color-button"
          style={{ backgroundColor: focusColor }}
          onClick={() => setPage('SetFocus')}
        />
      </div>
      <SearchOptions />
    </div>
  );
};

export default MainPage;

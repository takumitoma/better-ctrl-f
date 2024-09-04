import React, { useEffect } from 'react';
import QueryRow from './MainPage/QueryRow';
import SearchOptions from './MainPage/SearchOptions';
import { usePopupContext } from '../context/PopupContext';

const MainPage: React.FC = () => {
  const { setSearchQueries, setHighlightColors, setFocusColors } = usePopupContext();

  useEffect(() => {
    chrome.storage.local.get(['searchQueries', 'highlightColors', 'focusColors'], (res) => {
      if (res.searchQueries) setSearchQueries(res.searchQueries);
      if (res.highlightColors) setHighlightColors(res.highlightColors);
      if (res.focusColors) setFocusColors(res.focusColors);
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'batchUpdateColors',
        highlightColors: res.highlightColors,
        focusColors: res.focusColors
      })
    });
  }, []);

  // // the search options have to be loaded before the search queries so the 
  // // search options are applied to the queries
  // const [isSearchOptionsLoaded, setIsSearchOptionsLoaded] = useState(false);
  // useEffect(() => {
  //   setIsSearchOptionsLoaded(true);
  // }, []);

  return (
    <div id="main">
      {[0, 1, 2, 3, 4].map((index) => (
        <QueryRow key={index} index={index} />
      ))}
      <SearchOptions />
    </div>
  );
};

export default MainPage;

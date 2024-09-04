import { useEffect, useState } from 'react';
import { usePopupContext } from '../context/PopupContext';

const useStorageOnLoad = () => {
  const {
    setSearchQueries,
    setHighlightColors,
    setFocusColors,
    setIsCaseSensitive,
    setSearchDiacritics,
  } = usePopupContext();

  const [searchOptionsLoaded, setSearchOptionsLoaded] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['isCaseSensitive', 'searchDiacritics'], (res) => {
      setIsCaseSensitive(res.isCaseSensitive || false);
      setSearchDiacritics(res.searchDiacritics || false);
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'updateIsCaseSensitive',
        isCaseSensitive: res.isCaseSensitive,
      });
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'updateSearchDiacritics',
        searchDiacritics: res.searchDiacritics,
      });
      setSearchOptionsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!searchOptionsLoaded) {
      return;
    }
    chrome.storage.local.get(
      ['searchQueries', 'highlightColors', 'focusColors'],
      (res) => {
        if (res.searchQueries) setSearchQueries(res.searchQueries);
        if (res.highlightColors) setHighlightColors(res.highlightColors);
        if (res.focusColors) setFocusColors(res.focusColors);
        chrome.runtime.sendMessage({
          target: 'background',
          action: 'batchUpdateColors',
          highlightColors: res.highlightColors,
          focusColors: res.focusColors,
        });
      },
    );
  }, [searchOptionsLoaded]);
};

export default useStorageOnLoad;

import { useEffect, useState } from 'react';
import {
  useSearchContext,
  useColorContext,
  useSettingsContext,
} from '../context';

export function useStorageOnLoad(): void {
  const { dispatch: searchDispatch } = useSearchContext();
  const { dispatch: colorDispatch } = useColorContext();
  const { setIsCaseSensitive, setIsDiacriticsSensitive } = useSettingsContext();

  const [searchOptionsLoaded, setSearchOptionsLoaded] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['isCaseSensitive', 'isDiacriticsSensitive'], (res) => {
      setIsCaseSensitive(res.isCaseSensitive || false);
      setIsDiacriticsSensitive(res.isDiacriticsSensitive || false);
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'updateIsCaseSensitive',
        isCaseSensitive: res.isCaseSensitive,
      });
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'updateIsDiacriticsSensitive',
        isDiacriticsSensitive: res.isDiacriticsSensitive,
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
        if (res.searchQueries) {
          searchDispatch({
            type: 'SET_SEARCH_QUERIES',
            payload: res.searchQueries,
          });
        }
        if (res.highlightColors) {
          colorDispatch({
            type: 'SET_HIGHLIGHT_COLORS',
            payload: res.highlightColors,
          });
        }
        if (res.focusColors) {
          colorDispatch({ type: 'SET_FOCUS_COLORS', payload: res.focusColors });
        }
        chrome.runtime.sendMessage({
          target: 'background',
          action: 'batchUpdateColors',
          highlightColors: res.highlightColors,
          focusColors: res.focusColors,
        });
      },
    );
  }, [searchOptionsLoaded]);
}

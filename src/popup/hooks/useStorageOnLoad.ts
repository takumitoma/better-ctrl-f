import { useEffect, useState } from 'react';
import {
  useSearchContext,
  useColorContext,
  useSettingsContext,
} from '../context';

// retrieves data from chrome.local.storage on popup initial load
export function useStorageOnLoad(
  contentScriptLoaded: boolean,
  isValid: boolean,
): void {
  const { dispatch: searchDispatch } = useSearchContext();
  const { dispatch: colorDispatch } = useColorContext();
  const { setIsCaseSensitive, setIsDiacriticsSensitive, setTheme } =
    useSettingsContext();

  const [searchOptionsLoaded, setSearchOptionsLoaded] = useState(false);

  useEffect(() => {
    if (!contentScriptLoaded || !isValid) return;

    chrome.storage.local.get(
      ['isCaseSensitive', 'isDiacriticsSensitive', 'theme'],
      (res) => {
        setIsCaseSensitive(res.isCaseSensitive || false);
        setIsDiacriticsSensitive(res.isDiacriticsSensitive || false);
        setTheme(res.theme || 'light');
        setSearchOptionsLoaded(true);
      },
    );
  }, [contentScriptLoaded, isValid]);

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

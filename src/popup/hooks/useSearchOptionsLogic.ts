import { useEffect } from 'react';

export function useSearchOptionsLogic(
  isCaseSensitive: boolean,
  isDiacriticsSensitive: boolean,
  theme: 'light' | 'dark',
): void {
  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateIsCaseSensitive',
      isCaseSensitive,
    });
  }, [isCaseSensitive]);

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateIsDiacriticsSensitive',
      isDiacriticsSensitive,
    });
  }, [isDiacriticsSensitive]);

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateTheme',
      theme,
    });
  }, [theme]);
}

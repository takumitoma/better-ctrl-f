import { useEffect, useRef } from 'react';

interface SearchOptionsProps {
  isCaseSensitive: boolean;
  searchDiacritics: boolean;
}

export function useSearchOptionsLogic({
  isCaseSensitive,
  searchDiacritics,
}: SearchOptionsProps): void {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'updateIsCaseSensitive',
        isCaseSensitive,
      });
    }
  }, [isCaseSensitive]);

  useEffect(() => {
    if (isMounted.current) {
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'updateSearchDiacritics',
        searchDiacritics,
      });
    }
  }, [searchDiacritics]);

  useEffect(() => {
    isMounted.current = true;
  }, []);
}

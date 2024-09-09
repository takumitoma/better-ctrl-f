import { useEffect, useRef } from 'react';

interface SearchOptionsProps {
  isCaseSensitive: boolean;
  isDiacriticsSensitive: boolean;
}

export function useSearchOptionsLogic({
  isCaseSensitive,
  isDiacriticsSensitive,
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
        action: 'updateIsDiacriticsSensitive',
        isDiacriticsSensitive,
      });
    }
  }, [isDiacriticsSensitive]);

  useEffect(() => {
    isMounted.current = true;
  }, []);
}

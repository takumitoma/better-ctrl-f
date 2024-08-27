import { useEffect } from 'react';
import { usePopupContext } from '../PopupContext';

export function useHighlightColorSync() {
  const { highlightColor, setHighlightColor } = usePopupContext();

  useEffect(() => {
    chrome.storage.local.get(['lastHighlightColor'], (res) => {
      if (res.lastHighlightColor) setHighlightColor(res.lastHighlightColor);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateHighlightColor',
      highlightColor,
    });
  }, [highlightColor]);
}

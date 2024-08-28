import { useEffect } from 'react';
import { usePopupContext } from '../context/PopupContext';

export function useFocusColorSync() {
  const { focusColor, setFocusColor } = usePopupContext();

  useEffect(() => {
    chrome.storage.local.get(['lastFocusColor'], (res) => {
      if (res.lastFocusColor) setFocusColor(res.lastFocusColor);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateFocusColor',
      focusColor,
    });
  }, [focusColor]);
}

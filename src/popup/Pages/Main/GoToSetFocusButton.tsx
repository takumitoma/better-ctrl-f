import { useEffect } from 'react';
import { usePopupContext } from '../../PopupContext';

export default function GoToSetFocusButton() {
  const { focusColor, setFocusColor, setPage } = usePopupContext();

  useEffect(() => {
    chrome.storage.local.get(['lastFocusColor'], (res) => {
      if (res.lastFocusColor) setFocusColor(res.lastFocusColor);
    });
  }, []);

  return (
    <button
      className="goto-color-button"
      style={{ backgroundColor: focusColor }}
      onClick={() => setPage('SetFocus')}
    />
  );
}

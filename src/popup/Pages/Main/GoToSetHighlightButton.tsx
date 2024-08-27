import { useEffect } from 'react';
import { usePopupContext } from '../../PopupContext';

export default function GoToSetHighlightButton() {
  const { highlightColor, setHighlightColor, setPage } = usePopupContext();

  useEffect(() => {
    chrome.storage.local.get(['lastHighlightColor'], (res) => {
      if (res.lastHighlightColor) setHighlightColor(res.lastHighlightColor);
    })
  }, []);
  
  return (
    <button
      className="goto-color-button"
      style={{ backgroundColor: highlightColor }}
      onClick={() => setPage('PickColor')}
    />
  );
}

import { useEffect } from 'react';
import { usePopupContext } from './PopupContext';

export default function MatchCounter() {
  const { searchQuery, currentMatch, totalMatches, setTotalMatches } = usePopupContext();

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (message: { target: string; action: string; count: number }) => {
        if (message.target === 'popup' && message.action === 'updateTotalMatches') {
          setTotalMatches(message.count);
        }
      }
    );
  }, [setTotalMatches]);

  const visibility = searchQuery ? 'visible' : 'hidden';

  return (
    <span id="match-counter" style={{ visibility }}>
      {currentMatch}/{totalMatches}
    </span>
  );
}

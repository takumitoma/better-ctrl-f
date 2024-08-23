import { useEffect } from 'react';
import { usePopupContext } from './PopupContext';

export default function MatchCounter() {
  const {
    searchQuery,
    currentMatch,
    totalMatches,
    setCurrentMatch,
    setTotalMatches,
  } = usePopupContext();

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (message: {
        target: string;
        action: string;
        currentMatch: number;
        totalMatches: number;
      }) => {
        if (message.target !== 'popup' || message.action !== 'updateMatches') {
          return;
        }

        message.totalMatches > 0
          ? setCurrentMatch(message.currentMatch)
          : setCurrentMatch(0);
        setTotalMatches(message.totalMatches);
      },
    );
  }, []);

  const visibility = searchQuery ? 'visible' : 'hidden';

  return (
    <span id="match-counter" style={{ visibility }}>
      {currentMatch}/{totalMatches}
    </span>
  );
}

import React, { useEffect } from 'react';
import { usePopupContext } from '../../context/PopupContext';

const MatchCounter: React.FC = () => {
  const {
    searchQuery,
    currentMatch,
    totalMatches,
    setCurrentMatch,
    setTotalMatches,
  } = usePopupContext();

  useEffect(() => {
    const handleMessage = (message: {
      target: string;
      action: string;
      currentMatch: number;
      totalMatches: number;
    }) => {
      if (message.target === 'popup' && message.action === 'updateMatches') {
        setCurrentMatch(message.totalMatches > 0 ? message.currentMatch : 0);
        setTotalMatches(message.totalMatches);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const visibility = searchQuery ? 'visible' : 'hidden';

  return (
    <span id="match-counter" style={{ visibility }}>
      {currentMatch}/{totalMatches}
    </span>
  );
};

export default MatchCounter;

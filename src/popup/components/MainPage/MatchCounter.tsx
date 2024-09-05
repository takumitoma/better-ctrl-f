import React, { useEffect } from 'react';
import { useSearchContext } from '../../context';

interface MatchCounterProps {
  index: number;
}

const MatchCounter: React.FC<MatchCounterProps> = ({ index }) => {
  const {
    searchQueries,
    currentMatches,
    totalMatches,
    setCurrentMatches,
    setTotalMatches,
  } = useSearchContext();

  useEffect(() => {
    function handleMessage(message: {
      target: string;
      action: string;
      currentMatch: number;
      totalMatches: number;
      queryIndex: number;
    }) {
      if (
        message.target === 'popup' &&
        message.action === 'updateMatches' &&
        message.queryIndex === index
      ) {
        setCurrentMatches((prev) => {
          const newMatches = [...prev];
          newMatches[index] =
            message.totalMatches > 0 ? message.currentMatch : 0;
          return newMatches;
        });
        setTotalMatches((prev) => {
          const newTotals = [...prev];
          newTotals[index] = message.totalMatches;
          return newTotals;
        });
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const visibility = searchQueries[index] ? 'visible' : 'hidden';

  return (
    <span className="match-counter" style={{ visibility }}>
      {currentMatches[index]}/{totalMatches[index]}
    </span>
  );
};

export default MatchCounter;

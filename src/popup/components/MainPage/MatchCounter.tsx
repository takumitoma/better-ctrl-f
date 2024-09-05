import React, { useEffect } from 'react';
import { useSearchContext } from '../../context';

interface MatchCounterProps {
  index: number;
}

const MatchCounter: React.FC<MatchCounterProps> = ({ index }) => {
  const { state, dispatch } = useSearchContext();

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
        dispatch({
          type: 'SET_CURRENT_MATCHES',
          payload: {
            index,
            value: message.totalMatches > 0 ? message.currentMatch : 0,
          },
        });
        dispatch({
          type: 'SET_TOTAL_MATCHES',
          payload: { index, value: message.totalMatches },
        });
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [dispatch, index]);

  const visibility = state.searchQueries[index] ? 'visible' : 'hidden';

  return (
    <span className="match-counter" style={{ visibility }}>
      {state.currentMatches[index]}/{state.totalMatches[index]}
    </span>
  );
};

export default MatchCounter;

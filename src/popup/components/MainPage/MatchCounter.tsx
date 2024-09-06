import React, { useCallback } from 'react';
import { useSearchContext } from '../../context';
import { useMessageListener } from '../../hooks/useMessageListener';

interface MatchCounterProps {
  index: number;
}

const MatchCounter: React.FC<MatchCounterProps> = ({ index }) => {
  const { state, dispatch } = useSearchContext();

  // after sending a message to the content script to update the search query,
  // handle the response message to update the current match and total matches
  const handleMessage = useCallback((message: any) => {
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
  }, [dispatch, index]);

  useMessageListener(handleMessage);

  const visibility = state.searchQueries[index] ? 'visible' : 'hidden';

  return (
    <span className="match-counter" style={{ visibility }}>
      {state.currentMatches[index]}/{state.totalMatches[index]}
    </span>
  );
};

export default MatchCounter;

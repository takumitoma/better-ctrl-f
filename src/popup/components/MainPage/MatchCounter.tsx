import React from 'react';
import { usePopupContext } from '../../context/PopupContext';

export const MatchCounter: React.FC = () => {
  const { searchQuery, currentMatch, totalMatches } = usePopupContext();

  const visibility = searchQuery ? 'visible' : 'hidden';

  return (
    <span id="match-counter" style={{ visibility }}>
      {currentMatch}/{totalMatches}
    </span>
  );
};

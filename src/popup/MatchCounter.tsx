import { useEffect } from 'react';

interface MatchCounterProps {
  searchQuery: string;
  currentMatch: number;
  totalMatches: number;
  setTotalMatches: (totalMatches: number) => void;
}

export default function MatchCounter({ 
  searchQuery, 
  currentMatch, 
  totalMatches, 
  setTotalMatches 
}: MatchCounterProps) {

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (message: { target: string; action: string; count: number }) => {
        if (message.target === 'popup' && message.action === 'updateTotalMatches') {
          setTotalMatches(message.count);
        }
      }
    );
  }, []);

  const visibility = searchQuery ? 'visible': 'hidden';

  return (
    <span id="match-counter" style={{ visibility }}>
      {currentMatch}/{totalMatches}
    </span>
  );
}
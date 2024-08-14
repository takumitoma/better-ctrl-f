// @ts-ignore
import React from 'react';
import { useState, useEffect } from 'react';

export default function MatchCounter() {
  // @ts-ignore
  const [currentMatch, setCurrentMatch] = useState<number>(0); 
  const [totalMatches, setTotalMatches] = useState<number>(0);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (message: { target: string; action: string; count: number }) => {
        if (message.target === 'popup' && message.action === 'updateTotalMatches') {
          setTotalMatches(message.count);
        }
      }
    );
  }, []);


  return (totalMatches > 0) ? (
    <p>
      {currentMatch}/{totalMatches}
    </p>
  ) : null;
}
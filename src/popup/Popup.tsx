import React, { useEffect } from 'react';
import { usePopupContext } from './context/PopupContext';
import MainPage from './components/MainPage';
import SetHighlightPage from './components/SetHighlightPage';
import SetFocusPage from './components/SetFocusPage';

const Popup: React.FC = () => {
  const { page, setCurrentMatch, setTotalMatches } = usePopupContext();

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
  }, [setCurrentMatch, setTotalMatches]);

  return (
    <div id="popup">
      {page === 'Main' && <MainPage />}
      {page === 'SetHighlight' && <SetHighlightPage />}
      {page === 'SetFocus' && <SetFocusPage />}
    </div>
  );
};

export default Popup;

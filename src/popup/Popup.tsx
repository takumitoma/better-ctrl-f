import React, { useEffect, useRef } from 'react';
import { usePopupContext } from './context/PopupContext';
import MainPage from './components/MainPage';
import SetHighlightPage from './components/SetHighlightPage';
import SetFocusPage from './components/SetFocusPage';
import LoadingScreen from './components/LoadingScreen';

const CHECK_INTERVAL = 3000;

const Popup: React.FC = () => {
  const { page, contentLoaded, setContentLoaded } = usePopupContext();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function checkContentScript(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'ping' }, () => {
          if (chrome.runtime.lastError) {
            setContentLoaded(false);
          } else {
            setContentLoaded(true);
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
            }
          }
        });
      }
    });
  }

  useEffect(() => {
    checkContentScript();

    if (!contentLoaded) {
      intervalRef.current = setInterval(checkContentScript, CHECK_INTERVAL);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [contentLoaded]);

  if (!contentLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div id="popup">
      {page === 'Main' && <MainPage />}
      {page === 'SetHighlight' && <SetHighlightPage />}
      {page === 'SetFocus' && <SetFocusPage />}
    </div>
  );
};

export default Popup;

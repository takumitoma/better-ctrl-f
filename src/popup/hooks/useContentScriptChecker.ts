import { useState, useEffect, useRef } from 'react';

const CHECK_INTERVAL = 3000;

function useContentScriptChecker(): boolean {
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function checkContentScript(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { target: 'content', action: 'ping' },
          () => {
            if (chrome.runtime.lastError) {
              setContentLoaded(false);
            } else {
              setContentLoaded(true);
              if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
              }
            }
          },
        );
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
  }, []);

  return contentLoaded;
}

export default useContentScriptChecker;

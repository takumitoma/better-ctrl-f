import { useState, useEffect, useRef } from 'react';

const CHECK_INTERVAL = 3000;

// ensures the main contents of this extension/popup is only displayed if the
// content script is loaded
export function useContentScriptChecker(): boolean {
  const isFirstRender = useRef<boolean>(true);
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
    if (isFirstRender.current) {
      isFirstRender.current = false;

      checkContentScript();

      if (!contentLoaded) {
        intervalRef.current = setInterval(checkContentScript, CHECK_INTERVAL);
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return contentLoaded;
}

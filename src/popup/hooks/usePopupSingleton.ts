import { useState, useEffect } from 'react';

const CHECK_INTERVAL = 1000;

// ensure there is only one instance of popup open at all times
export function usePopupSingleton() {
  const [popupId, setPopupId] = useState<string | null>(null);

  // set this popup as active on mount
  function setActivePopup() {
    if (popupId) return;
    chrome.runtime.sendMessage(
      { target: 'background', action: 'setActivePopup' },
      (response) => {
        setPopupId(response.popupId);
      },
    );
  }

  // Every CHECK_INTERVAL ms, check if another popup was opened. If it was
  // window.close() this popup.
  const checkActivePopup = () => {
    if (!popupId) return;

    chrome.runtime.sendMessage(
      { target: 'background', action: 'checkActivePopup', popupId },
      (response) => {
        if (!response.isActive) {
          window.close();
        }
      },
    );
  };

  useEffect(() => {
    setActivePopup();

    const intervalId = setInterval(checkActivePopup, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [popupId]);
}

import { useState, useEffect, useRef } from 'react';

export function useBackgroundScriptChecker(): boolean {
  const isFirstRender = useRef<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      chrome.runtime.sendMessage(
        { target: 'background', action: 'checkUrl' },
        (response) => {
          if (response && response.isSpecialized !== undefined) {
            setIsValid(!response.isSpecialized);
          }
        },
      );
    }
  }, []);

  return isValid;
}

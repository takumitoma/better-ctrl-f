import { useState, useEffect, useRef } from 'react';

// Checks whether the extension will work as expected on the current web page.
// This is not error prevention, ie checked just to let the users know.
// False positives can occur but not concerning as the extension will not work
// but will not produce errors etc.
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

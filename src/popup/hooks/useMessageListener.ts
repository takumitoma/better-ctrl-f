import { useEffect } from 'react';

type MessageHandler = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) => void;

export function useMessageListener(handler: MessageHandler): void {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(handler);

    return () => {
      chrome.runtime.onMessage.removeListener(handler);
    };
  }, [handler]);
}

import { handleMessage } from './messageHandler';
import { setActivePopup, isPopupActive } from './popupManager';

console.log('Hello world from background script');

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    switch (message.action) {
      case 'setActivePopup':
        sendResponse({ popupId: await setActivePopup() });
        break;
      case 'checkActivePopup':
        sendResponse({ isActive: await isPopupActive(message.popupId) });
        break;
      default:
        handleMessage(message, sendResponse);
    }
  })();
  return true;
});

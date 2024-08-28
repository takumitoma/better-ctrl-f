export function sendMessageToActiveTab(
  message: any,
  callback?: (response: any) => void
): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) return;

    if (callback) {
      chrome.tabs.sendMessage(tabs[0].id, message, callback);
    } else {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  });
}
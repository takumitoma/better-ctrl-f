console.log("Hello world from bakground script");

chrome.runtime.onMessage.addListener(
  (message: { target: string, action: string, searchQuery: string }) => {
    if (message.target !== 'background' || message.action !== 'highlight') return;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) return;

      chrome.tabs.sendMessage(tabs[0].id, { 
        target: 'content', 
        action: 'highlight', 
        searchQuery: message.searchQuery 
      }, 
      (response: { totalMatches: number }) => {
        chrome.runtime.sendMessage({
          target: 'popup',
          action: 'updateMatches',
          totalMatches: response.totalMatches
        });
      });
    });
  }
);
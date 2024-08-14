console.log("Hello world from bakground script");

chrome.runtime.onMessage.addListener(
  (message: { target: string, action: string, searchQuery: string }) => {
    if (message.target === 'background' && message.action === 'highlight') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { 
            target: 'content', 
            action: 'highlight', 
            searchQuery: message.searchQuery 
          });
        }
      });
    } 
  }
);
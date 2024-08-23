console.log('Hello world from bakground script');

chrome.runtime.onMessage.addListener(
  (message: {
    target: string;
    action: string;
    searchQuery: string;
    index: number;
  }) => {
    if (
      message.target !== 'background' ||
      (message.action !== 'highlight' && message.action !== 'focus')
    ) {
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) return;

      if (message.action === 'highlight') {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            target: 'content',
            action: 'highlight',
            searchQuery: message.searchQuery,
          },
          (response: { focusIndex: number; totalMatches: number }) => {
            chrome.runtime.sendMessage({
              target: 'popup',
              action: 'updateMatches',
              currentMatch: response.focusIndex,
              totalMatches: response.totalMatches,
            });
          },
        );
      } else {
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'content',
          action: 'focus',
          index: message.index,
        });
      }
    });
  },
);

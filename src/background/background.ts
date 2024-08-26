console.log('Hello world from bakground script');

let debounceTimer: NodeJS.Timeout | null = null;

function storeSearchQuery(query: string) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    chrome.storage.local.set({ lastSearchQuery: query });
  }, 300);
}

chrome.runtime.onMessage.addListener(
  (message: {
    target: string;
    action: string;
    searchQuery: string;
    index: number;
    highlightColor: string;
  }) => {
    if (message.target !== 'background') {
      return;
    }

    if (message.action === 'storeQuery' && message.searchQuery !== undefined) {
      storeSearchQuery(message.searchQuery);
      return;
    }

    if (
      !['highlight', 'focus', 'updateHighlightColor'].includes(message.action)
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
      } else if (message.action === 'focus') {
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'content',
          action: 'focus',
          index: message.index,
        });
      } else if (message.action === 'updateHighlightColor') {
        console.log('called: ' + message.highlightColor);
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'content',
          action: 'updateHighlightColor',
          highlightColor: message.highlightColor,
        });
      }
    });
  },
);

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    chrome.storage.local.get(['lastSearchQuery'], (result) => {
      if (result.lastSearchQuery) {
        port.postMessage({
          action: 'setStoredQuery',
          query: result.lastSearchQuery,
        });
      }
    });
  }
});

console.log('Hello world from background script');

let debounceSearch: NodeJS.Timeout | null = null;
let debounceHighlight: NodeJS.Timeout | null = null;

function storeSearchQuery(query: string) {
  if (debounceSearch) {
    clearTimeout(debounceSearch);
  }
  debounceSearch = setTimeout(() => {
    chrome.storage.local.set({ lastSearchQuery: query });
  }, 300);
}

function storeHighlightColor(color: string) {
  if (debounceHighlight) {
    clearTimeout(debounceHighlight);
  }
  debounceHighlight = setTimeout(() => {
    chrome.storage.local.set({ lastHighlightColor: color });
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
        storeSearchQuery(message.searchQuery);
      } else if (message.action === 'focus') {
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'content',
          action: 'focus',
          index: message.index,
        });
      } else if (message.action === 'updateHighlightColor') {
        console.log("called for" + message.highlightColor);
        chrome.tabs.sendMessage(tabs[0].id, {
          target: 'content',
          action: 'updateHighlightColor',
          highlightColor: message.highlightColor,
        });
        storeHighlightColor(message.highlightColor);
      }
    });
  },
);


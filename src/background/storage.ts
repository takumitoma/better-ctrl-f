let debounceSearch: NodeJS.Timeout | null = null;
let debounceHighlight: NodeJS.Timeout | null = null;
let debounceFocus: NodeJS.Timeout | null = null;
const DEBOUNCE_TIME = 300; //ms

export function storeSearchQuery(query: string): void {
  if (debounceSearch) {
    clearTimeout(debounceSearch);
  }
  debounceSearch = setTimeout(() => {
    chrome.storage.local.set({ lastSearchQuery: query });
  }, DEBOUNCE_TIME);
}

export function storeHighlightColor(color: string): void {
  if (debounceHighlight) {
    clearTimeout(debounceHighlight);
  }
  debounceHighlight = setTimeout(() => {
    chrome.storage.local.set({ lastHighlightColor: color });
  }, DEBOUNCE_TIME);
}

export function storeFocusColor(color: string): void {
  if (debounceFocus) {
    clearTimeout(debounceFocus);
  }
  debounceFocus = setTimeout(() => {
    chrome.storage.local.set({ lastFocusColor: color });
  }, DEBOUNCE_TIME);
}

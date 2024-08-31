let debounceSearch: NodeJS.Timeout | null = null;
let debounceHighlight: NodeJS.Timeout | null = null;
let debounceFocus: NodeJS.Timeout | null = null;
let debounceCaseSensitive: NodeJS.Timeout | null = null;
let debounceDiacritics: NodeJS.Timeout | null = null;
const DEBOUNCE_TIME = 300;

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

export function storeIsCaseSensitive(bool: boolean): void {
  if (debounceCaseSensitive) {
    clearTimeout(debounceCaseSensitive);
  }
  debounceCaseSensitive = setTimeout(() => {
    chrome.storage.local.set({ lastIsCaseSensitive: bool });
  }, DEBOUNCE_TIME);
}

export function storeSearchDiacritics(bool: boolean): void {
  if (debounceDiacritics) {
    clearTimeout(debounceDiacritics);
  }
  debounceDiacritics = setTimeout(() => {
    chrome.storage.local.set({ lastSearchDiacritics: bool });
  }, DEBOUNCE_TIME);
}

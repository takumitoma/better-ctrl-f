let debounceSearch: NodeJS.Timeout[] = Array(5).fill(null);
let debounceHighlight: NodeJS.Timeout[] = Array(5).fill(null);
let debounceFocus: NodeJS.Timeout[] = Array(5).fill(null);
let debounceCaseSensitive: NodeJS.Timeout | null = null;
let debounceDiacritics: NodeJS.Timeout | null = null;
const DEBOUNCE_TIME = 300;

export function storeSearchQueries(query: string, index: number): void {
  if (debounceSearch[index]) {
    clearTimeout(debounceSearch[index]);
  }
  debounceSearch[index] = setTimeout(() => {
    chrome.storage.local.get(['searchQueries'], (result) => {
      const searchQueries = result.searchQueries || Array(5).fill('');
      searchQueries[index] = query;
      chrome.storage.local.set({ searchQueries });
    });
  }, DEBOUNCE_TIME);
}

export function storeHighlightColors(color: string, index: number): void {
  if (debounceHighlight[index]) {
    clearTimeout(debounceHighlight[index]);
  }
  debounceHighlight[index] = setTimeout(() => {
    chrome.storage.local.get(['highlightColors'], (result) => {
      const highlightColors = result.highlightColors || Array(5).fill('#FFFF00');
      highlightColors[index] = color;
      chrome.storage.local.set({ highlightColors });
    });
  }, DEBOUNCE_TIME);
}

export function storeFocusColors(color: string, index: number): void {
  if (debounceFocus[index]) {
    clearTimeout(debounceFocus[index]);
  }
  debounceFocus[index] = setTimeout(() => {
    chrome.storage.local.get(['focusColors'], (result) => {
      const focusColors = result.focusColors || Array(5).fill('#FFA500');
      focusColors[index] = color;
      chrome.storage.local.set({ focusColors });
    });
  }, DEBOUNCE_TIME);
}

export function storeIsCaseSensitive(bool: boolean): void {
  if (debounceCaseSensitive) {
    clearTimeout(debounceCaseSensitive);
  }
  debounceCaseSensitive = setTimeout(() => {
    chrome.storage.local.set({ isCaseSensitive: bool });
  }, DEBOUNCE_TIME);
}

export function storeSearchDiacritics(bool: boolean): void {
  if (debounceDiacritics) {
    clearTimeout(debounceDiacritics);
  }
  debounceDiacritics = setTimeout(() => {
    chrome.storage.local.set({ searchDiacritics: bool });
  }, DEBOUNCE_TIME);
}

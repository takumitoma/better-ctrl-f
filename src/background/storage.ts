interface StorageState {
  searchQueries: string[];
  highlightColors: string[];
  focusColors: string[];
  isCaseSensitive: boolean;
  searchDiacritics: boolean;
}

let storageState: StorageState = {
  searchQueries: Array(5).fill(''),
  highlightColors: Array(5).fill('#FFFF00'),
  focusColors: Array(5).fill('#FFA500'),
  isCaseSensitive: false,
  searchDiacritics: false,
};

const DEBOUNCE_TIME = 300;

const debounceSearch: NodeJS.Timeout[] = Array(5).fill(null);
const debounceHighlight: NodeJS.Timeout[] = Array(5).fill(null);
const debounceFocus: NodeJS.Timeout[] = Array(5).fill(null);
let debounceCaseSensitive: NodeJS.Timeout | null = null;
let debounceDiacritics: NodeJS.Timeout | null = null;

chrome.storage.local.get(Object.keys(storageState), (result) => {
  storageState = { ...storageState, ...result };
});

function saveToStorage(key: keyof StorageState, value: any): void {
  chrome.storage.local.set({ [key]: value });
}

export function storeSearchQuery(query: string, index: number): void {
  if (debounceSearch[index]) {
    clearTimeout(debounceSearch[index]);
  }
  debounceSearch[index] = setTimeout(() => {
    storageState.searchQueries[index] = query;
    saveToStorage('searchQueries', storageState.searchQueries);
  }, DEBOUNCE_TIME);
}

export function storeHighlightColor(color: string, index: number): void {
  if (debounceHighlight[index]) {
    clearTimeout(debounceHighlight[index]);
  }
  debounceHighlight[index] = setTimeout(() => {
    storageState.highlightColors[index] = color;
    saveToStorage('highlightColors', storageState.highlightColors);
  }, DEBOUNCE_TIME);
}

export function storeFocusColor(color: string, index: number): void {
  if (debounceFocus[index]) {
    clearTimeout(debounceFocus[index]);
  }
  debounceFocus[index] = setTimeout(() => {
    storageState.focusColors[index] = color;
    saveToStorage('focusColors', storageState.focusColors);
  }, DEBOUNCE_TIME);
}

export function storeIsCaseSensitive(bool: boolean): void {
  if (debounceCaseSensitive) {
    clearTimeout(debounceCaseSensitive);
  }
  debounceCaseSensitive = setTimeout(() => {
    storageState.isCaseSensitive = bool;
    saveToStorage('isCaseSensitive', bool);
  }, DEBOUNCE_TIME);
}

export function storeSearchDiacritics(bool: boolean): void {
  if (debounceDiacritics) {
    clearTimeout(debounceDiacritics);
  }
  debounceDiacritics = setTimeout(() => {
    storageState.searchDiacritics = bool;
    saveToStorage('searchDiacritics', bool);
  }, DEBOUNCE_TIME);
}

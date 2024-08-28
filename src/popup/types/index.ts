export type Page = 'Main' | 'SetHighlight' | 'SetFocus';

export interface PopupContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentMatch: number;
  setCurrentMatch: (match: number) => void;
  totalMatches: number;
  setTotalMatches: (matches: number) => void;
  highlightColor: string;
  setHighlightColor: (color: string) => void;
  focusColor: string;
  setFocusColor: (color: string) => void;
  incrementMatch: () => void;
  decrementMatch: () => void;
  page: Page;
  setPage: (page: Page) => void;
}
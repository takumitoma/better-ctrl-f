import React, { createContext, useContext, useState, ReactNode } from 'react';

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

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentMatch, setCurrentMatch] = useState<number>(0);
  const [totalMatches, setTotalMatches] = useState<number>(0);
  const [highlightColor, setHighlightColor] = useState<string>('#FFFF00');
  const [focusColor, setFocusColor] = useState<string>('#FFA500');
  const [page, setPage] = useState<Page>('Main');

  function incrementMatch() {
    if (!searchQuery) return;
    setCurrentMatch((prevIndex) => {
      const newIndex = prevIndex !== totalMatches ? prevIndex + 1 : 1;
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'focus',
        index: newIndex,
      });
      return newIndex;
    });
  }

  function decrementMatch() {
    if (!searchQuery) return;
    setCurrentMatch((prevIndex) => {
      const newIndex = prevIndex === 1 ? totalMatches : prevIndex - 1;
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'focus',
        index: newIndex,
      });
      return newIndex;
    });
  }

  return (
    <PopupContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        currentMatch,
        setCurrentMatch,
        totalMatches,
        setTotalMatches,
        highlightColor,
        setHighlightColor,
        focusColor,
        setFocusColor,
        incrementMatch,
        decrementMatch,
        page,
        setPage,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export function usePopupContext(): PopupContextProps {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopupContext was used outside a PopupProvider');
  }
  return context;
}

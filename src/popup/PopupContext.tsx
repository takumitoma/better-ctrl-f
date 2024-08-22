import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentMatch: number;
  setCurrentMatch: (match: number) => void;
  totalMatches: number;
  setTotalMatches: (matches: number) => void;
  incrementMatch: () => void;
  decrementMatch: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentMatch, setCurrentMatch] = useState<number>(0);
  const [totalMatches, setTotalMatches] = useState<number>(0);

  function incrementMatch() {
    if (!searchQuery) return;
    setCurrentMatch((prevMatch) =>
      prevMatch !== totalMatches ? prevMatch + 1 : 1,
    );
  }

  function decrementMatch() {
    if (!searchQuery) return;
    setCurrentMatch((prevMatch) =>
      prevMatch === 0 ? totalMatches : prevMatch - 1,
    );
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
        incrementMatch,
        decrementMatch,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupContext = (): PopupContextProps => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopupContext was used outside a PopupProvider');
  }
  return context;
};

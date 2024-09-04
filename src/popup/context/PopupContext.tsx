import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface PopupContextProps {
  searchQueries: string[];
  setSearchQueries: Dispatch<SetStateAction<string[]>>;
  currentMatches: number[];
  setCurrentMatches: Dispatch<SetStateAction<number[]>>;
  totalMatches: number[];
  setTotalMatches: Dispatch<SetStateAction<number[]>>;
  highlightColors: string[];
  setHighlightColors: Dispatch<SetStateAction<string[]>>;
  focusColors: string[];
  setFocusColors: Dispatch<SetStateAction<string[]>>;
  incrementMatch: (index: number) => void;
  decrementMatch: (index: number) => void;
  isCaseSensitive: boolean;
  setIsCaseSensitive: Dispatch<SetStateAction<boolean>>;
  searchDiacritics: boolean;
  setSearchDiacritics: Dispatch<SetStateAction<boolean>>;
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQueries, setSearchQueries] = useState<string[]>(
    Array(5).fill(''),
  );
  const [currentMatches, setCurrentMatches] = useState<number[]>(
    Array(5).fill(0),
  );
  const [totalMatches, setTotalMatches] = useState<number[]>(Array(5).fill(0));
  const [highlightColors, setHighlightColors] = useState<string[]>(
    Array(5).fill('#FFFF00'),
  );
  const [focusColors, setFocusColors] = useState<string[]>(
    Array(5).fill('#FFA500'),
  );
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [searchDiacritics, setSearchDiacritics] = useState<boolean>(false);
  const [page, setPage] = useState<string>('Main');

  function incrementMatch(index: number) {
    if (!searchQueries[index]) return;
    setCurrentMatches((prevMatches) => {
      const newMatches = [...prevMatches];
      newMatches[index] =
        newMatches[index] !== totalMatches[index] ? newMatches[index] + 1 : 1;
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'focus',
        index: newMatches[index],
        queryIndex: index,
      });
      return newMatches;
    });
  }

  function decrementMatch(index: number) {
    if (!searchQueries[index]) return;
    setCurrentMatches((prevMatches) => {
      const newMatches = [...prevMatches];
      newMatches[index] =
        newMatches[index] === 1 ? totalMatches[index] : newMatches[index] - 1;
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'focus',
        index: newMatches[index],
        queryIndex: index,
      });
      return newMatches;
    });
  }

  return (
    <PopupContext.Provider
      value={{
        searchQueries,
        setSearchQueries,
        currentMatches,
        setCurrentMatches,
        totalMatches,
        setTotalMatches,
        highlightColors,
        setHighlightColors,
        focusColors,
        setFocusColors,
        incrementMatch,
        decrementMatch,
        isCaseSensitive,
        setIsCaseSensitive,
        searchDiacritics,
        setSearchDiacritics,
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

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface SearchContextProps {
  searchQueries: string[];
  setSearchQueries: Dispatch<SetStateAction<string[]>>;
  currentMatches: number[];
  setCurrentMatches: Dispatch<SetStateAction<number[]>>;
  totalMatches: number[];
  setTotalMatches: Dispatch<SetStateAction<number[]>>;
  incrementMatch: (index: number) => void;
  decrementMatch: (index: number) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQueries, setSearchQueries] = useState<string[]>(
    Array(5).fill(''),
  );
  const [currentMatches, setCurrentMatches] = useState<number[]>(
    Array(5).fill(0),
  );
  const [totalMatches, setTotalMatches] = useState<number[]>(Array(5).fill(0));

  function incrementMatch(index: number) {
    if (!searchQueries[index] || !totalMatches[index]) return;
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
    if (!searchQueries[index] || !totalMatches[index]) return;
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
    <SearchContext.Provider
      value={{
        searchQueries,
        setSearchQueries,
        currentMatches,
        setCurrentMatches,
        totalMatches,
        setTotalMatches,
        incrementMatch,
        decrementMatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearchContext(): SearchContextProps {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext was used outside a SearchProvider');
  }
  return context;
}

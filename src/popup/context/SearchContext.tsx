import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';

interface SearchState {
  searchQueries: string[];
  currentMatches: number[];
  totalMatches: number[];
}

type SearchAction =
  | { type: 'SET_SEARCH_QUERIES'; payload: string[] }
  | { type: 'SET_CURRENT_MATCHES'; payload: { index: number; value: number } }
  | { type: 'SET_TOTAL_MATCHES'; payload: { index: number; value: number } }
  | { type: 'INCREMENT_MATCH'; payload: number }
  | { type: 'DECREMENT_MATCH'; payload: number };

interface SearchContextProps {
  state: SearchState;
  dispatch: Dispatch<SearchAction>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

const initialState: SearchState = {
  searchQueries: Array(5).fill(''),
  currentMatches: Array(5).fill(0),
  totalMatches: Array(5).fill(0),
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  let newState: SearchState;
  switch (action.type) {
    case 'SET_SEARCH_QUERIES':
      return { ...state, searchQueries: action.payload };
    case 'SET_CURRENT_MATCHES':
      return {
        ...state,
        currentMatches: state.currentMatches.map((match, index) =>
          index === action.payload.index ? action.payload.value : match,
        ),
      };
    case 'SET_TOTAL_MATCHES':
      return {
        ...state,
        totalMatches: state.totalMatches.map((total, index) =>
          index === action.payload.index ? action.payload.value : total,
        ),
      };
    case 'INCREMENT_MATCH':
      if (state.totalMatches[action.payload] === 0) {
        return state;
      }
      newState = {
        ...state,
        currentMatches: state.currentMatches.map((match, index) =>
          index === action.payload
            ? match !== state.totalMatches[index]
              ? match + 1
              : 1
            : match,
        ),
      };
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'focus',
        index: newState.currentMatches[action.payload],
        queryIndex: action.payload,
      });
      return newState;
    case 'DECREMENT_MATCH':
      if (state.totalMatches[action.payload] === 0) {
        return state; 
      }
      newState = {
        ...state,
        currentMatches: state.currentMatches.map((match, index) =>
          index === action.payload
            ? match === 1
              ? state.totalMatches[index]
              : match - 1
            : match,
        ),
      };
      chrome.runtime.sendMessage({
        target: 'background',
        action: 'focus',
        index: newState.currentMatches[action.payload],
        queryIndex: action.payload,
      });
      return newState;
    default:
      return state;
  }
}

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
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

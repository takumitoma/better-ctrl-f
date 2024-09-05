import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface SettingsContextProps {
  isCaseSensitive: boolean;
  setIsCaseSensitive: Dispatch<SetStateAction<boolean>>;
  searchDiacritics: boolean;
  setSearchDiacritics: Dispatch<SetStateAction<boolean>>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [searchDiacritics, setSearchDiacritics] = useState<boolean>(false);

  return (
    <SettingsContext.Provider
      value={{
        isCaseSensitive,
        setIsCaseSensitive,
        searchDiacritics,
        setSearchDiacritics,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettingsContext(): SettingsContextProps {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext was used outside a SettingsProvider');
  }
  return context;
}

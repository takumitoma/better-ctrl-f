import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface SettingsContextProps {
  isCaseSensitive: boolean;
  setIsCaseSensitive: Dispatch<SetStateAction<boolean>>;
  isDiacriticsSensitive: boolean;
  setIsDiacriticsSensitive: Dispatch<SetStateAction<boolean>>;
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [isDiacriticsSensitive, setIsDiacriticsSensitive] =
    useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateTheme',
      theme,
    });
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        isCaseSensitive,
        setIsCaseSensitive,
        isDiacriticsSensitive,
        setIsDiacriticsSensitive,
        theme,
        setTheme,
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

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface NavigationContextProps {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined,
);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [page, setPage] = useState<string>('Main');

  return (
    <NavigationContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigationContext(): NavigationContextProps {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'useNavigationContext was used outside a NavigationProvider',
    );
  }
  return context;
}

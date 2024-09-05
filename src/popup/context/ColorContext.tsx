import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface ColorContextProps {
  highlightColors: string[];
  setHighlightColors: Dispatch<SetStateAction<string[]>>;
  focusColors: string[];
  setFocusColors: Dispatch<SetStateAction<string[]>>;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [highlightColors, setHighlightColors] = useState<string[]>(
    Array(5).fill('#FFFF00'),
  );
  const [focusColors, setFocusColors] = useState<string[]>(
    Array(5).fill('#FFA500'),
  );

  return (
    <ColorContext.Provider
      value={{
        highlightColors,
        setHighlightColors,
        focusColors,
        setFocusColors,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export function useColorContext(): ColorContextProps {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorContext was used outside a ColorProvider');
  }
  return context;
}

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';

interface ColorState {
  highlightColors: string[];
  focusColors: string[];
}

type ColorAction =
  | { type: 'SET_HIGHLIGHT_COLORS'; payload: string[] }
  | { type: 'SET_FOCUS_COLORS'; payload: string[] }
  | { type: 'SET_HIGHLIGHT_COLOR'; payload: { index: number; color: string } }
  | { type: 'SET_FOCUS_COLOR'; payload: { index: number; color: string } };

interface ColorContextProps {
  state: ColorState;
  dispatch: Dispatch<ColorAction>;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

const initialState: ColorState = {
  highlightColors: Array(5).fill('#FFFF00'),
  focusColors: Array(5).fill('#FFA500'),
};

function colorReducer(state: ColorState, action: ColorAction): ColorState {
  switch (action.type) {
    case 'SET_HIGHLIGHT_COLORS':
      return { ...state, highlightColors: action.payload };
    case 'SET_FOCUS_COLORS':
      return { ...state, focusColors: action.payload };
    case 'SET_HIGHLIGHT_COLOR':
      return {
        ...state,
        highlightColors: state.highlightColors.map((color, index) =>
          index === action.payload.index ? action.payload.color : color,
        ),
      };
    case 'SET_FOCUS_COLOR':
      return {
        ...state,
        focusColors: state.focusColors.map((color, index) =>
          index === action.payload.index ? action.payload.color : color,
        ),
      };
    default:
      return state;
  }
}

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(colorReducer, initialState);

  return (
    <ColorContext.Provider value={{ state, dispatch }}>
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

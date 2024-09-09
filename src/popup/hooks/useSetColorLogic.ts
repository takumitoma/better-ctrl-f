import { useEffect } from 'react';
import { useColorContext } from '../context';

type ColorType = 'highlight' | 'focus';

export const useSetColorLogic = (index: number, type: ColorType) => {
  const { state, dispatch } = useColorContext();

  const colors =
    type === 'highlight' ? state.highlightColors : state.focusColors;
  const action =
    type === 'highlight' ? 'updateHighlightColor' : 'updateFocusColor';
  const dispatchType =
    type === 'highlight' ? 'SET_HIGHLIGHT_COLOR' : 'SET_FOCUS_COLOR';

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action,
      [type + 'Color']: colors[index],
      queryIndex: index,
    });
  }, [colors, index, type, action]);

  const handleChange = (newColor: string) => {
    dispatch({
      type: dispatchType,
      payload: { index, color: newColor },
    });
  };

  return {
    color: colors[index],
    handleChange,
  };
};

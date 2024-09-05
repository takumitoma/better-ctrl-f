import React, { useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useColorContext, useNavigationContext } from '../context';
import ColorPicker from './common/ColorPicker';

interface SetHighlightPageProps {
  index: number;
}

const SetHighlightPage: React.FC<SetHighlightPageProps> = ({ index }) => {
  const { state, dispatch } = useColorContext();
  const { setPage } = useNavigationContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateHighlightColor',
      highlightColor: state.highlightColors[index],
      queryIndex: index,
    });
  }, [state.highlightColors]);

  function handleChange(newColor: string) {
    dispatch({
      type: 'SET_HIGHLIGHT_COLOR',
      payload: { index, color: newColor },
    });
  }

  return (
    <div className="set-color">
      <button
        className="goto-home"
        onClick={() => setPage('Main')}
        tabIndex={0}
      >
        <IoIosArrowRoundBack className="icon" />
        <p>Go Back</p>
      </button>
      <hr />
      <h1 className="title">
        Edit{' '}
        <span style={{ backgroundColor: state.highlightColors[index] }}>
          highlight
        </span>{' '}
        color
      </h1>
      <ColorPicker
        color={state.highlightColors[index]}
        onChange={handleChange}
      />
    </div>
  );
};

export default SetHighlightPage;

import React, { useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useColorContext, useNavigationContext } from '../context';
import ColorPicker from './common/ColorPicker';

interface SetFocusPageProps {
  index: number;
}

const SetFocusPage: React.FC<SetFocusPageProps> = ({ index }) => {
  const { state, dispatch } = useColorContext();
  const { setPage } = useNavigationContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateFocusColor',
      focusColor: state.focusColors[index],
      queryIndex: index,
    });
  }, [state.focusColors]);

  function handleChange(newColor: string) {
    dispatch({
      type: 'SET_FOCUS_COLOR',
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
        <span style={{ backgroundColor: state.focusColors[index] }}>focus</span>{' '}
        color
      </h1>
      <ColorPicker color={state.focusColors[index]} onChange={handleChange} />
    </div>
  );
};

export default SetFocusPage;

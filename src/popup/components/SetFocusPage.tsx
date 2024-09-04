import React, { useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { usePopupContext } from '../context/PopupContext';
import ColorPicker from './common/ColorPicker';

interface SetFocusPageProps {
  index: number;
}

const SetFocusPage: React.FC<SetFocusPageProps> = ({ index }) => {
  const {
    focusColors,
    setFocusColors,
    setPage,
  } = usePopupContext();

  // useEffect(() => {
  //   chrome.storage.local.get(['focusColors'], (res) => {
  //     if (res.focusColors) setFocusColors(res.focusColors);
  //   });
  // }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateFocusColor',
      focusColor: focusColors[index],
      queryIndex: index,
    });
  }, [focusColors]);

  function handleChange(newColor: string) {
    setFocusColors((prev) => {
      const newColors = [...prev];
      newColors[index] = newColor;
      return newColors;
    });
  };

  return (
    <div className="set-color">
      <button id="goto-home" onClick={() => setPage('Main')} tabIndex={0}>
        <IoIosArrowRoundBack className="icon" />
        <p>Go Back</p>
      </button>
      <hr />
      <h1 className="title">
        Edit <span style={{ backgroundColor: focusColors[index] }}>focus</span> color
      </h1>
      <ColorPicker color={focusColors[index]} onChange={handleChange} />
    </div>
  );
};

export default SetFocusPage;

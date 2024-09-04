import React, { useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { usePopupContext } from '../context/PopupContext';
import ColorPicker from './common/ColorPicker';

interface SetHighlightPageProps {
  index: number;
}

const SetHighlightPage: React.FC<SetHighlightPageProps> = ({ index }) => {
  const {
    highlightColors,
    setHighlightColors,
    setPage,
  } = usePopupContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateHighlightColor',
      highlightColor: highlightColors[index],
      queryIndex: index,
    });
  }, [highlightColors]);

  const setColor = (newColor: string) => {
    setHighlightColors((prev) => {
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
        Edit <span style={{ backgroundColor: highlightColors[index] }}>highlight</span> color {index}
      </h1>
      <ColorPicker color={highlightColors[index]} onChange={setColor} />
    </div>
  );
};

export default SetHighlightPage;

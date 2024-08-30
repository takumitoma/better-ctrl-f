import React from 'react';
import ColorPicker from '../common/ColorPicker';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { usePopupContext } from '../../context/PopupContext';

interface ColorPickerWrapperProps {
  colorType: 'highlight' | 'focus';
}

const ColorPickerWrapper: React.FC<ColorPickerWrapperProps> = ({
  colorType,
}) => {
  const {
    highlightColor,
    focusColor,
    setHighlightColor,
    setFocusColor,
    setPage,
  } = usePopupContext();

  const color = colorType === 'highlight' ? highlightColor : focusColor;
  const setColor =
    colorType === 'highlight' ? setHighlightColor : setFocusColor;

  return (
    <div>
      <button id="goto-home" onClick={() => setPage('Main')}>
        <IoIosArrowRoundBack className="icon" />
        <p>Go Back</p>
      </button>
      <hr />
      <h1 className="title">
        Edit <span style={{ backgroundColor: color }}>{colorType}</span> color
      </h1>
      <ColorPicker color={color} onChange={setColor} />
    </div>
  );
};

export default ColorPickerWrapper;

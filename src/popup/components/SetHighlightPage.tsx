import React, { useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useColorContext, useNavigationContext } from '../context';
import ColorPicker from './common/ColorPicker';

interface SetHighlightPageProps {
  index: number;
}

const SetHighlightPage: React.FC<SetHighlightPageProps> = ({ index }) => {
  const { highlightColors, setHighlightColors } = useColorContext();
  const { setPage } = useNavigationContext();

  useEffect(() => {
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateHighlightColor',
      highlightColor: highlightColors[index],
      queryIndex: index,
    });
  }, [highlightColors]);

  function handleChange(newColor: string) {
    setHighlightColors((prev) => {
      const newColors = [...prev];
      newColors[index] = newColor;
      return newColors;
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
        <span style={{ backgroundColor: highlightColors[index] }}>
          highlight
        </span>{' '}
        color
      </h1>
      <ColorPicker color={highlightColors[index]} onChange={handleChange} />
    </div>
  );
};

export default SetHighlightPage;

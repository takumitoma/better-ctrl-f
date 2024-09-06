import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigationContext } from '../context';
import ColorPicker from './common/ColorPicker';
import { useSetColorLogic } from '../hooks/useSetColorLogic';

interface SetColorPageProps {
  index: number;
  type: 'highlight' | 'focus';
}

const SetColorPage: React.FC<SetColorPageProps> = ({ index, type }) => {
  const { setPage } = useNavigationContext();
  const { color, handleChange } = useSetColorLogic(index, type);

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
        <span style={{ backgroundColor: color }}>
          {type}
        </span>{' '}
        color
      </h1>
      <ColorPicker
        color={color}
        onChange={handleChange}
      />
    </div>
  );
};

export default SetColorPage;
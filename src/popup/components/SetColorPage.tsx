import React from 'react';
import ColorPicker from './common/ColorPicker';
import GotoHomeButton from './common/GotoHomeButton';
import { useSetColorLogic } from '../hooks/useSetColorLogic';
import './SetColorPage/SetColorPage.css';

interface SetColorPageProps {
  index: number;
  type: 'highlight' | 'focus';
}

const SetColorPage: React.FC<SetColorPageProps> = ({ index, type }) => {
  const { color, handleChange } = useSetColorLogic(index, type);

  return (
    <div className="set-color">
      <GotoHomeButton />
      <hr />
      <h1 className="title">
        Edit <span style={{ backgroundColor: color }}>{type}</span> color
      </h1>
      <ColorPicker color={color} onChange={handleChange} />
    </div>
  );
};

export default SetColorPage;

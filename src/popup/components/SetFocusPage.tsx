import React from 'react';
import ColorPickerWrapper from './SetColorPage/ColorPickerWrapper';
import { useFocusColorSync } from '../hooks/useFocusColorSync';

const SetFocusPage: React.FC = () => {
  useFocusColorSync();

  return <ColorPickerWrapper colorType="focus" />;
};

export default SetFocusPage;

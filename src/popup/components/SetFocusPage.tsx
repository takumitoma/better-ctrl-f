import React from 'react';
import { ColorPickerWrapper } from './SetColorPage/ColorPickerWrapper';
import { useFocusColorSync } from '../hooks/useFocusColorSync';

export const SetFocusPage: React.FC = () => {
  useFocusColorSync();

  return <ColorPickerWrapper colorType="focus" />;
};
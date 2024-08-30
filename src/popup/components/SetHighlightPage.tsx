import React from 'react';
import ColorPickerWrapper from './SetColorPage/ColorPickerWrapper';
import { useHighlightColorSync } from '../hooks/useHighlightColorSync';

const SetHighlightPage: React.FC = () => {
  useHighlightColorSync();

  return <ColorPickerWrapper colorType="highlight" />;
};

export default SetHighlightPage;

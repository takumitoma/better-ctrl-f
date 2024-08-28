import React from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { presetColors } from '../../utils/colors';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => (
  <div className="color-picker">
    <HexColorPicker color={color} onChange={onChange} />
    <div className="swatches">
      {presetColors.map((presetColor) => (
        <button
          key={presetColor}
          className="swatch"
          style={{ background: presetColor }}
          onClick={() => onChange(presetColor)}
        />
      ))}
    </div>
    <HexColorInput color={color} onChange={onChange} />
  </div>
);
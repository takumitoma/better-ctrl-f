import { HexColorPicker, HexColorInput } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const presetColors: string[] = [
    '#FF0000', // Red
    '#008000', // Green
    '#FFFF00', // Yellow
    '#00FFFF', // Cyan
    '#FF00FF', // Magenta
    '#FFA500', // Orange
    '#800080', // Purple
    '#FFC0CB', // Pink
    '#A52A2A', // Brown
    '#D3D3D3', // Light Gray
    '#00FF00', // Lime
    '#808000', // Olive
    '#008080', // Teal
    '#800000', // Maroon
    '#40E0D0', // Turquoise
    '#FFD700', // Gold
    '#E6E6FA', // Lavender
    '#FF7F50', // Coral
  ];
  return (
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
}

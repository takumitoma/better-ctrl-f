import React from 'react';
import './GotoColorButton.css';

interface GotoColorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
  onClick: () => void;
}

const GotoColorButton: React.FC<GotoColorButtonProps> = ({
  backgroundColor,
  onClick,
  ...props
}) => (
  <button
    className="goto-color-button"
    style={{ backgroundColor }}
    onClick={onClick}
    {...props}
  />
);

export default GotoColorButton;

import React from 'react';
import './IconButton.css';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  ...props
}) => (
  <button className="icon-button" {...props}>
    <span className="icon">{icon}</span>
    {children}
  </button>
);

export default IconButton;

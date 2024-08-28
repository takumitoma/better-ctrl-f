import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ icon, children, ...props }) => (
  <button className="icon-button" {...props}>
    {icon && <span className="icon">{icon}</span>}
    {children}
  </button>
);
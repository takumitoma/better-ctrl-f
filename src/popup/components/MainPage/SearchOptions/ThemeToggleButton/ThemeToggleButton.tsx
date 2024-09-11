import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggleButton.css';

interface ThemeToggleButtonProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <button
      className="theme-toggle"
      onClick={(e) => {
        toggleTheme();
        e.currentTarget.blur();
      }}
      tabIndex={0}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun color="#FFFFFF" />}
    </button>
  );
};

export default ThemeToggleButton;

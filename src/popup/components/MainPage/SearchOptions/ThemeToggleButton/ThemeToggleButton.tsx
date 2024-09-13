import React, { useEffect } from 'react';
import { useSettingsContext } from '@context';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggleButton.css';

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useSettingsContext();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    console.log('HELLO');
    document.body.className = `${theme}-theme`;
    chrome.runtime.sendMessage({
      target: 'background',
      action: 'updateTheme',
      theme,
    });
  }, [theme]);

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

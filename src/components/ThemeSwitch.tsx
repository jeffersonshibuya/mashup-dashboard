import { Moon, Sun } from 'phosphor-react';
import React from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemeSwitch() {
  const { currentTheme, changeCurrentTheme } = React.useContext(ThemeContext);

  return (
    <button
      type="button"
      className="transition-all
        hover:text-white rounded-lg p-2"
      onClick={() =>
        changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
      }
    >
      {currentTheme === 'light' ? (
        <Moon size={18} className="text-gray-600" />
      ) : (
        <Sun size={18} className="text-white" />
      )}
    </button>
  );
}

export default ThemeSwitch;

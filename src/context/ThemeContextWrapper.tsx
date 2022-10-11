/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import { useState, useEffect, FC, ReactNode } from 'react';
import ThemeContext from './ThemeContext';

const ThemeContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  );

  const changeCurrentTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (theme === 'light') document.body.classList.remove('dark');
    else document.body.classList.add('dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;

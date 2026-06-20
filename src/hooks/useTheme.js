import { useState, useEffect } from 'react';
import { loadTheme, saveTheme } from '../utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // 1. Check local storage
    const saved = loadTheme();
    if (saved) return saved;

    // 2. Check system preferences
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }

    return 'light';
  });

  useEffect(() => {
    // Apply dataset attribute to documentElement
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};

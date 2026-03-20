import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const THEMES = [
  { id: 'dark',    label: 'Dark',    emoji: '🌑', color: '#6366f1' },
  { id: 'ocean',   label: 'Ocean',   emoji: '🌊', color: '#0ea5e9' },
  { id: 'emerald', label: 'Emerald', emoji: '🌿', color: '#10b981' },
  { id: 'rose',    label: 'Rose',    emoji: '🌸', color: '#f43f5e' },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

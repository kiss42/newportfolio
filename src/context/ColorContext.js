import React, { createContext, useState, useContext, useEffect } from 'react';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

// Extended color schemes with onPrimary and onSecondary for contrast control
export const colorSchemes = {
  default: {
    background: 'black',      // page background
    primary: '#9333ea',       // main accent
    secondary: '#6b21a8',     // secondary accent
    text: '#ffffff',          // text on background
    onPrimary: '#ffffff',     // text on primary buttons, etc.
    onSecondary: '#ffffff',   // text on secondary backgrounds
  },
  navy: {
    background: '#1e3a8a',
    primary: '#60a5fa',
    secondary: '#3b82f6',
    text: '#f8fafc',
    onPrimary: '#1e3a8a',
    onSecondary: '#f8fafc',
  },
  skyBlue: {
    background: '#dbeafe',
    primary: '#2563eb',
    secondary: '#60a5fa',
    text: '#1e293b',
    onPrimary: '#ffffff',
    onSecondary: '#1e293b',
  },
  sage: {
    background: '#d1fae5',
    primary: '#059669',
    secondary: '#34d399',
    text: '#1e293b',
    onPrimary: '#ffffff',
    onSecondary: '#1e293b',
  },
  warmGray: {
    background: '#f5f5f4',
    primary: '#78716c',
    secondary: '#a8a29e',
    text: '#1e293b',
    onPrimary: '#ffffff',
    onSecondary: '#1e293b',
  },
  black: {
    background: 'black',
    primary: '#ffffff',
    secondary: '#444444',
    text: '#ffffff',
    onPrimary: '#000000',
    onSecondary: '#ffffff',
  },
};

export const ColorProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes.default);

  useEffect(() => {
    const saved = localStorage.getItem('preferredColorScheme');
    if (saved && colorSchemes[saved]) {
      setColorScheme(colorSchemes[saved]);
    }
  }, []);

  const changeColorScheme = (schemeName) => {
    const scheme = colorSchemes[schemeName];
    if (scheme) {
      setColorScheme(scheme);
      localStorage.setItem('preferredColorScheme', schemeName);
    }
  };

  return (
    <ColorContext.Provider value={{ colorScheme, changeColorScheme }}>
      {children}
    </ColorContext.Provider>
  );
};

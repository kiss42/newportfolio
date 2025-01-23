import React, { createContext, useState, useContext } from 'react';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

export const colorSchemes = {
  default: {
    background: 'black', // Default background
    primary: '#9333ea', // Purple
    secondary: '#6b21a8', // Dark purple
    text: '#ffffff', // White text
  },
  navy: {
    background: '#1e3a8a',
    primary: '#60a5fa',
    secondary: '#3b82f6',
    text: '#f8fafc',
  },
  skyBlue: {
    background: '#dbeafe',
    primary: '#2563eb',
    secondary: '#60a5fa',
    text: '#1e293b',
  },
  sage: {
    background: '#d1fae5',
    primary: '#059669',
    secondary: '#34d399',
    text: '#1e293b',
  },
  warmGray: {
    background: '#f5f5f4',
    primary: '#78716c',
    secondary: '#a8a29e',
    text: '#1e293b',
  },
  black: {
    background: 'black',
    primary: '#ffffff', // White for accents
    secondary: '#444444', // Dark gray
    text: '#ffffff', // White text
  },
};

export const ColorProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes.default);

  const changeColorScheme = (schemeName) => {
    setColorScheme(colorSchemes[schemeName]);
  };

  return (
    <ColorContext.Provider value={{ colorScheme, changeColorScheme }}>
      {children}
    </ColorContext.Provider>
  );
};

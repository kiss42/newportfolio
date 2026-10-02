import React, { createContext, useState, useContext, useEffect } from 'react';
import { schemeFromAccent } from '../utilities/color';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

// Extended color schemes with onPrimary and onSecondary for contrast control
export const colorSchemes = {
  default: {
    isDark: true,
    background: '#07050d',    // page background
    primary: '#9333ea',       // main accent
    secondary: '#6b21a8',     // secondary accent
    text: '#ffffff',          // text on background
    onPrimary: '#ffffff',     // text on primary buttons, etc.
    onSecondary: '#ffffff',   // text on secondary backgrounds
  },
  navy: {
    isDark: true,
    background: '#1e3a8a',
    primary: '#60a5fa',
    secondary: '#3b82f6',
    text: '#f8fafc',
    onPrimary: '#1e3a8a',
    onSecondary: '#f8fafc',
  },
  skyBlue: {
    isDark: false,
    background: '#dbeafe',
    primary: '#2563eb',
    secondary: '#60a5fa',
    text: '#1e293b',
    onPrimary: '#ffffff',
    onSecondary: '#1e293b',
  },
  sage: {
    isDark: false,
    background: '#d1fae5',
    primary: '#059669',
    secondary: '#34d399',
    text: '#1e293b',
    onPrimary: '#ffffff',
    onSecondary: '#1e293b',
  },
  warmGray: {
    isDark: false,
    background: '#f5f5f4',
    primary: '#78716c',
    secondary: '#a8a29e',
    text: '#1e293b',
    onPrimary: '#ffffff',
    onSecondary: '#1e293b',
  },
  black: {
    isDark: true,
    background: '#000000',
    primary: '#ffffff',
    secondary: '#8f8f8f', // light enough that gradients ending in it stay readable on black
    text: '#ffffff',
    onPrimary: '#000000',
    onSecondary: '#ffffff',
  },
  sunset: {
    isDark: true,
    background: '#0c0604',
    primary: '#f97316',
    secondary: '#9a3412',
    text: '#ffffff',
    onPrimary: '#0b0b12',
    onSecondary: '#ffffff',
  },
  rose: {
    isDark: true,
    background: '#0d0408',
    primary: '#f43f5e',
    secondary: '#9f1239',
    text: '#ffffff',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
  },
  aqua: {
    isDark: true,
    background: '#03090c',
    primary: '#22d3ee',
    secondary: '#0e7490',
    text: '#ffffff',
    onPrimary: '#0b0b12',
    onSecondary: '#ffffff',
  },
};

export const schemeLabels = {
  default: 'Violet',
  navy: 'Navy',
  skyBlue: 'Sky',
  sage: 'Sage',
  warmGray: 'Stone',
  black: 'Mono',
  sunset: 'Sunset',
  rose: 'Rose',
  aqua: 'Aqua',
};

const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null; // Storage can be unavailable (private mode, blocked cookies).
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Ignore storage failures; the scheme still applies for this visit.
  }
};

export const ColorProvider = ({ children }) => {
  // New visitors start on the black theme; a saved choice from the picker overrides it.
  const [schemeName, setSchemeName] = useState('black');
  const [custom, setCustom] = useState({ primary: '#9333ea', isDark: true });
  // A scheme shown temporarily while hovering a swatch; never persisted.
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const saved = read('preferredColorScheme');
    try {
      const savedCustom = JSON.parse(read('customColorScheme'));
      if (savedCustom && /^#[0-9a-f]{6}$/i.test(savedCustom.primary)) {
        setCustom({ primary: savedCustom.primary, isDark: !!savedCustom.isDark });
      }
    } catch (e) {
      // Ignore malformed saved data.
    }
    if (saved && (colorSchemes[saved] || saved === 'custom')) setSchemeName(saved);
  }, []);

  const activeScheme = schemeName === 'custom' ? schemeFromAccent(custom.primary, custom.isDark) : colorSchemes[schemeName];
  const colorScheme = preview || activeScheme;

  const changeColorScheme = (name) => {
    if (!colorSchemes[name]) return;
    setPreview(null);
    setSchemeName(name);
    write('preferredColorScheme', name);
  };

  const setCustomScheme = (next) => {
    const value = { ...custom, ...next };
    setPreview(null);
    setCustom(value);
    setSchemeName('custom');
    write('customColorScheme', JSON.stringify(value));
    write('preferredColorScheme', 'custom');
  };

  return (
    <ColorContext.Provider value={{ colorScheme, schemeName, custom, changeColorScheme, setCustomScheme, setPreview }}>
      {children}
    </ColorContext.Provider>
  );
};

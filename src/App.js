import React, { useEffect } from 'react';
import { ColorProvider, useColor } from './context/ColorContext';
import Home from './components/Home';
import ColorPicker from './components/ColorPicker';
import { withAlpha } from './utilities/color';

const AppContent = () => {
  const { colorScheme } = useColor();
  const dark = colorScheme.isDark;

  // Expose the active scheme as CSS variables so every component (and plain CSS) can theme itself.
  const themeVars = {
    '--bg': colorScheme.background,
    '--primary': colorScheme.primary,
    '--secondary': colorScheme.secondary,
    '--text': colorScheme.text,
    '--on-primary': colorScheme.onPrimary,
    '--muted': withAlpha(colorScheme.text, 0.68),
    '--faint': withAlpha(colorScheme.text, 0.4),
    '--surface': dark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.55)',
    '--surface-strong': dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.8)',
    '--border': dark ? 'rgba(255, 255, 255, 0.1)' : withAlpha(colorScheme.text, 0.12),
    '--glow': withAlpha(colorScheme.primary, dark ? 0.35 : 0.22),
    '--glow-soft': withAlpha(colorScheme.primary, dark ? 0.14 : 0.1),
  };

  useEffect(() => {
    document.body.style.background = colorScheme.background;
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  }, [colorScheme.background, dark]);

  return (
    <div className="App" style={{ ...themeVars, background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <Home />
      <ColorPicker />
    </div>
  );
};

function App() {
  return (
    <ColorProvider>
      <AppContent />
    </ColorProvider>
  );
}

export default App;

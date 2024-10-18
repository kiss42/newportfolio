import React from 'react';
import { ColorProvider, useColor } from './context/ColorContext';
import Home from './components/Home';
import ColorPicker from './components/ColorPicker';

const AppContent = () => {
  const { colorScheme } = useColor();

  return (
    <div className="App" style={{ 
      background: colorScheme.background, 
      minHeight: '100vh',
      color: colorScheme.text // This ensures text color is consistent throughout the app
    }}>
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

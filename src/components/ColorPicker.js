import React, { useState } from 'react';
import { useColor, colorSchemes } from '../context/ColorContext';
import { FaPalette } from 'react-icons/fa';

const ColorPicker = () => {
  const { changeColorScheme, colorScheme } = useColor();
  const [isOpen, setIsOpen] = useState(false);

  const togglePicker = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePicker}
        className="bg-white p-2 rounded-full shadow-lg focus:outline-none"
        style={{ color: colorScheme.primary }}
      >
        <FaPalette size={24} />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-lg p-4 mt-2">
          <h3 className="text-sm font-bold mb-2" style={{ color: colorScheme.text }}>Choose Color Scheme</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(colorSchemes).map(([schemeName, scheme]) => (
              <button
                key={schemeName}
                className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ background: scheme.background }}
                onClick={() => {
                  changeColorScheme(schemeName);
                  setIsOpen(false);
                }}
                title={schemeName.charAt(0).toUpperCase() + schemeName.slice(1)}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

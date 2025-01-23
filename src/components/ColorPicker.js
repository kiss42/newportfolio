import React, { useState } from 'react';
import { useColor, colorSchemes } from '../context/ColorContext';
import { FaPalette } from 'react-icons/fa';

const ColorPicker = () => {
  const { changeColorScheme, colorScheme } = useColor();
  const [isOpen, setIsOpen] = useState(false);

  const togglePicker = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main Button to Toggle Color Picker */}
      <button
        onClick={togglePicker}
        className="bg-gray-800 p-2 rounded-full shadow-lg focus:outline-none"
        style={{ color: colorScheme.primary }}
      >
        <FaPalette size={24} />
      </button>

      {/* Dropdown to Select Color Schemes */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-gray-900 text-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-bold mb-4" style={{ color: colorScheme.text }}>
            Choose Color Scheme
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(colorSchemes).map(([schemeName, scheme]) => (
              <button
                key={schemeName}
                className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-110"
                style={{
                  background: scheme.primary, // Primary color for button background
                  border: `2px solid ${scheme.secondary}`, // Secondary color for border
                }}
                onClick={() => {
                  changeColorScheme(schemeName);
                  setIsOpen(false); // Close picker after selection
                }}
                title={schemeName.charAt(0).toUpperCase() + schemeName.slice(1)} // Capitalize name for tooltip
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

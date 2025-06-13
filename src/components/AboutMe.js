import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import resumePDF from '../assets/Steven-Pierre-Resume.pdf';
import { useColor } from '../context/ColorContext';

// Utility: checks if color is "white" or very light for visibility fix
function isLightColor(color) {
  if (!color) return false;
  const c = color.toLowerCase();
  if (c === "#fff" || c === "#ffffff" || c === "white") return true;
  if (c.startsWith('#') && c.length === 7) {
    const r = parseInt(c.slice(1, 3), 16);
    const g = parseInt(c.slice(3, 5), 16);
    const b = parseInt(c.slice(5, 7), 16);
    return r > 220 && g > 220 && b > 220;
  }
  return false;
}

const AboutMe = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorScheme } = useColor();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(ref, () => ({
    openMenu: () => setIsOpen(true),
    closeMenu: () => setIsOpen(false),
  }));

  return (
    <div>
      {/* Sidebar */}
      <div
        className="fixed top-0 left-0 w-72 h-full shadow-lg transition-transform transform z-50 duration-300 ease-in-out"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          backgroundColor: colorScheme.background,
          color: colorScheme.text,
        }}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full shadow-md hover:scale-105 hover:opacity-90 transition-all duration-300"
            style={{
              backgroundColor: colorScheme.primary,
              color: isLightColor(colorScheme.primary) ? '#222' : colorScheme.text,
            }}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-5 mt-16 space-y-4">
          <h2 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
            About Me
          </h2>

          <p className="text-sm leading-relaxed">
            Hi, I'm Steven Pierre, a Desktop Support Technician with a decade of experience in IT support and development using React and Node.js.
          </p>

          <p className="text-sm leading-relaxed">
            Currently, I'm a Field Service Technician at AgusIT, managing customer equipment repairs and preventative maintenance, while delivering excellent customer service.
          </p>

          <p className="text-sm leading-relaxed">
            As a freelance React Developer, I've modernized web applications using React and Node.js, focusing on speed and performance.
          </p>

          {/* Resume Download Button */}
          <a
            href={resumePDF}
            download="Steven-Pierre-Resume.pdf"
            className="block text-center py-2 px-4 font-semibold mt-6 transition-all"
            style={{
              backgroundColor: 'transparent',
              color: colorScheme.primary,
              border: 'none',
              textDecoration: 'none',
              outline: 'none',
              boxShadow: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Download My Resume
          </a>
        </div>
      </div>
    </div>
  );
});

export default AboutMe;

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import profileImage from '../assets/profile.jpg'; // Adjust path as necessary
import resumePDF from '../assets/Steven-Pierre-Resume.pdf'; // Import the resume PDF
import { useColor } from '../context/ColorContext'; // Import useColor hook

const AboutMe = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorScheme } = useColor(); // Use the color scheme

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Making the close and open functionality accessible from parent components
  useImperativeHandle(ref, () => ({
    openMenu: () => setIsOpen(true),
    closeMenu: () => setIsOpen(false),
  }));

  return (
    <div>
      {/* Profile Picture to open the sidebar */}
      <div className="absolute top-4 left-4 z-50">
        <img
          src={profileImage}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-white cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full shadow-lg transition-transform transform z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } duration-300 ease-in-out`}
        style={{ 
          backgroundColor: colorScheme.background.startsWith('linear-gradient') 
            ? 'white' // Use a solid color if the background is a gradient
            : colorScheme.background,
          color: colorScheme.text 
        }}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-60"> {/* Ensure it's on top */}
          <button
            onClick={toggleMenu}
            className="focus:outline-none p-2 rounded"
            style={{ color: colorScheme.primary }}
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 mt-12">
          <h2 className="text-xl font-bold mb-2" style={{ color: colorScheme.primary }}>About Me</h2>
          <p className="text-sm mb-3">
            Hi, I'm Steven Pierre, a Desktop Support Technician with a decade of experience in IT support and development using React and Node.js.
          </p>
          <p className="text-sm mb-3">
            Currently, I'm a Field Service Technician at AgusIT, managing customer equipment repairs and preventative maintenance, while delivering excellent customer service.
          </p>
          <p className="text-sm mb-3">
            As a freelance React Developer, I've modernized web applications using React and Node.js, focusing on speed and performance.
          </p>

          {/* Resume Download Button */}
          <a
            href={resumePDF}
            download="Steven-Pierre-Resume.pdf"
            className="block mt-6 text-center py-2 px-4 rounded"
            style={{ backgroundColor: colorScheme.primary, color: 'white' }}
          >
            Download My Resume
          </a>
        </div>
      </div>
    </div>
  );
});

export default AboutMe;

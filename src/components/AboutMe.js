import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import resumePDF from '../assets/Steven-Pierre-Resume.pdf';

const AboutMe = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Sidebar Menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Allow parent components to open or close the sidebar
  useImperativeHandle(ref, () => ({
    openMenu: () => setIsOpen(true),
    closeMenu: () => setIsOpen(false),
  }));

  return (
    <div>
      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full shadow-lg transition-transform transform z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } duration-300 ease-in-out bg-black text-white`}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleMenu}
            className="focus:outline-none p-2 rounded text-primary"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 mt-12">
          <h2 className="text-xl font-bold mb-2 text-primary">About Me</h2>
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
            className="block mt-6 text-center py-2 px-4 rounded bg-primary text-white hover:bg-opacity-90"
          >
            Download My Resume
          </a>
        </div>
      </div>
    </div>
  );
});

export default AboutMe;

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon

// Using forwardRef to expose toggleMenu to the parent component (Home)
const AboutMe = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the side menu
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Use useImperativeHandle to expose toggleMenu to the parent
  useImperativeHandle(ref, () => ({
    openMenu: () => setIsOpen(true),
    closeMenu: () => setIsOpen(false),
  }));

  return (
    <div>
      {/* Profile Picture */}
      <div className="absolute top-4 left-4 z-20">
        <img 
          src="/assets/profile.jpg" 
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-white cursor-pointer"
          onClick={toggleMenu} // Open side menu when clicked
        />
      </div>

      {/* Side Menu with transparent background */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 bg-opacity-70 text-white shadow-lg transition-transform transform duration-300 ease-in-out z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-40">
          <button
            onClick={toggleMenu} // Close side menu on click
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Side Menu Content */}
        <div className="p-4 mt-8"> {/* Added margin-top to avoid overlapping */}
          <h2 className="text-xl font-bold mb-2">About Me</h2>
          <p className="text-xs mb-3">
            Hi, I'm Steven Pierre, a Desktop Support Technician with a decade of experience in IT support and development using React and Node.js.
          </p>
          <p className="text-xs mb-3">
            Currently, I'm a Field Service Technician at AgusIT, managing customer equipment repairs and preventative maintenance, while delivering excellent customer service.
          </p>
          <p className="text-xs mb-3">
            As a freelance React Developer, I've modernized web applications using React and Node.js, focusing on speed and performance.
          </p>

          {/* Download Resume Button */}
          <a
            href="/assets/Steven-Pierre-Resume.pdf" // Path to your resume file
            download
            className="block mt-6 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Download My Resume
          </a>
        </div>
      </div>
    </div>
  );
});

export default AboutMe;
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaFolderOpen } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdContactMail } from 'react-icons/md';
import profileImage from '../assets/profile.jpg';
import { useColor } from '../context/ColorContext';

const Navbar = ({ aboutMeRef, activeButton, setActiveButton, scrollToSection, refs }) => {
  const { colorScheme } = useColor();

  const handleAboutClick = () => {
    aboutMeRef.current.openMenu();
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 py-4 px-6 flex justify-between items-center z-20"
      style={{
        color: colorScheme.text,
      }}
    >
      {/* Profile Picture */}
      <div
        className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 flex-shrink-0"
        style={{ borderColor: colorScheme.primary }}
        onClick={handleAboutClick}
      >
        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-6">
        {[
          { name: 'home', icon: AiFillHome, label: 'Home', ref: null },
          { name: 'about', icon: FaUser, label: 'About', onClick: handleAboutClick },
          { name: 'skills', icon: GiSkills, label: 'Skills', ref: refs.skillsRef },
          { name: 'projects', icon: FaFolderOpen, label: 'Projects', ref: refs.projectsRef },
          { name: 'support', icon: MdContactMail, label: 'Support', ref: refs.supportRef },
          { name: 'contact', icon: MdContactMail, label: 'Contact', ref: refs.contactRef },
        ].map((item) => (
          <button
            key={item.name}
            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300`}
            style={{
              color: activeButton === item.name ? colorScheme.text : colorScheme.primary, // Text color changes based on active state
              backgroundColor: activeButton === item.name ? colorScheme.primary : 'transparent', // Background color for active button
              border: activeButton === item.name ? `2px solid ${colorScheme.secondary}` : 'none', // Add border for active
            }}
            onClick={item.onClick || (() => scrollToSection(item.ref, item.name))}
          >
            <item.icon className="mr-2 text-lg" />
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

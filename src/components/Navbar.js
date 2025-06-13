import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaFolderOpen, FaLaptopCode } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdContactMail } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import profileImage from '../assets/profile.jpg';
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

const Navbar = ({ aboutMeRef, activeButton, setActiveButton, scrollToSection, refs }) => {
  const { colorScheme } = useColor();

  const handleAboutClick = () => {
    aboutMeRef.current?.openMenu();
    setActiveButton('about');
  };

  const navItems = [
    { name: 'projects', icon: FaFolderOpen, label: 'Projects', ref: refs.projectsRef },
    { name: 'websites', icon: FaLaptopCode, label: 'Websites', ref: refs.webdevRef },
    { name: 'skills', icon: GiSkills, label: 'Skills', ref: refs.skillsRef },
    { name: 'testimonials', icon: RiTeamLine, label: 'Testimonials', ref: null },
    { name: 'support', icon: BiSupport, label: 'Support', ref: refs.supportRef },
    { name: 'contact', icon: MdContactMail, label: 'Contact', ref: refs.contactRef },
    { name: 'about', icon: FaUser, label: 'About', onClick: handleAboutClick },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 py-4 px-6 flex justify-between items-center z-20 backdrop-blur-md"
      style={{
        backgroundColor: 'transparent',
        color: colorScheme.text,
      }}
    >
      {/* Profile Image - Sidebar Toggle */}
      <div
        className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 flex-shrink-0"
        style={{ borderColor: colorScheme.primary }}
        onClick={handleAboutClick}
      >
        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-3">
        {navItems.map((item) => {
          const isActive = activeButton === item.name;
          const isPrimaryLight = isLightColor(colorScheme.primary);
          const activeTextColor = isPrimaryLight ? "#222" : colorScheme.text;
          return (
            <button
              key={item.name}
              className="flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300"
              style={{
                color: isActive ? activeTextColor : colorScheme.primary,
                backgroundColor: isActive ? colorScheme.primary : 'transparent',
                border: 'none',
                textDecoration: 'none', // <- Remove all underline
                textUnderlineOffset: undefined,
                textDecorationThickness: undefined,
              }}
              onClick={item.onClick || (() => scrollToSection(item.ref, item.name))}
            >
              <item.icon className="mr-2 text-lg" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;

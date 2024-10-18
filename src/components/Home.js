import React, { useRef, useState } from 'react';
import { AiFillHome, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaUser, FaFolderOpen } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdContactMail } from 'react-icons/md';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Testimonials from './Testimonials';
import AboutMe from './AboutMe';
import Support from './Support'; // Import Support component
import useObserver from '../utilities/useObserver'; // Custom hook for visibility
import { useColor } from '../context/ColorContext'; // Import color context

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Track if menu is open for mobile
  const [activeButton, setActiveButton] = useState('home'); // Track the active button
  const aboutMeRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const supportRef = useRef(); // Ref for Support section
  const contactRef = useRef();
  const { color } = useColor(); // Get the color from context

  const isSkillsVisible = useObserver(skillsRef);
  const isProjectsVisible = useObserver(projectsRef);
  const isSupportVisible = useObserver(supportRef); // Visibility for Support
  const isContactVisible = useObserver(contactRef);

  // Function to handle About link click
  const handleAboutClick = (e) => {
    e.preventDefault();
    setActiveButton('about'); // Set active button
    aboutMeRef.current.openMenu(); // This opens the About Me sidebar
    setMenuOpen(false); // Close the menu on mobile
  };

  // Function to smoothly scroll to the target section
  const scrollToSection = (ref, buttonName) => {
    setActiveButton(buttonName); // Set the clicked button as active
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
    setMenuOpen(false); // Close the menu on mobile
  };

  // Use the color in your styles
  const gradientClass = `bg-gradient-to-br from-${color}-100 via-${color}-200 to-${color}-600`;

  return (
    <div className={`min-h-screen ${gradientClass}`}>
      {/* About Me Sidebar Menu */}
      <AboutMe ref={aboutMeRef} />

      {/* Hamburger Menu for Mobile */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 hover:text-purple-700 text-3xl bg-transparent"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex sm:flex-row justify-center items-center p-4 w-full transition-all duration-300 ${
          menuOpen
            ? 'flex-row flex-wrap bg-white bg-opacity-90 shadow-md'
            : 'hidden sm:flex'
        }`}
      >
        {[
          { name: 'home', icon: AiFillHome, label: 'Home', ref: document.getElementById('home') },
          { name: 'about', icon: FaUser, label: 'About', onClick: handleAboutClick },
          { name: 'skills', icon: GiSkills, label: 'Skills', ref: skillsRef },
          { name: 'projects', icon: FaFolderOpen, label: 'Projects', ref: projectsRef },
          { name: 'support', icon: MdContactMail, label: 'Support', ref: supportRef },
          { name: 'contact', icon: MdContactMail, label: 'Contact', ref: contactRef },
        ].map((item) => (
          <button
            key={item.name}
            className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 m-1 rounded bg-transparent ${
              activeButton === item.name ? 'border border-purple-700 text-purple-700' : ''
            }`}
            onClick={item.onClick || (() => scrollToSection(item.ref, item.name))}
          >
            <item.icon className="mr-2" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Add padding to the top so the content doesn't overlap with the navbar */}
      <div className="pt-20"></div>

      {/* Home Section */}
      <div id="home" className="pt-16"></div> {/* Offset for navbar */}

      {/* Skills Section */}
      <div
        id="skills"
        ref={skillsRef}
        className={`text-gray-900 flex items-center justify-center py-12 px-4 transition-opacity duration-500 ${
          isSkillsVisible ? 'opacity-100 animate-fadeIn' : 'opacity-0'
        }`}
      >
        <Skills />
      </div>

      {/* Projects Section */}
      <div
        id="projects"
        ref={projectsRef}
        className={`text-gray-900 py-12 px-4 transition-opacity duration-500 ${
          isProjectsVisible ? 'opacity-100 animate-slideInRight' : 'opacity-0'
        }`}
      >
        <Projects />
      </div>

      {/* Testimonials Section */}
      <div className="py-12">
        <Testimonials />
      </div>

      {/* Support Section */}
      <div
        id="support"
        ref={supportRef}
        className={`text-gray-900 py-12 px-4 transition-opacity duration-500 ${
          isSupportVisible ? 'opacity-100 animate-slideInLeft' : 'opacity-0'
        }`}
      >
        <Support />
      </div>

      {/* Contact Section */}
      <div
        id="contact"
        ref={contactRef}
        className={`text-gray-900 py-12 px-4 transition-opacity duration-500 ${
          isContactVisible ? 'opacity-100 animate-bounceIn' : 'opacity-0'
        }`}
      >
        <Contact />
      </div>
    </div>
  );
};

export default Home;

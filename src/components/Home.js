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

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Track if menu is open for mobile
  const [activeButton, setActiveButton] = useState('home'); // Track the active button
  const aboutMeRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const supportRef = useRef(); // Ref for Support section
  const contactRef = useRef();

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

  return (
    <div className="bg-gradient-to-br from-gray-100 via-purple-200 to-purple-600 min-h-screen">
      {/* About Me Sidebar Menu */}
      <AboutMe ref={aboutMeRef} />

      {/* Hamburger Menu for Mobile */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 hover:text-purple-700 text-3xl"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-x-0 sm:space-y-0 space-y-4 p-4 w-full transition-transform duration-300 ${
          menuOpen ? 'transform translate-y-0' : 'transform -translate-y-full sm:translate-y-0'
        }`}
      >
        {/* Home link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent ${
            activeButton === 'home' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(document.getElementById('home'), 'home')}
        >
          <AiFillHome className="mr-2" />
          Home
        </button>

        {/* About link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent ${
            activeButton === 'about' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={handleAboutClick}
        >
          <FaUser className="mr-2" />
          About
        </button>

        {/* Skills link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent ${
            activeButton === 'skills' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(skillsRef, 'skills')}
        >
          <GiSkills className="mr-2" />
          Skills
        </button>

        {/* Projects link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent ${
            activeButton === 'projects' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(projectsRef, 'projects')}
        >
          <FaFolderOpen className="mr-2" />
          Projects
        </button>

        {/* Support link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent ${
            activeButton === 'support' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(supportRef, 'support')}
        >
          <MdContactMail className="mr-2" />
          Support
        </button>

        {/* Contact link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent ${
            activeButton === 'contact' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(contactRef, 'contact')}
        >
          <MdContactMail className="mr-2" />
          Contact
        </button>
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

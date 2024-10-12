import React, { useRef, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaFolderOpen } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdContactMail } from 'react-icons/md';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Testimonials from './Testimonials';
import AboutMe from './AboutMe';
import useObserver from '../utilities/useObserver'; // Custom hook for visibility

const Home = () => {
  const [activeButton, setActiveButton] = useState('home'); // State to track the active button
  const aboutMeRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();

  const isSkillsVisible = useObserver(skillsRef);
  const isProjectsVisible = useObserver(projectsRef);
  const isContactVisible = useObserver(contactRef);

  // Function to handle About link click
  const handleAboutClick = (e) => {
    e.preventDefault();
    setActiveButton('about'); // Set active button
    aboutMeRef.current.openMenu(); // This opens the About Me sidebar
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
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-purple-200 to-purple-600 min-h-screen">
      {/* About Me Sidebar Menu */}
      <AboutMe ref={aboutMeRef} />

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-center items-center p-4 space-x-4 sm:space-x-6 animate-slideInLeft">
        {/* Home link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent hover:bg-transparent ${
            activeButton === 'home' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(document.getElementById('home'), 'home')}
        >
          <AiFillHome className="mr-2" />
        </button>

        {/* About link - opens About Me menu */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent hover:bg-transparent ${
            activeButton === 'about' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={handleAboutClick}
        >
          <FaUser className="mr-2" />
        </button>

        {/* Skills link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent hover:bg-transparent ${
            activeButton === 'skills' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(skillsRef, 'skills')}
        >
          <GiSkills className="mr-2" />
        </button>

        {/* Projects link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent hover:bg-transparent ${
            activeButton === 'projects' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(projectsRef, 'projects')}
        >
          <FaFolderOpen className="mr-2" />
        </button>

        {/* Contact link */}
        <button
          className={`text-gray-700 hover:text-purple-700 text-lg flex items-center p-2 rounded bg-transparent hover:bg-transparent ${
            activeButton === 'contact' ? 'border border-purple-700 text-purple-700' : ''
          }`}
          onClick={() => scrollToSection(contactRef, 'contact')}
        >
          <MdContactMail className="mr-2" />
        </button>
      </nav>

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

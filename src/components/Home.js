import React, { useRef } from 'react';
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
    aboutMeRef.current.openMenu();
  };

  // Function to scroll to the target section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-100 via-purple-200 to-purple-600 min-h-screen"
    >
      {/* About Me Sidebar Menu */}
      <AboutMe ref={aboutMeRef} />

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-center items-center p-4 space-x-4 sm:space-x-6 animate-slideInLeft">
        <a href="#home" className="text-gray-700 hover:text-purple-700 text-lg flex items-center">
          <AiFillHome className="mr-2" />
        </a>
        <a href="#about" className="text-gray-700 hover:text-purple-700 text-lg flex items-center" onClick={handleAboutClick}>
          <FaUser className="mr-2" />
        </a>
        <a href="#skills" className="text-gray-700 hover:text-purple-700 text-lg flex items-center" onClick={() => scrollToSection(skillsRef)}>
          <GiSkills className="mr-2" />
        </a>
        <a href="#projects" className="text-gray-700 hover:text-purple-700 text-lg flex items-center" onClick={() => scrollToSection(projectsRef)}>
          <FaFolderOpen className="mr-2" />
        </a>
        <a href="#contact" className="text-gray-700 hover:text-purple-700 text-lg flex items-center" onClick={() => scrollToSection(contactRef)}>
          <MdContactMail className="mr-2" />
        </a>
      </nav>

      <div id="home" className="pt-16"></div> {/* Offset for navbar */}

      {/* Skills Section */}
      <div
        id="skills"
        ref={skillsRef}
        className={`text-gray-900 flex items-center justify-center py-12 px-4 transition-opacity duration-500 ${isSkillsVisible ? 'opacity-100 animate-fadeIn' : 'opacity-0'}`}
      >
        <Skills />
      </div>

      {/* Projects Section */}
      <div
        id="projects"
        ref={projectsRef}
        className={`text-gray-900 py-12 px-4 transition-opacity duration-500 ${isProjectsVisible ? 'opacity-100 animate-slideInRight' : 'opacity-0'}`}
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
        className={`text-gray-900 py-12 px-4 transition-opacity duration-500 ${isContactVisible ? 'opacity-100 animate-bounceIn' : 'opacity-0'}`}
      >
        <Contact />
      </div>
    </div>
  );
};

export default Home;
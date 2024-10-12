import React, { useRef } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaFolderOpen } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdContactMail } from 'react-icons/md';
import PageWrapper from '../utilities/PageWrapper'; // Import PageWrapper
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Testimonials from './Testimonials';
import AboutMe from './AboutMe';
import useObserver from '../utilities/useObserver';

const Home = () => {
  const aboutMeRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();

  const isSkillsVisible = useObserver(skillsRef);
  const isProjectsVisible = useObserver(projectsRef);
  const isContactVisible = useObserver(contactRef);

  const handleAboutClick = (e) => {
    e.preventDefault();
    aboutMeRef.current.openMenu();
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      <div className="bg-gradient-to-br from-gray-100 via-purple-200 to-purple-600 min-h-screen">
        <AboutMe ref={aboutMeRef} />

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

        <div id="home" className="pt-16"></div>

        <div
          id="skills"
          ref={skillsRef}
          className={`text-gray-900 flex items-center justify-center py-12 px-4 transition-opacity duration-500 ${isSkillsVisible ? 'opacity-100 animate-fadeIn' : 'opacity-0'}`}
        >
          <Skills />
        </div>

        <div
          id="projects"
          ref={projectsRef}
          className={`text-gray-900 py-12 px-4 transition-opacity duration-500 ${isProjectsVisible ? 'opacity-100 animate-slideInRight' : 'opacity-0'}`}
        >
          <Projects />
        </div>

        <div className="py-12">
          <Testimonials />
        </div>

        <div
          id="contact"
          ref={contactRef}
          className={`text-gray-900 py-12 px-4 transition-opacity duration-500 ${isContactVisible ? 'opacity-100 animate-bounceIn' : 'opacity-0'}`}
        >
          <Contact />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;

import React, { useRef, useState } from 'react';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Testimonials from './Testimonials';
import AboutMe from './AboutMe';
import Support from './Support';
import Navbar from './Navbar';
import WebsiteShowcase from './WebsiteShowcase';
import { useColor } from '../context/ColorContext';

const Home = () => {
  const [activeButton, setActiveButton] = useState('home');
  const aboutMeRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const supportRef = useRef();
  const contactRef = useRef();
  const webdevRef = useRef();

  const { colorScheme } = useColor();

  const scrollToSection = (ref, buttonName) => {
    setActiveButton(buttonName);
    if (ref?.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 60,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
      }}
    >
      {/* About Me Sidebar */}
      <AboutMe ref={aboutMeRef} />

      {/* Navbar */}
      <Navbar
        aboutMeRef={aboutMeRef}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        scrollToSection={scrollToSection}
        refs={{
          skillsRef,
          projectsRef,
          supportRef,
          contactRef,
          webdevRef,
        }}
      />

      {/* Spacer for fixed navbar */}
      <div className="pt-24"></div>

      {/* === REORDERED SECTIONS BASED ON IMPORTANCE === */}

      {/* Projects First */}
      <div id="projects" ref={projectsRef} className="py-12 px-4 animate-slideInLeft">
        <Projects />
      </div>

      {/* Website Showcase */}
      <div id="websites" ref={webdevRef} className="py-12 px-4 animate-fadeIn">
        <WebsiteShowcase />
      </div>

      {/* Skills */}
      <div id="skills" ref={skillsRef} className="py-12 px-4 animate-fadeIn">
        <Skills />
      </div>

      {/* Testimonials */}
      <div className="py-12 px-4 animate-fadeIn">
        <Testimonials />
      </div>

      {/* Support */}
      <div id="support" ref={supportRef} className="py-12 px-4 animate-slideInRight">
        <Support />
      </div>

      {/* Contact */}
      <div id="contact" ref={contactRef} className="py-12 px-4 animate-fadeIn">
        <Contact />
      </div>
    </div>
  );
};

export default Home;

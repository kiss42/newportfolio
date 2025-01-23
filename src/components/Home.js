import React, { useRef, useState } from 'react';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Testimonials from './Testimonials';
import AboutMe from './AboutMe';
import Support from './Support';
import Navbar from './Navbar';

const Home = () => {
  const [activeButton, setActiveButton] = useState('home');
  const aboutMeRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const supportRef = useRef();
  const contactRef = useRef();

  // Function to scroll to a section
  const scrollToSection = (ref, buttonName) => {
    setActiveButton(buttonName);
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    } else {
      console.warn(`Ref for ${buttonName} is not defined`);
    }
  };

  return (
    <div className="min-h-screen">
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
        }}
      />

      {/* Sections */}
      <div className="pt-20"></div>
      <div id="skills" ref={skillsRef} className="py-12 px-4">
        <Skills />
      </div>
      <div id="projects" ref={projectsRef} className="py-12 px-4">
        <Projects />
      </div>
      <div id="support" ref={supportRef} className="py-12 px-4">
        <Support />
      </div>
      <div id="contact" ref={contactRef} className="py-12 px-4">
        <Contact />
      </div>
      <div className="py-12">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;

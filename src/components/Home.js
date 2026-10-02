import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import Identity from './Identity';
import Projects from './Projects';
import WebsiteShowcase from './WebsiteShowcase';
import Skills from './Skills';
import Testimonials from './Testimonials';
import Support from './Support';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="relative font-sans transition-colors duration-500">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
        style={{ scaleX: progress, background: 'linear-gradient(90deg, var(--secondary), var(--primary))' }}
        aria-hidden
      />
      <Navbar />
      <main>
        <Hero />
        <Identity />
        <Projects />
        <WebsiteShowcase />
        <Skills />
        <Testimonials />
        <Support />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

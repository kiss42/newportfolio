import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDownRight, FiDownload } from 'react-icons/fi';
import { useColor } from '../context/ColorContext';
import { profile } from '../data/profile';
import resumePDF from '../assets/Steven-Pierre-Resume.pdf';
import SceneBoundary, { hasWebGL } from './three/SceneBoundary';

const HeroScene = lazy(() => import('./three/HeroScene'));

// Types and deletes each role in turn.
function useTypedRoles(roles, reduce) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? roles[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return undefined;
    const full = roles[index];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === full) delay = 1800;
    if (deleting && text === '') delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, roles, reduce]);

  return text;
}

const Fallback = () => (
  <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[12%]">
    <div className="hero-fallback-orb" />
  </div>
);

const Hero = () => {
  const { colorScheme } = useColor();
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [webgl] = useState(() => hasWebGL());
  const role = useTypedRoles(profile.roles, reduce);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Stop rendering the WebGL scene once the hero scrolls away.
  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" ref={sectionRef} className="relative min-h-[100svh] overflow-hidden flex items-end lg:items-center">
      {/* Ambient layers */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="orb w-[40rem] h-[40rem] -top-40 -left-40" style={{ background: 'var(--glow-soft)' }} aria-hidden />

      {/* 3D scene */}
      <motion.div className="absolute inset-0" style={{ scale: sceneScale }} aria-hidden>
        {webgl ? (
          <SceneBoundary fallback={<Fallback />}>
            <Suspense fallback={<Fallback />}>
              <HeroScene
                primary={colorScheme.primary}
                active={inView}
                reducedMotion={!!reduce}
              />
            </Suspense>
          </SceneBoundary>
        ) : (
          <Fallback />
        )}
      </motion.div>

      {/* Caption for Bella, beside her on desktop */}
      <motion.div className="hidden lg:block absolute z-10 right-[14%] bottom-[13%] pointer-events-none" style={{ opacity: contentOpacity }}>
        <motion.div
          className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span className="font-semibold">Princess Bella</span>
          <span className="text-muted">· keeping an eye on you</span>
        </motion.div>
      </motion.div>

      {/* Keeps the headline readable over the scene on small screens */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none lg:hidden"
        style={{ background: 'linear-gradient(to top, var(--bg) 35%, transparent)' }}
        aria-hidden
      />

      {/* Fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-24 pt-[22.5rem] lg:py-0 pointer-events-none"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl pointer-events-auto">
          <motion.div variants={item} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm mb-7">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: 'var(--primary)' }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: 'var(--primary)' }} />
            </span>
            <span className="text-muted">Hi, I'm</span>
            <span className="font-semibold">{profile.name}</span>
          </motion.div>

          <motion.h1 variants={item} className="font-display font-extrabold tracking-tight leading-[0.95] text-[2.9rem] sm:text-7xl lg:text-[5.5rem]">
            <span className="gradient-text">{profile.headline}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 font-mono text-base sm:text-lg" aria-live="polite">
            <span className="text-muted">&gt; </span>
            <span className="text-accent">{role}</span>
            <span className="caret" aria-hidden />
          </motion.p>

          <motion.p variants={item} className="text-muted mt-5 text-lg leading-relaxed max-w-xl">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a href="#about" className="btn btn-primary">
              Get to know me <FiArrowDownRight />
            </a>
            <a href={resumePDF} download="Steven-Pierre-Resume.pdf" className="btn btn-ghost">
              <FiDownload /> Resume
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-xs font-mono text-muted"
        aria-label="Scroll to about section"
      >
        <span className="w-6 h-10 rounded-full border flex justify-center pt-2" style={{ borderColor: 'var(--border)' }}>
          <span className="w-1 h-2 rounded-full scroll-dot" style={{ background: 'var(--primary)' }} />
        </span>
        scroll
      </a>
    </section>
  );
};

export default Hero;

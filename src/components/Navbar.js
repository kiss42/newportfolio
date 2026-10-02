import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import profileImage from '../assets/profile.jpg';

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'testimonials', label: 'Kind words' },
  { id: 'contact', label: 'Contact' },
];

const sectionIds = ['home', 'about', 'projects', 'websites', 'skills', 'testimonials', 'support', 'contact'];

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-spy: highlight the link for the section currently in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(id === 'websites' ? 'projects' : id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 pt-4">
      <nav
        className="max-w-5xl mx-auto flex items-center justify-between rounded-full pl-2 pr-2 py-2 transition-all duration-500 border"
        style={{
          background: scrolled || open ? 'var(--surface-strong)' : 'transparent',
          borderColor: scrolled || open ? 'var(--border)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled || open ? 'blur(16px)' : 'none',
        }}
        aria-label="Main"
      >
        <a href="#home" className="flex items-center gap-3 pr-3" onClick={() => setOpen(false)}>
          <img src={profileImage} alt="" className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: 'var(--primary)' }} />
          <span className="font-display font-bold tracking-tight">Steven Pierre</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="relative block px-4 py-2 text-sm font-semibold rounded-full" aria-current={active === l.id ? 'true' : undefined}>
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full" style={{ background: 'var(--primary)' }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative" style={{ color: active === l.id ? 'var(--on-primary)' : 'var(--text)' }}>
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: 'var(--surface)' }}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="md:hidden max-w-5xl mx-auto mt-2 rounded-3xl p-3 border"
            style={{ background: 'var(--surface-strong)', borderColor: 'var(--border)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 rounded-2xl font-display text-xl font-bold"
                  style={{ color: active === l.id ? 'var(--primary)' : 'var(--text)' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

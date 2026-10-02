import React from 'react';
import { FiArrowUp, FiGithub } from 'react-icons/fi';
import { profile } from '../data/profile';

const Footer = () => (
  <footer className="px-5 sm:px-8 pb-10">
    <div className="max-w-7xl mx-auto pt-8 border-t flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted" style={{ borderColor: 'var(--border)' }}>
      <p>© {new Date().getFullYear()} {profile.name}. Built with React &amp; Three.js.</p>
      <div className="flex items-center gap-5">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[color:var(--primary)]">
          <FiGithub /> GitHub
        </a>
        <a href="#home" className="flex items-center gap-2 hover:text-[color:var(--primary)]">
          Back to top <FiArrowUp />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

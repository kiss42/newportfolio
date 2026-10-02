import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiMapPin, FiTool, FiCode } from 'react-icons/fi';
import TiltCard from './ui/TiltCard';
import profileImage from '../assets/profile.jpg';
import { profile } from '../data/profile';

// A holographic "ID card" that tilts toward the pointer and flips to reveal quick facts.
const ProfileCard3D = () => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <div className="relative mx-auto w-full max-w-[22rem] aspect-[3/4]">
      {/* Glow behind the card */}
      <div className="orb inset-6" style={{ background: 'var(--glow)' }} aria-hidden />

      <TiltCard max={14} glare={false} className="rounded-[1.75rem]">
        <motion.button
          type="button"
          onClick={toggle}
          aria-pressed={flipped}
          aria-label={flipped ? 'Show photo side of card' : 'Flip card to see quick facts'}
          className="relative block w-full h-full preserve-3d rounded-[1.75rem] text-left cursor-pointer"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 backface-hidden rounded-[1.75rem] overflow-hidden border"
            style={{ borderColor: 'var(--border)', boxShadow: '0 40px 80px -30px var(--glow)' }}
          >
            <img src={profileImage} alt={profile.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
            {/* Holographic sheen */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-color-dodge"
              style={{ background: 'linear-gradient(115deg, transparent 20%, var(--primary) 40%, transparent 50%, var(--secondary) 65%, transparent 80%)' }}
            />
            <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-white/80 font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              <span>ID · SP-001</span>
              <span className="flex items-center gap-1.5">
                <FiRefreshCw /> tap to flip
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white" style={{ transform: 'translateZ(40px)' }}>
              <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase opacity-70 mb-2">Developer · IT Specialist</p>
              <h3 className="font-display text-3xl font-extrabold leading-none">{profile.name}</h3>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 backface-hidden rounded-[1.75rem] overflow-hidden border p-7 flex flex-col"
            style={{
              transform: 'rotateY(180deg)',
              borderColor: 'var(--border)',
              background: 'linear-gradient(160deg, var(--secondary), var(--bg) 75%)',
              color: 'var(--text)',
              boxShadow: '0 40px 80px -30px var(--glow)',
            }}
          >
            <p className="eyebrow mb-5">Quick facts</p>
            <ul className="space-y-5 text-[0.95rem] flex-1">
              <li className="flex gap-3">
                <FiTool className="mt-1 shrink-0 text-accent" />
                <span>
                  <strong className="block">Field Service Technician</strong>
                  <span className="text-muted">AgusIT — repairs &amp; preventative maintenance</span>
                </span>
              </li>
              <li className="flex gap-3">
                <FiCode className="mt-1 shrink-0 text-accent" />
                <span>
                  <strong className="block">Freelance React Developer</strong>
                  <span className="text-muted">React · Node.js · performance-first builds</span>
                </span>
              </li>
              <li className="flex gap-3">
                <FiMapPin className="mt-1 shrink-0 text-accent" />
                <span>
                  <strong className="block">10+ years in IT</strong>
                  <span className="text-muted">Desktop support to full builds</span>
                </span>
              </li>
            </ul>
            <p className="font-mono text-xs text-muted flex items-center gap-2">
              <FiRefreshCw /> tap to flip back
            </p>
          </div>
        </motion.button>
      </TiltCard>
    </div>
  );
};

export default ProfileCard3D;

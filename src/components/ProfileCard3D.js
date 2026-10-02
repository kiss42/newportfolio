import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiTool, FiLayers, FiTerminal, FiClock } from 'react-icons/fi';
import TiltCard from './ui/TiltCard';
import profileImage from '../assets/profile.jpg';
import { profile } from '../data/profile';

// Tiny Haitian flag: blue over red, with a white center panel.
const HaitiFlag = () => (
  <span
    role="img"
    aria-label="Haitian flag"
    className="relative inline-block w-[1.1rem] h-[0.75rem] rounded-[2px] overflow-hidden align-middle"
    style={{ background: 'linear-gradient(#00209f 50%, #d21034 50%)' }}
  >
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.4rem] h-[0.3rem] bg-white rounded-[1px]" />
  </span>
);

const quickFacts = [
  { icon: <HaitiFlag />, title: 'Proudly Haitian', text: 'My code comes extra seasoned. Pikliz on the side, no extra charge.' },
  { icon: <FiLayers />, title: 'Front end + back end', text: 'I make it pretty, then I make it work. Sometimes at 2 a.m., in that order.' },
  { icon: <FiTerminal />, title: 'Linux operator', text: 'sudo is my love language. Dark mode is not a preference, it is a lifestyle.' },
  { icon: <FiTool />, title: 'Independent contractor', text: 'IT service, repairs and web builds across numerous projects.' },
  { icon: <FiClock />, title: '10+ years in IT', text: 'Turned it off and on again roughly 10,000 times. It works.' },
];

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
              <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase opacity-70 mb-2">Independent Contractor</p>
              <h3 className="font-display text-3xl font-extrabold leading-none">{profile.name}</h3>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 backface-hidden rounded-[1.75rem] overflow-hidden border p-7 flex flex-col"
            style={{
              transform: 'rotateY(180deg)',
              borderColor: 'var(--border)',
              background: 'linear-gradient(160deg, color-mix(in srgb, var(--secondary) 35%, var(--bg)), var(--bg) 75%)',
              color: 'var(--text)',
              boxShadow: '0 40px 80px -30px var(--glow)',
            }}
          >
            <p className="eyebrow mb-4">Quick facts</p>
            <ul className="space-y-3 text-[0.82rem] leading-snug flex-1">
              {quickFacts.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-accent">{f.icon}</span>
                  <span>
                    <strong className="block text-[0.9rem]">{f.title}</strong>
                    <span className="text-muted">{f.text}</span>
                  </span>
                </li>
              ))}
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

import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import lotusNailzImg from '../assets/lotus-nailz.png';
import Reveal from './ui/Reveal';

const site = {
  title: 'Lotus Nailz',
  description: 'Premium nail salon website — designed and built to turn visitors into bookings.',
  tagline: '“Elevate your essence. Adorn your fingertips.”',
  image: lotusNailzImg,
  url: 'https://lotus-nailz.vercel.app/',
  location: 'Cleveland, OH',
  reviews: 28,
  rating: 5,
};

// A browser mockup that starts tilted in 3D and straightens as it scrolls into view.
const WebsiteShowcase = () => {
  const ref = React.useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.88, 1]);

  return (
    <section id="websites" className="relative py-28 sm:py-36 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-14 items-center">
        <div ref={ref} style={{ perspective: 1400 }}>
          <motion.a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden border group"
            style={{ rotateX, scale, borderColor: 'var(--border)', boxShadow: '0 50px 100px -40px var(--glow)', transformOrigin: 'center bottom' }}
            aria-label="Visit the Lotus Nailz website (opens in a new tab)"
          >
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'var(--surface-strong)' }}>
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 truncate font-mono text-xs text-muted rounded-md px-3 py-1" style={{ background: 'var(--surface)' }}>
                lotus-nailz.vercel.app
              </span>
            </div>
            <div className="overflow-hidden aspect-[16/10]">
              <img src={site.image} alt="Lotus Nailz website homepage" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            </div>
          </motion.a>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow mb-4">03 — Client work</p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">{site.title}</h2>
            <p className="text-muted text-lg leading-relaxed mb-4">{site.description}</p>
            <p className="italic mb-8 text-accent">{site.tagline}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 mb-9">
            <span className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2">
              <FiMapPin className="text-accent" /> {site.location}
            </span>
            <span className="glass rounded-full px-4 py-2 text-sm">
              <span className="text-accent">{'★'.repeat(site.rating)}</span> <span className="text-muted">{site.reviews} reviews</span>
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit the live site <FiArrowUpRight />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WebsiteShowcase;

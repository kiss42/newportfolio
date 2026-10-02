import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import lotusNailzImg from '../assets/lotus-nailz.png';
import MalilunePreview from './MalilunePreview';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const sites = [
  {
    title: 'Madame Malilune',
    kicker: 'Seer of the Crossroads',
    description:
      'An immersive, candlelit site for a rootworker and reader — a crystal ball that answers when touched, a full tarot deck, and a spellbook you page through.',
    tagline: '“Touch the orb, cheri. Malilune is listening.”',
    preview: <MalilunePreview />,
    url: 'https://witch-coven.vercel.app/',
    domain: 'witch-coven.vercel.app',
    features: ['Crystal-ball prophecies', 'Three-card tarot spread', 'Page-turning grimoire', 'Live moon phase', 'Ancestor altar candles'],
  },
  {
    title: 'Lotus Nailz',
    kicker: 'Premium nail salon',
    description: 'Premium nail salon website — designed and built to turn visitors into bookings.',
    tagline: '“Elevate your essence. Adorn your fingertips.”',
    image: lotusNailzImg,
    imageAlt: 'Lotus Nailz website homepage',
    url: 'https://lotus-nailz.vercel.app/',
    domain: 'lotus-nailz.vercel.app',
    location: 'Cleveland, OH',
    reviews: 28,
    rating: 5,
  },
];

// A browser mockup that starts tilted in 3D and straightens as it scrolls into view.
const SiteRow = ({ site, flip }) => {
  const ref = React.useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [28, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [flip ? 10 : -10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.88, 1]);

  return (
    <div className={`grid gap-10 lg:gap-14 items-center ${flip ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'}`}>
      <div ref={ref} style={{ perspective: 1400 }} className={flip ? 'lg:order-2' : ''}>
        <motion.a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden border group"
          style={{ rotateX, rotateY, scale, borderColor: 'var(--border)', boxShadow: '0 50px 100px -40px var(--glow)', transformOrigin: 'center bottom' }}
          aria-label={`Visit the ${site.title} website (opens in a new tab)`}
        >
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'var(--surface-strong)' }}>
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex-1 truncate font-mono text-xs text-muted rounded-md px-3 py-1" style={{ background: 'var(--surface)' }}>
              {site.domain}
            </span>
          </div>
          <div className="overflow-hidden aspect-[16/10]">
            {site.image ? (
              <img src={site.image} alt={site.imageAlt} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">{site.preview}</div>
            )}
          </div>
        </motion.a>
      </div>

      <div className={flip ? 'lg:order-1' : ''}>
        <Reveal>
          <p className="font-mono text-xs text-muted uppercase tracking-[0.2em] mb-3">{site.kicker}</p>
          <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">{site.title}</h3>
          <p className="text-muted text-lg leading-relaxed mb-4">{site.description}</p>
          <p className="italic mb-7 text-accent">{site.tagline}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-2 mb-8">
          {site.location && (
            <span className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2">
              <FiMapPin className="text-accent" /> {site.location}
            </span>
          )}
          {site.rating && (
            <span className="glass rounded-full px-4 py-2 text-sm">
              <span className="text-accent">{'★'.repeat(site.rating)}</span> <span className="text-muted">{site.reviews} reviews</span>
            </span>
          )}
          {site.features?.map((f) => (
            <span key={f} className="glass rounded-full px-4 py-2 text-sm">
              {f}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.2}>
          <a href={site.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Visit the live site <FiArrowUpRight />
          </a>
        </Reveal>
      </div>
    </div>
  );
};

const WebsiteShowcase = () => (
  <section id="websites" className="relative py-28 sm:py-36 px-5 sm:px-8">
    <div className="max-w-7xl mx-auto">
      <SectionHeading eyebrow="03 — Live sites" title="Sites I've launched.">
        Real, live websites — click any of them to take a look.
      </SectionHeading>
      <div className="space-y-28 sm:space-y-36">
        {sites.map((site, i) => (
          <SiteRow key={site.title} site={site} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);

export default WebsiteShowcase;

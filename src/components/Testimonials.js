import React, { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import SectionHeading from './ui/SectionHeading';

const testimonials = [
  {
    quote: "Steven helped our company set up a reliable IT support system. His professionalism and technical expertise were top-notch!",
    name: "Michael Johnson, CTO at TechWave Inc."
  },
  {
    quote: "Working with Steven was a game changer for our team's productivity. His problem-solving skills were remarkable.",
    name: "Laura Smith, Project Manager at Creative Solutions"
  },
  {
    quote: "Steven was instrumental in revamping our internal systems. He was efficient and delivered great results.",
    name: "David Lee, Operations Director at Global Enterprise"
  },
  {
    quote: "The cybersecurity measures Steven implemented have significantly improved our data protection. Highly recommended!",
    name: "Emily Chen, CISO at SecureNet Solutions"
  },
  {
    quote: "Steven's cloud migration strategy saved us time and resources. His expertise in AWS was invaluable.",
    name: "Robert Taylor, CEO at CloudFirst Technologies"
  },
  {
    quote: "Our team's coding practices improved dramatically after Steven's consultation. He's a true software craftsman.",
    name: "Sophia Rodriguez, Lead Developer at CodeMasters Inc."
  },
  {
    quote: "Steven's ability to explain complex technical concepts to non-technical stakeholders was impressive. Great communicator!",
    name: "James Wilson, Marketing Director at TechBridge Solutions"
  }
];

// Shortest signed distance between two indices on a loop.
const loopOffset = (i, current, n) => {
  let d = i - current;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = testimonials.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % n), [n]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + n) % n), [n]);

  useEffect(() => {
    if (paused || reduce) return undefined;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, reduce, next, current]);

  return (
    <section id="testimonials" className="relative py-28 sm:py-36 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="05 — Kind words" title="What people say." align="center" />

        <div
          className="relative h-[22rem] sm:h-[20rem]"
          style={{ perspective: 1200 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute inset-0 preserve-3d">
            {testimonials.map((t, i) => {
              const offset = loopOffset(i, current, n);
              const abs = Math.abs(offset);
              const [author, role] = t.name.split(', ');
              return (
                <motion.figure
                  key={t.name}
                  className="absolute left-1/2 top-0 w-[86%] sm:w-[34rem] -ml-[43%] sm:-ml-[17rem] h-full rounded-3xl p-7 sm:p-9 flex flex-col border cursor-pointer"
                  style={{
                    // Solid base under the translucent surface so stacked cards don't show through each other.
                    background: `linear-gradient(${offset === 0 ? 'var(--surface-strong)' : 'var(--surface)'}, ${offset === 0 ? 'var(--surface-strong)' : 'var(--surface)'}), var(--bg)`,
                    borderColor: offset === 0 ? 'var(--primary)' : 'var(--border)',
                    boxShadow: offset === 0 ? '0 40px 80px -40px var(--glow)' : 'none',
                    pointerEvents: abs > 2 ? 'none' : 'auto',
                  }}
                  animate={{
                    x: `${offset * 62}%`,
                    z: -abs * 180,
                    rotateY: offset * -28,
                    opacity: abs > 2 ? 0 : 1,
                    zIndex: 10 - abs,
                  }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setCurrent(i)}
                  aria-hidden={offset !== 0}
                >
                  <div className="flex flex-col h-full transition-opacity duration-500" style={{ opacity: 1 - abs * 0.45 }}>
                    <span className="font-display text-7xl leading-none text-accent h-10">“</span>
                    <blockquote className="flex-1 text-lg sm:text-xl leading-relaxed mt-2">{t.quote}</blockquote>
                    <figcaption className="mt-5">
                      <div className="font-bold">{author}</div>
                      <div className="text-muted text-sm">{role}</div>
                    </figcaption>
                  </div>
                </motion.figure>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mt-12">
          <button type="button" onClick={prev} className="btn btn-ghost !p-3" aria-label="Previous testimonial">
            <FiArrowLeft />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: i === current ? 28 : 8, background: i === current ? 'var(--primary)' : 'var(--border)' }}
              />
            ))}
          </div>
          <button type="button" onClick={next} className="btn btn-ghost !p-3" aria-label="Next testimonial">
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import ProfileCard3D from './ProfileCard3D';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import { story, stats, journey, values } from '../data/profile';

const Counter = ({ value, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const Identity = () => (
  <section id="about" className="relative py-28 sm:py-36 px-5 sm:px-8 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <SectionHeading eyebrow="01 — Who I am" title={<>Part fixer, part builder. <span className="text-accent">All in.</span></>} />

      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 lg:gap-20 items-center">
        <Reveal>
          <ProfileCard3D />
        </Reveal>

        <div>
          <div className="space-y-5 text-lg leading-relaxed">
            {story.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? '' : 'text-muted'}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 sm:p-5">
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-accent">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-muted text-xs sm:text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Journey */}
      <div className="mt-28">
        <Reveal>
          <p className="eyebrow mb-8">The journey so far</p>
        </Reveal>
        <div className="relative grid md:grid-cols-4 gap-6">
          <div className="hidden md:block absolute top-[1.1rem] left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} aria-hidden />
          {journey.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} className="relative">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold mb-5 relative z-10"
                style={{ background: 'var(--primary)', color: 'var(--on-primary)', boxShadow: '0 0 0 6px var(--bg), 0 0 30px var(--glow)' }}
              >
                0{i + 1}
              </div>
              <p className="font-mono text-xs text-accent mb-1">{step.place}</p>
              <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mt-28 grid md:grid-cols-3 gap-5">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.1}>
            <TiltCard max={8} surface className="rounded-3xl p-7">
              <div className="relative font-display text-5xl font-extrabold mb-4 text-accent" style={{ transform: 'translateZ(30px)', color: 'var(--glow)' }}>
                0{i + 1}
              </div>
              <h3 className="relative font-display text-xl font-bold mb-2" style={{ transform: 'translateZ(20px)' }}>
                {v.title}
              </h3>
              <p className="relative text-muted leading-relaxed">{v.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Identity;

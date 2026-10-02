import React from 'react';
import { FiArrowUpRight, FiHeart, FiPlay } from 'react-icons/fi';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const creators = [
  { label: 'Funny skits from Chris', href: 'https://www.tiktok.com/t/ZTFuRatc7/' },
  { label: 'Storytelling from Ceros.TV', href: 'https://www.tiktok.com/@ceros.tv/video/7424212684968676638?lang=en' },
];

const Support = () => (
  <section id="support" className="relative py-28 sm:py-36 px-5 sm:px-8">
    <div className="max-w-7xl mx-auto">
      <SectionHeading eyebrow="06 — Beyond the code" title="People & causes I support." />

      <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-5">
        <Reveal className="glass rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start">
          <div className="shrink-0 w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: 'var(--surface-strong)' }}>
            <img src="https://www.supportbodilyautonomy.com/img/love.png" alt="Support Bodily Autonomy logo" className="w-16 h-16 object-contain" />
          </div>
          <div>
            <p className="font-mono text-xs text-accent mb-2 flex items-center gap-2">
              <FiHeart /> A cause I stand behind
            </p>
            <h3 className="font-display text-3xl font-bold mb-3">Support Bodily Autonomy</h3>
            <p className="text-muted leading-relaxed mb-6">
              Bodily autonomy is the right for individuals to have control over what happens to their bodies without external
              interference. It ensures that each person has full authority over their body and decisions.
            </p>
            <a href="https://www.supportbodilyautonomy.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Learn more <FiArrowUpRight />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="glass rounded-3xl p-8 sm:p-10">
          <p className="font-mono text-xs text-accent mb-2 flex items-center gap-2">
            <FiPlay /> Friends worth a follow
          </p>
          <h3 className="font-display text-3xl font-bold mb-6">Featured TikToks</h3>
          <div className="space-y-3">
            {creators.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl px-5 py-4 border transition-colors hover:border-[color:var(--primary)]"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-semibold">{c.label}</span>
                <FiArrowUpRight className="text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Support;

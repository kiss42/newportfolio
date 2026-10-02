import React from 'react';
import Reveal from './Reveal';

const SectionHeading = ({ eyebrow, title, children, align = 'left' }) => (
  <Reveal className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <p className="eyebrow mb-4">{eyebrow}</p>
    <h2 className="font-display text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">{title}</h2>
    {children && <p className="text-muted mt-5 text-lg leading-relaxed">{children}</p>}
  </Reveal>
);

export default SectionHeading;

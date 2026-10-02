import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import { projects } from '../data/profile';

const Projects = () => (
  <section id="projects" className="relative py-28 sm:py-36 px-5 sm:px-8">
    <div className="max-w-7xl mx-auto">
      <SectionHeading eyebrow="02 — Selected work" title="Things I've built.">
        Personal projects where I sharpen my React and JavaScript craft — each one live and clickable.
      </SectionHeading>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {projects.map((project, i) => {
          const Icon = project.icon;
          return (
            <Reveal key={project.title} delay={i * 0.08} className="h-full">
              <TiltCard surface className="rounded-3xl group">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col h-full p-7 preserve-3d"
                  aria-label={`${project.title} (opens in a new tab)`}
                >
                  <div className="flex items-start justify-between mb-10" style={{ transform: 'translateZ(50px)' }}>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: 'var(--primary)', color: 'var(--on-primary)', boxShadow: '0 14px 30px -10px var(--glow)' }}
                    >
                      <Icon />
                    </div>
                    <FiArrowUpRight className="text-2xl text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[color:var(--primary)]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3" style={{ transform: 'translateZ(35px)' }}>
                    {project.title}
                  </h3>
                  <p className="text-muted leading-relaxed flex-1" style={{ transform: 'translateZ(20px)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6" style={{ transform: 'translateZ(25px)' }}>
                    {project.tags.map((t) => (
                      <span key={t} className="font-mono text-[0.7rem] px-2.5 py-1 rounded-full border" style={{ borderColor: 'var(--border)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Projects;

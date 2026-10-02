import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaReact, FaJs, FaNodeJs, FaHtml5, FaCss3Alt, FaFigma, FaWordpress, FaGitAlt, FaLinux } from 'react-icons/fa';
import { SiTailwindcss, SiAdobephotoshop, SiAdobeillustrator, SiTypescript, SiNextdotjs, SiGnubash } from 'react-icons/si';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const skills = [
  { title: 'React', icon: FaReact },
  { title: 'JavaScript', icon: FaJs },
  { title: 'Tailwind CSS', icon: SiTailwindcss },
  { title: 'Node.js', icon: FaNodeJs },
  { title: 'HTML5', icon: FaHtml5 },
  { title: 'CSS3', icon: FaCss3Alt },
  { title: 'Figma', icon: FaFigma },
  { title: 'WordPress', icon: FaWordpress },
  { title: 'Photoshop', icon: SiAdobephotoshop },
  { title: 'Illustrator', icon: SiAdobeillustrator },
  { title: 'TypeScript', icon: SiTypescript },
  { title: 'Next.js', icon: SiNextdotjs },
  { title: 'Git', icon: FaGitAlt },
  { title: 'Linux', icon: FaLinux },
  { title: 'Bash', icon: SiGnubash },
];

const groups = [
  { title: 'Front end', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { title: 'Back end & Linux', items: ['Node.js', 'Linux', 'Bash', 'Git'] },
  { title: 'Design', items: ['Figma', 'Photoshop', 'Illustrator', 'WordPress'] },
  { title: 'Support', items: ['Desktop support', 'Hardware repair', 'Preventative maintenance', 'Customer service'] },
];

// Evenly distributes points on a unit sphere (Fibonacci lattice).
const spherePoints = skills.map((_, i) => {
  const n = skills.length;
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = Math.PI * (3 - Math.sqrt(5)) * i;
  return [Math.cos(theta) * r, y, Math.sin(theta) * r];
});

// A draggable, auto-rotating 3D globe of skill icons rendered with CSS transforms.
const SkillsGlobe = () => {
  const wrapRef = useRef(null);
  const itemRefs = useRef([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    let rotX = -0.3;
    let rotY = 0;
    let velX = 0;
    let velY = reduce ? 0 : 0.004;
    let dragging = false;
    let last = { x: 0, y: 0 };
    let frame;
    let visible = true;

    const render = () => {
      const radius = wrap.clientWidth * 0.38;
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      spherePoints.forEach(([x, y, z], i) => {
        // Rotate around Y, then X.
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const depth = (z2 + 1) / 2;
        const el = itemRefs.current[i];
        if (!el) return;
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, ${z2 * radius}px) scale(${0.6 + depth * 0.55})`;
        el.style.opacity = String(0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.35 ? 'blur(1.5px)' : 'none';
      });
    };

    const tick = () => {
      if (!dragging) {
        rotY += velY;
        rotX += velX;
        velX *= 0.95;
        // Ease back to a gentle idle spin after a fling.
        const idle = reduce ? 0 : 0.004;
        velY += (idle - velY) * 0.02;
      }
      render();
      frame = visible ? requestAnimationFrame(tick) : null;
    };

    const onDown = (e) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      wrap.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      velY = dx * 0.005;
      velX = -dy * 0.005;
      rotY += velY;
      rotX += velX;
    };
    const onUp = () => {
      dragging = false;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    observer.observe(wrap);

    wrap.addEventListener('pointerdown', onDown);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerup', onUp);
    wrap.addEventListener('pointercancel', onUp);
    render();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      wrap.removeEventListener('pointerdown', onDown);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerup', onUp);
      wrap.removeEventListener('pointercancel', onUp);
    };
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-[30rem] aspect-square mx-auto cursor-grab active:cursor-grabbing select-none touch-pan-y"
      style={{ perspective: 900 }}
      aria-label="Rotating globe of skills; drag to spin"
      role="img"
    >
      <div
        className="absolute inset-[12%] rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 30%, var(--glow), transparent 70%)', border: '1px solid var(--border)' }}
        aria-hidden
      />
      <div className="absolute inset-0 preserve-3d">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.title}
              ref={(el) => (itemRefs.current[i] = el)}
              className="absolute left-1/2 top-1/2 flex flex-col items-center gap-1.5 will-change-transform"
            >
              <span
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl text-accent border"
                style={{ background: 'var(--surface-strong)', borderColor: 'var(--border)', boxShadow: '0 10px 30px -12px var(--glow)' }}
              >
                <Icon />
              </span>
              <span className="font-mono text-[0.65rem] sm:text-xs whitespace-nowrap">{skill.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => (
  <section id="skills" className="relative py-28 sm:py-36 px-5 sm:px-8 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <SectionHeading eyebrow="04 — Toolkit" title="What I work with.">
          From the hardware on your desk to the code in your browser. Drag the globe to give it a spin.
        </SectionHeading>
        <div className="space-y-7">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <p className="font-mono text-xs text-muted uppercase tracking-[0.2em] mb-3">{g.title}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span key={item} className="glass rounded-full px-4 py-2 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal delay={0.1}>
        <SkillsGlobe />
      </Reveal>
    </div>
  </section>
);

export default Skills;

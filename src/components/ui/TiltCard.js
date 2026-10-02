import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';

// A card that tilts in 3D toward the pointer, with a moving glare highlight.
// `surface` paints the glass background on its own layer: backdrop-filter on the tilting
// element itself would flatten preserve-3d and kill the depth of translateZ children.
const TiltCard = ({ children, className = '', style, max = 12, glare = true, surface = false, ...rest }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, [0, 1], [0, 100]);
  const glareY = useTransform(py, [0, 1], [0, 100]);
  const glareOpacity = useSpring(0, spring);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 55%)`;

  const handleMove = (e) => {
    if (reduce || e.pointerType === 'touch') return;
    glareOpacity.set(1);
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    glareOpacity.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        className={`relative h-full preserve-3d ${className}`}
        style={{ rotateX, rotateY, ...style }}
        {...rest}
      >
        {surface && <div aria-hidden className="glass absolute inset-0 rounded-[inherit]" />}
        {children}
        {glare && !reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg, opacity: glareOpacity, mixBlendMode: 'overlay' }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;

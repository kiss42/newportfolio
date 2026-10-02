import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useColor, colorSchemes } from '../context/ColorContext';
import { FaPalette } from 'react-icons/fa';

const labels = { default: 'Violet', navy: 'Navy', skyBlue: 'Sky', sage: 'Sage', warmGray: 'Stone', black: 'Mono' };

const ColorPicker = () => {
  const { changeColorScheme, colorScheme } = useColor();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 rounded-3xl p-4 border w-56"
            style={{ background: 'var(--surface-strong)', borderColor: 'var(--border)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            <p className="eyebrow mb-3">Theme</p>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(colorSchemes).map(([name, scheme]) => {
                const selected = scheme === colorScheme;
                return (
                  <button
                    type="button"
                    key={name}
                    onClick={() => {
                      changeColorScheme(name);
                      setIsOpen(false);
                    }}
                    className="flex flex-col items-center gap-1.5 text-xs"
                    aria-pressed={selected}
                  >
                    <span
                      className="w-10 h-10 rounded-full transition-transform hover:scale-110"
                      style={{
                        background: `conic-gradient(${scheme.primary} 0 50%, ${scheme.background} 50% 100%)`,
                        boxShadow: selected ? '0 0 0 2px var(--bg), 0 0 0 4px var(--primary)' : '0 0 0 1px var(--border)',
                      }}
                    />
                    {labels[name] || name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105"
        style={{ background: 'var(--primary)', color: 'var(--on-primary)', boxShadow: '0 12px 30px -8px var(--glow)' }}
        aria-label="Change color theme"
        aria-expanded={isOpen}
      >
        <FaPalette size={20} />
      </button>
    </div>
  );
};

export default ColorPicker;

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMoon, FiSun, FiShuffle, FiX, FiCheck } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';
import { useColor, colorSchemes, schemeLabels } from '../context/ColorContext';
import { hexToHsl, hslToHex, schemeFromAccent } from '../utilities/color';

// A glossy sphere swatch: the accent color lit from the top-left, sitting on its background.
const Swatch = ({ scheme, selected, size = 44 }) => (
  <span
    className="relative block rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85) 0%, ${scheme.primary} 28%, ${scheme.secondary} 70%, ${scheme.background} 100%)`,
      boxShadow: selected
        ? `0 0 0 2px var(--surface-strong), 0 0 0 4px ${scheme.primary}, 0 10px 24px -8px ${scheme.primary}`
        : `0 0 0 1px var(--border), 0 8px 18px -10px ${scheme.primary}`,
    }}
  >
    {selected && (
      <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow">
        <FiCheck />
      </span>
    )}
  </span>
);

const ColorPicker = () => {
  const { colorScheme, schemeName, custom, changeColorScheme, setCustomScheme, setPreview } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const hue = Math.round(hexToHsl(custom.primary).h);

  // Close on Escape or on a click outside the picker.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    const onClick = (e) => panelRef.current && !panelRef.current.contains(e.target) && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setPreview(null);
  }, [isOpen, setPreview]);

  // Hover previews the whole site in that theme; mouse only, so taps just select.
  const previewOn = (scheme) => (e) => {
    if (e.pointerType === 'mouse') setPreview(scheme);
  };

  const surprise = () => {
    const h = Math.floor(Math.random() * 360);
    setCustomScheme({ primary: hslToHex(h, 75 + Math.random() * 15, 55 + Math.random() * 8) });
  };

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92, rotateX: -12 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 16, scale: 0.92, rotateX: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 w-[min(20rem,calc(100vw-2.5rem))] rounded-3xl border p-5 origin-bottom-right"
            style={{
              background: 'var(--surface-strong)',
              borderColor: 'var(--border)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 30px 80px -30px var(--glow)',
              transformPerspective: 800,
            }}
            onPointerLeave={() => setPreview(null)}
            role="dialog"
            aria-label="Choose a color theme"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="eyebrow">Theme</p>
              <button type="button" onClick={() => setIsOpen(false)} className="text-muted hover:text-[color:var(--text)]" aria-label="Close theme picker">
                <FiX />
              </button>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-x-2 gap-y-4">
              {Object.entries(colorSchemes).map(([name, scheme]) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => changeColorScheme(name)}
                  onPointerEnter={previewOn(scheme)}
                  className="group flex flex-col items-center gap-2 text-xs font-semibold"
                  aria-pressed={schemeName === name}
                >
                  <Swatch scheme={scheme} selected={schemeName === name} />
                  <span className={schemeName === name ? 'text-accent' : 'text-muted'}>{schemeLabels[name] || name}</span>
                </button>
              ))}
            </div>

            {/* Custom accent */}
            <div className="mt-5 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold">Make your own</p>
                <button
                  type="button"
                  onClick={surprise}
                  className="flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors hover:border-[color:var(--primary)]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <FiShuffle /> Surprise me
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label
                  className="relative shrink-0 w-11 h-11 rounded-full overflow-hidden cursor-pointer"
                  style={{ boxShadow: schemeName === 'custom' ? `0 0 0 2px var(--surface-strong), 0 0 0 4px ${custom.primary}` : '0 0 0 1px var(--border)' }}
                  title="Pick any color"
                >
                  <span className="absolute inset-0" style={{ background: custom.primary }} />
                  <input
                    type="color"
                    value={custom.primary}
                    onChange={(e) => setCustomScheme({ primary: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Custom accent color"
                  />
                </label>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={hue}
                  onChange={(e) => setCustomScheme({ primary: hslToHex(Number(e.target.value), 80, 58) })}
                  className="hue-slider flex-1"
                  aria-label="Accent hue"
                />
              </div>

              {/* Dark / light for the custom theme */}
              <div className="mt-4 grid grid-cols-2 gap-1 p-1 rounded-full border" style={{ borderColor: 'var(--border)' }}>
                {[
                  { dark: true, label: 'Dark', icon: FiMoon },
                  { dark: false, label: 'Light', icon: FiSun },
                ].map(({ dark, label, icon: Icon }) => {
                  const on = schemeName === 'custom' && custom.isDark === dark;
                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() => setCustomScheme({ isDark: dark })}
                      onPointerEnter={previewOn(schemeFromAccent(custom.primary, dark))}
                      className="flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition-colors"
                      style={{ background: on ? 'var(--primary)' : 'transparent', color: on ? 'var(--on-primary)' : 'var(--text)' }}
                      aria-pressed={on}
                    >
                      <Icon /> {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.08, rotate: 15 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center"
        style={{ color: 'var(--on-primary)', boxShadow: '0 12px 30px -8px var(--glow)' }}
        aria-label="Change color theme"
        aria-expanded={isOpen}
      >
        {/* Spinning ring in the current palette */}
        <span
          className="absolute inset-0 rounded-full picker-ring"
          style={{ background: `conic-gradient(from 0deg, ${colorScheme.primary}, ${colorScheme.secondary}, ${colorScheme.text}, ${colorScheme.primary})` }}
          aria-hidden
        />
        <span className="absolute inset-[3px] rounded-full" style={{ background: 'var(--primary)' }} aria-hidden />
        <span className="relative">{isOpen ? <FiX size={22} /> : <FaPalette size={20} />}</span>
      </motion.button>
    </div>
  );
};

export default ColorPicker;

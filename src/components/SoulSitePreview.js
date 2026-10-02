import React from 'react';

const tabs = ['Tarot', 'Numerology', 'Astrology', 'Dreams'];

// A tarot card back with a simple gilded sunburst.
const CardBack = ({ style }) => (
  <div
    className="absolute w-[15%] aspect-[2/3] rounded-[8%] border soulsite-card"
    style={{
      borderColor: 'rgba(232, 200, 120, 0.7)',
      background: 'radial-gradient(circle at 50% 50%, rgba(232,200,120,0.35) 0 12%, transparent 13%), repeating-conic-gradient(from 0deg, rgba(232,200,120,0.18) 0 6deg, transparent 6deg 18deg), linear-gradient(160deg, #2a1b4d, #120a24)',
      boxShadow: '0 12px 30px -8px rgba(0,0,0,0.8), inset 0 0 0 3px #120a24, inset 0 0 0 4px rgba(232,200,120,0.4)',
      ...style,
    }}
  />
);

// A stylized cover for SoulSite in its own look: midnight indigo, gold decorative serif, a fanned tarot spread.
const SoulSitePreview = () => (
  <div
    className="relative w-full h-full overflow-hidden flex flex-col items-center text-center"
    style={{ background: 'radial-gradient(ellipse at 50% 0%, #2b1d55 0%, #0d0a1f 55%, #050409 100%)', color: '#efe6d2' }}
  >
    {/* Tab bar */}
    <div className="mt-[4%] flex gap-[1.4%] text-[clamp(0.42rem,1vw,0.68rem)]" style={{ fontFamily: '"Space Grotesk", Manrope, sans-serif' }}>
      {tabs.map((t, i) => (
        <span
          key={t}
          className="rounded-full px-[0.9em] py-[0.25em] border"
          style={{
            borderColor: i === 0 ? 'rgba(232,200,120,0.8)' : 'rgba(239,230,210,0.18)',
            color: i === 0 ? '#e8c878' : 'rgba(239,230,210,0.7)',
            background: i === 0 ? 'rgba(232,200,120,0.1)' : 'transparent',
          }}
        >
          {t}
        </span>
      ))}
    </div>

    <div
      className="mt-[5%] leading-none"
      style={{
        fontFamily: '"Cinzel Decorative", Cinzel, serif',
        fontWeight: 700,
        fontSize: 'clamp(1.6rem, 5vw, 3.2rem)',
        background: 'linear-gradient(180deg, #fff3d1, #e8c878 60%, #a8803a)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      SoulSite
    </div>
    <p className="mt-[1.5%] italic text-[clamp(0.6rem,1.5vw,1rem)]" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', color: 'rgba(239,230,210,0.85)' }}>
      Reflection, not prediction
    </p>

    {/* Fanned three-card spread */}
    <div className="relative w-full flex-1">
      <CardBack style={{ left: '30.5%', top: '16%', transform: 'rotate(-14deg)' }} />
      <CardBack style={{ left: '42.5%', top: '8%', transform: 'rotate(0deg)', zIndex: 1 }} />
      <CardBack style={{ left: '54.5%', top: '16%', transform: 'rotate(14deg)' }} />
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[45%] h-[40%] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(140,110,230,0.35), transparent 70%)', filter: 'blur(10px)' }} />
    </div>
    <p className="mb-[3.5%] text-[clamp(0.4rem,0.9vw,0.62rem)] tracking-[0.25em] uppercase" style={{ fontFamily: '"Space Grotesk", Manrope, sans-serif', color: 'rgba(232,200,120,0.75)' }}>
      Draw 1 · 3 · 5 cards
    </p>
  </div>
);

export default SoulSitePreview;

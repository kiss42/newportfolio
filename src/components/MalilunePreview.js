import React, { useMemo } from 'react';

// A stylized cover for the Madame Malilune site, drawn in its palette: plum night, gold script, a glowing orb.
const MalilunePreview = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: (i * 37.7) % 100,
        top: (i * 53.3) % 100,
        size: 1 + (i % 3),
        delay: (i % 7) * 0.6,
      })),
    []
  );

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center text-center"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #3a1430 0%, #1e0a14 55%, #0d0408 100%)' }}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full malilune-star"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, background: '#f6dc9a', animationDelay: `${s.delay}s` }}
        />
      ))}

      {/* Nav strip, like the real site */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-[4%] py-[2.2%] text-[clamp(0.45rem,1.1vw,0.7rem)]" style={{ color: '#e0b45a', fontFamily: 'Cinzel, serif' }}>
        <span>☾ Malilune</span>
        <span className="hidden sm:flex gap-[1.2em] opacity-80">
          <span>Rituals</span>
          <span>Grimoire</span>
          <span>Tarot</span>
          <span>Moon</span>
        </span>
      </div>

      <div
        className="relative leading-none"
        style={{
          fontFamily: '"Pinyon Script", cursive',
          fontSize: 'clamp(2.2rem, 7vw, 4.6rem)',
          background: 'linear-gradient(90deg, #a8772a, #f6dc9a 35%, #e0b45a 60%, #fff1c9)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(224,180,90,0.35))',
        }}
      >
        Malilune
      </div>
      <p className="mt-[1.5%] tracking-[0.25em] uppercase text-[clamp(0.4rem,1vw,0.62rem)]" style={{ color: '#e9dfc8', fontFamily: 'Cinzel, serif', opacity: 0.8 }}>
        Seer of the Crossroads · Keeper of the Moonwater
      </p>

      {/* Crystal ball */}
      <div className="relative mt-[4%] w-[26%] aspect-square">
        <div className="absolute inset-0 rounded-full malilune-orb" style={{ background: 'radial-gradient(circle at 35% 30%, #fff1c9 0%, #b98bd6 18%, #5b2a7a 45%, #1e0a14 75%)', boxShadow: '0 0 40px 8px rgba(185,139,214,0.35), inset 0 0 30px rgba(255,241,201,0.25)' }} />
        <div className="absolute left-[-12%] right-[-12%] bottom-[-14%] h-[22%] rounded-[50%]" style={{ background: 'linear-gradient(#6b4a2a, #2b1a0e)' }} />
      </div>
      <p className="mt-[5%] italic text-[clamp(0.5rem,1.2vw,0.8rem)]" style={{ color: '#e0b45a', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
        Touch the orb, cheri. Malilune is listening.
      </p>
    </div>
  );
};

export default MalilunePreview;

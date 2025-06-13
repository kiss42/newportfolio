import React from 'react';
import lotusNailzImg from '../assets/lotus-nailz.png';
import { useColor } from '../context/ColorContext';

const websites = [
  {
    title: 'Lotus Nailz',
    description: 'Premium Nail Salon based in Cleveland.',
    tagline: '“Elevate your essence. Adorn your fingertips.”',
    image: lotusNailzImg,
    url: 'https://lotus-nailz.vercel.app/',
    location: 'Cleveland, OH',
    reviews: 28,
    rating: 5,
  },
];

const WebsiteShowcase = () => {
  const { colorScheme } = useColor();
  const site = websites[0];

  return (
    <section className="py-12 px-6" style={{ backgroundColor: colorScheme.background }}>
      <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colorScheme.primary }}>
        Featured Website
      </h2>

      <div
        className="flex rounded-xl shadow-lg overflow-hidden transition-colors duration-300"
        style={{
          width: '558px',
          height: '289px',
          backgroundColor: colorScheme.secondary,
          color: colorScheme.text,
        }}
      >
        {/* ✅ Fixed Image Container */}
        <div className="w-[45%] h-full relative overflow-hidden rounded-l-xl">
          <img
            src={site.image}
            alt={site.title}
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Content Side */}
        <div className="w-[55%] p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">{site.title}</h3>
            <p className="text-sm mb-2">{site.description}</p>
            <p className="text-xs italic text-gray-300">{site.tagline}</p>
          </div>

          <div className="mt-4 text-xs">
            <p className="mb-1">
              <strong>{site.location}</strong>
            </p>
            <p className="text-green-400">
              {"★".repeat(site.rating)}{' '}
              <span className="text-gray-100">{site.reviews} reviews</span>
            </p>
          </div>

          <div className="text-right mt-4">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-md text-sm bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
            >
              Visit Site
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteShowcase;

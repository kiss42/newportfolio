import React from 'react';
import { useColor } from '../context/ColorContext';

const Support = () => {
  const { colorScheme } = useColor();

  return (
    <section className="py-12 px-6">
      <div className="my-12">
        <h2 className="text-center text-2xl font-semibold" style={{ color: colorScheme.primary }}>
          Support My Friends and Causes
        </h2>
      </div>

      {/* Support Bodily Autonomy Section */}
      <div className="max-w-2xl mx-auto rounded-lg shadow-lg p-6" style={{ backgroundColor: colorScheme.background, color: colorScheme.text }}>
        <div className="flex justify-center mb-4">
          <img 
            src="https://www.supportbodilyautonomy.com/img/love.png" 
            alt="Support Bodily Autonomy Logo" 
            className="w-24 h-24 object-contain" 
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: colorScheme.primary }}>
          Support Bodily Autonomy
        </h2>

        <p className="text-center mb-6">
          Bodily autonomy is the right for individuals to have control over what happens to their bodies without external interference. It ensures that each person has full authority over their body and decisions.
        </p>

        <div className="text-center">
          <a
            href="https://www.supportbodilyautonomy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg font-bold transition duration-300"
            style={{ backgroundColor: colorScheme.primary, color: 'white' }}
          >
            Visit Support Bodily Autonomy
          </a>
        </div>
      </div>

      {/* TikTok Links */}
      <div className="max-w-2xl mx-auto rounded-lg shadow-lg p-6 mt-8" style={{ backgroundColor: colorScheme.background, color: colorScheme.text }}>
        <h3 className="text-2xl font-semibold mb-4 text-center" style={{ color: colorScheme.primary }}>Featured TikToks</h3>
        
        <div className="text-center mb-4">
          <a
            href="https://www.tiktok.com/t/ZTFuRatc7/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:underline"
            style={{ color: colorScheme.primary }}
          >
            Check out some funny skits from Chris
          </a>
        </div>

        <div className="text-center mb-4">
          <a
            href="https://www.tiktok.com/@ceros.tv/video/7424212684968676638?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:underline"
            style={{ color: colorScheme.primary }}
          >
            Or have some story telling from Ceros.TV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Support;

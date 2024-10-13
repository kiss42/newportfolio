import React from 'react';

const Support = () => {
  return (
    <section className="py-12 px-6">
      <div className="my-12">
        <h2 className="text-center text-2xl font-semibold text-gray-700">
          Support My Friends and Causes
        </h2>
      </div>

      {/* Support Bodily Autonomy Section */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <img 
            src="https://www.supportbodilyautonomy.com/img/love.png" 
            alt="Support Bodily Autonomy Logo" 
            className="w-24 h-24 object-contain" 
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-purple-700 mb-4">
          Support Bodily Autonomy
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Bodily autonomy is the right for individuals to have control over what happens to their bodies without external interference. It ensures that each person has full authority over their body and decisions.
        </p>

        <div className="text-center">
          <a
            href="https://www.supportbodilyautonomy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-800 transition duration-300"
          >
            Visit Support Bodily Autonomy
          </a>
        </div>
      </div>

      {/* TikTok Links */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Featured TikToks</h3>
        
        <div className="text-center mb-4">
          <a
            href="https://www.tiktok.com/t/ZTFuRatc7/" // Example TikTok video link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-purple-700 hover:underline"
          >
            Check out some funny skits from funnyasschri2
          </a>
        </div>

        <div className="text-center mb-4">
          <a
            href="https://www.tiktok.com/@ceros.tv/video/7424212684968676638?lang=en" // Another TikTok link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-purple-700 hover:underline"
          >
            Or have some story telling from Ceros.TV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Support;

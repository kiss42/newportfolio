import React, { useState, useEffect } from 'react';

// Sample testimonials data
const testimonials = [
  {
    quote: "Steven helped our company set up a reliable IT support system. His professionalism and technical expertise were top-notch!",
    name: "Michael Johnson, CTO at TechWave Inc."
  },
  {
    quote: "Working with Steven was a game changer for our team's productivity. His problem-solving skills were remarkable.",
    name: "Laura Smith, Project Manager at Creative Solutions"
  },
  {
    quote: "Steven was instrumental in revamping our internal systems. He was efficient and delivered great results.",
    name: "David Lee, Operations Director at Global Enterprise"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Go to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Go to the previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative max-w-3xl mx-auto py-12">
      {/* Current testimonial */}
      <div className="text-center transition-opacity duration-1000">
        <p className="text-xl italic text-gray-800 mb-4">
          "{testimonials[currentIndex].quote}"
        </p>
        <p className="text-lg font-bold text-purple-700">
          — {testimonials[currentIndex].name}
        </p>
      </div>

      {/* Previous and Next buttons */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
        onClick={prevTestimonial}
      >
        &#9664; {/* Left Arrow */}
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
        onClick={nextTestimonial}
      >
        &#9654; {/* Right Arrow */}
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-purple-700' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;

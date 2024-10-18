import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importing arrow icons

// Updated testimonials data
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
  },
  {
    quote: "The cybersecurity measures Steven implemented have significantly improved our data protection. Highly recommended!",
    name: "Emily Chen, CISO at SecureNet Solutions"
  },
  {
    quote: "Steven's cloud migration strategy saved us time and resources. His expertise in AWS was invaluable.",
    name: "Robert Taylor, CEO at CloudFirst Technologies"
  },
  {
    quote: "Our team's coding practices improved dramatically after Steven's consultation. He's a true software craftsman.",
    name: "Sophia Rodriguez, Lead Developer at CodeMasters Inc."
  },
  {
    quote: "Steven's ability to explain complex technical concepts to non-technical stakeholders was impressive. Great communicator!",
    name: "James Wilson, Marketing Director at TechBridge Solutions"
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
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors"
        onClick={prevTestimonial}
      >
        <FaArrowLeft /> {/* Professional Left Arrow */}
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors"
        onClick={nextTestimonial}
      >
        <FaArrowRight /> {/* Professional Right Arrow */}
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

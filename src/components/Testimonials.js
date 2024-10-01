import React from 'react';

const testimonials = [
  { quote: "Steven helped our company set up a reliable IT system.", name: "Michael Johnson, CTO at TechWave Inc." },
  { quote: "His attention to detail was impressive.", name: "Laura Smith, Project Manager at Creative Solutions" },
  { quote: "Highly recommend Steven for any development work.", name: "David Lee, Operations Director at Global Enterprise" },
];

const Testimonials = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">What People Say</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="mb-4">"{testimonial.quote}"</p>
              <p className="font-bold text-purple-700">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

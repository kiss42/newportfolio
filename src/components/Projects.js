import React from 'react';
import { FaGlobe, FaFilm, FaMagic, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa'; // Importing icons
import { useColor } from '../context/ColorContext'; // Import useColor hook

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website to showcase my projects and skills.',
    link: 'https://kiss42.github.io/My-Portfolio/',
    icon: <FaGlobe />, // Globe icon for the portfolio website
  },
  {
    title: 'Movie Review Website',
    description: 'A movie review website template for writing reviews.',
    link: 'https://kiss42.github.io/movie-review-template/',
    icon: <FaFilm />, // Film icon for movie review website
  },
  {
    title: 'SoulSite',
    description: 'A mystical-themed web app offering spiritual tools.',
    link: 'https://kiss42.github.io/soulsite/',
    icon: <FaMagic />, // Magic wand icon for SoulSite
  },
  {
    title: 'Budgeting Tool',
    description: 'A budgeting tool to manage personal finances effectively.',
    link: 'https://kiss42.github.io/Budget-Tool/',
    icon: <FaMoneyBillWave />, // Money icon for budgeting tool
  },
];

const Projects = () => {
  const { colorScheme } = useColor(); // Use the color scheme

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colorScheme.primary }}>
          My Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-4 rounded-lg flex flex-col items-center text-center transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: colorScheme.background.startsWith('linear-gradient')
                  ? 'rgba(255, 255, 255, 0.2)' // Transparent white for gradients
                  : colorScheme.background,
                color: colorScheme.text,
              }}
            >
              {/* Icon */}
              <div
                className="text-4xl mb-2"
                style={{
                  color: colorScheme.primary,
                }}
              >
                {project.icon}
              </div>
              {/* Title */}
              <h3
                className="text-lg font-bold"
                style={{
                  color: colorScheme.primary,
                }}
              >
                {project.title}
              </h3>
              {/* Description */}
              <p className="text-sm mb-4">{project.description}</p>
              {/* Link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline transition-colors duration-300"
                style={{ color: colorScheme.primary }}
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

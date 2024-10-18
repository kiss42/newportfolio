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
    title: 'Task Manager',
    description: 'A simple task management app.',
    link: 'https://task-manager.com',
    icon: <FaCheckCircle />, // Check-circle icon for task manager
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
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colorScheme.primary }}>My Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card animate-fadeIn p-6 rounded-lg shadow-md"
              style={{ 
                backgroundColor: colorScheme.background.startsWith('linear-gradient') 
                  ? 'white' 
                  : colorScheme.background,
                color: colorScheme.text
              }}
            >
              <div className="text-4xl mb-4 text-center" style={{ color: colorScheme.primary }}>{project.icon}</div>
              <h3 className="text-xl font-bold text-center mb-2" style={{ color: colorScheme.primary }}>{project.title}</h3>
              <p className="text-center mb-4">{project.description}</p>
              <div className="text-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                  style={{ color: colorScheme.primary }}
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

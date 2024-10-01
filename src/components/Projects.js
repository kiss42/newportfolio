import React from 'react';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website to showcase my projects and skills.',
    link: 'https://kiss42.github.io/My-Portfolio/',
    icon: '🌐',
  },
  {
    title: 'Movie Review Website',
    description: 'A movie review website template for writing reviews.',
    link: 'https://kiss42.github.io/movie-review-template/',
    icon: '🎬',
  },
  {
    title: 'SoulSite',
    description: 'A mystical-themed web app offering spiritual tools.',
    link: 'https://kiss42.github.io/soulsite/',
    icon: '🔮',
  },
  {
    title: 'Task Manager',
    description: 'A simple task management app.',
    link: 'https://task-manager.com',
    icon: '✅',
  },
];

const Projects = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">My Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card animate-fadeIn">
              <div className="text-4xl mb-4 text-center">{project.icon}</div>
              <h3 className="text-xl font-bold text-center">{project.title}</h3>
              <p className="text-center mb-4">{project.description}</p>
              <div className="text-center">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-700 font-bold hover:underline">
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

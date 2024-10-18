import React from 'react';
import { FaReact, FaJs, FaNodeJs, FaHtml5, FaCss3Alt, FaFigma, FaWordpress, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiAdobephotoshop, SiAdobeillustrator, SiTypescript, SiNextdotjs } from 'react-icons/si';
import { useColor } from '../context/ColorContext';

const Skills = () => {
  const { colorScheme } = useColor();

  const skills = [
    {
      title: 'React',
      description: 'A JavaScript library for building user interfaces',
      icon: <FaReact />,
    },
    {
      title: 'JavaScript',
      description: 'A versatile language for web development',
      icon: <FaJs />,
    },
    {
      title: 'Tailwind CSS',
      description: 'A utility-first CSS framework for rapid UI development',
      icon: <SiTailwindcss />,
    },
    {
      title: 'Node.js',
      description: 'JavaScript runtime built on Chrome’s V8 engine',
      icon: <FaNodeJs />,
    },
    {
      title: 'HTML5',
      description: 'The latest version of the markup language for the web',
      icon: <FaHtml5 />,
    },
    {
      title: 'CSS3',
      description: 'Style sheet language for designing web pages',
      icon: <FaCss3Alt />,
    },
    {
      title: 'Figma',
      description: 'Collaborative interface design tool',
      icon: <FaFigma />,
    },
    {
      title: 'WordPress',
      description: 'Content management system for websites',
      icon: <FaWordpress />,
    },
    {
      title: 'Photoshop',
      description: 'Image editing and graphic design software',
      icon: <SiAdobephotoshop />,
    },
    {
      title: 'Illustrator',
      description: 'Vector graphics editor for logos and illustrations',
      icon: <SiAdobeillustrator />,
    },
    {
      title: 'TypeScript',
      description: 'Typed superset of JavaScript for larger applications',
      icon: <SiTypescript />,
    },
    {
      title: 'Next.js',
      description: 'React framework for production-grade applications',
      icon: <SiNextdotjs />,
    },
    {
      title: 'Git',
      description: 'Version control system for tracking changes in code',
      icon: <FaGitAlt />,
    },
  ];

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colorScheme.primary }}>My Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out hover:shadow-lg group"
              style={{ borderColor: colorScheme.secondary }}
            >
              <div 
                className="text-4xl mb-2 text-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                style={{ color: colorScheme.primary }}
              >
                {skill.icon}
              </div>
              <h3 className="text-lg font-bold text-center transition-colors duration-300 ease-in-out group-hover:text-purple-700">
                {skill.title}
              </h3>

              <div 
                className="absolute inset-0 flex items-center justify-center bg-opacity-90 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-lg p-4 transform group-hover:scale-100 scale-95"
                style={{ backgroundColor: colorScheme.primary }}
              >
                <p className="text-sm text-center">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

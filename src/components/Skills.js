import React from 'react';
import { FaReact, FaJs, FaNodeJs, FaHtml5, FaCss3Alt, FaFigma, FaWordpress, FaGitAlt } from 'react-icons/fa';
import { SiTailwindcss, SiAdobephotoshop, SiAdobeillustrator, SiTypescript, SiNextdotjs } from 'react-icons/si';
import { useColor } from '../context/ColorContext';

const Skills = () => {
  const { colorScheme } = useColor();

  const skills = [
    { title: 'React', icon: <FaReact /> },
    { title: 'JavaScript', icon: <FaJs /> },
    { title: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { title: 'Node.js', icon: <FaNodeJs /> },
    { title: 'HTML5', icon: <FaHtml5 /> },
    { title: 'CSS3', icon: <FaCss3Alt /> },
    { title: 'Figma', icon: <FaFigma /> },
    { title: 'WordPress', icon: <FaWordpress /> },
    { title: 'Photoshop', icon: <SiAdobephotoshop /> },
    { title: 'Illustrator', icon: <SiAdobeillustrator /> },
    { title: 'TypeScript', icon: <SiTypescript /> },
    { title: 'Next.js', icon: <SiNextdotjs /> },
    { title: 'Git', icon: <FaGitAlt /> },
  ];

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colorScheme.primary }}>
          My Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-4 rounded-lg flex flex-col items-center text-center"
              style={{
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
                {skill.icon}
              </div>
              {/* Title */}
              <h3
                className="text-lg font-bold"
                style={{
                  color: colorScheme.primary,
                }}
              >
                {skill.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

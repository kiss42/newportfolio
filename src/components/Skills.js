import React from 'react';

const Skills = () => {
  const skills = [
    {
      title: 'React',
      description: 'A JavaScript library for building user interfaces',
      icon: '⚛️',
    },
    {
      title: 'JavaScript',
      description: 'A versatile language for web development',
      icon: '💻',
    },
    {
      title: 'Tailwind CSS',
      description: 'A utility-first CSS framework for rapid UI development',
      icon: '🎨',
    },
    {
      title: 'Node.js',
      description: 'JavaScript runtime built on Chrome’s V8 engine',
      icon: '🌐',
    },
  ];

  return (
    <div className="py-12 px-6 bg-gradient-to-br from-gray-100 via-purple-200 to-purple-600">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">My Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-300 rounded-lg shadow-lg p-4 hover:bg-purple-100 transition-all group animate-fadeIn"
            >
              <div className="text-4xl mb-2 text-center text-purple-700">{skill.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 text-center">{skill.title}</h3>

              {/* Hover effect for skill description */}
              <p className="absolute inset-0 flex items-center justify-center bg-purple-700 bg-opacity-90 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-full transition-all duration-700 ease-out rounded-lg p-4">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

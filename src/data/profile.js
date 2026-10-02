// Everything personal lives here so the site is easy to update in one place.
import { FaGlobe, FaFilm, FaMagic, FaMoneyBillWave } from 'react-icons/fa';

export const profile = {
  name: 'Steven Pierre',
  firstName: 'Steven',
  headline: "I fix what's broken and build what's next.",
  roles: ['React Developer', 'IT Support Specialist', 'Field Service Technician', 'Problem Solver'],
  intro:
    'A decade of keeping people and machines running, now pointed at building fast, modern web experiences with React and Node.js.',
  github: 'https://github.com/kiss42',
};

export const story = [
  "Hi, I'm Steven. For about ten years I've been the person people call when technology stops cooperating — desktop support, hardware repair, and the patient walkthroughs that turn a frustrated user into a confident one.",
  "Today I'm a Field Service Technician at AgusIT, managing customer equipment repairs and preventative maintenance while making sure every visit ends with a happy customer.",
  "On the other side of my work, I'm a freelance React developer. I modernize web apps with React and Node.js, obsessing over speed, performance, and the small details that make a site feel good to use.",
];

export const stats = [
  { value: 10, suffix: '+', label: 'Years in IT' },
  { value: 5, suffix: '', label: 'Live builds' },
  { value: 13, suffix: '', label: 'Tools in my kit' },
];

export const journey = [
  {
    title: 'IT Support',
    place: 'Where it started',
    text: 'Troubleshooting, setups, and help-desk work — learning that tech is really about people.',
  },
  {
    title: 'Desktop Support Technician',
    place: 'Leveling up',
    text: 'Owning end-user environments, hardware, and the fixes that keep teams productive.',
  },
  {
    title: 'Field Service Technician',
    place: 'AgusIT · Now',
    text: 'On-site equipment repairs and preventative maintenance with a customer-first mindset.',
  },
  {
    title: 'Freelance React Developer',
    place: 'Independent · Now',
    text: 'Modernizing web apps with React and Node.js, focused on speed and performance.',
  },
];

export const values = [
  { title: 'Calm under pressure', text: 'Ten years of "it\'s broken and we need it now" taught me to slow down and solve it right.' },
  { title: 'Plain-language tech', text: 'I explain the how and the why so the people I work with feel in control.' },
  { title: 'Speed is a feature', text: 'Fast sites and fast fixes. Performance is how I show respect for people\'s time.' },
];

export const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website to showcase my projects and skills.',
    link: 'https://kiss42.github.io/My-Portfolio/',
    icon: FaGlobe,
    tags: ['React', 'Tailwind'],
  },
  {
    title: 'Movie Review Website',
    description: 'A movie review website template for writing reviews.',
    link: 'https://kiss42.github.io/movie-review-template/',
    icon: FaFilm,
    tags: ['JavaScript', 'CSS'],
  },
  {
    title: 'SoulSite',
    description: 'A mystical-themed web app offering spiritual tools.',
    link: 'https://kiss42.github.io/soulsite/',
    icon: FaMagic,
    tags: ['React', 'UI'],
  },
  {
    title: 'Budgeting Tool',
    description: 'A budgeting tool to manage personal finances effectively.',
    link: 'https://kiss42.github.io/Budget-Tool/',
    icon: FaMoneyBillWave,
    tags: ['JavaScript', 'Finance'],
  },
];

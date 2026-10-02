// Everything personal lives here so the site is easy to update in one place.
import { FaGlobe, FaFilm, FaMoneyBillWave } from 'react-icons/fa';

export const profile = {
  name: 'Steven Pierre',
  firstName: 'Steven',
  headline: "I fix what's broken and build what's next.",
  roles: ['Independent Contractor', 'Full-Stack Developer', 'Linux Operator', 'IT Support Specialist', 'Problem Solver'],
  intro:
    'A decade of keeping people and machines running, now pointed at building fast, modern web experiences with React and Node.js.',
  github: 'https://github.com/kiss42',
};

export const story = [
  "Hi, I'm Steven. For about ten years I've been the person people call when technology stops cooperating — desktop support, hardware repair, and the patient walkthroughs that turn a frustrated user into a confident one.",
  "Today I'm an independent contractor working across numerous projects — on-site equipment repair and preventative maintenance, workstation setups, and troubleshooting — making sure every job ends with a happy client.",
  "On the other side of my work, I'm a freelance React developer. I modernize web apps with React and Node.js, obsessing over speed, performance, and the small details that make a site feel good to use.",
];

export const stats = [
  { value: 10, suffix: '+', label: 'Years in IT' },
  { value: 6, suffix: '', label: 'Live builds' },
  { value: 15, suffix: '', label: 'Tools in my kit' },
];

export const journey = [
  {
    title: 'Customer Service & Sales',
    place: 'Where it started',
    text: 'Years at Target and in sales taught me that technology is really about people.',
  },
  {
    title: 'Computer Repair Technician',
    place: 'DeWitt and DeWitt',
    text: 'Deploying workstations, testing hardware, and finding cost-effective repairs and upgrades.',
  },
  {
    title: 'Independent Contractor',
    place: 'Self-employed · Now',
    text: 'IT service, equipment repair, and preventative maintenance across numerous client projects.',
  },
  {
    title: 'React Developer',
    place: 'Freelance · Now',
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
    title: 'Budgeting Tool',
    description: 'A budgeting tool to manage personal finances effectively.',
    link: 'https://kiss42.github.io/Budget-Tool/',
    icon: FaMoneyBillWave,
    tags: ['JavaScript', 'Finance'],
  },
];

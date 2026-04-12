const CONFIG = {
  // Personal info
  name: "Alex Developer",
  role: "Full-Stack Developer",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  resumeUrl: "#",

  // GitHub username for fetching repos
  githubUsername: "OctoPassik",

  // Hero section
  hero: {
    greeting: "Hi, I'm",
    typedStrings: [
      "Full-Stack Developer",
      "Open Source Enthusiast",
      "UI/UX Designer",
      "Problem Solver",
    ],
    description:
      "I build modern web applications with clean code and great user experience. Passionate about open source and always learning something new.",
    cta: { text: "View My Work", link: "#projects" },
    ctaSecondary: { text: "Contact Me", link: "#contact" },
  },

  // About section
  about: {
    title: "About Me",
    description:
      "I'm a passionate developer with experience in building full-stack web applications. I enjoy turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, you'll find me exploring new technologies and contributing to open source.",
    skills: [
      { name: "JavaScript / TypeScript", level: 90 },
      { name: "React / Vue.js", level: 85 },
      { name: "Node.js / Express", level: 80 },
      { name: "Python / Django", level: 75 },
      { name: "HTML / CSS / Tailwind", level: 95 },
      { name: "Git / DevOps", level: 70 },
    ],
  },

  // Tech stack
  techStack: [
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "Python", icon: "devicon-python-plain colored" },
    { name: "HTML5", icon: "devicon-html5-plain colored" },
    { name: "CSS3", icon: "devicon-css3-plain colored" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "Docker", icon: "devicon-docker-plain colored" },
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  ],

  // Projects section
  projects: {
    title: "My Projects",
    description: "Here are some of my recent projects from GitHub.",
    maxRepos: 6,
    excludeForks: true,
    sortBy: "updated", // "updated", "stars", "name"
  },

  // Contact section
  contact: {
    title: "Get In Touch",
    description:
      "I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out!",
    email: "alex@example.com",
  },

  // Social links
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/OctoPassik",
      icon: "devicon-github-original",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/",
      icon: "devicon-linkedin-plain",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/",
      icon: "devicon-twitter-original",
    },
  ],

  // Navigation
  nav: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Tech Stack", href: "#tech" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  // Footer
  footer: {
    text: "Designed & Built with",
  },
};

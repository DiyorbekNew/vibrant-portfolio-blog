
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A fully responsive e-commerce platform with product filtering, user authentication, and payment processing capabilities.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    demoUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/username/ecommerce",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, customizable workspaces, and progress tracking.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Web App",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    demoUrl: "https://example.com/task-app",
    githubUrl: "https://github.com/username/task-app",
    featured: true
  },
  {
    id: 3,
    title: "Portfolio Website Template",
    description: "A customizable portfolio template for developers and designers with smooth animations and responsive design.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Frontend",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    demoUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/username/portfolio",
    featured: true
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "A weather application that provides real-time forecasts, location-based services, and interactive maps.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Mobile App",
    technologies: ["React Native", "OpenWeatherAPI", "Geolocation"],
    githubUrl: "https://github.com/username/weather-app",
    featured: false
  },
  {
    id: 5,
    title: "Recipe Finder",
    description: "A recipe finder application with filtering options based on ingredients, dietary restrictions, and cooking time.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Web App",
    technologies: ["Angular", "Node.js", "PostgreSQL"],
    demoUrl: "https://example.com/recipe-finder",
    featured: false
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "An analytics dashboard for tracking social media metrics across multiple platforms.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Data Visualization",
    technologies: ["D3.js", "React", "Express", "CSV Export"],
    featured: false
  }
];

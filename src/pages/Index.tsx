
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import { projects } from "../data/projects";
import { blogPosts } from "../data/posts";

const Index: React.FC = () => {
  // Get featured projects and posts
  const featuredProjects = projects.filter(project => project.featured);
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Frontend Developer & UI Designer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              I build exceptional and accessible digital experiences for the web.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/projects" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium"
              >
                View My Work
              </Link>
              <a 
                href="#contact" 
                className="bg-secondary border border-border hover:bg-accent px-6 py-3 rounded-md font-medium"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6 text-muted-foreground">
              I'm a passionate frontend developer with a strong background in creating
              modern, responsive web applications. With expertise in React, TypeScript,
              and modern CSS frameworks, I build applications that are not only
              functional but also provide exceptional user experiences.
            </p>
            <p className="text-lg text-muted-foreground">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source projects, or sharing my knowledge through
              my blog. I'm always open to new opportunities and collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section bg-secondary">
        <div className="container">
          <h2 className="section-title text-center">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Frontend Development</h3>
              <p className="text-muted-foreground mb-4">
                React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Styled Components
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Backend Development</h3>
              <p className="text-muted-foreground mb-4">
                Node.js, Express, MongoDB, Firebase, RESTful APIs, GraphQL
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Tools & Others</h3>
              <p className="text-muted-foreground mb-4">
                Git, Webpack, Vite, Jest, Storybook, Figma, Adobe XD
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Latest Projects</h2>
            <Link to="/projects" className="text-primary hover:underline font-medium">
              View All Projects
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Latest Posts</h2>
            <Link to="/blog" className="text-primary hover:underline font-medium">
              View All Posts
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

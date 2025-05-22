
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import { projects } from "../data/projects";
import { blogPosts } from "../data/posts";
import { useLanguage } from "../hooks/useLanguage";

const Index: React.FC = () => {
  // Get featured projects and posts
  const featuredProjects = projects.filter(project => project.featured);
  const featuredPosts = blogPosts.filter(post => post.featured);
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/projects" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium"
              >
                {t("hero.viewWork")}
              </Link>
              <a 
                href="#contact" 
                className="bg-secondary border border-border hover:bg-accent px-6 py-3 rounded-md font-medium"
              >
                {t("hero.contact")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">{t("about.title")}</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6 text-muted-foreground">
              {t("about.paragraph1")}
            </p>
            <p className="text-lg text-muted-foreground">
              {t("about.paragraph2")}
            </p>
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">{t("projects.latestTitle")}</h2>
            <Link to="/projects" className="text-primary hover:underline font-medium">
              {t("projects.viewAll")}
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
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">{t("blog.latestTitle")}</h2>
            <Link to="/blog" className="text-primary hover:underline font-medium">
              {t("blog.viewAll")}
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

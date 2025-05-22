
import React, { useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const Projects: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(projects.map((project) => project.category))
  );

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowerCaseQuery) ||
        project.description.toLowerCase().includes(lowerCaseQuery) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(lowerCaseQuery)
        )
    );
    
    setFilteredProjects(filtered);
    setActiveCategory(null);
  };

  const filterByCategory = (category: string | null) => {
    if (category === null) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => project.category === category);
      setFilteredProjects(filtered);
    }
    setActiveCategory(category);
  };

  return (
    <Layout>
      <section className="py-12 bg-secondary">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">
            Explore my latest work and personal projects
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <SearchBar 
              placeholder="Search projects..." 
              onSearch={handleSearch} 
            />
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => filterByCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                All
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => filterByCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;

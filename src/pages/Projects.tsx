
import React, { useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import ProjectCard from "../components/ProjectCard";
import { useLanguage } from "../hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";

interface Technology {
  id: number;
  technology: string;
}

interface Category {
  id: number;
  title: string;
}

interface Project {
  id: number;
  technologies: Technology[];
  category: Category;
  title: string;
  description: string;
  body: string;
  image_url: string;
  demo_url?: string;
  slug: string;
}

const Projects: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories', language],
    queryFn: async () => {
      const response = await fetch('https://api.xazratqulov.uz/project/categories/', {
        headers: {
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json() as Promise<Category[]>;
    }
  });

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects', language, activeCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeCategory) params.append('category', activeCategory.toString());
      if (searchQuery) params.append('search', searchQuery);
      
      const url = `https://api.xazratqulov.uz/project/projects/${params.toString() ? '?' + params.toString() : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json() as Promise<Project[]>;
    }
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory(null);
  };

  const filterByCategory = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    setSearchQuery("");
  };

  return (
    <Layout>
      <section className="py-12 bg-secondary">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("projects.title")}</h1>
          <p className="text-xl text-muted-foreground">
            {t("projects.description")}
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <SearchBar 
              placeholder={t("projects.search")}
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
                  key={category.id}
                  onClick={() => filterByCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
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

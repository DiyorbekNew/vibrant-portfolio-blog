
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import { useLanguage } from "../hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

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

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug, language],
    queryFn: async () => {
      const response = await fetch(`https://api.xazratqulov.uz/project/projects/${slug}/`, {
        headers: {
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch project');
      return response.json();
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="text-center">
            <p className="text-muted-foreground">Loading project...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-lg mb-6">
            <img 
              src={project.image_url} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-sm px-3 py-1 bg-secondary rounded-full">
                {project.category.title}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech.id} 
                    className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground"
                  >
                    {tech.technology}
                  </span>
                ))}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
            
            <div className="flex gap-4">
              {project.demo_url && (
                <Button asChild>
                  <a 
                    href={project.demo_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="max-w-4xl mx-auto">
          <div 
            dangerouslySetInnerHTML={{ __html: project.body }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;

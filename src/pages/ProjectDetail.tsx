import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { appendIpParam, getApiHeaders } from "@/lib/api";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import type {Technology, Category } from "@/types";
import DOMPurify from "dompurify";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import SEO from "@/components/SEO";

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const url = appendIpParam(`https://api.xazratqulov.uz/project/projects/${slug}/`);
      const response = await fetch(url, {
        headers: getApiHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch project');
      return response.json();
    },
    enabled: !!slug
  });

  // Sanitize HTML at top level - BEFORE any conditional returns
  const sanitizedBody = useMemo(() => {
    if (!project?.body) return '';
    return DOMPurify.sanitize(project.body, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
  }, [project?.body]);

  if (isLoading) {
    return (
      <Layout>
        <PageSkeleton />
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loyiha topilmadi</h1>
            <p className="text-muted-foreground">Siz qidirayotgan loyiha mavjud emas.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={project.title}
        description={project.description}
        image={project.image_url}
        url={`/projects/${project.slug}`}
        type="article"
      />
      <div className="container py-12">
        {/* Back to Projects Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/projects" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Loihalarga Qaytish
            </Link>
          </Button>
        </div>

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
              <div className="flex flex-wrap gap-2">
                {project.category.map((cat: Category) => (
                  <span key={cat.id} className="text-sm px-3 py-1 bg-secondary rounded-full">
                    {cat.title}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: Technology) => (
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
                    Loyihani Ko'rish
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Project Content with CKEditor styling */}
        <div 
          className="ckeditor-content"
          dangerouslySetInnerHTML={{ __html: sanitizedBody }}
        />
      </div>
    </Layout>
  );
};

export default ProjectDetail;

import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Calendar, Eye, ArrowLeft } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";

interface Theme {
  id: number;
  title: string;
}

interface BlogPost {
  id: number;
  themes: Theme[];
  title: string;
  description: string;
  body: string;
  image_url: string;
  created_at: string;
  slug: string;
  views_count: number;
}

const BlogPost: React.FC = () => {
  const { id: slug } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  // Fetch the specific post using slug
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug, language],
    queryFn: async () => {
      const response = await fetch(`https://api.xazratqulov.uz/blog/post/${slug}/`, {
        headers: {
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch post');
      return response.json();
    },
    enabled: !!slug
  });
  
  // Fetch all posts to find related posts
  const { data: posts = [] } = useQuery({
    queryKey: ['posts', language],
    queryFn: async () => {
      const response = await fetch('https://api.xazratqulov.uz/blog/post/', {
        headers: {
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });

  // Get related posts (same themes)
  const relatedPosts = post
    ? posts
        .filter(
          (p) => p.id !== post.id && p.themes.some((theme) => post.themes.some(postTheme => postTheme.id === theme.id))
        )
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (error) {
      navigate("/blog", { replace: true });
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [error, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Post Header */}
      <section className="py-12 bg-secondary">
        <div className="container">
          <Link to="/blog" className="flex items-center text-primary hover:underline mb-6">
            <ArrowLeft size={16} className="mr-2" />
            {t("blog.backToBlog")}
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{post.created_at}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{post.views_count} {t("blog.views")}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <div className="container max-w-4xl my-8">
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Post Content with CKEditor styling */}
      <div 
        className="ckeditor-content"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
      
      {/* Tags */}
      <div className="container max-w-3xl my-8">
        <div className="mt-12 flex flex-wrap gap-2">
          {post.themes.map((theme) => (
            <span 
              key={theme.id}
              className="px-3 py-1 bg-secondary rounded-full text-sm"
            >
              {theme.title}
            </span>
          ))}
        </div>
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section bg-secondary">
          <div className="container">
            <h2 className="section-title">{t("blog.relatedPosts")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-card rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={relatedPost.image_url} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{relatedPost.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{relatedPost.description}</p>
                    <Link 
                      to={`/blog/${relatedPost.slug}`} 
                      className="text-primary hover:underline font-medium"
                    >
                      {t("blog.readMore")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;

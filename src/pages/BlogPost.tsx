
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
  
  // Fetch all posts to find the current one and related posts
  const { data: posts = [] } = useQuery({
    queryKey: ['posts', language],
    queryFn: async () => {
      const response = await fetch('https://api.xazratqulov.uz/blog/post/', {
        headers: {
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json() as Promise<BlogPost[]>;
    }
  });

  // Find the current post by slug
  const post = posts.find((post) => post.slug === slug);
  
  // Get related posts (same themes)
  const relatedPosts = post
    ? posts
        .filter(
          (p) => p.id !== post.id && p.themes.some((theme) => post.themes.some(postTheme => postTheme.id === theme.id))
        )
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (posts.length > 0 && !post) {
      navigate("/blog", { replace: true });
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post, navigate, posts.length]);

  if (!post && posts.length > 0) return null;

  if (!post) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
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
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{post.created_at}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{post.views_count} views</span>
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
      
      {/* Post Content */}
      <article className="container max-w-3xl my-8">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        
        {/* Tags */}
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
      </article>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section bg-secondary">
          <div className="container">
            <h2 className="section-title">Related Posts</h2>
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
                      Read More
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

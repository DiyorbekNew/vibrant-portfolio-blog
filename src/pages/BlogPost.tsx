import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Calendar, Eye, ArrowLeft, Heart } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiHeaders, API_BASE_URL, togglePostLike } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

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
  likes_count: number;
  have_like: boolean;
}

const BlogPost: React.FC = () => {
  const { id: slug } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLiking, setIsLiking] = useState(false);
  
  // Fetch the specific post using slug
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/blog/post/${slug}/`, {
        headers: getApiHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch post');
      return response.json();
    },
    enabled: !!slug
  });
  
  // Fetch all posts to find related posts
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/blog/post/`, {
        headers: getApiHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });

  // Get related posts (same themes)
  const relatedPosts = post
    ? posts
        .filter(
          (p: BlogPost) => p.id !== post.id && p.themes.some((theme: Theme) => post.themes.some((postTheme: Theme) => postTheme.id === theme.id))
        )
        .slice(0, 3)
    : [];

  const handleLike = async () => {
    if (!slug || isLiking) return;
    
    setIsLiking(true);
    try {
      await togglePostLike(slug);
      // Invalidate queries to refresh like count
      queryClient.invalidateQueries({ queryKey: ['post', slug] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Muvaffaqiyatli!",
        description: "Like holati o'zgartirildi",
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Like qo'shishda xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

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
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Post topilmadi</h1>
          <p className="text-muted-foreground">Siz qidirayotgan blog posti mavjud emas.</p>
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
            Blogga Qaytish
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{post.created_at}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{post.views_count} ko'rishlar</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={16} className="text-red-500" />
              <span>{post.likes_count} yoqtirishlar</span>
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
      
      {/* Post Content with Markdown */}
      <div className="container max-w-3xl my-8 prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeString = String(children).replace(/\n$/, '');
              
              if (match) {
                return (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                );
              }
              
              return (
                <code className="bg-zinc-800 text-orange-300 px-1.5 py-0.5 rounded font-mono text-xs" {...props}>
                  {children}
                </code>
              );
            },
            pre({ children }) {
              return <>{children}</>;
            },
            h1({ children }) {
              return <h1 className="text-2xl font-bold text-foreground mt-6 mb-3">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-xl font-bold text-foreground mt-5 mb-2">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{children}</h3>;
            },
            p({ children }) {
              return <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>;
            },
            ul({ children }) {
              return <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">{children}</ol>;
            },
            blockquote({ children }) {
              return <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">{children}</blockquote>;
            },
            a({ href, children }) {
              return <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>;
            },
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>
      
      {/* Tags */}
      <div className="container max-w-3xl my-8">
        <div className="mt-12 flex flex-wrap gap-2">
          {post.themes.map((theme: Theme) => (
            <span 
              key={theme.id}
              className="px-3 py-1 bg-secondary rounded-full text-sm"
            >
              {theme.title}
            </span>
          ))}
        </div>
      </div>
      
      {/* Like Button Section */}
      <div className="container max-w-3xl my-8">
        <div className="flex items-center justify-between py-6 border-t border-border">
          <span className="text-muted-foreground text-sm">
            Ushbu post foydali bo'ldimi?
          </span>
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`group flex items-center gap-2 px-4 py-2 border rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              post.have_like 
                ? 'bg-primary/10 border-primary/30 text-primary' 
                : 'bg-secondary hover:bg-secondary/80 border-border text-foreground'
            }`}
          >
            <Heart 
              size={18} 
              className={`transition-all duration-200 ${post.have_like ? 'text-primary fill-primary' : 'group-hover:text-primary'} ${isLiking ? 'animate-pulse' : ''}`}
            />
            <span className="text-sm">
              {isLiking ? '...' : post.likes_count}
            </span>
          </button>
        </div>
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section bg-secondary">
          <div className="container">
            <h2 className="section-title">Tegishli Postlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: BlogPost) => (
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
                      Batafsil O'qish
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

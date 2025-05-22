
import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { blogPosts } from "../data/posts";
import { Calendar, Eye, ArrowLeft } from "lucide-react";

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the post by id
  const post = blogPosts.find((post) => post.id === Number(id));
  
  // Get related posts (same tags)
  const relatedPosts = post
    ? blogPosts
        .filter(
          (p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag))
        )
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (!post) {
      navigate("/blog", { replace: true });
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) return null;

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
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{post.views} views</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <div className="container max-w-4xl my-8">
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Post Content */}
      <article className="container max-w-3xl my-8">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link 
              key={tag} 
              to={`/blog?tag=${tag}`}
              className="px-3 py-1 bg-secondary rounded-full text-sm"
            >
              {tag}
            </Link>
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
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{relatedPost.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                    <Link 
                      to={`/blog/${relatedPost.id}`} 
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

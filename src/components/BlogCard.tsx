import { Link } from "react-router-dom";
import { Calendar, Eye, Heart } from "lucide-react";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={post.image_url} 
          alt={`${post.title} blog posti rasmi`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1" aria-label={`Sana: ${post.created_at}`}>
            <Calendar size={14} aria-hidden="true" />
            <time dateTime={post.created_at}>{post.created_at}</time>
          </div>
          <div className="flex items-center gap-1" aria-label={`${post.views_count} ta ko'rish`}>
            <Eye size={14} aria-hidden="true" />
            <span>{post.views_count}</span>
          </div>
          <div className="flex items-center gap-1" aria-label={`${post.likes_count} ta yoqtirish`}>
            <Heart size={14} className="text-red-500" aria-hidden="true" />
            <span>{post.likes_count}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{post.description}</p>
        
        <Link 
          to={`/blog/${post.slug}`} 
          className="text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
          aria-label={`${post.title} postini batafsil o'qish`}
        >
          Batafsil O'qish
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;

import { Link } from "react-router-dom";
import { Calendar, Eye, Heart, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="aspect-video w-full overflow-hidden">
        <img
          src={post.image_url}
          alt={`${post.title} blog posti rasmi`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      </div>

      <div className="relative p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1.5" aria-label={`Sana: ${post.created_at}`}>
            <Calendar size={14} className="text-primary/70" aria-hidden="true" />
            <time dateTime={post.created_at}>{post.created_at}</time>
          </div>
          <div className="flex items-center gap-1.5" aria-label={`${post.views_count} ta ko'rish`}>
            <Eye size={14} className="text-primary/70" aria-hidden="true" />
            <span>{post.views_count}</span>
          </div>
          <div className="flex items-center gap-1.5" aria-label={`${post.likes_count} ta yoqtirish`}>
            <Heart size={14} className="text-red-400" aria-hidden="true" />
            <span>{post.likes_count}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{post.title}</h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">{post.description}</p>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
          aria-label={`${post.title} postini batafsil o'qish`}
        >
          Batafsil O'qish
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;

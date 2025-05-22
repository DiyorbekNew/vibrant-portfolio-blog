
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/posts";
import { Calendar, Eye } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{post.views} views</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
        
        <Link 
          to={`/blog/${post.id}`} 
          className="text-sm font-medium text-primary hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

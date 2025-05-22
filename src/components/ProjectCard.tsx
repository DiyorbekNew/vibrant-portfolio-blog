
import { Link } from "react-router-dom";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span className="text-xs px-2 py-1 bg-secondary rounded-full">{project.category}</span>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          <Link 
            to={`/projects/${project.id}`} 
            className="text-sm font-medium text-primary hover:underline"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

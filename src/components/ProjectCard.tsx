import { Link } from "react-router-dom";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={project.image_url} 
          alt={`${project.title} loyihasi rasmi`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <div className="flex flex-wrap gap-1" role="list" aria-label="Loyiha kategoriyalari">
            {project.category.map((cat) => (
              <span key={cat.id} className="text-xs px-2 py-1 bg-secondary rounded-full" role="listitem">
                {cat.title}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-wrap gap-2" role="list" aria-label="Texnologiyalar">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech.id} className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground" role="listitem">
                {tech.technology}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground" aria-label={`Va yana ${project.technologies.length - 3} ta texnologiya`}>
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          <Link 
            to={`/projects/${project.slug}`} 
            className="text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
            aria-label={`${project.title} loyihasini ko'rish`}
          >
            Loyihani Ko'rish
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

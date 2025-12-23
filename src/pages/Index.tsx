import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { appendIpParam, getApiHeaders } from "@/lib/api";

interface Theme {
  id: number;
  title: string;
}

interface Topic {
  id: number;
  title: string;
  note_count: number;
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
}

interface Technology {
  id: number;
  technology: string;
}

interface Category {
  id: number;
  title: string;
}

interface Project {
  id: number;
  technologies: Technology[];
  category: Category[];
  title: string;
  description: string;
  body: string;
  image_url: string;
  demo_url?: string;
  slug: string;
}

const Index: React.FC = () => {
  // Fetch projects from API
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const url = appendIpParam('https://api.xazratqulov.uz/project/projects/');
      const response = await fetch(url, {
        headers: getApiHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json() as Promise<Project[]>;
    }
  });

  // Get featured projects (first 3 projects for now)
  const featuredProjects = projects.slice(0, 3);

  // Fetch posts from API
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const url = appendIpParam('https://api.xazratqulov.uz/blog/post/');
      const response = await fetch(url, {
        headers: getApiHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json() as Promise<BlogPost[]>;
    }
  });

  // Get featured posts (first 3 posts for now)
  const featuredPosts = posts.slice(0, 3);

  // Fetch topics from API
  const { data: topics = [] } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const url = appendIpParam('https://api.xazratqulov.uz/topics/topics/');
      const response = await fetch(url, {
        headers: getApiHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch topics');
      return response.json() as Promise<Topic[]>;
    }
  });

  // Get featured topics (first 6 topics)
  const featuredTopics = topics.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-secondary to-accent/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in">
              👋 Salom, men Diyorbek Xazratqulov
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent leading-tight">
              Python Backend Dasturchi
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Python orqali ishonchli va kengayadigan backend yechimlarni yarataman.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/projects" 
                className="group relative inline-flex items-center px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Ishlarimni Ko'ring</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Men Haqimda
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Men zamonaviy va kengayadigan server ilovalarini yaratish bo'yicha kuchli tajribaga ega ishtiyoqli Python backend dasturchisiman. Django, Flask, FastAPI va ma'lumotlar bazasini boshqarish tizimlarida tajribam bilan, zamonaviy veb-ilovalarni quvvatlaydigan samarali backend yechimlarini yarataman.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Kod yozish bilan band bo'lmaganimda, yangi texnologiyalarni o'rganish, ochiq manbali loyihalarga hissa qo'shish yoki blogim orqali bilimlarimni ulashishimni topishingiz mumkin. Men har doim yangi imkoniyatlar va hamkorliklar uchun ochiqman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="section bg-gradient-to-br from-secondary/50 to-accent/20">
        <div className="container">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent pb-1">
              So'nggi Loyihalar
            </h2>
            <Link to="/projects" className="group inline-flex items-center text-primary hover:text-primary/80 font-semibold text-lg transition-all duration-300">
              Barcha Loyihalarni Ko'rish
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent pb-1">
              So'nggi Postlar
            </h2>
            <Link to="/blog" className="group inline-flex items-center text-primary hover:text-primary/80 font-semibold text-lg transition-all duration-300">
              Barcha Postlarni Ko'rish
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredPosts.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="section bg-gradient-to-br from-secondary/50 to-accent/20">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent pb-1">
              Mavzular
            </h2>
            <Link to="/topics" className="group inline-flex items-center text-primary hover:text-primary/80 font-semibold text-sm sm:text-lg transition-all duration-300">
              Barcha Mavzularni Ko'rish
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredTopics.map((topic, index) => (
              <Link
                key={topic.id}
                to={`/topics?topic=${topic.id}`}
                className="group relative p-6 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">#</span>
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {topic.title.replace(/^#\s*/, "")}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {topic.note_count} ta eslatma
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

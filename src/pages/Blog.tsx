
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import BlogCard from "../components/BlogCard";
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

const Blog: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch themes
  const { data: themes = [] } = useQuery({
    queryKey: ['themes', language],
    queryFn: async () => {
      const response = await fetch('https://api.xazratqulov.uz/blog/themes/', {
        headers: {
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch themes');
      return response.json() as Promise<Theme[]>;
    }
  });

  // Fetch posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts', language, activeTheme, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeTheme) params.append('theme', activeTheme.toString());
      if (searchQuery) params.append('search', searchQuery);
      
      const url = `https://api.xazratqulov.uz/blog/post/${params.toString() ? '?' + params.toString() : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Accept-Language': language
        }
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json() as Promise<BlogPost[]>;
    }
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTheme(null);
  };

  const filterByTheme = (themeId: number | null) => {
    setActiveTheme(themeId);
    setSearchQuery("");
  };

  return (
    <Layout>
      <section className="py-12 bg-secondary">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("blog.title")}</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights on web development
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <SearchBar 
              placeholder={t("blog.search")}
              onSearch={handleSearch} 
            />
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => filterByTheme(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTheme === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                All
              </button>
              
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => filterByTheme(theme.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeTheme === theme.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {theme.title}
                </button>
              ))}
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

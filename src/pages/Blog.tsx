import React, { useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import BlogCard from "../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getApiHeaders, API_BASE_URL, appendIpParam } from "@/lib/api";
import type { BlogPost, Theme } from "@/types";
import { BlogCardSkeleton } from "@/components/LoadingSkeleton";
import SEO from "@/components/SEO";

const Blog: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch themes
  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: async () => {
      const url = appendIpParam(`${API_BASE_URL}/blog/themes/`);
      const response = await fetch(url, {
        headers: getApiHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch themes');
      return response.json() as Promise<Theme[]>;
    }
  });

  // Fetch posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts', activeTheme, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeTheme) params.append('theme', activeTheme.toString());
      if (searchQuery) params.append('search', searchQuery);
      
      let url = `${API_BASE_URL}/blog/post/${params.toString() ? '?' + params.toString() : ''}`;
      url = appendIpParam(url);
      
      const response = await fetch(url, {
        headers: getApiHeaders()
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
      <SEO
        title="Blog"
        description="Veb-dasturlash bo'yicha fikrlar, qo'llanmalar va ma'lumotlar. Python backend, Django, Flask va boshqa texnologiyalar haqida postlar."
        url="/blog"
      />
      <section className="py-12 bg-secondary">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Backend dasturlash bo'yicha fikrlar, qo'llanmalar va ma'lumotlar
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <SearchBar 
              placeholder="Postlarni qidirish..."
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
                Barchasi
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">Postlar topilmadi</h3>
              <p className="text-muted-foreground">
                Qidiruv yoki filtr mezonlarini o'zgartirib ko'ring
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

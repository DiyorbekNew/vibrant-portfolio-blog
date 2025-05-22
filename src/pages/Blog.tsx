
import React, { useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import BlogCard from "../components/BlogCard";
import { blogPosts } from "../data/posts";

const Blog: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get unique tags
  const tags = Array.from(
    new Set(blogPosts.flatMap((post) => post.tags))
  ).sort();

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    
    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.content.toLowerCase().includes(lowerCaseQuery) ||
        post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
    
    setFilteredPosts(filtered);
    setActiveTag(null);
  };

  const filterByTag = (tag: string | null) => {
    if (tag === null) {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter((post) => 
        post.tags.includes(tag)
      );
      setFilteredPosts(filtered);
    }
    setActiveTag(tag);
  };

  return (
    <Layout>
      <section className="py-12 bg-secondary">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights on web development
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            <SearchBar 
              placeholder="Search posts..." 
              onSearch={handleSearch} 
            />
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => filterByTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTag === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                All
              </button>
              
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => filterByTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
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

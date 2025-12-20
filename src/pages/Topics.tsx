import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import { Search, Hash, ChevronRight, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Topic {
  id: number;
  title: string;
  note_count: number;
}

interface Tag {
  id: number;
  name: string;
}

interface Note {
  title: string;
  description: string;
  tags: Tag[];
}

interface NotesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Note[];
}

const Topics: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("https://api.xazratqulov.uz/topics/topics/", {
          headers: { "Accept-Language": "uz" },
        });
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setIsLoadingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  // Fetch notes
  const fetchNotes = useCallback(async (pageNum: number, append: boolean = false) => {
    setIsLoadingNotes(true);
    try {
      let url = selectedTopic
        ? `https://api.xazratqulov.uz/topics/notes/${selectedTopic}?page=${pageNum}`
        : `https://api.xazratqulov.uz/topics/notes/?page=${pageNum}`;
      
      // Add search and tag params for all notes endpoint
      if (!selectedTopic) {
        if (debouncedSearch) {
          url += `&search=${encodeURIComponent(debouncedSearch)}`;
        }
        if (selectedTag) {
          url += `&tag=${selectedTag.id}`;
        }
      }

      const response = await fetch(url, { headers: { "Accept-Language": "uz" } });
      const data: NotesResponse = await response.json();
      
      if (append) {
        setNotes(prev => [...prev, ...data.results]);
      } else {
        setNotes(data.results);
      }
      
      setTotalCount(data.count);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoadingNotes(false);
    }
  }, [selectedTopic, debouncedSearch, selectedTag]);

  // Reset and fetch when filters change
  useEffect(() => {
    setNotes([]);
    setPage(1);
    setHasMore(false);
    fetchNotes(1);
  }, [selectedTopic, debouncedSearch, selectedTag, fetchNotes]);

  // Infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingNotes) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoadingNotes]);

  // Fetch more notes when page changes
  useEffect(() => {
    if (page > 1) {
      fetchNotes(page, true);
    }
  }, [page]);

  const selectedTopicData = topics.find(t => t.id === selectedTopic);
  const totalTopicNotes = topics.reduce((sum, t) => sum + t.note_count, 0);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Search Header */}
        <div className="border-b bg-background/95 backdrop-blur sticky top-[65px] z-40">
          <div className="container py-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Mavzular bo'yicha qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
              {selectedTag && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Tag:</span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs hover:bg-primary/80 transition-colors"
                  >
                    <Hash className="h-3 w-3" />
                    {selectedTag.name}
                    <span className="ml-1">×</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-[160px]">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  Mavzular
                </h3>
                <nav className="space-y-1">
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                      !selectedTopic 
                        ? "bg-secondary text-foreground font-medium" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Barchasi
                    </span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      {totalTopicNotes}
                    </span>
                  </button>
                  {isLoadingTopics ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    topics.map((topic) => {
                      const topicName = topic.title.replace(/^#\s*/, "");
                      return (
                        <button
                          key={topic.id}
                          onClick={() => setSelectedTopic(topic.id)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                            selectedTopic === topic.id 
                              ? "bg-secondary text-foreground font-medium" 
                              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            {topicName}
                          </span>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {topic.note_count}
                          </span>
                        </button>
                      );
                    })
                  )}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>Mavzular</span>
                  {selectedTopicData && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-foreground">{selectedTopicData.title.replace(/^#\s*/, "")}</span>
                    </>
                  )}
                </div>
                <h1 className="text-2xl font-semibold">
                  {selectedTopicData ? selectedTopicData.title.replace(/^#\s*/, "") : "Barcha eslatmalar"}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {totalCount} ta eslatma
                </p>
              </div>

              {/* Notes Grid */}
              <div className="space-y-4">
                {isLoadingNotes && notes.length === 0 && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}

                {notes.map((note, index) => (
                  <article
                    key={`${note.title}-${index}`}
                    className="group border rounded-xl p-5 bg-card hover:border-foreground/20 transition-all"
                  >
                    <h2 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </h2>
                    <div className="text-muted-foreground text-sm mb-4 prose prose-sm dark:prose-invert max-w-none
                      prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
                      prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                      prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-foreground prose-code:font-mono prose-code:text-xs
                      prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                      prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0
                      prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5
                      prose-strong:text-foreground prose-a:text-primary">
                      <ReactMarkdown>{note.description}</ReactMarkdown>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => setSelectedTag(tag)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          <Hash className="h-3 w-3" />
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}

                {notes.length === 0 && !isLoadingNotes && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Eslatma topilmadi</h3>
                    <p className="text-muted-foreground text-sm">
                      {searchQuery || selectedTag ? "Qidiruv so'rovingizni o'zgartirib ko'ring" : "Bu mavzuda hali eslatma yo'q"}
                    </p>
                  </div>
                )}

                {/* Load more trigger */}
                {hasMore && (
                  <div ref={loadMoreRef} className="flex items-center justify-center py-4">
                    {isLoadingNotes && (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Topics;

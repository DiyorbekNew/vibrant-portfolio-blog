import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Search, Hash, ChevronRight, Code, FileText, Database, Server, Terminal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  code?: string;
  tags: string[];
  topic: string;
}

const topics = [
  { id: "python", name: "Python", icon: Terminal, count: 4 },
  { id: "django", name: "Django", icon: Server, count: 3 },
  { id: "fastapi", name: "FastAPI", icon: Zap, count: 2 },
  { id: "postgresql", name: "PostgreSQL", icon: Database, count: 3 },
  { id: "docker", name: "Docker", icon: Code, count: 2 },
  { id: "api", name: "REST API", icon: FileText, count: 3 },
];

const notes: Note[] = [
  {
    id: "1",
    title: "Python list comprehension",
    content: "Ro'yxatlarni qisqa va samarali usulda yaratish uchun list comprehension ishlatiladi.",
    code: `# Oddiy usul
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension
squares = [x**2 for x in range(10)]`,
    tags: ["python", "basics", "performance"],
    topic: "python"
  },
  {
    id: "2",
    title: "Django ORM select_related",
    content: "ForeignKey munosabatlarida N+1 query muammosini hal qilish uchun select_related ishlatiladi.",
    code: `# N+1 muammo
for book in Book.objects.all():
    print(book.author.name)  # Har bir kitob uchun alohida query

# Optimallashtirilgan
for book in Book.objects.select_related('author'):
    print(book.author.name)  # Bitta query`,
    tags: ["django", "orm", "optimization"],
    topic: "django"
  },
  {
    id: "3",
    title: "FastAPI dependency injection",
    content: "FastAPI da dependency injection orqali qayta ishlatiladigan kod yozish mumkin.",
    code: `from fastapi import Depends, FastAPI

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/")
async def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()`,
    tags: ["fastapi", "di", "clean-code"],
    topic: "fastapi"
  },
  {
    id: "4",
    title: "PostgreSQL JSONB query",
    content: "JSONB ustunlaridan ma'lumotlarni qidirish va filtrlash usullari.",
    code: `-- JSONB ichidagi qiymatni olish
SELECT data->>'name' FROM users;

-- JSONB ichida qidirish
SELECT * FROM users 
WHERE data @> '{"role": "admin"}';

-- JSONB array elementlarini tekshirish
SELECT * FROM users 
WHERE data->'tags' ? 'python';`,
    tags: ["postgresql", "jsonb", "query"],
    topic: "postgresql"
  },
  {
    id: "5",
    title: "Docker multi-stage build",
    content: "Production uchun kichik Docker image yaratish uchun multi-stage build ishlatiladi.",
    code: `# Build stage
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Production stage
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
CMD ["python", "main.py"]`,
    tags: ["docker", "optimization", "devops"],
    topic: "docker"
  },
  {
    id: "6",
    title: "Python async context manager",
    content: "Asinxron resurslarni boshqarish uchun async context manager yaratish.",
    code: `class AsyncDatabase:
    async def __aenter__(self):
        self.conn = await asyncpg.connect()
        return self.conn
    
    async def __aexit__(self, exc_type, exc, tb):
        await self.conn.close()

# Ishlatish
async with AsyncDatabase() as db:
    await db.fetch("SELECT * FROM users")`,
    tags: ["python", "async", "context-manager"],
    topic: "python"
  },
  {
    id: "7",
    title: "Django signals",
    content: "Model o'zgarishlarida avtomatik harakatlar bajarish uchun signals ishlatiladi.",
    code: `from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)`,
    tags: ["django", "signals", "automation"],
    topic: "django"
  },
  {
    id: "8",
    title: "REST API pagination",
    content: "Katta ma'lumotlar to'plamini sahifalash orqali qaytarish.",
    code: `# Cursor-based pagination
GET /api/users?cursor=abc123&limit=20

# Response
{
  "data": [...],
  "next_cursor": "def456",
  "has_more": true
}`,
    tags: ["api", "pagination", "best-practices"],
    topic: "api"
  },
];

const Topics: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTopic = !selectedTopic || note.topic === selectedTopic;
    
    return matchesSearch && matchesTopic;
  });

  const selectedTopicData = topics.find(t => t.id === selectedTopic);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Search Header */}
        <div className="border-b bg-background/95 backdrop-blur sticky top-[65px] z-40">
          <div className="container py-6">
            <div className="max-w-2xl mx-auto">
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
                      {notes.length}
                    </span>
                  </button>
                  {topics.map((topic) => {
                    const Icon = topic.icon;
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
                          <Icon className="h-4 w-4" />
                          {topic.name}
                        </span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          {topic.count}
                        </span>
                      </button>
                    );
                  })}
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
                      <span className="text-foreground">{selectedTopicData.name}</span>
                    </>
                  )}
                </div>
                <h1 className="text-2xl font-semibold">
                  {selectedTopicData ? selectedTopicData.name : "Barcha eslatmalar"}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {filteredNotes.length} ta eslatma topildi
                </p>
              </div>

              {/* Notes Grid */}
              <div className="space-y-4">
                {filteredNotes.map((note) => (
                  <article
                    key={note.id}
                    className="group border rounded-xl p-5 bg-card hover:border-foreground/20 transition-all"
                  >
                    <h2 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      {note.content}
                    </p>
                    
                    {note.code && (
                      <div className="mb-4 rounded-lg bg-muted/50 border overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                          <span className="text-xs text-muted-foreground font-mono">
                            code
                          </span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm">
                          <code className="text-foreground font-mono whitespace-pre">
                            {note.code}
                          </code>
                        </pre>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          <Hash className="h-3 w-3" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}

                {filteredNotes.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Eslatma topilmadi</h3>
                    <p className="text-muted-foreground text-sm">
                      Qidiruv so'rovingizni o'zgartirib ko'ring
                    </p>
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

// Common type definitions for the portfolio application

export interface Theme {
  id: number;
  title: string;
}

export interface Topic {
  id: number;
  title: string;
  note_count: number;
}

export interface Technology {
  id: number;
  technology: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface BlogPost {
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
  have_like?: boolean;
}

export interface Project {
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

export interface Note {
  title: string;
  description: string;
  tags: Tag[];
}

export interface NotesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Note[];
}

export interface GeneralData {
  id: number;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}


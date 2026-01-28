import { useQuery } from '@tanstack/react-query';
import { appendIpParam, getApiHeaders, API_BASE_URL } from '@/lib/api';
import type { GeneralData, Experience, SkillCategory, BlogPost, Topic } from '@/types';

// General Data Hook
export const useGeneralData = () => {
    return useQuery<GeneralData>({
        queryKey: ['generalData'],
        queryFn: async () => {
            const url = appendIpParam(`${API_BASE_URL}/general-datas/`);
            const response = await fetch(url, { headers: getApiHeaders() });
            if (!response.ok) throw new Error('Failed to fetch general data');
            return response.json();
        },
    });
};

// Experiences Hook
export const useExperiences = () => {
    return useQuery<Experience[]>({
        queryKey: ['experiences'],
        queryFn: async () => {
            const url = appendIpParam(`${API_BASE_URL}/experiences/`);
            const response = await fetch(url, { headers: getApiHeaders() });
            if (!response.ok) throw new Error('Failed to fetch experiences');
            return response.json();
        },
    });
};

// Skill Categories Hook
export const useSkillCategories = () => {
    return useQuery<SkillCategory[]>({
        queryKey: ['skill_categories'],
        queryFn: async () => {
            const url = appendIpParam(`${API_BASE_URL}/skill-categories/`);
            const response = await fetch(url, { headers: getApiHeaders() });
            if (!response.ok) throw new Error('Failed to fetch skill categories');
            return response.json();
        },
    });
};

// Blog Posts Hook
export const useBlogPosts = () => {
    return useQuery<BlogPost[]>({
        queryKey: ['blogPosts'],
        queryFn: async () => {
            const url = appendIpParam(`${API_BASE_URL}/blog/`);
            const response = await fetch(url, { headers: getApiHeaders() });
            if (!response.ok) throw new Error('Failed to fetch blog posts');
            return response.json();
        },
    });
};

// Single Blog Post Hook
export const useBlogPost = (slug: string) => {
    return useQuery<BlogPost>({
        queryKey: ['blogPost', slug],
        queryFn: async () => {
            const url = appendIpParam(`${API_BASE_URL}/blog/${slug}/`);
            const response = await fetch(url, { headers: getApiHeaders() });
            if (!response.ok) throw new Error('Failed to fetch blog post');
            return response.json();
        },
        enabled: !!slug,
    });
};

// Topics Hook
export const useTopics = () => {
    return useQuery<Topic[]>({
        queryKey: ['topics'],
        queryFn: async () => {
            const url = appendIpParam(`${API_BASE_URL}/topics/`);
            const response = await fetch(url, { headers: getApiHeaders() });
            if (!response.ok) throw new Error('Failed to fetch topics');
            return response.json();
        },
    });
};

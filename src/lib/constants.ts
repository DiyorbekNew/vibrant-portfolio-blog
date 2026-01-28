// Route Constants
export const ROUTES = {
    HOME: '/',
    BLOG: '/blog',
    BLOG_POST: '/blog/:slug',
    TOPICS: '/topics',
    // PROJECTS: '/projects', // Vaqtincha yopilgan
} as const;

// Navigation Links
export const NAV_LINKS = [
    { name: 'Men Haqimda', path: ROUTES.HOME },
    { name: 'Blog', path: ROUTES.BLOG },
    { name: 'Mavzular', path: ROUTES.TOPICS },
] as const;

// Footer Links
export const FOOTER_LINKS = [
    { name: 'Bosh sahifa', path: ROUTES.HOME },
    { name: 'Blog', path: ROUTES.BLOG },
    { name: 'Mavzular', path: ROUTES.TOPICS },
] as const;

// API Endpoints
export const API_ENDPOINTS = {
    GENERAL_DATA: '/general-datas/',
    EXPERIENCES: '/experiences/',
    SKILL_CATEGORIES: '/skill-categories/',
    BLOG: '/blog/',
    TOPICS: '/topics/',
} as const;

// Query Keys
export const QUERY_KEYS = {
    GENERAL_DATA: 'generalData',
    EXPERIENCES: 'experiences',
    SKILL_CATEGORIES: 'skill_categories',
    BLOG_POSTS: 'blogPosts',
    BLOG_POST: 'blogPost',
    TOPICS: 'topics',
} as const;

// SEO
export const SEO_DEFAULTS = {
    SITE_NAME: 'Diyorbek Xazratqulov',
    AUTHOR: 'Diyorbek Xazratqulov',
    DEFAULT_DESCRIPTION: 'Python backend dasturchi Diyorbek Xazratqulovning shaxsiy portfoliosi.',
} as const;

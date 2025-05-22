
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define our translations
const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    
    // Hero section
    "hero.title": "Python Backend Developer",
    "hero.subtitle": "I build robust and scalable backend solutions with Python.",
    "hero.viewWork": "View My Work",
    "hero.contact": "Contact Me",
    
    // About section
    "about.title": "About Me",
    "about.paragraph1": "I'm a passionate Python backend developer with a strong background in creating robust, scalable server-side applications. With expertise in Django, Flask, FastAPI, and database management systems, I build efficient backend solutions that power modern web applications.",
    "about.paragraph2": "When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing my knowledge through my blog. I'm always open to new opportunities and collaborations.",
    
    // Projects section
    "projects.title": "Projects",
    "projects.latestTitle": "Latest Projects",
    "projects.viewAll": "View All Projects",
    "projects.search": "Search projects...",
    
    // Blog section
    "blog.title": "Blog",
    "blog.latestTitle": "Latest Posts",
    "blog.viewAll": "View All Posts",
    "blog.search": "Search posts...",
    
    // Footer
    "footer.about": "About",
    "footer.description": "Professional portfolio showcasing my Python backend projects, skills and blog posts. Feel free to reach out for collaboration opportunities.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
  },
  uz: {
    // Navbar
    "nav.home": "Bosh sahifa",
    "nav.projects": "Loyihalar",
    "nav.blog": "Blog",
    
    // Hero section
    "hero.title": "Python Backend Dasturchi",
    "hero.subtitle": "Python orqali ishonchli va kengayadigan backend yechimlarni yarataman.",
    "hero.viewWork": "Ishlarimni Ko'ring",
    "hero.contact": "Bog'lanish",
    
    // About section
    "about.title": "Men Haqimda",
    "about.paragraph1": "Men zamonaviy va kengayadigan server ilovalarini yaratish bo'yicha kuchli tajribaga ega ishtiyoqli Python backend dasturchisiman. Django, Flask, FastAPI va ma'lumotlar bazasini boshqarish tizimlarida tajribam bilan, zamonaviy veb-ilovalarni quvvatlaydigan samarali backend yechimlarini yarataman.",
    "about.paragraph2": "Kod yozish bilan band bo'lmaganimda, yangi texnologiyalarni o'rganish, ochiq manbali loyihalarga hissa qo'shish yoki blogim orqali bilimlarimni ulashishimni topishingiz mumkin. Men har doim yangi imkoniyatlar va hamkorliklar uchun ochiqman.",
    
    // Projects section
    "projects.title": "Loyihalar",
    "projects.latestTitle": "So'nggi Loyihalar",
    "projects.viewAll": "Barcha Loyihalarni Ko'rish",
    "projects.search": "Loyihalarni qidirish...",
    
    // Blog section
    "blog.title": "Blog",
    "blog.latestTitle": "So'nggi Postlar",
    "blog.viewAll": "Barcha Postlarni Ko'rish",
    "blog.search": "Postlarni qidirish...",
    
    // Footer
    "footer.about": "Haqida",
    "footer.description": "Python backend loyihalarim, ko'nikmalarim va blog postlarimni namoyish etuvchi professional portfolio. Hamkorlik imkoniyatlari uchun bog'lanishingiz mumkin.",
    "footer.quickLinks": "Tezkor Havolalar",
    "footer.contact": "Bog'lanish",
  }
};

type Language = 'en' | 'uz';
type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with the stored language or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem('language');
    return (storedLanguage === 'en' || storedLanguage === 'uz') ? storedLanguage : 'en';
  });

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    // @ts-ignore - We need to use string indexing here
    return translations[language][key] || key;
  };

  // Ensure the stored language is applied on initial render
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage === 'en' || storedLanguage === 'uz') {
      setLanguageState(storedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

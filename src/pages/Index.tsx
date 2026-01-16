import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "@/components/SEO";
import { Github, Linkedin, Briefcase, Code } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { appendIpParam, getApiHeaders, API_BASE_URL } from "@/lib/api";
import type { GeneralData, Experience, Skill, SkillCategory } from "@/types";


const Index: React.FC = () => {
  const { data: generalData } = useQuery<GeneralData>({
    queryKey: ['generalData'],
    queryFn: async () => {
      return await fetchGeneralData();
    },
  });

  const { data: experiences = [] } = useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: async () => {
      return await fetchExperiences();
    },
  });

  const { data: skill_categories = [] } = useQuery<SkillCategory[]>({
    queryKey: ['skill_categories'],
    queryFn: async () => {
      return await fetchSkillCategories();
    },
  });

  const fetchGeneralData = async () => {
    const url = appendIpParam(`${API_BASE_URL}/general-datas/`);
    const response = await fetch(url, {
      headers: getApiHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch general data');
    return response.json();
  };

  const fetchExperiences = async () => {
    const url = appendIpParam(`${API_BASE_URL}/experiences/`);
    const response = await fetch(url, {
      headers: getApiHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch experiences');
    return response.json();
  };

  const fetchSkillCategories = async () => {
    const url = appendIpParam(`${API_BASE_URL}/skill-categories/`); 
    const response = await fetch(url, {
      headers: getApiHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch skill categories');
    return response.json();
  };

  return (
    <Layout>
      <SEO
        title="Diyorbek Xazratqulov - Men Haqimda"
        description="Python backend dasturchi Diyorbek Xazratqulovning shaxsiy portfoliosi. Ish tajribasi, ko'nikmalar va loyihalar."
        url="/"
      />

      {/* Hero Section - About Me */} 
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-secondary to-accent/10 overflow-hidden text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative z-10">
          <img 
            src="/my_image.jpg" 
            alt="Diyorbek Xazratqulov"
            className="rounded-full w-40 h-40 object-cover border-4 border-primary/20 shadow-xl mx-auto mb-8 animate-fade-in-up"
          />
          <p className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in">
            👋 Salom, men Diyorbek Xazratqulov
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent leading-tight animate-slide-in-bottom">
            {generalData?.title || 'Python Backend Dasturchisi'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
            {generalData?.short_description}
          </p>
          <div className="flex justify-center items-center gap-6 mb-10 animate-fade-in delay-400">
            <a 
              href={generalData?.cv}
              download
              className="group relative inline-flex items-center px-8 py-4 border border-primary text-primary hover:bg-primary/10 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">CV Yuklab Olish</span>
            </a>
          </div>
          <div className="flex space-x-6 justify-center animate-fade-in delay-600">
            {generalData?.github && (
              <a href={generalData.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={28} />
              </a>
            )}
            {generalData?.linkedin && (
              <a href={generalData.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={28} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Me Details */} 
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-16">
            Men Haqimda
          </h2>
          <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed text-muted-foreground">
            {generalData?.about}
          </div>
        </div>
      </section>

      {/* Work Experience Section */} 
      <section className="section bg-secondary/20">
        <div className="container">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-16">
            Ish Tajribam
          </h2>
          
          <div className="relative border-l-2 border-primary/20 space-y-12 max-w-4xl mx-auto">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-10">
                <div className="absolute -left-[15px] top-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                  <Briefcase size={14} />
                </div>

                <h3 className="text-2xl font-semibold mb-2">
                  {exp.title} <span className="text-primary">| {exp.company}</span>
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {exp.start_date} - {exp.end_date || 'Hozirgacha'}
                </p>
                
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */} 
      <section className="section bg-slate-50/50 dark:bg-zinc-950/50 py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title text-center text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-16">
              Ko'nikmalarim
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tajribam davomida o'rgangan texnologiyalarim va yo'nalishlarim
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skill_categories.map((category) => (
              <div 
                key={category.id} 
                className="group relative bg-background border border-border/50 p-7 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 shadow-sm"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Code size={22} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {category.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="inline-flex items-center px-3.5 py-1.5 bg-secondary/50 hover:bg-primary/10 text-secondary-foreground hover:text-primary border border-transparent hover:border-primary/20 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */} 
      {/* <section className="section bg-gradient-to-br from-primary/50 to-purple-600/50 text-white text-center py-20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Meni Loyihangizga Yollashni Xohlaysizmi?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Men har doim yangi imkoniyatlar va qiziqarli loyihalar uchun ochiqman. Keling, birga ajoyib narsalar yarataylik!
          </p>
          <Link 
            to="/contact" // Kontakt sahifangizga yo'naltirish
            className="inline-flex items-center px-10 py-5 bg-white text-primary hover:bg-gray-100 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Aloqaga Chiqish
          </Link>
        </div>
      </section> */}

    </Layout>
  );
};

export default Index;

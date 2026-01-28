import React from 'react';
import { Code } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import type { SkillCategory } from '@/types';

interface SkillsSectionProps {
    skillCategories: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
    return (
        <section className="section bg-slate-50/50 dark:bg-zinc-950/50 py-24">
            <div className="container">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-gradient">Ko'nikmalarim</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Tajribam davomida o'rgangan texnologiyalarim va yo'nalishlarim
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {skillCategories.map((category, index) => (
                        <ScrollReveal key={category.id} delay={index * 100} animation="reveal-scale">
                            <div
                                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 p-7 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 h-full"
                            >
                                {/* Gradient glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

                                <div className="relative flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        <Code size={22} />
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                </div>

                                <div className="relative flex flex-wrap gap-2.5">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="inline-flex items-center px-3.5 py-1.5 bg-secondary/50 hover:bg-primary/15 text-secondary-foreground hover:text-primary border border-transparent hover:border-primary/30 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;

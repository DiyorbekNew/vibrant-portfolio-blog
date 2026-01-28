import React from 'react';
import { Briefcase } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import type { Experience } from '@/types';

interface ExperienceSectionProps {
    experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
    return (
        <section className="section bg-secondary/20">
            <div className="container">
                <ScrollReveal>
                    <h2 className="text-center text-4xl md:text-5xl font-bold mb-12">
                        <span className="text-gradient">Ish Tajribam</span>
                    </h2>
                </ScrollReveal>

                <div className="relative border-l-2 border-primary/20 space-y-12 max-w-4xl mx-auto">
                    {experiences.map((exp, index) => (
                        <ScrollReveal key={exp.id} delay={index * 150}>
                            <div className="relative pl-10">
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
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;

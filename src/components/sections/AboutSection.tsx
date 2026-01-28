import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface AboutSectionProps {
    about?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
    return (
        <section className="section">
            <div className="container">
                <ScrollReveal>
                    <h2 className="text-center text-4xl md:text-5xl font-bold mb-8">
                        <span className="text-gradient">Men Haqimda</span>
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                    <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed text-muted-foreground">
                        {about}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default AboutSection;

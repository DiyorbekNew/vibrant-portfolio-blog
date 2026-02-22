import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import type { GeneralData } from '@/types';

interface HeroSectionProps {
    generalData?: GeneralData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ generalData }) => {
    return (
        <section className="relative py-20 md:py-32 hero-gradient animate-gradient overflow-hidden text-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

            {/* Floating Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/15 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-400/10 rounded-full blur-3xl"></div>

            <div className="container relative z-10">
                {/* Profile Image with Glow */}
                <div className="relative w-40 h-40 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 blur-md opacity-75 animate-pulse-glow"></div>
                    <img
                        src="/my_image.jpg"
                        alt="Diyorbek Xazratqulov"
                        className="relative rounded-full w-40 h-40 object-cover ring-4 ring-white/20 dark:ring-white/10 shadow-2xl animate-fade-in"
                    />
                </div>

                {/* Glassmorphism Badge */}
                <p className="inline-block px-6 py-2.5 glass rounded-full text-sm font-medium mb-6 animate-fade-in text-primary">
                    👋 Salom, men Diyorbek Xazratqulov
                </p>

                {/* Title with gradient */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-colors animate-fade-in">
                    <span className="text-gradient">{generalData?.title || "Backend Dasturchi"}</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
                    {generalData?.short_description}
                </p>

                {/* CTA Button with Gradient Hover */}
                <div className="flex justify-center items-center gap-6 mb-10 animate-fade-in">
                    <a
                        href={generalData?.cv}
                        download
                        className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 border-2 border-primary text-primary hover:text-white"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10">CV Yuklab Olish</span>
                    </a>
                </div>

                {/* Social Links */}
                <div className="flex space-x-6 justify-center animate-fade-in">
                    {generalData?.github && (
                        <a href={generalData.github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300">
                            <Github size={24} />
                        </a>
                    )}
                    {generalData?.linkedin && (
                        <a href={generalData.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300">
                            <Linkedin size={24} />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

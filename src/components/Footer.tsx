import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { appendIpParam, getApiHeaders } from "@/lib/api";
import type { GeneralData } from "@/types";
import { Github, Linkedin, Mail, Phone, Heart } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Fetch general data from API
  const { data: generalData } = useQuery({
    queryKey: ['generalData'],
    queryFn: async () => {
      const url = appendIpParam('https://api.xazratqulov.uz/general-datas/');
      const response = await fetch(url, {
        headers: getApiHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch general data');
      return response.json() as Promise<GeneralData>;
    }
  });

  return (
    <footer className="relative bg-secondary/50 backdrop-blur-sm">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gradient">Haqida</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {generalData?.short_description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gradient">Tezkor Havolalar</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300">Bosh sahifa</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-300">Blog</Link>
              </li>
              <li>
                <Link to="/topics" className="text-muted-foreground hover:text-primary transition-colors duration-300">Mavzular</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gradient">Bog'lanish</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                {generalData?.email || 'info@example.com'}
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                {generalData?.phone || '+998 90 123 45 67'}
              </li>
              <li className="flex gap-3 mt-4">
                <a
                  href={generalData?.github || "https://github.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 glass rounded-full text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href={generalData?.linkedin || "https://linkedin.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 glass rounded-full text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            &copy; {currentYear} Diyorbek Xazratqulov. Made with <Heart size={14} className="text-red-400 fill-red-400" /> in Uzbekistan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

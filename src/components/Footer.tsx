import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { appendIpParam, getApiHeaders } from "@/lib/api";
import type { GeneralData } from "@/types";

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
    <footer className="bg-secondary py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Haqida</h3>
            <p className="text-muted-foreground mb-4">
              {generalData?.short_description}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tezkor Havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">Bosh sahifa</Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary">Loyihalar</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
              </li>
              <li>
                <Link to="/topics" className="text-muted-foreground hover:text-primary">Mavzular</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bog'lanish</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Email: {generalData?.email || 'info@example.com'}</li>
              <li className="text-muted-foreground">Phone: {generalData?.phone || '+998 90 123 45 67'}</li>
              <li className="flex space-x-4 mt-4">
                <a href={generalData?.github || "https://github.com/"} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  GitHub
                </a>
                <a href={generalData?.linkedin || "https://linkedin.com/"} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {currentYear} Diyorbek Xazratqulov. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

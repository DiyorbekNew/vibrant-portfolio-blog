
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.about")}</h3>
            <p className="text-muted-foreground mb-4">
              {t("footer.description")}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">{t("nav.home")}</Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary">{t("nav.projects")}</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary">{t("nav.blog")}</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Email: info@example.com</li>
              <li className="text-muted-foreground">Phone: +998 90 123 45 67</li>
              <li className="flex space-x-4 mt-4">
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Twitter
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  GitHub
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SkipLink from "./SkipLink";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const prevPathnameRef = useRef<string>(window.location.pathname);

  // Route o'zgarganda scroll to top
  useEffect(() => {
    const currentPathname = window.location.pathname;
    
    if (prevPathnameRef.current !== currentPathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prevPathnameRef.current = currentPathname;
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-grow animate-fade-in" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

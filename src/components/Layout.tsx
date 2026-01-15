import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SkipLink from "./SkipLink";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/b1abf4fb-1871-4b8c-9abf-3c04eee05c4e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Layout.tsx:11',message:'Layout render started',data:{pathname:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  const prevPathnameRef = useRef<string>(window.location.pathname);

  // Route o'zgarganda scroll to top
  useEffect(() => {
    const currentPathname = window.location.pathname;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/b1abf4fb-1871-4b8c-9abf-3c04eee05c4e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Layout.tsx:18',message:'Scroll effect triggered',data:{currentPathname,prevPathname:prevPathnameRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
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

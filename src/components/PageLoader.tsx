
import React from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const PageLoader: React.FC = () => {
  const { language } = useLanguage();
  
  const loadingText = language === 'uz' ? 'Yuklanmoqda...' : 'Loading...';
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{loadingText}</p>
      </div>
    </div>
  );
};

export default PageLoader;

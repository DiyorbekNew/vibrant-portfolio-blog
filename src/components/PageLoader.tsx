
import React from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const PageLoader: React.FC = () => {
  const { language } = useLanguage();
  
  const loadingText = language === 'uz' ? 'Yuklanmoqda...' : 'Loading...';
  
  return (
    <div className="fixed inset-0 bg-background z-[9999] flex items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary blur-xl opacity-40 animate-pulse"></div>
          
          {/* Middle rotating ring */}
          <div className="relative w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-purple-500 animate-spin"></div>
            
            {/* Inner icon */}
            <Loader2 className="w-10 h-10 text-primary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-pulse">
            {loadingText}
          </p>
          <div className="flex gap-1.5 justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;

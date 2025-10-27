
import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';
import PageLoader from './PageLoader';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);
  
  const toggleLanguage = () => {
    setIsChanging(true);
    setLanguage(language === 'en' ? 'uz' : 'en');
    setTimeout(() => {
      setIsChanging(false);
    }, 800);
  };

  return (
    <>
      {isChanging && <PageLoader />}
      <button 
        onClick={toggleLanguage}
        className="flex items-center gap-2 text-sm font-medium transition-all hover:scale-110"
        aria-label="Toggle language"
        disabled={isChanging}
      >
        <Globe size={18} className={isChanging ? 'animate-spin' : ''} />
        <span className="hidden sm:inline">{language === 'en' ? 'UZ' : 'EN'}</span>
      </button>
    </>
  );
};

export default LanguageSwitcher;

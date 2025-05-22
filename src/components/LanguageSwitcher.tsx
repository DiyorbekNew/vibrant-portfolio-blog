
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'uz' : 'en');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-sm font-medium"
      aria-label="Toggle language"
    >
      <Globe size={18} />
      <span className="hidden sm:inline">{language === 'en' ? 'UZ' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;

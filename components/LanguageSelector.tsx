import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'zh', label: '中文' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 group">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-3 py-2 md:px-4 md:py-2 flex items-center gap-2 cursor-pointer hover:bg-black/80 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95">
        <Globe className="w-4 h-4 text-swift-cyan" />
        <span className="text-xs md:text-sm font-bold uppercase text-white tracking-wider">{language}</span>
      </div>
      
      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-32 bg-[#111] border border-white/10 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 shadow-2xl z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
              language === lang.code 
                ? 'bg-swift-cyan/10 text-swift-cyan' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
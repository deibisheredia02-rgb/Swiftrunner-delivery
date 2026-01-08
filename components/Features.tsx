import React, { useRef } from 'react';
import { BrainCircuit, Zap, Crown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeatureCard = ({ icon: Icon, title, desc, accentColor }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`liquid-glass glow-border p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 group cursor-default`}
    >
      <div className={`relative z-10`}>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110`}
             style={{ backgroundColor: `${accentColor}15` }}>
          <Icon className="w-8 h-8" style={{ color: accentColor }} />
        </div>
        <h3 className="font-display font-bold text-3xl mb-4 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-swift-text/60 text-lg leading-relaxed group-hover:text-swift-text/80 transition-colors">
          {desc}
        </p>
      </div>
      
      {/* Liquid Accent Overlay */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 blur-[80px] rounded-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
           style={{ backgroundColor: accentColor }}></div>
    </div>
  );
};

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-swift-bg relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] bg-swift-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-display font-black text-5xl md:text-7xl mb-6">
            {t.features.title} <span className="text-swift-cyan">{t.features.titleAccent}</span>
          </h2>
          <div className="h-1.5 w-24 bg-swift-cyan mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={BrainCircuit} 
            title={t.features.card1.title} 
            desc={t.features.card1.desc} 
            accentColor="#00FFFF" 
          />
          <FeatureCard 
            icon={Zap} 
            title={t.features.card2.title} 
            desc={t.features.card2.desc} 
            accentColor="#FFD300" 
          />
          <FeatureCard 
            icon={Crown} 
            title={t.features.card3.title} 
            desc={t.features.card3.desc} 
            accentColor="#A855F7" 
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
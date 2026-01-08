import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [waitlistCount, setWaitlistCount] = useState(127842);
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Simulate live waitlist growth
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer logic (Target: Feb 1, 2026)
  useEffect(() => {
    const targetDate = new Date('2026-02-01T00:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const scrollToJoin = () => {
    document.getElementById('join-footer')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('email-input')?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center relative px-4 overflow-hidden pt-28 md:pt-0">
      <LanguageSelector />
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-swift-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-swift-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <h1 className="font-display font-black text-[clamp(45px,12vw,160px)] leading-[0.9] tracking-tight mb-6 z-10">
        SWIFT<span className="text-transparent bg-clip-text bg-gradient-to-r from-swift-yellow to-white">RUSH</span>
      </h1>
      
      <p className="font-sans text-[clamp(20px,5vw,48px)] font-medium text-swift-text/90 mb-8 md:mb-10 max-w-4xl leading-tight px-2">
        {t.hero.subtitle}
      </p>

      <div className="bg-swift-yellow text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-bold text-lg md:text-2xl mb-8 transform hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,211,0,0.3)]">
        {t.hero.badge}
      </div>

      <p className="text-lg md:text-2xl max-w-2xl text-swift-text/80 mb-10 md:mb-12 px-4">
        {t.hero.description}
      </p>

      <div className="font-display font-black text-2xl md:text-5xl text-swift-cyan mb-10 tabular-nums tracking-tight">
        {waitlistCount.toLocaleString()} <span className="text-white text-lg md:text-3xl font-bold block md:inline">{t.hero.waitlist}</span>
      </div>

      <button 
        onClick={scrollToJoin}
        className="group bg-swift-yellow text-black font-display font-extrabold text-lg md:text-3xl px-8 py-4 md:px-12 md:py-6 rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,211,0,0.4)] flex items-center gap-3"
      >
        {t.hero.cta}
        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
      </button>

      <div className="mt-12 md:mt-16 font-mono text-swift-yellow/80 text-sm md:text-2xl tracking-widest uppercase flex gap-4 md:gap-8 pb-10 md:pb-0">
        <div><span className="text-white font-bold block text-xl md:text-3xl">{timeLeft.days}</span>{t.hero.timeLabels.d}</div>
        <div><span className="text-white font-bold block text-xl md:text-3xl">{timeLeft.hours}</span>{t.hero.timeLabels.h}</div>
        <div><span className="text-white font-bold block text-xl md:text-3xl">{timeLeft.minutes}</span>{t.hero.timeLabels.m}</div>
        <div><span className="text-white font-bold block text-xl md:text-3xl">{timeLeft.seconds}</span>{t.hero.timeLabels.s}</div>
      </div>
    </div>
  );
};

export default Hero;
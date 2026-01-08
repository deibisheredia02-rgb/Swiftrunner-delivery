import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer id="join-footer" className="py-20 bg-swift-card border-t border-white/5 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl mb-4">{t.footer.title}</h2>
        <p className="text-swift-text/60 mb-10">
          {t.footer.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input 
            id="email-input"
            type="email" 
            placeholder={t.footer.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-80 bg-black border-b-2 border-swift-cyan text-white p-4 focus:outline-none focus:border-swift-yellow transition-colors placeholder-gray-600 text-lg"
            required
          />
          <button 
            type="submit"
            className="w-full sm:w-auto bg-swift-cyan text-black font-display font-bold text-lg px-8 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            {status === 'success' ? t.footer.success : t.footer.button}
          </button>
        </form>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest gap-4">
            <p>{t.footer.copyright}</p>
            <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useRef } from 'react';
import { Map, Package, Crown, Heart, Sparkles, Navigation, Clock, Loader2 } from 'lucide-react';
import { DashboardTab, GeneratedOrder } from '../types';
import { generateOrderPrediction } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardDemo: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [prediction, setPrediction] = useState<GeneratedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handlePredict = async () => {
    setLoading(true);
    const result = await generateOrderPrediction(language);
    setPrediction(result);
    setLoading(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex flex-col h-full justify-center items-center text-center space-y-6 animate-fadeIn">
            {!prediction ? (
              <>
                 <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-4 border border-white/10 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-swift-cyan/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Sparkles className="w-12 h-12 text-swift-cyan animate-pulse relative z-10" />
                 </div>
                 <h3 className="text-3xl font-bold font-display text-white">{t.dashboard.emptyState.title}</h3>
                 <p className="text-gray-400 max-w-md text-lg leading-relaxed">{t.dashboard.emptyState.desc}</p>
                 <button 
                    onClick={handlePredict}
                    disabled={loading}
                    className="mt-6 bg-swift-cyan text-black font-black py-4 px-10 rounded-2xl hover:bg-white hover:scale-105 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(0,255,255,0.3)] disabled:opacity-50"
                 >
                    {loading ? <Loader2 className="animate-spin w-6 h-6"/> : <Sparkles className="w-6 h-6"/>}
                    {loading ? t.dashboard.emptyState.loading : t.dashboard.emptyState.button}
                 </button>
              </>
            ) : (
              <div className="bg-black/60 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-swift-cyan/30 max-w-md w-full text-left relative overflow-hidden shadow-2xl animate-fadeIn">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-swift-cyan via-blue-500 to-swift-yellow animate-liquid bg-[length:200%_auto]"></div>
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-swift-cyan/20 text-swift-cyan text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                        {t.dashboard.order.autoStaged}
                    </div>
                    <span className="text-swift-yellow flex items-center gap-2 font-mono text-sm font-bold">
                        <Clock className="w-4 h-4" /> {prediction.eta}
                    </span>
                </div>
                <h4 className="text-3xl font-black text-white mb-2 leading-tight">{prediction.item}</h4>
                <p className="text-swift-cyan/70 mb-6 text-sm font-bold uppercase tracking-widest">{prediction.restaurant}</p>
                
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 mb-8 backdrop-blur-md">
                    <p className="text-gray-300 italic text-base leading-relaxed">"{t.dashboard.order.aiInsight}: {prediction.vibe}"</p>
                </div>

                <div className="flex gap-4">
                    <button className="flex-2 bg-swift-yellow text-black font-black py-4 px-6 rounded-xl hover:bg-white hover:scale-[1.02] active:scale-95 transition-all grow">
                        {t.dashboard.order.confirm}
                    </button>
                    <button 
                        onClick={() => setPrediction(null)}
                        className="flex-1 px-4 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold"
                    >
                        {t.dashboard.order.dismiss}
                    </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'orders':
        return (
          <div className="flex flex-col h-full space-y-6 animate-fadeIn">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              <Package className="text-swift-yellow" />
              {t.dashboard.activeOrders.title}
            </h3>
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-swift-yellow/20 flex items-center gap-6 shadow-xl hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 bg-swift-yellow/10 rounded-2xl flex items-center justify-center shrink-0 border border-swift-yellow/20">
                    <Navigation className="w-8 h-8 text-swift-yellow animate-bounce" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between mb-2">
                        <span className="font-black text-xl text-white">Joe's Pizza (2 slices)</span>
                        <span className="text-swift-yellow font-mono font-bold">4 min</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                        <div className="bg-gradient-to-r from-swift-yellow to-orange-500 h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(255,211,0,0.5)]"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-400 mt-3">{t.dashboard.activeOrders.status}</p>
                </div>
            </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex items-center gap-6 opacity-40 grayscale">
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center shrink-0">
                    <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between mb-1">
                        <span className="font-bold text-white text-lg">Bodega Essentials</span>
                        <span className="text-gray-500 font-mono">{t.dashboard.activeOrders.delivered}</span>
                    </div>
                    <p className="text-sm text-gray-500">Yesterday, 10:42 PM</p>
                </div>
            </div>
          </div>
        );
      case 'prime':
        return (
          <div className="flex flex-col h-full justify-center items-center text-center animate-fadeIn">
             <div className="text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                $124.50
             </div>
             <p className="text-swift-cyan text-xl mb-12 font-bold uppercase tracking-widest">{t.dashboard.prime.saved}</p>
             <div className="w-full bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-end h-32 gap-3">
                    {[40, 65, 30, 85, 50, 95, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/5 rounded-t-xl relative group overflow-hidden">
                            <div 
                                style={{ height: `${h}%` }} 
                                className="absolute bottom-0 w-full bg-gradient-to-t from-swift-cyan/20 to-swift-cyan group-hover:to-white transition-all duration-500 rounded-t-lg shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                            ></div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-6 uppercase tracking-[0.3em] font-black">{t.dashboard.prime.activity}</p>
             </div>
          </div>
        );
      case 'favorites':
        return (
            <div className="flex flex-col h-full justify-center items-center text-center animate-fadeIn space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <Heart className="w-10 h-10 text-pink-500/30" />
                </div>
                <p className="text-xl font-bold text-gray-400">{t.dashboard.favorites.text}</p>
                <p className="text-sm text-gray-600 font-medium">{t.dashboard.favorites.subtext}</p>
            </div>
        );
    }
  };

  return (
    <section className="py-24 bg-swift-bg overflow-hidden relative">
      {/* Mesh Gradient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <h2 className="font-display font-black text-5xl md:text-8xl text-center mb-20 tracking-tighter">
          {t.dashboard.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-swift-cyan via-blue-400 to-swift-yellow animate-liquid bg-[length:200%_auto]">{t.dashboard.titleAccent}</span>
        </h2>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="liquid-glass glow-border max-w-5xl mx-auto rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row h-[700px] md:h-[600px] transition-transform duration-700"
        >
          {/* Sidebar Navigation */}
          <div className="w-full md:w-72 bg-black/40 border-r border-white/10 p-8 flex flex-row md:flex-col justify-between md:justify-start gap-4 shrink-0 overflow-x-auto md:overflow-visible relative z-20">
            {[
              { id: 'home', label: t.dashboard.tabs.home, icon: Map },
              { id: 'orders', label: t.dashboard.tabs.orders, icon: Package },
              { id: 'prime', label: t.dashboard.tabs.prime, icon: Crown },
              { id: 'favorites', label: t.dashboard.tabs.favorites, icon: Heart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 whitespace-nowrap group ${
                  activeTab === tab.id 
                    ? 'bg-swift-cyan text-black font-black shadow-[0_10px_20px_rgba(0,255,255,0.3)] scale-[1.05]' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className={`w-6 h-6 transition-transform duration-500 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="hidden md:inline font-display text-lg tracking-tight">{tab.label}</span>
              </button>
            ))}
            
            <div className="hidden md:block mt-auto p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                <p className="text-swift-yellow text-[10px] font-black uppercase tracking-[0.4em] mb-3">System Hub</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-bold">Network</span>
                    <span className="text-swift-cyan text-xs font-mono font-bold">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs font-bold">Latency</span>
                    <span className="text-white text-xs font-mono font-bold">12ms</span>
                  </div>
                </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-8 md:p-14 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.02)_0%,transparent_100%)] pointer-events-none"></div>
            
            <div className="relative z-10 h-full">
                {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardDemo;
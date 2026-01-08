import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import DashboardDemo from './components/DashboardDemo';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <main className="antialiased text-swift-text bg-swift-bg selection:bg-swift-cyan selection:text-black">
        <Hero />
        <Features />
        <DashboardDemo />
        <Footer />
      </main>
    </LanguageProvider>
  );
};

export default App;
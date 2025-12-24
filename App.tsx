import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PremiumSelection from './components/PremiumSelection';
import PPOBSection from './components/PPOBSection';
import ComingSoon from './components/ComingSoon';
import AIModal from './components/AIModal';
import PurchaseModal from './components/PurchaseModal';
import AuthModal from './components/AuthModal';

interface PurchaseItem {
  name: string;
  price: string;
  category: string;
  prefilledTarget?: string;
}

interface User {
  email: string;
}

const App: React.FC = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem | null>(null);
  const [activePPOBTab, setActivePPOBTab] = useState('pulsa');
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Persistence and Scroll Observer
  useEffect(() => {
    window.scrollTo(0, 0);
    const savedSession = localStorage.getItem('rekurstore_session');
    if (savedSession) {
      setUser({ email: savedSession });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleHeroPPOBClick = (tabId: string) => {
    setActivePPOBTab(tabId);
    const element = document.getElementById('ppob');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBuyProduct = (item: PurchaseItem) => {
    if (!user) {
        setIsAuthModalOpen(true);
    } else {
        setPurchaseItem(item);
    }
  };

  const handleLoginSuccess = (email: string) => {
    setUser({ email });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('rekurstore_session');
    setUser(null);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar 
        onOpenAI={() => setIsAIModalOpen(true)} 
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero onPPOBClick={handleHeroPPOBClick} />
        
        <div className="reveal">
          <PremiumSelection onBuy={handleBuyProduct} />
        </div>
        
        <div className="reveal">
          <PPOBSection 
            activeTab={activePPOBTab} 
            onTabChange={setActivePPOBTab} 
            onBuy={handleBuyProduct}
          />
        </div>
        
        <div className="reveal">
          <ComingSoon />
        </div>
      </main>

      <footer className="bg-[#02020a]/80 backdrop-blur-xl py-12 border-t border-white/5">
        <div className="max-w-7xl auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
           <p>© 2024 Rekurstore. All rights reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
             <a href="#" className="hover:text-white transition-colors">Syarat Layanan</a>
             <a href="#" className="hover:text-white transition-colors">Hubungi Kami</a>
           </div>
        </div>
      </footer>

      <AIModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PurchaseModal 
        isOpen={!!purchaseItem}
        onClose={() => setPurchaseItem(null)}
        data={purchaseItem}
      />
    </div>
  );
};

export default App;
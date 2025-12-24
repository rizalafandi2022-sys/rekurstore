import React, { useState } from 'react';
import { Menu, X, Sparkles, User as UserIcon, LogOut, LogIn } from 'lucide-react';

interface NavbarProps {
  onOpenAI: () => void;
  user: { email: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAI, user, onLoginClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#050511]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo RekurStore Official */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {/* Custom Logo Monogram ЯK */}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-white/10 group-hover:shadow-white/20 transition-all overflow-hidden border-2 border-white">
               <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="black"/>
                  {/* Stylized Reversed R (Я) and K */}
                  <path d="M45 25 H 35 V 75 M 35 45 H 45 C 55 45 55 25 45 25" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" transform="scale(-1, 1) translate(-80, 0)"/>
                  <path d="M50 25 V 75 M 50 50 L 75 25 M 50 50 L 75 75" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white leading-none">
                RekurStore
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                Official
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Beranda</button>
              <button onClick={() => scrollToSection('premium')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Premium</button>
              <button onClick={() => scrollToSection('ppob')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Top Up</button>
              
              <button 
                onClick={onOpenAI}
                className="flex items-center gap-2 text-purple-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors border border-purple-500/30 hover:bg-purple-500/10 mr-4"
              >
                <Sparkles size={16} />
                Asisten AI
              </button>

              {user ? (
                 <div className="relative">
                    <button 
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-2 pr-4 py-1.5 transition-all"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                            {user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs text-gray-300 max-w-[100px] truncate">{user.email.split('@')[0]}</span>
                    </button>
                    
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#1a1a40] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                             <div className="px-4 py-3 border-b border-white/5">
                                 <p className="text-[10px] text-gray-400 uppercase tracking-wider">Akun</p>
                                 <p className="text-sm text-white font-medium truncate">{user.email}</p>
                             </div>
                             <button 
                                onClick={() => { onLogout(); setShowUserMenu(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                             >
                                <LogOut size={14} /> Keluar
                             </button>
                        </div>
                    )}
                 </div>
              ) : (
                <button 
                    onClick={onLoginClick}
                    className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-full text-sm font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                    <LogIn size={16} />
                    Masuk
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden items-center gap-4">
             {/* Mobile User Icon if logged in */}
             {user && (
                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                    {user.email.charAt(0).toUpperCase()}
                </div>
             )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0f2d] border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => { setIsOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-white block px-3 py-2 rounded-md text-base font-medium text-left w-full">Beranda</button>
            <button onClick={() => { setIsOpen(false); scrollToSection('premium'); }} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-left w-full">Premium</button>
            <button onClick={() => { setIsOpen(false); scrollToSection('apps'); }} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-left w-full">Aplikasi</button>
            <button onClick={() => { setIsOpen(false); scrollToSection('ppob'); }} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-left w-full">Top Up</button>
            <button 
              onClick={() => { onOpenAI(); setIsOpen(false); }}
              className="w-full text-left text-purple-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
            >
              <Sparkles size={16} /> Rekomendasi AI
            </button>
            
            <div className="border-t border-white/10 mt-4 pt-4">
                {user ? (
                    <>
                        <div className="px-3 py-2 mb-2">
                             <p className="text-[10px] text-gray-400 uppercase tracking-wider">Login sebagai</p>
                             <p className="text-sm text-white font-medium truncate">{user.email}</p>
                        </div>
                        <button 
                            onClick={() => { onLogout(); setIsOpen(false); }}
                            className="w-full text-left text-red-400 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                        >
                            <LogOut size={16} /> Keluar
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={() => { onLoginClick(); setIsOpen(false); }}
                        className="w-full mt-2 bg-white text-black px-5 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                        <LogIn size={16} /> Masuk / Daftar
                    </button>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
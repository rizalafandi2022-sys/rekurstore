import React, { useState } from 'react';
import { Layers, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAI: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAI }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#050511]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
              <Layers className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Rekur<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">store</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Beranda</a>
              <a href="#premium" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Premium</a>
              <a href="#premium" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Aplikasi</a>
              <a href="#ppob" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Top Up</a>
              
              <button 
                onClick={onOpenAI}
                className="flex items-center gap-2 text-purple-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors border border-purple-500/30 hover:bg-purple-500/10"
              >
                <Sparkles size={16} />
                Asisten AI
              </button>

              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-900/50 hover:shadow-green-900/80 transition-all transform hover:-translate-y-0.5">
                Mulai
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
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
            <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Beranda</a>
            <a href="#premium" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Premium</a>
            <a href="#premium" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Aplikasi</a>
            <a href="#ppob" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Top Up</a>
            <button 
              onClick={() => { onOpenAI(); setIsOpen(false); }}
              className="w-full text-left text-purple-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Rekomendasi AI
            </button>
             <button className="w-full mt-4 bg-green-600 text-white px-5 py-3 rounded-lg font-bold">
                Mulai
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
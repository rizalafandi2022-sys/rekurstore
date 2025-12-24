import React from 'react';
import { Play, Download, Music, Video, MessageCircle, Wallet, ShieldCheck, Crown, Zap, Smartphone, Wifi, CreditCard } from 'lucide-react';

interface HeroProps {
  onPPOBClick: (tabId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onPPOBClick }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      
      {/* Background Layer */}
      <div className="grid-floor"></div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-4xl aspect-square bg-purple-600/10 rounded-full blur-[160px] animate-slow-glow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Floating Icons - More Subtle & Integrated */}
        <div className="hidden lg:block">
            <div className="absolute top-0 left-[5%] animate-float icon-3d w-14 h-14 glass-card rounded-2xl flex items-center justify-center rotate-[-12deg] opacity-60">
                <Music className="text-blue-400 w-6 h-6" />
            </div>
            <div className="absolute top-40 left-[-2%] animate-float-slow icon-3d w-10 h-10 glass-card rounded-xl flex items-center justify-center rotate-[15deg] opacity-40">
                <Zap className="text-yellow-400 w-4 h-4" />
            </div>
            <div className="absolute bottom-20 left-[10%] animate-float-delayed icon-3d w-12 h-12 glass-card rounded-2xl flex items-center justify-center rotate-[-5deg] opacity-50">
                <ShieldCheck className="text-green-400 w-6 h-6" />
            </div>
            
            <div className="absolute top-10 right-[5%] animate-float icon-3d w-16 h-16 glass-card rounded-3xl flex items-center justify-center rotate-[15deg] opacity-60">
                <Crown className="text-yellow-500 w-8 h-8" />
            </div>
            <div className="absolute bottom-40 right-[0%] animate-float-slow icon-3d w-12 h-12 glass-card rounded-2xl flex items-center justify-center rotate-[-10deg] opacity-50">
                <Smartphone className="text-purple-400 w-6 h-6" />
            </div>
        </div>

        {/* Hero Text */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-8 animate-fade-in">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
             </span>
             Verified Digital Provider
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight">
            <span className="text-gradient drop-shadow-sm">RekurStore</span>
            <br />
            <span className="text-white/90 text-4xl md:text-6xl font-medium tracking-tight">Experience Premium.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-normal leading-relaxed">
            Penyedia layanan digital terpercaya untuk aplikasi premium dan top-up instan dengan sistem keamanan terenkripsi.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollToSection('premium')} 
              className="group relative px-10 py-5 bg-white text-black font-bold text-lg rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2">
                <Download size={20} />
                Jelajahi Store
              </span>
            </button>
            <button 
              onClick={() => onPPOBClick('pulsa')} 
              className="px-10 py-5 glass-card text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all border-white/10 active:scale-95 flex items-center gap-2"
            >
              <Wallet size={20} className="text-blue-400" />
              Top Up Instan
            </button>
          </div>
        </div>

        {/* 3D Visual Mockup */}
        <div className="relative h-[500px] md:h-[600px] w-full mt-10 perspective-[2000px] select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-blue-600/10 rounded-full blur-[140px] -z-20"></div>

          {/* Phone Left */}
          <div className="absolute top-10 left-[5%] md:left-[15%] w-[260px] h-[520px] bg-[#050505] rounded-[45px] border-[6px] border-[#1a1a1a] shadow-2xl transform rotate-[-12deg] hover:rotate-[-5deg] transition-all duration-700 z-20 overflow-hidden ring-1 ring-white/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-40"></div>
            <div className="w-full h-full bg-gradient-to-b from-[#0f172a] to-[#020617] p-5 pt-12 space-y-4">
               <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 flex flex-col justify-end">
                  <div className="w-8 h-8 bg-white/20 rounded-lg mb-2"></div>
                  <div className="h-2 w-1/2 bg-white/20 rounded"></div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square glass-card rounded-xl flex items-center justify-center"><Music className="text-white/40" /></div>
                  <div className="aspect-square glass-card rounded-xl flex items-center justify-center"><Video className="text-white/40" /></div>
                  <div className="aspect-square glass-card rounded-xl flex items-center justify-center"><Zap className="text-white/40" /></div>
                  <div className="aspect-square glass-card rounded-xl flex items-center justify-center"><Smartphone className="text-white/40" /></div>
               </div>
            </div>
          </div>

          {/* Phone Right */}
          <div className="absolute top-20 right-[5%] md:right-[15%] w-[260px] h-[520px] bg-[#050505] rounded-[45px] border-[6px] border-[#1a1a1a] shadow-2xl transform rotate-[12deg] hover:rotate-[5deg] transition-all duration-700 z-20 overflow-hidden ring-1 ring-white/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-40"></div>
            <div className="w-full h-full bg-[#030303] p-6 pt-12 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="h-2 w-20 bg-white/10 rounded"></div>
                <div className="w-6 h-6 rounded-full bg-white/10"></div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 mb-8">
                 <div className="h-2 w-12 bg-white/20 rounded mb-2"></div>
                 <div className="h-6 w-3/4 bg-white/40 rounded"></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="aspect-square bg-white/5 rounded-lg"></div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30 mt-[-50px]">
          <FeatureCard 
            icon={<Crown className="w-6 h-6 text-yellow-500" />}
            title="Premium Access"
            description="Buka fitur berbayar tanpa batas."
            onClick={() => scrollToSection('premium')}
          />
           <FeatureCard 
            icon={<Zap className="w-6 h-6 text-blue-400" />}
            title="Flash Delivery"
            description="Sistem pengiriman otomatis 24/7."
            onClick={() => onPPOBClick('pulsa')}
          />
           <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-green-400" />}
            title="Secure Payment"
            description="Enkripsi keamanan tingkat tinggi."
            onClick={() => scrollToSection('root')}
          />
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, onClick }: any) => (
  <div 
    onClick={onClick}
    className="glass-card p-6 rounded-3xl group cursor-pointer hover:-translate-y-2 transition-all duration-500 flex items-center gap-5 hover:bg-white/[0.05] border-white/5"
  >
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500 shadow-inner">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm font-medium">{description}</p>
    </div>
  </div>
);

export default Hero;
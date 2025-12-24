import React from 'react';
import { Play, Download, Music, Video, MessageCircle, Wallet, ShieldCheck, Crown, CreditCard, Zap, Smartphone, Wifi } from 'lucide-react';

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
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      
      {/* Dynamic Background Elements mirroring the image */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Horizon Light */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-purple-500/20 rounded-full blur-[120px]"></div>
        
        {/* Floating 3D Icons (Left Side) */}
        <div className="absolute top-32 left-[10%] animate-float icon-3d w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center transform rotate-[-15deg] opacity-80">
          <Music className="text-white w-8 h-8 drop-shadow-md" />
        </div>
        <div className="absolute bottom-40 left-[5%] animate-float-delayed icon-3d w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center transform rotate-[10deg] opacity-70">
          <Play className="text-white w-5 h-5 drop-shadow-md" />
        </div>
        <div className="absolute top-60 left-[20%] animate-float-slow icon-3d w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center transform rotate-[-5deg] opacity-60">
           <Zap className="text-white w-5 h-5" />
        </div>

        {/* Floating 3D Icons (Right Side) */}
        <div className="absolute top-40 right-[15%] animate-float-delayed icon-3d w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center transform rotate-[15deg] opacity-80">
          <Wallet className="text-white w-10 h-10 drop-shadow-md" />
        </div>
        <div className="absolute bottom-48 right-[8%] animate-float icon-3d w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center transform rotate-[-10deg] opacity-70">
          <MessageCircle className="text-white w-7 h-7 drop-shadow-md" />
        </div>
        <div className="absolute top-20 right-[5%] animate-float-slow icon-3d w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center transform rotate-[20deg] opacity-50">
           <CreditCard className="text-white w-4 h-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Text Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl text-glow">
            Aplikasi Premium & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">PPOB Instan</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Gerbang Anda menuju alat digital berkualitas tinggi dan pembayaran tagihan instan.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollToSection('premium')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/30 flex items-center gap-2 border border-white/10">
              <Download size={20} />
              Jelajahi Aplikasi
            </button>
            <button onClick={() => onPPOBClick('pulsa')} className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              <Wallet size={20} />
              Top Up Sekarang
            </button>
          </div>
        </div>

        {/* 3D Visual Mockup Area */}
        <div className="relative h-[600px] md:h-[700px] w-full mt-10 perspective-[2000px]">
          
          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-purple-600/30 rounded-full blur-[100px] -z-20"></div>

          {/* Left Phone (Apps) */}
          <div className="absolute top-10 left-0 md:left-[10%] w-[280px] h-[550px] bg-[#0a0a0a] rounded-[40px] border-[4px] border-gray-700 shadow-[0_0_50px_rgba(76,29,149,0.5)] transform rotate-[-15deg] hover:rotate-0 transition-transform duration-700 z-20 overflow-hidden ring-1 ring-white/20">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30"></div>
            {/* Screen Content */}
            <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-4 pt-10 grid grid-cols-2 gap-4 content-start">
               {/* App Icons simulated */}
               <div className="aspect-square bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"><Music className="text-white w-10 h-10" /></div>
               <div className="aspect-square bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"><Video className="text-white w-10 h-10" /></div>
               <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"><Play className="text-white w-10 h-10" /></div>
               <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"><MessageCircle className="text-white w-10 h-10" /></div>
               <div className="col-span-2 mt-4 p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/5">
                  <div className="h-2 w-2/3 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 w-1/2 bg-white/20 rounded"></div>
               </div>
               <div className="aspect-video col-span-2 bg-cover bg-center rounded-xl mt-2 opacity-80" style={{backgroundImage: 'url(https://picsum.photos/300/150?random=4)'}}></div>
            </div>
          </div>

          {/* Right Phone (PPOB/Wallet) */}
          <div className="absolute top-20 right-0 md:right-[10%] w-[280px] h-[550px] bg-[#0a0a0a] rounded-[40px] border-[4px] border-gray-700 shadow-[0_0_50px_rgba(59,130,246,0.5)] transform rotate-[15deg] hover:rotate-0 transition-transform duration-700 z-20 overflow-hidden ring-1 ring-white/20">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30"></div>
            {/* Screen Content - Wallet UI */}
            <div className="w-full h-full bg-[#050511] relative p-6 pt-12 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="text-white font-bold">Dompet Saya</div>
                <div className="w-8 h-8 rounded-full bg-gray-700"></div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 mb-6 shadow-lg">
                <p className="text-blue-100 text-xs mb-1">Total Saldo</p>
                <h3 className="text-white text-2xl font-bold">Rp 1.500.000</h3>
                <div className="mt-4 flex gap-4 text-white/80">
                   <CreditCard size={16} /> <Wallet size={16} />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                 <button onClick={() => onPPOBClick('pulsa')} className="aspect-square bg-white/5 hover:bg-white/20 active:scale-95 transition-all rounded-xl flex items-center justify-center flex-col gap-1 cursor-pointer">
                   <Smartphone size={16} className="text-blue-400" />
                   <span className="text-[8px] text-gray-400">Pulsa</span>
                 </button>
                 <button onClick={() => onPPOBClick('pln')} className="aspect-square bg-white/5 hover:bg-white/20 active:scale-95 transition-all rounded-xl flex items-center justify-center flex-col gap-1 cursor-pointer">
                   <Zap size={16} className="text-yellow-400" />
                   <span className="text-[8px] text-gray-400">PLN</span>
                 </button>
                 <button onClick={() => onPPOBClick('internet')} className="aspect-square bg-white/5 hover:bg-white/20 active:scale-95 transition-all rounded-xl flex items-center justify-center flex-col gap-1 cursor-pointer">
                   <Wifi size={16} className="text-green-400" />
                   <span className="text-[8px] text-gray-400">Data</span>
                 </button>
                 <button onClick={() => onPPOBClick('ewallet')} className="aspect-square bg-white/5 hover:bg-white/20 active:scale-95 transition-all rounded-xl flex items-center justify-center flex-col gap-1 cursor-pointer">
                   <Wallet size={16} className="text-purple-400" />
                   <span className="text-[8px] text-gray-400">E-Wallet</span>
                 </button>
              </div>
              
              <div className="space-y-3">
                 <div className="h-10 bg-white/5 rounded-lg w-full"></div>
                 <div className="h-10 bg-white/5 rounded-lg w-full"></div>
                 <div className="h-10 bg-white/5 rounded-lg w-full"></div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Cards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-30 mt-[-50px] md:mt-[-100px]">
          <FeatureCard 
            icon={<Crown className="w-8 h-8 text-yellow-400" />}
            title="Aplikasi Premium"
            description="Akses aplikasi berbayar terbaik secara gratis!"
            bgClass="bg-[#1e1e40]/60"
            borderClass="border-white/10"
            onClick={() => scrollToSection('premium')}
          />
           <FeatureCard 
            icon={<Wallet className="w-8 h-8 text-green-400" />}
            title="PPOB Instan"
            description="Isi pulsa, data, dan e-money secara instan."
            bgClass="bg-[#1e1e40]/60"
            borderClass="border-white/10"
            onClick={() => onPPOBClick('pulsa')}
          />
           <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-blue-400" />}
            title="Aman & Terpercaya"
            description="Transaksi 100% Aman."
            bgClass="bg-[#1e1e40]/60"
            borderClass="border-white/10"
            onClick={() => scrollToSection('root')}
          />
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, bgClass, borderClass, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`p-6 rounded-2xl backdrop-blur-md border ${bgClass} ${borderClass} shadow-xl flex items-center gap-4 hover:-translate-y-2 transition-transform duration-300 cursor-pointer group`}
  >
    <div className="p-3 bg-white/5 rounded-xl border border-white/5 shadow-inner group-hover:bg-white/10 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-bold text-lg">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

export default Hero;
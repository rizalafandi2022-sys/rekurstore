import React from 'react';
import { AppItem } from '../types';
import { ArrowLeft, Star, Download, Share2, ShieldCheck, User, Calendar, HardDrive } from 'lucide-react';

interface AppDetailsProps {
  app: AppItem;
  onBack: () => void;
}

const AppDetails: React.FC<AppDetailsProps> = ({ app, onBack }) => {
  return (
    <div className="min-h-screen pt-20 pb-12 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div className="absolute inset-0 bg-[#050511]/90 z-10"></div>
        <img src={app.image} className="w-full h-full object-cover blur-[50px] opacity-40 scale-110" alt="" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft size={18} />
          Kembali Menjelajah
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Left Column: Icon & Primary Actions */}
          <div className="lg:col-span-1">
            <div className="bg-[#121235]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-24">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-2xl shadow-black/50 border border-white/10 relative group">
                <img src={app.image} alt={app.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {app.isPremium && (
                   <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">PREMIUM</div>
                )}
              </div>

              <div className="text-center mb-6">
                 <h1 className="text-3xl font-bold text-white mb-2">{app.name}</h1>
                 <p className="text-blue-400 font-medium">{app.developer || 'Pengembang Tidak Diketahui'}</p>
              </div>

              <div className="flex justify-center gap-2 mb-8">
                 <div className="px-4 py-2 bg-black/30 rounded-lg text-center border border-white/5">
                    <span className="block text-xl font-bold text-white flex items-center justify-center gap-1">
                      {app.rating} <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Rating</span>
                 </div>
                 <div className="px-4 py-2 bg-black/30 rounded-lg text-center border border-white/5">
                    <span className="block text-xl font-bold text-white">{app.size || 'N/A'}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Ukuran</span>
                 </div>
                 <div className="px-4 py-2 bg-black/30 rounded-lg text-center border border-white/5">
                    <span className="block text-xl font-bold text-white">12+</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Umur</span>
                 </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Download size={20} />
                  Unduh Sekarang
                </button>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-colors">
                  <Share2 size={18} />
                  Bagikan Aplikasi
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-green-400 text-sm">
                 <ShieldCheck size={16} />
                 <span>Terverifikasi Aman & Bebas Virus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Gallery, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Screenshots Gallery */}
            <div>
               <h2 className="text-2xl font-bold text-white mb-4">Pratinjau</h2>
               <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar snap-x">
                  {app.screenshots?.map((shot, idx) => (
                    <img 
                      key={idx} 
                      src={shot} 
                      alt="Screenshot" 
                      className="h-64 rounded-xl border border-white/10 shadow-lg snap-center flex-shrink-0"
                    />
                  )) || (
                    <div className="w-full h-64 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 border border-white/10">Pratinjau tidak tersedia</div>
                  )}
               </div>
            </div>

            {/* Description */}
            <div className="bg-[#121235]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6">
               <h2 className="text-2xl font-bold text-white mb-4">Tentang {app.category} ini</h2>
               <p className="text-gray-300 leading-relaxed text-lg mb-6">
                 {app.longDescription || app.description}
               </p>
               
               <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                     <User size={16} className="text-blue-400" />
                     <span>Pengembang: {app.developer || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <HardDrive size={16} className="text-purple-400" />
                     <span>Versi: {app.version || '1.0'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Calendar size={16} className="text-green-400" />
                     <span>Diperbarui: 24 Okt 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Download size={16} className="text-yellow-400" />
                     <span>Unduhan: {app.downloads || '10k+'}</span>
                  </div>
               </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Rating & Ulasan</h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">Lihat Semua</button>
              </div>

              <div className="space-y-4">
                {app.reviews && app.reviews.length > 0 ? (
                  app.reviews.map((review) => (
                    <div key={review.id} className="bg-[#121235]/40 border border-white/5 p-4 rounded-xl">
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                             <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full border border-white/10" />
                             <div>
                               <p className="text-white font-medium text-sm">{review.user}</p>
                               <div className="flex gap-0.5">
                                 {[...Array(5)].map((_, i) => (
                                   <Star key={i} size={12} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-700 text-gray-700"} />
                                 ))}
                               </div>
                             </div>
                          </div>
                          <span className="text-gray-500 text-xs">{review.date}</span>
                       </div>
                       <p className="text-gray-300 text-sm pl-[52px]">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 bg-white/5 rounded-xl border border-white/5">
                    Belum ada ulasan. Jadilah yang pertama mengulas!
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
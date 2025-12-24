import React from 'react';
import { Clock, Bell } from 'lucide-react';

interface UpcomingItem {
  id: string;
  name: string;
  category: string;
  releaseDate: string;
  image: string;
  description: string;
}

const UPCOMING_DATA: UpcomingItem[] = [
  {
    id: '1',
    name: 'Sora 2.0',
    category: 'Video AI',
    releaseDate: 'Segera Hadir',
    image: 'https://picsum.photos/400/250?random=30',
    description: 'Generasi video hiper-realistik dari teks dengan detail visual yang menakjubkan dan durasi lebih panjang.',
  },
  {
    id: '2',
    name: 'ChatGPT Plus',
    category: 'Asisten AI',
    releaseDate: 'Restock Segera',
    image: 'https://picsum.photos/400/250?random=31',
    description: 'Akses prioritas ke GPT-4o, kemampuan analisis data canggih, dan pembuatan gambar DALL-E 3.',
  },
  {
    id: '3',
    name: 'Spotify Premium',
    category: 'Musik',
    releaseDate: 'Segera Hadir',
    image: 'https://picsum.photos/400/250?random=32',
    description: 'Nikmati jutaan lagu tanpa iklan, kualitas audio jernih, dan fitur dengarkan secara offline.',
  }
];

const ComingSoon: React.FC = () => {
  return (
    <div className="py-20 bg-[#02020a] relative overflow-hidden" id="coming-soon">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <Clock className="text-blue-400 w-5 h-5" />
               <span className="text-blue-400 font-bold tracking-wider text-sm uppercase">Rilis Mendatang</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Segera Hadir</h2>
            <p className="text-gray-400 mt-2 max-w-xl">
              Bersiaplah untuk stok aplikasi premium terbaru. Daftar sekarang untuk mendapatkan notifikasi saat tersedia.
            </p>
          </div>
          <button className="text-white border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-2 rounded-full transition-colors backdrop-blur-sm">
            Lihat Roadmap
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UPCOMING_DATA.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-[#0f0f2d] border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
              {/* Image Section */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f2d] via-transparent to-transparent z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{item.name}</h3>
                <p className="text-sm text-blue-300 mb-3">{item.releaseDate}</p>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                
                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 hover:border-blue-500 transition-all flex items-center justify-center gap-2 text-gray-300 group/btn">
                  <Bell className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span className="font-medium">Ingatkan Saya</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
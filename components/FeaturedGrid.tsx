import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { AppItem } from '../types';

const MOCK_DATA: AppItem[] = [
  { 
    id: '1', 
    name: 'Musicify Pro', 
    category: 'App', 
    rating: 4.8, 
    isPremium: true, 
    image: 'https://picsum.photos/400/400?random=10', 
    description: 'Streaming musik tanpa iklan dengan audio fidelitas tinggi.',
    longDescription: 'Nikmati musik yang belum pernah ada sebelumnya dengan Musicify Pro. Buka streaming fidelitas tinggi eksklusif, mendengarkan offline, dan pengalaman bebas iklan. Buat daftar putar tanpa batas, bagikan dengan teman, dan temukan artis baru dengan mesin rekomendasi AI kami.',
    developer: 'SoundWave Inc',
    size: '45 MB',
    version: '2.4.1',
    downloads: '1Jt+',
    screenshots: ['https://picsum.photos/600/350?random=101', 'https://picsum.photos/600/350?random=102', 'https://picsum.photos/600/350?random=103'],
    reviews: [
      { id: 'r1', user: 'Budi S.', avatar: 'https://i.pravatar.cc/150?u=1', rating: 5, comment: 'Aplikasi musik terbaik yang pernah saya gunakan. Kualitas suaranya tiada tanding.', date: '2 hari lalu' },
      { id: 'r2', user: 'Sari M.', avatar: 'https://i.pravatar.cc/150?u=2', rating: 4, comment: 'Aplikasinya bagus, tapi mode gelapnya bisa lebih gelap lagi.', date: '1 minggu lalu' }
    ]
  },
  { 
    id: '2', 
    name: 'SecureVault VPN', 
    category: 'App', 
    rating: 4.9, 
    isPremium: true, 
    image: 'https://picsum.photos/400/400?random=11', 
    description: 'Enkripsi tingkat militer untuk koneksi internet Anda.',
    longDescription: 'Lindungi privasi Anda dengan SecureVault VPN. Akses konten yang diblokir, jelajahi secara anonim, dan amankan koneksi Anda di Wi-Fi publik. Fitur 5000+ server di 60 negara.',
    developer: 'SecurTech',
    size: '30 MB',
    version: '5.0.1',
    downloads: '2Jt+',
    screenshots: ['https://picsum.photos/600/350?random=111', 'https://picsum.photos/600/350?random=112'],
    reviews: [
      { id: 'r3', user: 'TechGuru', avatar: 'https://i.pravatar.cc/150?u=3', rating: 5, comment: 'VPN tercepat yang pernah saya coba.', date: 'Kemarin' }
    ]
  },
  { 
    id: '3', 
    name: 'Pixel Edit Pro', 
    category: 'App', 
    rating: 4.7, 
    isPremium: true, 
    image: 'https://picsum.photos/400/400?random=12', 
    description: 'Suite pengeditan foto profesional untuk seluler.',
    longDescription: 'Edit foto seperti pro dengan alat canggih, penghapusan AI, filter, dan dukungan layer. Sempurna untuk fotografer dan kreator media sosial.',
    developer: 'CreativeSoft',
    size: '120 MB',
    version: '3.2.0',
    downloads: '500RB+',
    screenshots: ['https://picsum.photos/600/350?random=121', 'https://picsum.photos/600/350?random=122'],
    reviews: []
  },
  { 
    id: '4', 
    name: 'TaskForce', 
    category: 'App', 
    rating: 4.6, 
    isPremium: false, 
    image: 'https://picsum.photos/400/400?random=13', 
    description: 'Alat produktivitas dan manajemen proyek terbaik.',
    longDescription: 'Atur hidup dan pekerjaan Anda dengan TaskForce. Papan Kanban, tampilan kalender, pengingat, dan fitur kolaborasi semuanya di satu tempat.',
    developer: 'ProductivityLabs',
    size: '50 MB',
    version: '1.5',
    downloads: '800RB+',
    screenshots: ['https://picsum.photos/600/350?random=131', 'https://picsum.photos/600/350?random=132'],
    reviews: []
  },
  { 
    id: '5', 
    name: 'WeatherMax', 
    category: 'App', 
    rating: 4.8, 
    isPremium: true, 
    image: 'https://picsum.photos/400/400?random=14', 
    description: 'Prakiraan cuaca hiper-lokal dan radar.',
    longDescription: 'Dapatkan prakiraan curah hujan menit demi menit, peringatan cuaca buruk, dan peta radar resolusi tinggi.',
    developer: 'MeteoGroup',
    size: '60 MB',
    version: '2.1',
    downloads: '100RB+',
    screenshots: ['https://picsum.photos/600/350?random=141', 'https://picsum.photos/600/350?random=142'],
    reviews: []
  },
  { 
    id: '6', 
    name: 'LingoLearn', 
    category: 'App', 
    rating: 4.8, 
    isPremium: true, 
    image: 'https://picsum.photos/400/400?random=15', 
    description: 'Kuasai bahasa baru dengan percakapan AI.',
    longDescription: 'Belajar bahasa Spanyol, Prancis, Jerman, dan lainnya melalui pelajaran interaktif dan latihan percakapan AI real-time.',
    developer: 'EduTech',
    size: '85 MB',
    version: '4.0',
    downloads: '3Jt+',
    screenshots: ['https://picsum.photos/600/350?random=151', 'https://picsum.photos/600/350?random=152'],
    reviews: []
  },
];

interface FeaturedGridProps {
  onAppClick: (app: AppItem) => void;
}

const FeaturedGrid: React.FC<FeaturedGridProps> = ({ onAppClick }) => {
  return (
    <div className="py-20 bg-[#050511]" id="apps">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Aplikasi Premium Unggulan</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4">Temukan Alat Terbaik untuk Perangkat Anda</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {MOCK_DATA.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onAppClick(item)}
              className="bg-[#121235] border border-white/5 rounded-2xl p-4 hover:bg-[#1a1a45] transition-colors group cursor-pointer relative overflow-hidden hover:-translate-y-1 duration-300 shadow-lg hover:shadow-purple-500/20"
            >
               {/* Premium Tag */}
               {item.isPremium && (
                 <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 shadow-md">
                   PREMIUM
                 </div>
               )}

               <div className="aspect-square rounded-xl overflow-hidden mb-3 relative group-hover:scale-105 transition-transform duration-300">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/20">
                     <ChevronRight className="w-5 h-5 text-white" />
                   </div>
                 </div>
               </div>
               
               <h3 className="text-white font-semibold text-sm truncate">{item.name}</h3>
               <p className="text-gray-400 text-xs mb-2">{item.category}</p>
               
               <div className="flex items-center gap-1">
                 <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                 <span className="text-gray-300 text-xs font-medium">{item.rating}</span>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
           <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/50 flex items-center gap-2 mx-auto">
             Lihat Semua Aplikasi
             <ChevronRight size={16} />
           </button>
        </div>

      </div>
    </div>
  );
};

export default FeaturedGrid;
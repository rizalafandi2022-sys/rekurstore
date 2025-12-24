import React, { useState } from 'react';
import { Check, Zap, ExternalLink } from 'lucide-react';

// Define the Variant interface
interface ProductVariant {
  id: string;
  name: string; // The suffix name (e.g., "Go", "Plus")
  price: string;
  originalPrice: string;
  features?: string[]; // Optional specific features
}

interface Product {
  id: string;
  name: string; // Base name
  category: string;
  price: string;
  period: string;
  originalPrice: string;
  description: string;
  features: string[];
  gradient: string;
  image: string;
  bgImage?: string;
  isPopular?: boolean;
  invertIcon?: boolean;
  variants?: ProductVariant[]; // New field for variants
}

const PRODUCTS: Product[] = [
  {
    id: 'gemini',
    name: 'Gemini Advanced',
    category: 'Alat AI',
    price: 'Rp 20.000',
    period: '/bulan',
    originalPrice: 'Rp 300.000',
    description: 'Akses ke model AI tercerdas Google 1.5 Pro untuk analisis dan coding.',
    features: ['Model 1.5 Pro', 'Analisis Data', 'Jendela Konteks 1M', 'Integrasi Google'],
    gradient: 'from-blue-600 to-indigo-500',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    isPopular: false,
  },
  {
    id: 'canva',
    name: 'Canva Pro',
    category: 'Desain',
    price: 'Rp 1.000',
    period: '/bulan',
    originalPrice: 'Rp 2.000',
    description: 'Buka kunci konten tanpa batas, penghapus latar belakang, dan template premium.',
    features: ['Ubah Ukuran Ajaib', 'Kit Merek', 'Penghapus Latar', '100Jt+ Foto'],
    gradient: 'from-cyan-500 to-blue-600',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
    isPopular: false,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT', // Base name changed to generic
    category: 'Alat AI',
    price: 'Rp 10.000', // Default price
    period: '/bulan',
    originalPrice: 'Rp 25.000',
    description: 'Asisten AI tercanggih dengan berbagai pilihan sesuai kebutuhan Anda.',
    features: ['Akses ke GPT-4', 'Browsing & Plugin', 'Respons Cepat', 'Akses Prioritas'],
    gradient: 'from-emerald-500 to-teal-700',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    isPopular: true,
    invertIcon: true,
    variants: [
      {
        id: 'go',
        name: 'Go',
        price: 'Rp 5.000',
        originalPrice: 'Rp 10.000',
        features: ['Akses GPT-3.5 Turbo', 'Respons Standar', 'Hemat Kuota', 'Mode Hemat']
      },
      {
        id: 'plus',
        name: 'Plus',
        price: 'Rp 10.000',
        originalPrice: 'Rp 25.000',
        features: ['Akses GPT-4', 'Browsing & DALL-E', 'Respons Cepat', 'Prioritas Server']
      },
      {
        id: 'business',
        name: 'Business',
        price: 'Rp 25.000',
        originalPrice: 'Rp 50.000',
        features: ['GPT-4 Unlimited', 'Analisis Data Tingkat Lanjut', 'Privasi Data Enterprise', 'Dukungan Prioritas']
      }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube Premium',
    category: 'Hiburan',
    price: 'Rp 5.000',
    period: '/bulan',
    originalPrice: 'Rp 15.000',
    description: 'Tonton video bebas iklan, offline, dan di latar belakang.',
    features: ['Video Tanpa Iklan', 'Putar di Latar', 'YouTube Music', 'Download Offline'],
    gradient: 'from-red-600 to-rose-700',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
  },
  {
    id: 'capcut',
    name: 'CapCut Pro',
    category: 'Edit Video',
    price: 'Rp 7.000',
    period: '/bulan',
    originalPrice: 'Rp 15.000',
    description: 'Fitur pengeditan video canggih dan efek untuk kreator.',
    features: ['Efek Pro', 'Penyimpanan Awan', 'Tanpa Watermark', 'Efek Tubuh'],
    gradient: 'from-slate-700 to-black',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Capcut_logo.svg',
    invertIcon: true, 
  },
];

interface PremiumSelectionProps {
  onBuy: (item: { name: string; price: string; category: string }) => void;
}

// Sub-component to handle individual card state (variant selection)
const ProductCard: React.FC<{ product: Product; onBuy: PremiumSelectionProps['onBuy'] }> = ({ product, onBuy }) => {
  // If product has variants, default to the second one (usually 'Plus' or 'Standard'), otherwise the first
  const [activeVariantId, setActiveVariantId] = useState<string | null>(
    product.variants ? (product.variants[1]?.id || product.variants[0].id) : null
  );

  // Determine current display data based on variant or base product
  const currentVariant = product.variants?.find(v => v.id === activeVariantId);
  
  const displayName = currentVariant 
    ? `${product.name} ${currentVariant.name}` 
    : product.name;
    
  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const displayFeatures = currentVariant?.features || product.features;

  return (
    <div 
      className="relative group bg-[#0f0f2d] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full shadow-2xl shadow-black/50"
    >
      {/* Popular Badge */}
      {product.isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-yellow-600 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 shadow-lg shadow-yellow-500/20 tracking-wide">
          PALING POPULER
        </div>
      )}

      {/* Header with Centered App Icon */}
      <div className={`h-40 sm:h-48 relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${product.gradient} shrink-0`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-white/10 rotate-45 transform origin-bottom-right blur-3xl transition-transform duration-700 group-hover:rotate-90"></div>

        {/* Main Icon Container - Glassmorphism */}
        <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center group-hover:shadow-white/20 group-hover:border-white/40">
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-full h-full object-contain drop-shadow-md ${product.invertIcon ? 'invert brightness-0 bg-transparent' : ''}`} 
            />
        </div>

        {/* Category Tag */}
        <div className="absolute top-4 left-4 z-10">
           <span className="bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg text-white/90 text-[10px] font-bold border border-white/10 uppercase tracking-wider">
             {product.category}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col relative">
        {/* Glow effect from top */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${product.gradient} opacity-50`}></div>

        <div className="flex justify-between items-start mb-2 min-h-[1.75rem]">
           <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">{displayName}</h3>
        </div>
        
        {/* Variant Selectors (Pills) - Optimized for Mobile & Desktop */}
        {product.variants && (
          <div className="w-full mb-5">
            <div className="flex w-full p-1 bg-black/40 rounded-xl border border-white/10 gap-1">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={(e) => { e.stopPropagation(); setActiveVariantId(v.id); }}
                    className={`
                      flex-1 py-2 px-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-all duration-200 truncate
                      ${activeVariantId === v.id 
                        ? `bg-gradient-to-r ${product.gradient} text-white shadow-lg transform scale-[1.02]` 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    {v.name}
                  </button>
                ))}
            </div>
          </div>
        )}
        
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-xl sm:text-2xl font-bold text-white">{displayPrice}</span>
          <span className="text-gray-400 text-xs font-medium">{product.period}</span>
          <span className="ml-auto text-xs text-gray-500 line-through decoration-red-500/50 decoration-2">{displayOriginalPrice}</span>
        </div>

        <p className="text-gray-400 text-xs mb-6 leading-relaxed border-b border-white/5 pb-4 min-h-[3rem] sm:min-h-[3.5rem]">
          {product.description}
        </p>

        <ul className="space-y-3 mb-8 flex-1">
          {displayFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-xs text-gray-300">
              <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-white/5 flex items-center justify-center border border-white/5`}>
                <Check size={10} className="text-white" />
              </div>
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={() => onBuy({ name: displayName, price: displayPrice, category: product.category })}
          className={`w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-lg transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${product.gradient} opacity-90 hover:opacity-100 hover:scale-[1.02] active:scale-[0.98] hover:shadow-${product.gradient.split('-')[1]}-500/30`}
        >
           Beli Sekarang <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

const PremiumSelection: React.FC<PremiumSelectionProps> = ({ onBuy }) => {
  return (
    <div className="py-20 relative bg-[#02020a]" id="premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 mb-6">
            <Zap size={16} fill="currentColor" />
            <span className="text-sm font-bold tracking-wide uppercase">Langganan Terlaris</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Tingkatkan <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Gaya Hidup Digital</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Dapatkan akses premium ke alat favorit Anda dengan harga terbaik. Pengiriman instan dan garansi penuh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={onBuy} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default PremiumSelection;
import React, { useState } from 'react';
import { Check, Zap, ExternalLink } from 'lucide-react';

interface ProductVariant {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  features?: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  period: string;
  originalPrice: string;
  description: string;
  features: string[];
  gradient: string;
  image: string;
  isPopular?: boolean;
  invertIcon?: boolean;
  variants?: ProductVariant[];
}

const PRODUCTS: Product[] = [
  {
    id: 'gemini',
    name: 'Gemini Advanced',
    category: 'AI Tools',
    price: 'Rp 20.000',
    period: '/bulan',
    originalPrice: 'Rp 300.000',
    description: 'Model AI tercanggih Google 1.5 Pro untuk analisis data dan pemrograman.',
    features: ['Model 1.5 Pro', 'Analisis Data Cepat', 'Context Window 1M', 'Google Workspace Sync'],
    gradient: 'from-blue-600 to-indigo-600',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
  },
  {
    id: 'canva',
    name: 'Canva Pro',
    category: 'Design',
    price: 'Rp 1.000',
    period: '/bulan',
    originalPrice: 'Rp 2.000',
    description: 'Akses konten tanpa batas, penghapus latar belakang, dan kit merek premium.',
    features: ['Magic Resizer', 'Brand Kits', 'Background Remover', '100M+ Premium Stock'],
    gradient: 'from-cyan-500 to-blue-500',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Tools',
    price: 'Rp 10.000',
    period: '/bulan',
    originalPrice: 'Rp 25.000',
    description: 'Asisten AI tercanggih dengan berbagai pilihan model sesuai kebutuhan.',
    features: ['Akses GPT-4o', 'Browsing & Vision', 'Priority Access', 'DALL-E 3 Generation'],
    gradient: 'from-emerald-600 to-teal-800',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    isPopular: true,
    invertIcon: true,
    variants: [
      { id: 'go', name: 'Go', price: 'Rp 5.000', originalPrice: 'Rp 10.000', features: ['GPT-3.5 Turbo', 'Standard Speed', 'Cost Effective', 'Mobile Friendly'] },
      { id: 'plus', name: 'Plus', price: 'Rp 10.000', originalPrice: 'Rp 25.000', features: ['GPT-4o Access', 'DALL-E 3', 'High Speed', 'Advanced Data'] },
      { id: 'business', name: 'Business', price: 'Rp 25.000', originalPrice: 'Rp 50.000', features: ['Unlimited GPT-4o', 'Enterprise Security', 'Team Collab', '24/7 Support'] }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube Premium',
    category: 'Entertainment',
    price: 'Rp 5.000',
    period: '/bulan',
    originalPrice: 'Rp 15.000',
    description: 'Pengalaman menonton tanpa iklan, pemutaran latar belakang, dan musik.',
    features: ['Ad-free Experience', 'Background Play', 'YouTube Music Pro', 'Offline Downloads'],
    gradient: 'from-red-600 to-rose-700',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
  },
];

const ProductCard: React.FC<{ product: Product; onBuy: (item: any) => void }> = ({ product, onBuy }) => {
  const [activeVariantId, setActiveVariantId] = useState<string | null>(
    product.variants ? product.variants[1]?.id || product.variants[0].id : null
  );

  const currentVariant = product.variants?.find(v => v.id === activeVariantId);
  const displayName = currentVariant ? `${product.name} ${currentVariant.name}` : product.name;
  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const displayOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const displayFeatures = currentVariant?.features || product.features;

  return (
    <div className="glass-card flex flex-col h-full rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all duration-500">
      {/* Header with Icon */}
      <div className={`h-44 relative flex items-center justify-center bg-gradient-to-br ${product.gradient}`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]"></div>
        
        {/* Floating badge for popular products */}
        {product.isPopular && (
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold text-white tracking-widest uppercase">
            Best Value
          </div>
        )}

        <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-3xl p-5 border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-700">
           <img 
             src={product.image} 
             alt={product.name} 
             className={`w-full h-full object-contain ${product.invertIcon ? 'invert brightness-0' : ''}`} 
           />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-6">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2 block">{product.category}</span>
          <h3 className="text-2xl font-bold text-white tracking-tight">{displayName}</h3>
        </div>

        {/* Variant Selectors */}
        {product.variants && (
          <div className="flex p-1.5 bg-black/40 rounded-2xl border border-white/10 mb-6 gap-1.5 relative">
             {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVariantId(v.id)}
                  className={`relative flex-1 py-3 px-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${
                    activeVariantId === v.id 
                    ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-[1.08] z-10 border border-white/40 ring-1 ring-white/20' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="relative z-10">{v.name}</span>
                  {activeVariantId === v.id && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white text-black text-[7px] font-black rounded-full shadow-lg animate-bounce border border-purple-200">
                      ACTIVE
                    </div>
                  )}
                </button>
             ))}
          </div>
        )}

        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-3xl font-bold text-white tracking-tight">{displayPrice}</span>
          <span className="text-gray-500 text-xs font-medium">{product.period}</span>
          <span className="ml-auto text-xs text-gray-600 line-through">{displayOriginalPrice}</span>
        </div>

        <ul className="space-y-4 mb-8 flex-1">
          {displayFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
              {feature}
            </li>
          ))}
        </ul>

        <button 
          onClick={() => onBuy({ name: displayName, price: displayPrice, category: product.category })}
          className="w-full py-4 bg-white/5 hover:bg-white text-gray-300 hover:text-black font-bold rounded-2xl border border-white/10 hover:border-white transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn"
        >
          Get Started <ExternalLink size={16} className="opacity-50 group-hover/btn:opacity-100" />
        </button>
      </div>
    </div>
  );
};

const PremiumSelection: React.FC<{ onBuy: (item: any) => void }> = ({ onBuy }) => {
  return (
    <div className="py-32 relative bg-transparent" id="premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-6">
            <div className="h-px w-8 bg-blue-400"></div>
            Subscription Services
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
            Elevate Your <br />
            Digital Lifestyle.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Dapatkan akses penuh ke ekosistem aplikasi paling populer di dunia dengan harga yang jauh lebih terjangkau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onBuy={onBuy} />)}
        </div>
      </div>
    </div>
  );
};

export default PremiumSelection;
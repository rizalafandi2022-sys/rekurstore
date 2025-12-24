import React, { useState, useEffect } from 'react';
import { Smartphone, Zap, Wifi, Wallet, ChevronRight, CreditCard, Search, Globe, Gamepad2, Landmark } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'pulsa',
    name: 'Pulsa & Data',
    icon: <Smartphone className="w-6 h-6" />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    desc: 'Semua operator'
  },
  {
    id: 'pln',
    name: 'Token PLN',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    desc: 'Listrik Prabayar'
  },
  {
    id: 'ewallet',
    name: 'E-Wallet',
    icon: <Wallet className="w-6 h-6" />,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    desc: 'Dana, OVO, Gopay'
  },
  {
    id: 'internet',
    name: 'Internet TV',
    icon: <Wifi className="w-6 h-6" />,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    desc: 'Indihome, Biznet'
  }
];

// Configuration data for each tab
const TAB_CONTENT: Record<string, { label: string; placeholder: string; options: { label: string; sub: string }[] }> = {
  pulsa: {
    label: 'Nomor Handphone',
    placeholder: '0812 xxxx xxxx',
    options: [
      { label: '5.000', sub: 'Rp 6.500' },
      { label: '10.000', sub: 'Rp 11.500' },
      { label: '20.000', sub: 'Rp 21.000' },
      { label: '50.000', sub: 'Rp 50.500' },
      { label: '100.000', sub: 'Rp 99.000' },
      { label: 'Data 10GB', sub: 'Rp 35.000' }
    ]
  },
  pln: {
    label: 'Nomor Meter / ID Pelanggan',
    placeholder: '1234 5678 9012',
    options: [
      { label: 'IDR 20k', sub: 'Rp 22.500' },
      { label: 'IDR 50k', sub: 'Rp 52.500' },
      { label: 'IDR 100k', sub: 'Rp 102.500' },
      { label: 'IDR 200k', sub: 'Rp 202.500' },
      { label: 'IDR 500k', sub: 'Rp 502.500' },
      { label: 'Tagihan', sub: 'Cek Tagihan' }
    ]
  },
  ewallet: {
    label: 'Nomor HP Terdaftar',
    placeholder: '08xx (OVO/DANA/Gopay)',
    options: [
      { label: 'Top Up 20k', sub: 'Rp 21.000' },
      { label: 'Top Up 50k', sub: 'Rp 51.000' },
      { label: 'Top Up 100k', sub: 'Rp 101.000' },
      { label: 'Top Up 200k', sub: 'Rp 201.000' },
      { label: 'Saldo 500k', sub: 'Rp 501.000' },
      { label: 'Saldo 1jt', sub: 'Rp 1.001.000' }
    ]
  },
  internet: {
    label: 'ID Pelanggan TV/Internet',
    placeholder: '1234567890',
    options: [
      { label: 'Indihome', sub: 'Bayar Tagihan' },
      { label: 'Biznet', sub: 'Bayar Tagihan' },
      { label: 'First Media', sub: 'Bayar Tagihan' },
      { label: 'Voucher Wifi', sub: 'Rp 5.000' },
      { label: 'Voucher Wifi', sub: 'Rp 50.000' },
      { label: 'MyRepublic', sub: 'Bayar Tagihan' }
    ]
  }
};

interface PPOBSectionProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  onBuy: (item: { name: string; price: string; category: string; prefilledTarget?: string }) => void;
}

const PPOBSection: React.FC<PPOBSectionProps> = ({ activeTab, onTabChange, onBuy }) => {
  const currentContent = TAB_CONTENT[activeTab] || TAB_CONTENT['pulsa'];
  
  // Local state for input values
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<{label: string, sub: string} | null>(null);

  // Reset local state when tab changes
  useEffect(() => {
    setInputValue('');
    setSelectedOption(null);
  }, [activeTab]);

  const handleBuyClick = () => {
    if (!inputValue) {
        alert("Mohon masukkan nomor tujuan terlebih dahulu.");
        return;
    }
    
    // Default to first option if none selected, or handle error. Using first for smoother UX here.
    const optionToBuy = selectedOption || currentContent.options[0];
    
    onBuy({
        category: 'PPOB',
        name: `${CATEGORIES.find(c => c.id === activeTab)?.name} - ${optionToBuy.label}`,
        price: optionToBuy.sub,
        prefilledTarget: inputValue
    });
  };

  return (
    <div className="py-20 bg-[#050511] relative" id="ppob">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Top Up</span> Instan
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Isi ulang kebutuhan digital Anda dalam hitungan detik. Pembayaran aman, pengiriman instan, dan dukungan 24/7.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {CATEGORIES.map((cat) => (
                <div 
                    key={cat.id}
                    onClick={() => onTabChange(cat.id)}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 group hover:-translate-y-1 ${activeTab === cat.id ? `bg-[#1a1a40] ${cat.border} ring-1 ring-white/10` : 'bg-[#0f0f2d] border-white/5 hover:border-white/20'}`}
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                        {cat.icon}
                    </div>
                    <h3 className={`font-bold text-lg mb-1 ${activeTab === cat.id ? 'text-white' : 'text-gray-300'}`}>{cat.name}</h3>
                    <p className="text-xs text-gray-500">{cat.desc}</p>
                </div>
            ))}
        </div>

        {/* Quick Transaction Panel */}
        <div className="bg-[#0f0f2d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3">
                
                {/* Left: Input Form */}
                <div className="p-8 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            {CATEGORIES.find(c => c.id === activeTab)?.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                {CATEGORIES.find(c => c.id === activeTab)?.name}
                            </h3>
                            <p className="text-sm text-gray-400">Masukkan detail transaksi</p>
                        </div>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                {currentContent.label}
                            </label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={currentContent.placeholder} 
                                    className="w-full bg-[#050511] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-11 transition-all"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            </div>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-gray-300 mb-3">
                                Pilih Nominal / Paket
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {currentContent.options.map((opt, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setSelectedOption(opt)}
                                        className={`py-3 px-4 rounded-xl border transition-all text-left group ${selectedOption?.label === opt.label ? 'bg-blue-600 border-blue-500 ring-1 ring-blue-400' : 'border-white/5 bg-[#1a1a40]/50 hover:bg-white/10 hover:border-white/20'}`}
                                    >
                                        <span className={`block text-sm font-bold ${selectedOption?.label === opt.label ? 'text-white' : 'text-white'}`}>{opt.label}</span>
                                        <span className={`block text-xs ${selectedOption?.label === opt.label ? 'text-blue-100' : 'text-gray-500'}`}>{opt.sub}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleBuyClick}
                            className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-white shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Lanjut Pembayaran <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Right: Promo / Info */}
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                            <CreditCard className="text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">Metode Pembayaran</h4>
                        <p className="text-gray-400 text-sm mb-6">Nikmati kemudahan bertransaksi dengan berbagai pilihan pembayaran otomatis dan manual.</p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div> 
                                <span>QRIS (All Payment)</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div> 
                                <span>Transfer Bank (BCA, Mandiri, BRI)</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div> 
                                <span>E-Wallet (Dana, OVO, Gopay, Shopee)</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 grid grid-cols-4 gap-2 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Payment Logos Placeholders */}
                            <div className="h-8 bg-white/10 rounded flex items-center justify-center text-[7px] font-bold text-white">QRIS</div>
                            <div className="h-8 bg-blue-700 rounded flex items-center justify-center text-[7px] font-bold text-white">BCA</div>
                            <div className="h-8 bg-blue-900 rounded flex items-center justify-center text-[7px] font-bold text-white">MANDIRI</div>
                            <div className="h-8 bg-blue-600 rounded flex items-center justify-center text-[7px] font-bold text-white">BRI</div>
                            <div className="h-8 bg-blue-400 rounded flex items-center justify-center text-[7px] font-bold text-white">DANA</div>
                            <div className="h-8 bg-purple-600 rounded flex items-center justify-center text-[7px] font-bold text-white">OVO</div>
                            <div className="h-8 bg-green-500 rounded flex items-center justify-center text-[7px] font-bold text-white">GOPAY</div>
                            <div className="h-8 bg-orange-500 rounded flex items-center justify-center text-[7px] font-bold text-white">SHOPEE</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default PPOBSection;
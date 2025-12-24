import React, { useState, useEffect } from 'react';
import { Smartphone, Zap, Wifi, Wallet, ChevronRight, CreditCard, Search, MessageCircle, Copy } from 'lucide-react';

const CATEGORIES = [
  { id: 'pulsa', name: 'Pulsa & Data', icon: <Smartphone className="w-5 h-5" />, color: 'text-blue-400', desc: 'All Operator' },
  { id: 'pln', name: 'PLN Token', icon: <Zap className="w-5 h-5" />, color: 'text-yellow-400', desc: 'Listrik Prabayar' },
  { id: 'ewallet', name: 'E-Wallet', icon: <Wallet className="w-5 h-5" />, color: 'text-green-400', desc: 'Top Up Saldo' },
  { id: 'internet', name: 'Internet TV', icon: <Wifi className="w-5 h-5" />, color: 'text-red-400', desc: 'Bill Payment' }
];

const TAB_CONTENT: Record<string, any> = {
  pulsa: {
    label: 'Phone Number',
    placeholder: '0812 xxxx xxxx',
    options: [
      { label: '5.000', sub: 'Rp 6.500' }, { label: '10.000', sub: 'Rp 11.500' }, { label: '20.000', sub: 'Rp 21.000' },
      { label: '50.000', sub: 'Rp 50.500' }, { label: '100.000', sub: 'Rp 99.000' }, { label: 'Data 10GB', sub: 'Rp 35.000' }
    ]
  },
  pln: {
    label: 'Meter ID',
    placeholder: '1234 5678 9012',
    options: [
      { label: '20k', sub: 'Rp 22.500' }, { label: '50k', sub: 'Rp 52.500' }, { label: '100k', sub: 'Rp 102.500' },
      { label: '200k', sub: 'Rp 202.500' }, { label: '500k', sub: 'Rp 502.500' }, { label: 'Check Bill', sub: 'Inquiry' }
    ]
  },
  ewallet: {
    label: 'Account Phone',
    placeholder: '08xx Account Number',
    options: [
      { label: 'Top Up 20k', sub: 'Rp 21.000' }, { label: 'Top Up 50k', sub: 'Rp 51.000' }, { label: 'Top Up 100k', sub: 'Rp 101.000' },
      { label: 'Top Up 200k', sub: 'Rp 201.000' }, { label: 'Saldo 500k', sub: 'Rp 501.000' }, { label: 'Saldo 1jt', sub: 'Rp 1.001.000' }
    ]
  },
  internet: {
    label: 'Subscriber ID',
    placeholder: 'Customer ID',
    options: [
      { label: 'Indihome', sub: 'Pay Bill' }, { label: 'Biznet', sub: 'Pay Bill' }, { label: 'First Media', sub: 'Pay Bill' },
      { label: 'MyRepublic', sub: 'Pay Bill' }, { label: 'XL Home', sub: 'Pay Bill' }, { label: 'Voucher Wifi', sub: 'Rp 5.000' }
    ]
  }
};

const PPOBSection: React.FC<{ activeTab: string; onTabChange: (id: string) => void; onBuy: (item: any) => void }> = ({ activeTab, onTabChange, onBuy }) => {
  const currentContent = TAB_CONTENT[activeTab] || TAB_CONTENT['pulsa'];
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<any>(null);

  useEffect(() => { setInputValue(''); setSelectedOption(null); }, [activeTab]);

  const handleBuy = () => {
    if (!inputValue) return alert("Masukkan nomor tujuan.");
    const option = selectedOption || currentContent.options[0];
    onBuy({
      category: 'PPOB',
      name: `${CATEGORIES.find(c => c.id === activeTab)?.name} - ${option.label}`,
      price: option.sub,
      prefilledTarget: inputValue
    });
  };

  return (
    <div className="py-32 bg-transparent relative" id="ppob">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-green-400 font-bold text-xs uppercase tracking-[0.3em] mb-6">
                <div className="h-px w-8 bg-green-400"></div>
                Transaction Hub
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Instantly <span className="text-green-500">Refill</span> Your Digital Needs.
            </h2>
          </div>
          <div className="text-right hidden lg:block">
            <p className="text-gray-400 text-sm max-w-[300px] mb-4">Proses otomatis dengan konfirmasi instan. Keamanan transaksi terjamin 100%.</p>
            <div className="flex justify-end gap-2">
               {[...Array(4)].map((_, i) => <div key={i} className="w-8 h-8 rounded bg-white/5 border border-white/5"></div>)}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-4">
                
                {/* Sidebar Categories */}
                <div className="bg-white/[0.02] border-r border-white/5 p-8 space-y-3">
                    {CATEGORIES.map((cat) => (
                        <button 
                            key={cat.id}
                            onClick={() => onTabChange(cat.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === cat.id ? 'bg-white text-black shadow-xl scale-[1.02]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <div className={`p-2 rounded-lg ${activeTab === cat.id ? 'bg-black/10' : 'bg-white/5'}`}>{cat.icon}</div>
                            <div className="text-left">
                                <p className="text-sm font-bold tracking-tight">{cat.name}</p>
                                <p className={`text-[10px] font-medium opacity-60 ${activeTab === cat.id ? 'text-black' : 'text-gray-500'}`}>{cat.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Main Transaction Area */}
                <div className="lg:col-span-2 p-10">
                    <div className="max-w-xl space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">{currentContent.label}</label>
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={currentContent.placeholder} 
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 pl-14 text-white font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Select Amount</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {currentContent.options.map((opt: any, idx: number) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setSelectedOption(opt)}
                                        className={`p-4 rounded-2xl border transition-all text-left ${selectedOption?.label === opt.label ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                    >
                                        <p className="text-xs font-bold text-white mb-1">{opt.label}</p>
                                        <p className={`text-[10px] font-medium ${selectedOption?.label === opt.label ? 'text-blue-100' : 'text-gray-500'}`}>{opt.sub}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={handleBuy}
                            className="w-full py-5 bg-white text-black font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            Proceed to Payment <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Status / Contact */}
                <div className="p-10 bg-white/[0.02] border-l border-white/5 flex flex-col">
                    <h4 className="text-white font-bold mb-6 text-sm flex items-center gap-2">
                        <CreditCard size={16} className="text-blue-400" />
                        System Status
                    </h4>
                    <div className="space-y-6 flex-1">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <p className="text-xs text-gray-400 font-medium">Automatic Processing Active</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <p className="text-xs text-gray-400 font-medium">24/7 Admin Support Ready</p>
                        </div>
                        
                        <div className="pt-8 mt-8 border-t border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Direct Support</p>
                            <button 
                                onClick={() => { navigator.clipboard.writeText("628995942945"); alert("Copied!"); }}
                                className="w-full p-4 glass-card border-white/5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group"
                            >
                                <div className="p-2 bg-green-500/20 rounded-xl text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                                    <MessageCircle size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">WhatsApp</p>
                                    <p className="text-sm font-bold text-white">+62 899 5942</p>
                                </div>
                            </button>
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
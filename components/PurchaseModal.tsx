import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, Smartphone, ChevronRight, CheckCircle, CreditCard, Send, QrCode, Building2, Wallet, Copy, Banknote } from 'lucide-react';

interface PurchaseData {
  name: string;
  price: string;
  category: string;
  prefilledTarget?: string;
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PurchaseData | null;
}

const PAYMENT_METHODS = [
  { id: 'QRIS', name: 'QRIS', type: 'auto', icon: <QrCode size={18} />, color: 'text-white' },
  { id: 'BCA', name: 'Bank BCA', type: 'transfer', icon: <Building2 size={18} />, color: 'text-blue-400' },
  { id: 'Mandiri', name: 'Mandiri', type: 'transfer', icon: <Building2 size={18} />, color: 'text-yellow-400' },
  { id: 'BRI', name: 'Bank BRI', type: 'transfer', icon: <Building2 size={18} />, color: 'text-blue-500' },
  { id: 'DANA', name: 'DANA', type: 'ewallet', icon: <Wallet size={18} />, color: 'text-blue-400' },
  { id: 'OVO', name: 'OVO', type: 'ewallet', icon: <Wallet size={18} />, color: 'text-purple-400' },
  { id: 'GoPay', name: 'GoPay', type: 'ewallet', icon: <Wallet size={18} />, color: 'text-green-400' },
  { id: 'ShopeePay', name: 'ShopeePay', type: 'ewallet', icon: <Wallet size={18} />, color: 'text-orange-400' },
];

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, data }) => {
  const [email, setEmail] = useState('');
  const [target, setTarget] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [step, setStep] = useState(1); // 1: Form, 2: Payment/Success
  
  useEffect(() => {
    if (isOpen && data) {
      setTarget(data.prefilledTarget || '');
      setPaymentMethod('QRIS');
      setStep(1);
    }
  }, [isOpen, data]);

  if (!isOpen || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Proceed to payment view
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor disalin ke clipboard!');
  };

  const getPaymentDetails = (method: string) => {
    switch(method) {
        case 'BCA': return { number: '8210-8899-1234', name: 'Rekurstore Official' };
        case 'Mandiri': return { number: '123-00-9876543-2', name: 'Rekurstore Official' };
        case 'BRI': return { number: '0341-01-001234-50-1', name: 'Rekurstore Official' };
        case 'DANA': 
        case 'OVO': 
        case 'GoPay': 
        case 'ShopeePay': return { number: '0812-3456-7890', name: 'Admin Rekurstore' };
        default: return { number: '', name: '' };
    }
  };

  const handleSendRealEmail = () => {
    const subject = encodeURIComponent(`Konfirmasi Pembayaran: ${data.name}`);
    const body = encodeURIComponent(`
Halo Admin Rekurstore,

Saya telah melakukan pembayaran untuk pesanan berikut:

--------------------------------
DETAIL PESANAN
--------------------------------
Produk       : ${data.name}
Harga        : ${data.price}
Kategori     : ${data.category}
Metode Bayar : ${paymentMethod}

--------------------------------
DATA PELANGGAN
--------------------------------
Email     : ${email}
ID/Nomor  : ${target}

Mohon segera diproses. Berikut saya lampirkan bukti pembayaran (screenshot).

Terima kasih.
    `);

    window.location.href = `mailto:admin@rekurstore.com?subject=${subject}&body=${body}`;
  };

  const paymentDetails = getPaymentDetails(paymentMethod);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-[#121235] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#0a0a20]">
          <div>
             <h3 className="font-bold text-lg text-white">Detail Pemesanan</h3>
             <p className="text-xs text-gray-400">Lengkapi data untuk melanjutkan</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          
          {/* Product Summary Card */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-white/10 rounded-xl p-4 mb-6 flex justify-between items-center">
             <div>
               <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{data.category}</p>
               <h4 className="font-bold text-white text-lg">{data.name}</h4>
             </div>
             <div className="text-right">
               <p className="text-blue-400 font-bold text-lg">{data.price}</p>
             </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Mail size={12} /> Email Pengiriman
                    </label>
                    <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-[#050511] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 text-sm"
                    />
                </div>

                {/* Target Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Smartphone size={12} /> 
                    {data.category === 'PPOB' ? 'Nomor / ID' : 'WhatsApp'}
                    </label>
                    <input 
                    type="text" 
                    required
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder={data.category === 'PPOB' ? "08xx / 123xx" : "08xx"}
                    className="w-full bg-[#050511] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 text-sm"
                    />
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="space-y-3 pt-2">
                 <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Pilih Metode Pembayaran</label>
                 <div className="grid grid-cols-4 gap-2">
                    {PAYMENT_METHODS.map((method) => (
                        <div 
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`border rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer transition-all aspect-square text-center gap-1 ${paymentMethod === method.id ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500' : 'bg-[#050511] border-white/10 hover:bg-white/5 hover:border-white/30'}`}
                        >
                            <div className={`${paymentMethod === method.id ? 'text-white' : method.color}`}>
                                {method.icon}
                            </div>
                            <span className={`text-[10px] font-bold leading-tight ${paymentMethod === method.id ? 'text-white' : 'text-gray-400'}`}>
                                {method.name}
                            </span>
                        </div>
                    ))}
                 </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl font-bold text-white shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                Lanjut ke Pembayaran <ChevronRight size={18} />
              </button>
            </form>
          ) : (
            <div className="text-center py-2">
               <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-slow">
                  <Banknote size={24} className="text-blue-400" />
               </div>
               <h3 className="text-xl font-bold text-white mb-1">Selesaikan Pembayaran</h3>
               <p className="text-gray-400 text-sm mb-6">
                 Metode: <span className="text-white font-bold">{paymentMethod}</span>
               </p>
               
               {/* Conditional Payment Display */}
               <div className="bg-[#050511] border border-white/10 rounded-xl p-6 mb-6 relative overflow-hidden">
                  
                  {paymentMethod === 'QRIS' ? (
                     <div className="flex flex-col items-center">
                        <div className="bg-white p-2 rounded-lg mb-3">
                            {/* Simulate QR Code */}
                            <div className="w-32 h-32 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RekurstorePayment')] bg-contain bg-no-repeat bg-center"></div>
                        </div>
                        <p className="text-xs text-gray-400">Scan menggunakan E-Wallet atau M-Banking apa saja.</p>
                     </div>
                  ) : (
                     <div className="text-left space-y-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bank / E-Wallet Tujuan</p>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-lg">{paymentMethod}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nomor Rekening / Virtual Account</p>
                            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                                <code className="font-mono text-blue-300 font-bold text-lg flex-1">{paymentDetails.number}</code>
                                <button onClick={() => handleCopy(paymentDetails.number)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white">
                                    <Copy size={16} />
                                </button>
                            </div>
                        </div>
                         <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Atas Nama</p>
                            <p className="text-white font-medium">{paymentDetails.name}</p>
                        </div>
                     </div>
                  )}
               </div>

               {/* Real Email Button */}
               <button 
                 type="button"
                 onClick={handleSendRealEmail}
                 className="mx-auto w-full relative z-10 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold transition-all transform shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95"
               >
                 <Send size={18} />
                 Konfirmasi Pembayaran (Kirim Bukti)
               </button>
               
               <p className="text-[10px] text-gray-500 mt-4 px-4 leading-tight">
                 Klik tombol di atas untuk membuka email Anda secara otomatis dengan detail pesanan yang sudah terisi. Lampirkan bukti transfer di email tersebut.
               </p>

               <div className="mt-4 pt-4 border-t border-white/10">
                 <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-white text-xs font-medium hover:underline transition-all"
                 >
                    Batal / Tutup Jendela
                 </button>
               </div>
            </div>
          )}

        </div>
        
        {/* Footer Security */}
        <div className="p-3 bg-[#0a0a20] border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-gray-500">
           <Lock size={10} />
           <span>Transaksi Anda dijamin aman & terenkripsi</span>
        </div>

      </div>
    </div>
  );
};

export default PurchaseModal;
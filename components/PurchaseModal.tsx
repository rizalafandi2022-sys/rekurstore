import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, Smartphone, ChevronRight, CheckCircle, CreditCard, Send, ExternalLink } from 'lucide-react';

interface PurchaseData {
  name: string;
  price: string;
  category: string;
  prefilledTarget?: string; // For PPOB where user already typed the number
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PurchaseData | null;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, data }) => {
  const [email, setEmail] = useState('');
  const [target, setTarget] = useState('');
  const [step, setStep] = useState(1); // 1: Form, 2: Payment/Success
  
  useEffect(() => {
    if (isOpen && data) {
      setTarget(data.prefilledTarget || '');
      setStep(1);
    }
  }, [isOpen, data]);

  if (!isOpen || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Proceed to payment view
  };

  const handleSendRealEmail = () => {
    // Construct the email body with real order details
    const subject = encodeURIComponent(`Konfirmasi Pembayaran: ${data.name}`);
    const body = encodeURIComponent(`
Halo Admin Rekurstore,

Saya telah melakukan pembayaran untuk pesanan berikut:

--------------------------------
DETAIL PESANAN
--------------------------------
Produk    : ${data.name}
Harga     : ${data.price}
Kategori  : ${data.category}

--------------------------------
DATA PELANGGAN
--------------------------------
Email     : ${email}
ID/Nomor  : ${target}

Mohon segera diproses. Berikut saya lampirkan bukti pembayaran (jika ada).

Terima kasih.
    `);

    // Open the user's default email client
    window.location.href = `mailto:admin@rekurstore.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-[#121235] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
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
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Mail size={14} /> Email Pengiriman
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-[#050511] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                />
                <p className="text-[10px] text-gray-500">Bukti pembayaran dan detail akun akan dikirim ke sini.</p>
              </div>

              {/* Target Input (Phone/ID) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Smartphone size={14} /> 
                  {data.category === 'PPOB' ? 'Nomor Tujuan / ID' : 'Nomor WhatsApp / Catatan'}
                </label>
                <input 
                  type="text" 
                  required
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder={data.category === 'PPOB' ? "08xx / 123xx" : "08xx (Untuk konfirmasi)"}
                  className="w-full bg-[#050511] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                />
              </div>

              {/* Payment Methods Visual */}
              <div className="space-y-2 pt-2">
                 <label className="text-sm font-medium text-gray-300">Metode Pembayaran</label>
                 <div className="grid grid-cols-3 gap-2">
                    <div className="border border-blue-500 bg-blue-500/10 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-500/20 transition-colors">
                       <CreditCard size={20} className="text-blue-400 mb-1" />
                       <span className="text-[10px] font-bold text-white">QRIS</span>
                    </div>
                    <div className="border border-white/10 bg-[#050511] hover:bg-white/5 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer opacity-60">
                       <span className="text-[10px] font-bold text-gray-400">E-Wallet</span>
                    </div>
                    <div className="border border-white/10 bg-[#050511] hover:bg-white/5 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer opacity-60">
                       <span className="text-[10px] font-bold text-gray-400">Transfer</span>
                    </div>
                 </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl font-bold text-white shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                Bayar Sekarang <ChevronRight size={18} />
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
               <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                  <CheckCircle size={32} className="text-green-500" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Menunggu Pembayaran</h3>
               <p className="text-gray-400 text-sm mb-6 max-w-[80%] mx-auto">
                 Silakan scan QRIS di bawah ini. Setelah membayar, klik tombol konfirmasi untuk mengirim detail ke Admin.
               </p>
               
               <div className="p-4 bg-white rounded-xl mb-8 mx-auto w-48 h-48 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                  {/* Simulate QR Code pattern */}
                  <div className="w-full h-full border-4 border-black p-1 relative">
                     <div className="absolute top-0 left-0 w-8 h-8 border-4 border-black bg-black"></div>
                     <div className="absolute top-0 right-0 w-8 h-8 border-4 border-black bg-black"></div>
                     <div className="absolute bottom-0 left-0 w-8 h-8 border-4 border-black bg-black"></div>
                     <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RekurstorePayment')] bg-contain bg-no-repeat bg-center"></div>
                  </div>
               </div>

               {/* Real Email Button */}
               <button 
                 type="button"
                 onClick={handleSendRealEmail}
                 className="mx-auto w-full max-w-xs relative z-10 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold transition-all transform shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
               >
                 <Send size={18} />
                 Konfirmasi Pembayaran via Email
               </button>
               
               <p className="text-[10px] text-gray-500 mt-4">
                 Tombol ini akan membuka aplikasi email Anda untuk mengirim detail pesanan ke Admin.
               </p>

               <div className="mt-6 border-t border-white/10 pt-4">
                 <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-white text-sm font-medium hover:underline transition-all"
                 >
                    Tutup Jendela
                 </button>
               </div>
            </div>
          )}

        </div>
        
        {/* Footer Security */}
        <div className="p-4 bg-[#0a0a20] border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500">
           <Lock size={12} />
           <span>Transaksi Terenkripsi End-to-End</span>
        </div>

      </div>
    </div>
  );
};

export default PurchaseModal;
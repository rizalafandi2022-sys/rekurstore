import React, { useState } from 'react';
import { X, Mail, Lock, Key, ArrowRight, User, ShieldCheck, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

type AuthMode = 'login' | 'register' | 'verify';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
        setError('Harap isi email terlebih dahulu');
        return;
    }
    
    setIsLoading(true);
    setError('');

    // Simulate API Call to send email
    setTimeout(() => {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(code);
        setIsLoading(false);
        setMode('verify');
        // In a real app, this is sent to email. Here we alert it for demo.
        alert(`[SIMULASI EMAIL]\nKode Verifikasi Anda: ${code}\n\nMasukkan kode ini untuk mendaftar.`);
    }, 1500);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp) {
        setIsLoading(true);
        setTimeout(() => {
            onLoginSuccess(email);
            setIsLoading(false);
            onClose();
        }, 1000);
    } else {
        setError('Kode verifikasi salah. Silakan cek ulang.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        setError('Email dan kata sandi wajib diisi');
        return;
    }
    
    setIsLoading(true);
    // Simulate Login API
    setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(email);
        onClose();
    }, 1500);
  };

  const resetState = () => {
    setMode('login');
    setError('');
    setOtp('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-[#121235] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 pb-2 text-center relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
            >
                <X size={18} />
            </button>
            
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                <ShieldCheck size={32} className="text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-1">
                {mode === 'login' && 'Selamat Datang'}
                {mode === 'register' && 'Buat Akun Baru'}
                {mode === 'verify' && 'Verifikasi Email'}
            </h2>
            <p className="text-sm text-gray-400">
                {mode === 'login' && 'Masuk untuk melanjutkan pembelian'}
                {mode === 'register' && 'Daftar untuk akses fitur premium'}
                {mode === 'verify' && `Kode telah dikirim ke ${email}`}
            </p>
        </div>

        {/* Form Body */}
        <div className="p-6 pt-4">
            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center font-medium">
                    {error}
                </div>
            )}

            {/* LOGIN FORM */}
            {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder="nama@email.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Kata Sandi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                    >
                        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Masuk Sekarang'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-400">
                            Belum punya akun?{' '}
                            <button type="button" onClick={() => { resetState(); setMode('register'); }} className="text-blue-400 hover:text-blue-300 font-bold hover:underline">
                                Daftar disini
                            </button>
                        </p>
                    </div>
                </form>
            )}

            {/* REGISTER FORM */}
            {mode === 'register' && (
                <form onSubmit={handleSendCode} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Pendaftaran</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder="nama@email.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Buat Kata Sandi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm shadow-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Kirim Kode Verifikasi <ArrowRight size={16} /></>}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-400">
                            Sudah punya akun?{' '}
                            <button type="button" onClick={() => { resetState(); setMode('login'); }} className="text-blue-400 hover:text-blue-300 font-bold hover:underline">
                                Masuk disini
                            </button>
                        </p>
                    </div>
                </form>
            )}

            {/* VERIFY FORM */}
            {mode === 'verify' && (
                <form onSubmit={handleVerify} className="space-y-4">
                     <div className="space-y-2 text-center">
                        <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Kode OTP (Cek Alert/Email)</label>
                        <div className="relative max-w-[200px] mx-auto">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input 
                                type="text" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-center text-lg tracking-[0.5em] font-mono focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                                placeholder="0000"
                                maxLength={4}
                                autoFocus
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl text-white font-bold text-sm shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Verifikasi & Masuk'}
                    </button>

                    <div className="text-center mt-4">
                        <button type="button" onClick={() => setMode('register')} className="text-xs text-gray-400 hover:text-white transition-colors">
                            Kembali / Ubah Email
                        </button>
                    </div>
                </form>
            )}

        </div>
      </div>
    </div>
  );
};

export default AuthModal;
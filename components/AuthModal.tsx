import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, Key, ArrowRight, ShieldCheck, Loader2, AlertCircle, Eye, EyeOff, Info } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

type AuthMode = 'login' | 'register' | 'verify';

interface UserData {
  email: string;
  password: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state and handle focus/keyboard when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode('login');
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setOtp('');
      setError('');

      // Add escape key listener
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      
      // Basic focus trap or initial focus could be handled here
      // For now, focusing the container for screen readers
      modalRef.current?.focus();

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getStoredUsers = (): UserData[] => {
    try {
      const users = localStorage.getItem('rekurstore_users');
      return users ? JSON.parse(users) : [];
    } catch (e) {
      console.error("Failed to parse stored users:", e);
      return [];
    }
  };

  const saveUser = (newEmail: string, pass: string) => {
    const normalizedEmail = newEmail.toLowerCase().trim();
    const users = getStoredUsers();
    if (!users.find(u => u.email === normalizedEmail)) {
      users.push({ email: normalizedEmail, password: pass });
      localStorage.setItem('rekurstore_users', JSON.stringify(users));
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || !password) {
      setError('Email dan kata sandi wajib diisi');
      return;
    }
    const users = getStoredUsers();
    if (users.find(u => u.email === normalizedEmail)) {
      setError('Email ini sudah terdaftar. Silakan login.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(code);
        setIsLoading(false);
        setMode('verify');
        alert(`[SIMULASI EMAIL REKURSTORE]\n\nTerima kasih telah mendaftar di RekurStore.\n\nKode Verifikasi Anda: ${code}\n\nKode ini diperlukan untuk memverifikasi identitas Anda dan mengaktifkan akun agar dapat digunakan untuk bertransaksi secara aman.`);
    }, 1200);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (otp === generatedOtp) {
        setIsLoading(true);
        const normalizedEmail = email.toLowerCase().trim();
        setTimeout(() => {
            saveUser(normalizedEmail, password);
            localStorage.setItem('rekurstore_session', normalizedEmail);
            onLoginSuccess(normalizedEmail);
            setIsLoading(false);
            onClose();
        }, 800);
    } else {
        setError('Kode verifikasi salah. Silakan cek ulang.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || !password) {
        setError('Email dan kata sandi wajib diisi');
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
        const users = getStoredUsers();
        const foundUser = users.find(u => u.email === normalizedEmail && u.password === password);
        if (foundUser) {
            localStorage.setItem('rekurstore_session', normalizedEmail);
            onLoginSuccess(normalizedEmail);
            setIsLoading(false);
            onClose();
        } else {
            setIsLoading(false);
            setError('Email atau kata sandi salah.');
        }
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-[#121235] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 outline-none"
      >
        
        {/* Header */}
        <div className="p-6 pb-2 text-center relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
                aria-label="Tutup modal"
            >
                <X size={18} />
            </button>
            
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20" aria-hidden="true">
                <ShieldCheck size={32} className="text-white" />
            </div>
            
            <h2 id="auth-modal-title" className="text-2xl font-bold text-white mb-1">
                {mode === 'login' && 'Selamat Datang'}
                {mode === 'register' && 'Buat Akun Baru'}
                {mode === 'verify' && 'Verifikasi Akun'}
            </h2>
            <p id="auth-modal-description" className="text-sm text-gray-400">
                {mode === 'login' && 'Masuk untuk melanjutkan pembelian'}
                {mode === 'register' && 'Daftar untuk akses fitur premium'}
                {mode === 'verify' && `Satu langkah lagi untuk aktivasi`}
            </p>
        </div>

        {/* Form Body */}
        <div className="p-6 pt-4">
            {error && (
                <div 
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center gap-2 font-medium"
                  role="alert"
                  id="auth-error-msg"
                >
                    <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
                    {error}
                </div>
            )}

            {/* LOGIN FORM */}
            {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="login-email" className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
                            <input 
                                id="login-email"
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                                placeholder="nama@email.com"
                                required
                                aria-required="true"
                                aria-invalid={error ? "true" : "false"}
                                aria-describedby={error ? "auth-error-msg" : undefined}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="login-password" className="text-xs text-gray-400 uppercase font-bold tracking-wider">Kata Sandi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
                            <input 
                                id="login-password"
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                                placeholder="••••••••"
                                required
                                aria-required="true"
                                aria-invalid={error ? "true" : "false"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                            >
                                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                            </button>
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
                            <button 
                              type="button" 
                              onClick={() => setMode('register')} 
                              className="text-blue-400 hover:text-blue-300 font-bold hover:underline"
                              aria-label="Pindah ke formulir pendaftaran"
                            >
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
                        <label htmlFor="reg-email" className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Pendaftaran</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
                            <input 
                                id="reg-email"
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                                placeholder="nama@email.com"
                                required
                                aria-required="true"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="reg-password" className="text-xs text-gray-400 uppercase font-bold tracking-wider">Buat Kata Sandi</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
                            <input 
                                id="reg-password"
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                                placeholder="••••••••"
                                minLength={6}
                                required
                                aria-required="true"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                            >
                                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm shadow-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Kirim Kode Verifikasi <ArrowRight size={16} aria-hidden="true" /></>}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-400">
                            Sudah punya akun?{' '}
                            <button 
                              type="button" 
                              onClick={() => setMode('login')} 
                              className="text-blue-400 hover:text-blue-300 font-bold hover:underline"
                              aria-label="Pindah ke formulir masuk"
                            >
                                Masuk disini
                            </button>
                        </p>
                    </div>
                </form>
            )}

            {/* VERIFY FORM */}
            {mode === 'verify' && (
                <form onSubmit={handleVerify} className="space-y-5">
                     <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-500" aria-live="polite">
                        <Info size={18} className="text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                           <p className="text-xs text-blue-100 font-bold mb-1">Cek Email/Pesan Konfirmasi</p>
                           <p className="text-[11px] text-gray-400 leading-relaxed">
                              Kami telah mengirimkan kode verifikasi 4-digit ke <span className="text-white font-medium">{email}</span>. 
                              Gunakan kode ini untuk memverifikasi identitas Anda dan mengaktifkan akun RekurStore Anda agar siap bertransaksi.
                           </p>
                        </div>
                     </div>

                     <div className="space-y-3 text-center">
                        <label htmlFor="otp-input" className="text-xs text-gray-400 uppercase font-bold tracking-wider">Masukkan Kode OTP</label>
                        <div className="relative max-w-[200px] mx-auto">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
                            <input 
                                id="otp-input"
                                type="text" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full bg-[#050511] border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white text-center text-xl tracking-[0.5em] font-mono focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-800 shadow-inner"
                                placeholder="0000"
                                maxLength={4}
                                autoFocus
                                required
                                aria-required="true"
                                aria-label="Masukkan 4 digit kode OTP"
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-green-600 hover:bg-green-500 rounded-xl text-white font-bold text-sm shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Verifikasi & Aktifkan Akun'}
                    </button>

                    <div className="text-center mt-2">
                        <button 
                          type="button" 
                          onClick={() => setMode('register')} 
                          className="text-xs text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-white/10"
                        >
                            Ganti Email / Kembali
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
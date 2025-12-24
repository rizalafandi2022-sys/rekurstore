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

// Storage Constants - ensuring single source of truth for keys
const STORAGE_KEYS = {
  USERS: 'rekurstore_users',
  SESSION: 'rekurstore_session'
};

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

  // Sync modal state and handle accessibility on open
  useEffect(() => {
    if (isOpen) {
      setMode('login');
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setOtp('');
      setError('');

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();

      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // --- Persistence Layer Helpers ---

  /**
   * Retrieves the current list of users from localStorage.
   * Returns an empty array if no users exist or if parsing fails.
   */
  const getStoredUsers = (): UserData[] => {
    try {
      const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (e) {
      console.error("Persistence Error: Failed to parse user database", e);
      return [];
    }
  };

  /**
   * Searches for a user by their normalized (lowercase) email.
   */
  const findUserByEmail = (normalizedEmail: string): UserData | undefined => {
    const users = getStoredUsers();
    return users.find(u => u.email === normalizedEmail);
  };

  /**
   * Commits a new user to the local database.
   */
  const registerNewUser = (normalizedEmail: string, pass: string) => {
    const users = getStoredUsers();
    // Safety check: ensure we don't duplicate
    if (!users.some(u => u.email === normalizedEmail)) {
      users.push({ email: normalizedEmail, password: pass });
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  };

  // --- Auth Flow Handlers ---

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || !password) {
      setError('Email dan kata sandi wajib diisi untuk mendaftar.');
      return;
    }

    if (password.length < 6) {
      setError('Kata sandi harus terdiri dari minimal 6 karakter.');
      return;
    }

    // Check if the user already exists before proceeding to OTP
    if (findUserByEmail(normalizedEmail)) {
      setError('Email ini sudah terdaftar. Silakan gunakan menu Masuk.');
      return;
    }

    setIsLoading(true);
    // Simulate network delay for verification code delivery
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setIsLoading(false);
      setMode('verify');
      
      // Verification Simulation (In a real app, this would be an email/SMS)
      alert(`[REKURSTORE VERIFIKASI]\n\nEmail: ${normalizedEmail}\nKode OTP: ${code}\n\nMasukkan kode ini di aplikasi untuk mengaktifkan akun Anda.`);
    }, 1000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp === generatedOtp) {
      setIsLoading(true);
      const normalizedEmail = email.toLowerCase().trim();
      
      setTimeout(() => {
        // commit user data to persistence
        registerNewUser(normalizedEmail, password);
        // set active session
        localStorage.setItem(STORAGE_KEYS.SESSION, normalizedEmail);
        // notify parent component
        onLoginSuccess(normalizedEmail);
        setIsLoading(false);
        onClose();
      }, 800);
    } else {
      setError('Kode OTP salah. Silakan periksa kembali pesan verifikasi Anda.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || !password) {
      setError('Silakan masukkan email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // Retrieve and validate credentials from the local database
      const user = findUserByEmail(normalizedEmail);

      if (user && user.password === password) {
        // Successful match - establish session
        localStorage.setItem(STORAGE_KEYS.SESSION, normalizedEmail);
        onLoginSuccess(normalizedEmail);
        setIsLoading(false);
        onClose();
      } else {
        setIsLoading(false);
        setError('Email atau kata sandi tidak cocok. Silakan coba lagi.');
      }
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>

      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-[#0a0a20] border border-white/10 w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 outline-none"
      >
        {/* Modal Header */}
        <div className="p-8 pb-4 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
          
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20" aria-hidden="true">
            <ShieldCheck size={32} className="text-white" />
          </div>
          
          <h2 id="auth-modal-title" className="text-2xl font-bold text-white mb-1">
            {mode === 'login' && 'Selamat Datang'}
            {mode === 'register' && 'Gabung Sekarang'}
            {mode === 'verify' && 'Verifikasi Email'}
          </h2>
          <p className="text-sm text-gray-400">
            {mode === 'login' && 'Masuk untuk mengelola langganan digital Anda'}
            {mode === 'register' && 'Daftar untuk akses layanan premium instan'}
            {mode === 'verify' && 'Kami telah mengirimkan kode aktivasi akun'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="px-8 pb-10">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-3 font-medium animate-in slide-in-from-top-2" role="alert">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          {/* LOGIN VIEW */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Email Terdaftar</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors w-4 h-4" />
                  <input 
                    id="login-email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050511] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="login-password" className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Kata Sandi</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors w-4 h-4" />
                  <input 
                    id="login-password"
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#050511] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-all p-1"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white font-bold text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Masuk ke RekurStore'}
              </button>

              <p className="text-center text-xs text-gray-500 mt-6">
                Belum punya akun?{' '}
                <button type="button" onClick={() => setMode('register')} className="text-blue-400 hover:text-blue-300 font-bold hover:underline">
                  Daftar Disini
                </button>
              </p>
            </form>
          )}

          {/* REGISTER VIEW */}
          {mode === 'register' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="reg-email" className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Email Pendaftaran</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors w-4 h-4" />
                  <input 
                    id="reg-email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050511] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="reg-password" className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">Buat Kata Sandi Baru</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors w-4 h-4" />
                  <input 
                    id="reg-password"
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#050511] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
                    placeholder="Minimal 6 karakter"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-all p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold text-sm shadow-xl hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Kirim Kode Verifikasi <ArrowRight size={16} /></>}
              </button>

              <p className="text-center text-xs text-gray-500 mt-6">
                Sudah punya akun?{' '}
                <button type="button" onClick={() => setMode('login')} className="text-blue-400 hover:text-blue-300 font-bold hover:underline">
                  Masuk Sekarang
                </button>
              </p>
            </form>
          )}

          {/* VERIFY VIEW */}
          {mode === 'verify' && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 flex gap-4 items-start animate-in fade-in slide-in-from-top-2">
                <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Kode keamanan 4-digit telah dikirimkan ke <span className="text-white font-bold">{email.toLowerCase()}</span>. 
                  Selesaikan langkah ini untuk mengaktifkan akun RekurStore Anda.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <label htmlFor="otp-input" className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Masukkan Kode Aktivasi</label>
                <div className="relative max-w-[180px] mx-auto">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                  <input 
                    id="otp-input"
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-[#050511] border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white text-center text-2xl tracking-[0.4em] font-mono focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
                    placeholder="0000"
                    maxLength={4}
                    autoFocus
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-2xl text-white font-bold text-sm shadow-xl shadow-green-900/20 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Verifikasi & Masuk Sekarang'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setMode('register')} 
                  className="w-full text-xs text-gray-500 hover:text-white transition-colors py-2"
                >
                  Salah Email? Klik Untuk Kembali
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
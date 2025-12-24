import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { getAIRecommendation } from '../services/geminiService';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(null);
    const result = await getAIRecommendation(query);
    setResponse(result);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-[#121235] border border-purple-500/30 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden animate-pulse-slow ring-1 ring-purple-400/20">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="flex items-center gap-2 text-purple-300">
            <Sparkles size={20} />
            <h3 className="font-bold text-lg">Asisten Aplikasi AI</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-300 mb-4 text-sm">
            Jelaskan jenis aplikasi yang Anda cari, dan AI bertenaga Gemini kami akan merekomendasikan pilihan premium terbaik!
          </p>

          <div className="relative mb-6">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="contoh: 'Saya butuh editor video' atau 'aplikasi VPN'"
              className="w-full bg-[#0a0a20] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all pr-12"
            />
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-500 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>

          {/* Response Area */}
          {response && (
             <div className="bg-white/5 rounded-xl p-4 border border-white/10">
               <h4 className="text-green-400 text-xs font-bold uppercase mb-2 tracking-wider">Rekomendasi</h4>
               <p className="text-white text-sm leading-relaxed">
                 {response}
               </p>
             </div>
          )}

          {!response && !loading && (
             <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Coba tanyakan:</span>
                <button onClick={() => setQuery("Editor Foto Terbaik")} className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-1 rounded-md border border-white/5 transition-colors">Editor Foto Terbaik</button>
                <button onClick={() => setQuery("Aplikasi Produktivitas")} className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-1 rounded-md border border-white/5 transition-colors">Aplikasi Produktivitas</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModal;
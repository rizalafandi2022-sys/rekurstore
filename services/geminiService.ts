import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Mock database of apps for the AI to recommend from
const APP_DATABASE = `
1. Musicify Pro (App) - Streaming audio dan editing profesional.
2. Secure VPN (App) - Utilitas perlindungan privasi.
3. Task Master (App) - Perencana produktivitas.
4. Fitness Coach (App) - Pelacak latihan.
5. Pixel Edit Pro (App) - Editor foto AI.
6. WeatherMax (App) - Prakiraan cuaca hiperlokal.
7. FinanceFlow (App) - Pelacak keuangan pribadi dan kripto.
8. LingoLearn (App) - Suite pembelajaran bahasa.
`;

export const getAIRecommendation = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    return "API Key hilang. Silakan periksa konfigurasi Anda.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Anda adalah asisten AI yang membantu untuk Rekurstore, toko aplikasi premium dan PPOB.
        Pertanyaan Pengguna: "${userQuery}"
        
        Aplikasi Tersedia di Database:
        ${APP_DATABASE}
        
        Tugas: Rekomendasikan 1-2 aplikasi dari database yang paling cocok dengan pertanyaan pengguna. 
        Jika tidak ada yang cocok sempurna, rekomendasikan aplikasi produktivitas atau utilitas.
        Jaga agar respons tetap singkat, antusias, dan fokus pada aspek "Premium".
        Gunakan Bahasa Indonesia.
        Jangan gunakan format markdown seperti cetak tebal atau daftar, hanya teks biasa.
      `,
    });

    return response.text || "Saya tidak dapat menemukan kecocokan yang sempurna, tetapi coba jelajahi Tangga Lagu Teratas kami!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, saya mengalami masalah saat terhubung ke otak AI saat ini.";
  }
};
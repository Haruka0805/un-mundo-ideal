/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  Globe, 
  Github, 
  Twitter, 
  Linkedin,
  Loader2,
  Play
} from 'lucide-react';
import { CONTENT, Language } from './constants';
import { generateSpeech, playBase64Audio } from './geminiService';

export default function App() {
  const [lang, setLang] = useState<Language>('ja');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const t = CONTENT[lang];

  const handleToggleLang = useCallback(() => {
    setLang(prev => prev === 'ja' ? 'en' : 'ja');
  }, []);

  const handlePlayVoice = useCallback(async () => {
    if (isPlaying || isGenerating) return;

    try {
      setIsGenerating(true);
      const audioData = await generateSpeech(t.bio, lang);
      
      if (audioData) {
        setIsGenerating(false);
        setIsPlaying(true);
        await playBase64Audio(audioData);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Failed to play voice:", error);
      setIsGenerating(false);
      setIsPlaying(false);
    }
  }, [lang, t.bio, isPlaying, isGenerating]);

  // Initials for the logo
  const initials = t.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#1A1A1A] font-sans selection:bg-[#FFE66D] selection:text-[#1A1A1A] p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF6B6B] border-2 border-black rounded-full flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#1A1A1A]">
              {initials}
            </div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase">
              HELLO. / {lang === 'ja' ? 'こんにちは。' : 'Hi.'}
            </span>
          </div>
          <div className="flex border-4 border-black rounded-full overflow-hidden shadow-[4px_4px_0px_#1A1A1A]">
            <button 
              onClick={() => setLang('ja')}
              className={`px-4 md:px-6 py-2 font-bold transition-colors ${lang === 'ja' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              JP
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-4 md:px-6 py-2 font-bold transition-colors ${lang === 'en' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              EN
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          {/* Left Column: Identity & Voice */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="vibrant-card flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden text-center"
            >
              {/* Profile Avatar Placeholder */}
              <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden bg-gray-100 mb-6 shadow-[4px_4px_0px_#1A1A1A]">
                <div className="w-full h-full bg-[#FFE66D] flex items-center justify-center">
                  <span className="text-5xl font-black">{initials}</span>
                </div>
              </div>

              <motion.h1 
                key={`name-${lang}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl font-black mb-1 uppercase tracking-tight"
              >
                {t.name}
              </motion.h1>
              <motion.p 
                key={`role-${lang}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-gray-500 mb-8 lowercase italic"
              >
                {t.role}
              </motion.p>

              {/* Voice Interaction Card */}
              <div className="w-full flex flex-col gap-4 bg-gray-50 border-4 border-black rounded-3xl p-6 shadow-[4px_4px_0px_#1A1A1A]">
                <div className="flex items-center gap-2 mb-1 justify-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Voice Intro / ボイス紹介</span>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handlePlayVoice}
                    disabled={isGenerating || isPlaying}
                    className={`w-14 h-14 bg-[#4ECDC4] rounded-full border-2 border-black flex items-center justify-center transition-all shadow-[4px_4px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1A1A1A] disabled:opacity-50 disabled:grayscale`}
                  >
                    {isGenerating ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Play className={`w-6 h-6 transition-transform ${isPlaying ? 'scale-125' : ''}`} fill="currentColor" />
                    )}
                  </button>
                  <div className="flex-1 flex items-end gap-[2px] h-10 px-2 overflow-hidden">
                    {[0.6, 1.0, 0.7, 0.9, 0.4, 0.8, 1.0, 0.5, 0.7, 0.9, 0.3, 0.8, 1.0, 0.5, 0.6, 0.9, 0.7].map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={isPlaying ? { height: [h * 40, (1 - h) * 40, h * 40] } : { height: h * 40 }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.05 }}
                        className="w-1.5 bg-[#FF6B6B] border border-black rounded-full"
                      />
                    ))}
                  </div>
                  <span className="font-mono font-black text-xs text-gray-500">
                    {lang === 'ja' ? '再生' : 'PLAY'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio, Skills, etc. */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Bio Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="vibrant-card p-8 bg-[#4ECDC4] bg-opacity-10 border-[#1A1A1A]"
            >
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#FF6B6B] border-2 border-black block"></span>
                Bio / 自己紹介
              </h3>
              <motion.p 
                key={`bio-${lang}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg md:text-xl leading-relaxed font-bold text-gray-700"
              >
                {t.bio}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              {/* Skills Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="vibrant-card p-8 bg-[#FFE66D]"
              >
                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-black block"></span>
                  Skills / スキル
                </h3>
                <div className="flex flex-wrap gap-2">
                  {t.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="pill bg-white px-4 py-2 text-sm font-black uppercase tracking-tight"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Status/Contact Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="vibrant-card p-8 bg-[#FF6B6B] bg-opacity-10"
              >
                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3 text-gray-800">
                  <span className="w-2 h-8 bg-[#4ECDC4] border-2 border-black block"></span>
                  Contact / 連絡
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B6B]">Location</span>
                    <span className="font-bold text-lg">{t.location}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B6B]">Email</span>
                    <span className="font-bold text-lg underline break-all">{t.email}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Links Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vibrant-card p-6 bg-black text-white flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex gap-6">
                <button className="font-bold italic uppercase underline-offset-4 underline hover:text-[#4ECDC4] transition-colors flex items-center gap-2">
                  <Github className="w-4 h-4" /> Portfolio
                </button>
                <button className="font-bold italic uppercase underline-offset-4 underline hover:text-[#4ECDC4] transition-colors flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> Social
                </button>
                <button className="font-bold italic uppercase underline-offset-4 underline hover:text-[#4ECDC4] transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> Professional
                </button>
              </div>
              <div className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-[0.3em]">
                Last Update: 2026.04.22
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

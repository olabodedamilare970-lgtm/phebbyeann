import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseToast() {
  const [showToast, setShowToast] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#ffffff'],
        scalar: 1.1,
        ticks: 250,
      });
    } catch (_) {}
  };

  useEffect(() => {
    // Trigger at 10 seconds into unlocking the vault
    const timer = setTimeout(() => {
      setShowToast(true);
      triggerConfetti();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!showToast) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Special reminder"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
    >
      {/* Big, Clear, High-Contrast Popup Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#140306]/95 border-2 border-rose-500/80 p-7 sm:p-9 text-center shadow-[0_0_60px_rgba(244,63,94,0.6)] transform transition-all duration-500 scale-100 overflow-hidden">
        
        {/* Ambient interior glow */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-rose-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />

        {/* Top-Right Close Button */}
        <button
          onClick={() => setShowToast(false)}
          aria-label="Close message"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-rose-950/80 active:scale-95 border border-white/20 text-rose-200 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Pulsing Heart Centerpiece */}
        <div className="relative mx-auto mb-5 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 p-[3px] shadow-[0_0_35px_rgba(244,63,94,0.8)]">
          <div className="w-full h-full rounded-full bg-[#1b050a] flex items-center justify-center relative overflow-hidden">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400 fill-rose-500 animate-pulse drop-shadow-[0_0_12px_rgba(244,63,94,1)]" />
            <Sparkles className="w-4 h-4 text-amber-300 absolute top-3 right-4 animate-spin" />
          </div>
        </div>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold tracking-widest uppercase mb-3 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>A Quick Reminder</span>
        </div>

        {/* Big, Clear, Romantic Note Text */}
        <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white italic leading-relaxed mb-6 drop-shadow-sm px-2">
          "Just wanted to remind you... you are my favorite person in the entire world. ❤️"
        </h3>

        {/* Big Action / Dismiss Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              triggerConfetti();
              setTimeout(() => setShowToast(false), 500);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white font-semibold text-sm tracking-wide uppercase shadow-[0_0_30px_rgba(225,29,72,0.7)] active:scale-95 transition-all cursor-pointer select-none"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>I Love You Too ❤️</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Heart, Sparkles, X, RotateCcw, PartyPopper, Mail, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SECRET_LETTER } from '../data';

export default function InteractiveLetter({ onRestart }) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerConfetti = () => {
    // Elegant fireworks / confetti burst with rose, gold, and ruby colors
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#ffffff']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleCelebrate = () => {
    triggerConfetti();
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 text-center">
      {/* Interactive Trigger Section */}
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 overflow-hidden border border-rose-500/30 flex flex-col items-center">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-red-950/30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/50 border border-rose-500/20 text-rose-300 text-xs tracking-widest uppercase mb-4">
          <Feather className="w-3.5 h-3.5 text-rose-400" />
          <span>A Sealed Letter</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-rose-100 mb-2">
          A Letter, Just For You
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/70 max-w-md mx-auto mb-8 font-light">
          A secret note written from the depths of my thoughts. Tap the glowing heart to break the wax seal.
        </p>

        {/* Glowing Clickable Heart Icon */}
        <button
          onClick={() => {
            setIsOpen(true);
            triggerConfetti();
          }}
          className="relative group cursor-pointer focus:outline-none transition-transform duration-300 active:scale-95"
          aria-label="Open secret letter"
        >
          {/* Pulsing Aura Rings */}
          <div className="absolute -inset-4 rounded-full bg-rose-600/30 blur-lg group-hover:bg-rose-500/50 transition-all duration-500 animate-pulse" />
          <div className="absolute -inset-8 rounded-full border border-rose-500/20 group-hover:border-rose-400/50 animate-ping opacity-30" />

          {/* Heart Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-500 p-[3px] shadow-[0_0_40px_rgba(244,63,94,0.7)] group-hover:shadow-[0_0_60px_rgba(244,63,94,0.9)] transition-all">
            <div className="w-full h-full rounded-full bg-[#1e050a] flex items-center justify-center relative overflow-hidden group-hover:scale-95 transition-transform duration-300">
              <Heart className="w-12 h-12 text-rose-400 fill-rose-500/80 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(244,63,94,0.9)]" />
              <Sparkles className="w-4 h-4 text-amber-300 absolute top-4 right-5 animate-pulse" />
            </div>
          </div>

          <span className="block mt-4 text-xs font-semibold tracking-widest uppercase text-rose-300 group-hover:text-rose-100 transition-colors">
            Tap to open
          </span>
        </button>
      </div>
      {/* Unfolding Envelope / Letter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto my-auto glass-panel-elevated rounded-3xl p-5 sm:p-10 border border-rose-500/40 shadow-[0_0_60px_rgba(225,29,72,0.4)] text-left transform transition-all duration-500 scale-100">
            
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-rose-950/60 border border-white/10 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="flex items-center gap-3 border-b border-rose-900/50 pb-5 mb-6">
              <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-rose-400 font-semibold">
                  Personal & Confidential
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-rose-100 italic">
                  {SECRET_LETTER.recipient}
                </h3>
              </div>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-rose-100/90 font-light leading-relaxed font-playfair text-sm sm:text-base border-l-2 border-rose-500/30 pl-4 py-1">
              {SECRET_LETTER.body.map((paragraph, index) => (
                <p key={index} className="tracking-wide">
                  {paragraph}
                </p>
              ))}
              
              <div className="pt-4 font-normal text-rose-300 text-right">
                <p className="italic text-base sm:text-lg">{SECRET_LETTER.signoff}</p>
              </div>
            </div>

            {/* Action Buttons: Celebrate & Restart */}
            <div className="mt-8 pt-6 border-t border-rose-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleCelebrate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] transition-all cursor-pointer"
              >
                <PartyPopper className="w-4 h-4 text-amber-300" />
                <span>Celebrate</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-rose-200 text-xs tracking-wider uppercase transition-colors text-center cursor-pointer"
                >
                  Close
                </button>
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onRestart();
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/20 text-rose-300 hover:text-rose-100 text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Lock Vault</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

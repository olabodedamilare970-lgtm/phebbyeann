import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseToast() {
  const [showToast, setShowToast] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Trigger at 30 seconds into unlocking the vault
    const timer = setTimeout(() => {
      setShowToast(true);
      setHasTriggered(true);

      // Gentle romantic heart & rose confetti burst
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.25 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#fcd34d', '#ffffff'],
          scalar: 0.9,
          ticks: 200,
        });
      } catch (_) {}

      // Auto-dismiss after 9 seconds if not closed manually
      const dismissTimer = setTimeout(() => {
        setShowToast(false);
      }, 9000);

      return () => clearTimeout(dismissTimer);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (!showToast) return null;

  return (
    <div
      className="fixed z-50 left-4 right-4 sm:left-auto sm:right-6 max-w-sm mx-auto transition-all duration-700 ease-out animate-bounce-in"
      style={{
        top: 'calc(env(safe-area-inset-top, 0px) + 4.25rem)',
      }}
    >
      <div className="relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/90 backdrop-blur-2xl border border-rose-500/40 shadow-[0_0_35px_rgba(225,29,72,0.45)] ring-1 ring-rose-500/20">
        {/* Glowing Heart Icon */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-700 to-pink-500 p-[1.5px] flex-shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.6)]">
          <div className="w-full h-full rounded-[10px] bg-[#1a0408] flex items-center justify-center">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-500/80 animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <div className="flex-1 pr-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-semibold tracking-wider text-rose-400 uppercase">
              A little reminder
            </span>
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
          </div>
          <p className="text-xs text-rose-100/90 font-playfair italic leading-snug">
            "Just wanted to remind you... you're my favorite person in the entire world. ❤️"
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setShowToast(false)}
          aria-label="Close notification"
          className="p-1 rounded-full text-rose-400/60 hover:text-rose-200 active:scale-90 transition-all cursor-pointer flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

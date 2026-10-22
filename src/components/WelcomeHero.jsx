import React from 'react';
import { ArrowDown, Sparkles, Heart, ShieldCheck, Compass } from 'lucide-react';

export default function WelcomeHero({ onStartJourney, onLock }) {
  const scrollToContent = () => {
    const el = document.getElementById('milestone');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] min-h-[90dvh] flex flex-col items-center justify-center text-center px-5 overflow-hidden pt-16 pb-16">
      {/* Glowing Ambient Background Ring Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[650px] h-[340px] sm:h-[500px] md:h-[650px] rounded-full border border-rose-500/20 shadow-[0_0_80px_rgba(225,29,72,0.25)] pointer-events-none animate-ambient-spin" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[400px] md:w-[500px] h-[260px] sm:h-[400px] md:h-[500px] rounded-full border border-dashed border-rose-500/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[280px] md:w-[350px] h-[180px] sm:h-[280px] md:h-[350px] rounded-full bg-gradient-to-tr from-rose-950/40 via-red-900/20 to-transparent blur-2xl pointer-events-none" />



      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(244,63,94,0.15)] animate-float-soft">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Private Archive • Unlocked</span>
        </div>

        {/* Personalized Greeting Heading */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-rose-100 via-rose-200 to-rose-400/80 leading-tight mb-5 drop-shadow-sm">
          For Our Special Memories
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-rose-200/85 max-w-lg mx-auto font-light leading-relaxed mb-8">
          A little corner for all our favorite photos, quiet moments, and memories together.
        </p>

        {/* Start Journey Button with Glowing Border and Pulse Animation */}
        <button
          onClick={() => {
            if (onStartJourney) onStartJourney();
            scrollToContent();
          }}
          className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white font-medium text-sm tracking-widest uppercase shadow-[0_0_35px_rgba(225,29,72,0.5)] active:shadow-[0_0_55px_rgba(244,63,94,0.8)] border border-rose-400/50 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse-glow select-none"
        >
          <Compass className="w-5 h-5 text-rose-200 group-hover:rotate-45 transition-transform duration-300" />
          <span>Start Journey</span>
          <ArrowDown className="w-4 h-4 text-rose-200 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Floating prompt indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest text-rose-300/80">Scroll to explore</span>
        <ArrowDown className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
      </div>
    </section>
  );
}

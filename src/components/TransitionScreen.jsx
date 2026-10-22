import React from 'react';
import { Heart, Sparkles, LockKeyholeOpen } from 'lucide-react';

export default function TransitionScreen({ onFinished }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFinished();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[#0d0202] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-rose-600/20 blur-[150px] animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

      <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
        {/* Pulsing avatar / romantic icon */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 p-[2px] shadow-[0_0_50px_rgba(244,63,94,0.6)] animate-pulse">
            <div className="w-full h-full rounded-full bg-[#180408] flex items-center justify-center overflow-hidden relative">
              <Heart className="w-12 h-12 text-rose-500 fill-rose-500/80 animate-bounce drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]" />
              <Sparkles className="w-5 h-5 text-amber-300 absolute top-4 right-4 animate-spin" />
            </div>
          </div>
          
          <div className="absolute -bottom-2 -right-2 bg-rose-950 border border-rose-500/40 rounded-full p-2 shadow-lg">
            <LockKeyholeOpen className="w-4 h-4 text-rose-300" />
          </div>
        </div>

        <h2 className="font-cinzel text-xl md:text-2xl font-bold tracking-widest text-rose-100 uppercase mb-3">
          Vault Unlocked
        </h2>
        
        <p className="text-sm text-rose-300/80 font-light tracking-wider animate-pulse mb-6">
          Loading something special...
        </p>

        {/* Elegant loading bar */}
        <div className="w-48 h-1.5 bg-rose-950/60 rounded-full overflow-hidden border border-rose-500/30">
          <div className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full animate-[shimmer_2s_infinite] w-full" />
        </div>
      </div>
    </div>
  );
}

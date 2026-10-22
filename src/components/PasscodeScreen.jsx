import React, { useState } from 'react';
import { Lock, KeyRound, Sparkles, AlertCircle } from 'lucide-react';

export default function PasscodeScreen({ onUnlock, correctPin = "2024" }) {
  const [pin, setPin] = useState("");
  const [errorShake, setErrorShake] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  const handleKeyPress = (digit) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        if (nextPin === correctPin) {
          setTimeout(() => onUnlock(), 300);
        } else {
          setErrorShake(true);
          setTimeout(() => {
            setPin("");
            setErrorShake(false);
          }, 700);
        }
      }
    }
  };

  const handleDelete = () => setPin(prev => prev.slice(0, -1));
  const handleClear  = () => setPin("");

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) handleKeyPress(e.key);
      else if (e.key === 'Backspace') handleDelete();
      else if (e.key === 'Escape')    handleClear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div className="relative min-h-screen min-h-dvh flex items-center justify-center p-4 overflow-hidden bg-[#0d0202]">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose-950/30 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 -right-20 w-[280px] h-[280px] rounded-full bg-red-900/20 blur-[90px] pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-[280px] h-[280px] rounded-full bg-amber-950/20 blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Card — full-width on small screens */}
      <div
        className={`relative z-10 w-full max-w-[360px] glass-panel-elevated rounded-3xl px-6 py-8 flex flex-col items-center transition-transform duration-300 ${
          errorShake ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-950/80 to-rose-900/40 border border-rose-500/30 flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(244,63,94,0.3)] animate-float-soft">
          <KeyRound className="w-7 h-7 text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
        </div>

        <h1 className="font-cinzel text-xl font-bold tracking-widest text-center text-rose-100 uppercase mb-1">
          Locked Vault
        </h1>
        <p className="text-xs text-rose-300/70 tracking-wider text-center mb-6 font-light">
          Enter code to unlock memories
        </p>

        {/* PIN dots */}
        <div className="flex items-center justify-center gap-5 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                pin.length > i
                  ? 'bg-rose-400 scale-125 shadow-[0_0_15px_rgba(251,113,133,0.9)] ring-2 ring-rose-500/50'
                  : 'bg-white/10 border border-white/20'
              }`}
            />
          ))}
        </div>

        {/* Error */}
        <div className="h-5 mb-3 text-center">
          {errorShake && (
            <span className="text-xs font-medium text-rose-400 tracking-wide inline-flex items-center gap-1.5 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" /> Incorrect code. Try again
            </span>
          )}
        </div>

        {/* Keypad — large touch targets for mobile */}
        <div className="grid grid-cols-3 gap-3 w-full mb-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onPointerDown={() => handleKeyPress(num.toString())}
              className="h-16 rounded-2xl bg-white/5 active:bg-rose-950/50 active:scale-95 border border-white/10 active:border-rose-500/40 transition-all duration-150 flex items-center justify-center text-rose-100 text-2xl font-medium select-none shadow-sm cursor-pointer"
              style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
            >
              {num}
            </button>
          ))}

          {/* Clear */}
          <button
            onPointerDown={handleClear}
            className="h-16 rounded-2xl bg-white/[0.02] active:bg-white/10 active:scale-95 border border-transparent transition-all duration-150 flex items-center justify-center text-rose-300/60 text-xs tracking-wider font-medium select-none cursor-pointer"
          >
            CLEAR
          </button>

          {/* 0 */}
          <button
            onPointerDown={() => handleKeyPress("0")}
            className="h-16 rounded-2xl bg-white/5 active:bg-rose-950/50 active:scale-95 border border-white/10 active:border-rose-500/40 transition-all duration-150 flex items-center justify-center text-rose-100 text-2xl font-medium select-none shadow-sm cursor-pointer"
          >
            0
          </button>

          {/* Delete */}
          <button
            onPointerDown={handleDelete}
            className="h-16 rounded-2xl bg-white/[0.02] active:bg-white/10 active:scale-95 border border-transparent transition-all duration-150 flex items-center justify-center text-rose-300/60 text-xs tracking-wider font-medium select-none cursor-pointer"
          >
            ⌫
          </button>
        </div>

        {/* Hint */}
        <div className="w-full text-center">
          <button
            onClick={() => setHintOpen(!hintOpen)}
            className="text-[11px] text-rose-400/60 active:text-rose-300 underline underline-offset-4 tracking-wider transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            {hintOpen ? "Hide clue" : "Need a clue?"}
          </button>

          {hintOpen && (
            <div className="mt-2 text-xs text-rose-200/90 bg-rose-950/50 border border-rose-500/20 rounded-xl p-2.5 tracking-wide">
              Default access PIN is{' '}
              <strong className="text-rose-300 font-mono tracking-widest px-1.5 py-0.5 rounded bg-black/40 border border-rose-500/30">
                2024
              </strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import PasscodeScreen from './components/PasscodeScreen';
import TransitionScreen from './components/TransitionScreen';
import WelcomeHero from './components/WelcomeHero';
import TimeCounter from './components/TimeCounter';
import MemoriesGallery from './components/MemoriesGallery';
import InteractiveLetter from './components/InteractiveLetter';
import MusicPlayer from './components/MusicPlayer';
import SurpriseToast from './components/SurpriseToast';
import { Heart, Lock, Sparkles, ArrowLeft } from 'lucide-react';

export default function App() {
  // App views: 'locked' | 'transition' | 'vault'
  const [viewState, setViewState] = useState('locked');

  const handleUnlock = () => {
    setViewState('transition');
  };

  const handleTransitionComplete = () => {
    setViewState('vault');
  };

  const handleLockVault = () => {
    setViewState('locked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen min-h-dvh bg-[#0d0202] text-rose-100 selection:bg-rose-600 selection:text-white overflow-x-hidden w-full max-w-full">
      {viewState === 'locked' && (
        <PasscodeScreen onUnlock={handleUnlock} correctPin="2024" />
      )}

      {viewState === 'transition' && (
        <TransitionScreen onFinished={handleTransitionComplete} />
      )}

      {viewState === 'vault' && (
        <main className="relative min-h-screen overflow-x-hidden w-full max-w-full pt-16 sm:pt-20">
          {/* Global Ambient Background Effects - strictly contained */}
          <div className="fixed top-0 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-rose-950/25 blur-[140px] pointer-events-none -z-10" />
          <div className="fixed bottom-0 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-red-950/20 blur-[130px] pointer-events-none -z-10" />
          <div className="fixed inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none -z-10" />

          {/* Persistent Top Navigation Bar with Back/Lock Button (iPhone Notch & Dynamic Island Safe) */}
          <header
            className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-rose-900/40"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.4rem)',
              paddingLeft: 'max(env(safe-area-inset-left, 0px), 1rem)',
              paddingRight: 'max(env(safe-area-inset-right, 0px), 1rem)',
            }}
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between py-2">
              {/* Back / Lock Button */}
              <button
                onClick={handleLockVault}
                aria-label="Back to lock screen"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/70 hover:bg-rose-900/80 active:scale-95 border border-rose-500/30 text-rose-200 hover:text-white transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-xs font-medium tracking-wide">Back</span>
              </button>

              {/* Title & Badge */}
              <div className="flex items-center gap-2 select-none">
                <div className="w-6 h-6 rounded-full bg-rose-950 border border-rose-500/30 flex items-center justify-center">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400/80" />
                </div>
                <span className="font-cinzel text-xs font-bold tracking-widest text-rose-100 uppercase">
                  Memory Vault
                </span>
              </div>

              {/* Quick Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] text-emerald-300 font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Unlocked</span>
              </div>
            </div>
          </header>

          {/* 1. Welcome / Landing Section */}
          <WelcomeHero onStartJourney={() => {}} onLock={handleLockVault} />

          {/* 2. Time Elapsed Counter */}
          <div id="milestone">
            <TimeCounter startDate="2023-10-14T00:00:00" />
          </div>

          {/* 3. Special Memories Gallery */}
          <MemoriesGallery />

          {/* 4. Interactive Letter Section & Modal */}
          <InteractiveLetter onRestart={handleLockVault} />

          {/* 5. Background Music Player (auto-starts on memories scroll/touch) */}
          <MusicPlayer />

          {/* 6. 30-Second Sweet Surprise Reminder Toast */}
          <SurpriseToast />

          {/* Footer */}
          <footer
            className="w-full border-t border-rose-950/50 py-8 px-4 text-center mt-12 bg-black/40 backdrop-blur-md"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)' }}
          >
            <div className="flex items-center justify-center gap-2 text-xs text-rose-300/70 font-light mb-2">
              <span>Made with endless care & love</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </div>
            <p className="text-[11px] text-rose-400/40 tracking-wider">
              Memory Vault • Encrypted in our hearts • 2024 & Beyond
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import PasscodeScreen from './components/PasscodeScreen';
import TransitionScreen from './components/TransitionScreen';
import WelcomeHero from './components/WelcomeHero';
import TimeCounter from './components/TimeCounter';
import MemoriesGallery from './components/MemoriesGallery';
import InteractiveLetter from './components/InteractiveLetter';
import MusicPlayer from './components/MusicPlayer';
import { Heart } from 'lucide-react';

export default function App() {
  // App views: 'locked' | 'transition' | 'vault'
  const [viewState, setViewState] = useState('locked');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Soft ambient audio using Web Audio API synthesis so no external mp3 download needed
  const toggleAudio = () => {
    setIsAudioPlaying(prev => !prev);
  };

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
    <div className="min-h-screen bg-[#0d0202] text-rose-100 selection:bg-rose-600 selection:text-white">
      {viewState === 'locked' && (
        <PasscodeScreen onUnlock={handleUnlock} correctPin="2024" />
      )}

      {viewState === 'transition' && (
        <TransitionScreen onFinished={handleTransitionComplete} />
      )}

      {viewState === 'vault' && (
        <main className="relative min-h-screen overflow-hidden">
          {/* Global Ambient Background Effects */}
          <div className="fixed top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-rose-950/25 blur-[160px] pointer-events-none -z-10" />
          <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-red-950/20 blur-[150px] pointer-events-none -z-10" />
          <div className="fixed inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none -z-10" />

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

          {/* 5. Background Music Player (auto-starts on memories scroll) */}
          <MusicPlayer />

          {/* Footer */}
          <footer className="w-full border-t border-rose-950/50 py-8 px-4 text-center mt-12 bg-black/40 backdrop-blur-md">
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

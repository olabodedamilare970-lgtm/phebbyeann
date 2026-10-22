import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Function to safely trigger play
  const startAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Browser prevented autoplay without fresh gesture; will resume on next touch/click/scroll
    });
  }, []);

  useEffect(() => {
    // Show pill after brief mount delay
    const timer = setTimeout(() => setIsVisible(true), 800);

    // Try starting immediately on mount (since user just clicked the unlock / transition screen)
    startAudio();

    // Auto-trigger on ANY first interaction (scroll, touch, click, keydown) so user never has to press play
    const autoPlayOnInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        startAudio();
      }
    };

    window.addEventListener('touchstart', autoPlayOnInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', autoPlayOnInteraction, { passive: true, once: true });
    window.addEventListener('scroll', autoPlayOnInteraction, { passive: true, once: true });
    window.addEventListener('click', autoPlayOnInteraction, { passive: true, once: true });

    // Also trigger when memories section scrolls into view
    const memoriesEl = document.getElementById('memories');
    let observer;
    if (memoriesEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            autoPlayOnInteraction();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(memoriesEl);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('touchstart', autoPlayOnInteraction);
      window.removeEventListener('pointerdown', autoPlayOnInteraction);
      window.removeEventListener('scroll', autoPlayOnInteraction);
      window.removeEventListener('click', autoPlayOnInteraction);
      if (observer && memoriesEl) observer.unobserve(memoriesEl);
    };
  }, [startAudio]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      {/* Native HTML5 Audio with CKay ft. Joeboy - Love Nwantiti */}
      <audio
        ref={audioRef}
        src="/love_nwantiti.mp3"
        preload="auto"
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
          }
        }}
      />

      {/* Floating Music Pill (Android/iPhone mobile friendly with safe-area spacing) */}
      <aside
        aria-label="Background music controls"
        className={`fixed z-50 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
          right: '1rem',
        }}
      >
        <div className="flex items-center gap-2.5 pl-3.5 pr-2 py-2 rounded-full bg-black/85 backdrop-blur-2xl border border-rose-500/40 shadow-[0_0_28px_rgba(225,29,72,0.45)] hover:shadow-[0_0_40px_rgba(225,29,72,0.65)] transition-all">
          
          {/* Animated Equalizer or Music icon */}
          <div className="flex items-end gap-[2px] h-3.5 w-4 flex-shrink-0" aria-hidden="true">
            {isPlaying && !isMuted ? (
              <>
                <span className="music-bar" style={{ animationDelay: '0s', background: '#fb7185' }} />
                <span className="music-bar" style={{ animationDelay: '0.2s', background: '#f43f5e' }} />
                <span className="music-bar" style={{ animationDelay: '0.1s', background: '#fda4af' }} />
                <span className="music-bar" style={{ animationDelay: '0.3s', background: '#fb7185' }} />
              </>
            ) : (
              <Music2 className="w-3.5 h-3.5 text-rose-400" />
            )}
          </div>

          {/* Song info */}
          <div className="flex flex-col leading-tight max-w-[125px] sm:max-w-[150px]">
            <span className="text-[10px] font-semibold text-rose-100 truncate tracking-wide">
              {isPlaying ? 'Love Nwantiti' : 'Music Paused'}
            </span>
            <span className="text-[8.5px] text-rose-400/80 truncate">
              CKay ft. Joeboy
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="p-1.5 rounded-full hover:bg-rose-500/20 active:scale-90 text-rose-200 hover:text-white transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="p-1.5 rounded-full hover:bg-rose-500/20 active:scale-90 text-rose-200 hover:text-white transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </aside>
    </>
  );
}

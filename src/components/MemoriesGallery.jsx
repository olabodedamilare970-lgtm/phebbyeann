import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { USER_PICTURES } from '../data';

export default function MemoriesGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const count = USER_PICTURES.length;

  const handleNext = useCallback(() => setActiveIndex(prev => (prev + 1) % count), [count]);
  const handlePrev = useCallback(() => setActiveIndex(prev => (prev - 1 + count) % count), [count]);

  // Touch swipe for carousel
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    // Only swipe if horizontal movement dominates
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > deltaY) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') setSelectedImage(null);
        if (e.key === 'ArrowRight') {
          const cur = USER_PICTURES.findIndex(p => p.image === selectedImage);
          if (cur !== -1) setSelectedImage(USER_PICTURES[(cur + 1) % count].image);
        }
        if (e.key === 'ArrowLeft') {
          const cur = USER_PICTURES.findIndex(p => p.image === selectedImage);
          if (cur !== -1) setSelectedImage(USER_PICTURES[(cur - 1 + count) % count].image);
        }
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft')  handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [count, selectedImage, handleNext, handlePrev]);

  return (
    <section id="memories" className="w-full max-w-6xl mx-auto px-4 py-10">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-rose-100">
          Special Memories
        </h2>
      </div>

      {/* Carousel */}
      <div
        className="relative py-4 min-h-[360px] sm:min-h-[460px] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Nav arrows — hidden on very small screens, shown sm+ */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute left-0 sm:left-4 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 active:bg-rose-950/80 border border-rose-500/30 text-rose-200 backdrop-blur-md transition-all active:scale-95 shadow-lg cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-0 sm:right-4 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 active:bg-rose-950/80 border border-rose-500/30 text-rose-200 backdrop-blur-md transition-all active:scale-95 shadow-lg cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Cards track */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] flex items-center justify-center">
          {USER_PICTURES.map((item, index) => {
            let offset = (index - activeIndex) % count;
            if (offset > count / 2)  offset -= count;
            if (offset < -count / 2) offset += count;

            const isCurrent = offset === 0;
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

            // Responsive translate — smaller on mobile
            const translateX = offset * 200;
            const scale   = isCurrent ? 1 : 0.8 - Math.abs(offset) * 0.06;
            const opacity = isCurrent ? 1 : 0.4 - Math.abs(offset) * 0.15;
            const zIndex  = 20 - Math.abs(offset) * 5;
            const rotateY = offset * -12;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isCurrent) setSelectedImage(item.image);
                  else setActiveIndex(index);
                }}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale}) perspective(900px) rotateY(${rotateY}deg)`,
                  zIndex,
                  opacity,
                  willChange: 'transform, opacity',
                }}
                className={`absolute w-[220px] sm:w-[290px] md:w-[320px] h-[300px] sm:h-[400px] md:h-[450px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out select-none border ${
                  isCurrent
                    ? 'border-rose-400/60 shadow-[0_20px_50px_rgba(225,29,72,0.45)] ring-2 ring-rose-500/30'
                    : 'border-white/10 shadow-xl'
                }`}
              >
                <div className="relative w-full h-full bg-[#140306]">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  {/* Tap-to-expand overlay */}
                  {isCurrent && (
                    <div className="absolute inset-0 bg-black/0 active:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap max-w-xs mx-auto">
        {USER_PICTURES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? 'w-6 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                : 'w-1.5 bg-white/20 active:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/95 backdrop-blur-2xl"
          style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 border border-white/10 text-rose-200 active:text-white transition-colors cursor-pointer"
            style={{ top: 'calc(env(safe-area-inset-top) + 1rem)' }}
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-full max-h-[90dvh] rounded-2xl overflow-hidden border border-rose-500/30 shadow-[0_0_60px_rgba(225,29,72,0.4)]"
          >
            <img
              src={selectedImage}
              alt=""
              className="max-h-[88dvh] w-auto max-w-[96vw] object-contain rounded-2xl mx-auto"
              draggable={false}
            />
          </div>
        </div>
      )}
    </section>
  );
}

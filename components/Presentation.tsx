'use client';

import { useState, useEffect, useCallback } from 'react';
import { slides } from '@/lib/slides-data';
import Slide from './Slide';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Keyboard, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    if (currentSlide + 1 < slides.length) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        prevSlide();
      } else if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key) - 1;
        if (num < slides.length) {
          setDirection(num > currentSlide ? 1 : -1);
          setCurrentSlide(num);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, currentSlide]);

  return (
    <main 
      className="relative h-screen w-screen bg-[#050505] overflow-hidden select-none font-sans"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Decorative Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />

      <AnimatePresence mode="wait" custom={direction}>
        <Slide key={currentSlide} data={slides[currentSlide]} isActive={true} />
      </AnimatePresence>

      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full z-50 p-4 md:p-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
             <LayoutGrid size={16} className="text-accent-gold md:w-[18px]" />
          </div>
          <div className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-accent-gold font-bold">
            Evolutionary Series
          </div>
        </div>

        <div className="hidden md:block flex-1 max-w-md mx-8 pointer-events-auto">
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent-gold to-white shadow-[0_0_10px_rgba(212,165,116,0.5)]"
              initial={false}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/40 text-[9px] md:text-[10px] font-bold tracking-widest pointer-events-auto uppercase">
          <span>{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="opacity-20">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-50 flex items-center gap-4 md:gap-6 pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass-card flex items-center justify-center text-white/50 hover:text-white disabled:opacity-0 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass-card flex items-center justify-center text-white/50 hover:text-white disabled:opacity-0 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="hidden sm:flex flex-col pointer-events-none">
          <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/30 font-bold mb-0.5">Current</div>
          <div className="text-xs md:text-sm font-serif italic text-accent-gold whitespace-nowrap">{slides[currentSlide].title}</div>
        </div>
      </div>

      {/* Fullscreen Button */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50">
        <button 
          onClick={toggleFullscreen}
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass-card flex items-center justify-center text-white/50 hover:text-white transition-all"
          title="Toggle Fullscreen"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LayoutGrid size={18} className="rotate-45" />
          </motion.div>
        </button>
      </div>

      {/* Navigation Indicators */}
      <div className="hidden sm:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex-col gap-4 md:gap-5 z-50">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentSlide ? 1 : -1);
              setCurrentSlide(i);
            }}
            className="group relative flex items-center justify-end"
          >
            <span className="absolute right-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-accent-gold font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none hidden lg:block">
              {slide.title}
            </span>
            <div className={cn(
              "w-1.5 md:w-2 transition-all duration-500 rounded-full",
              i === currentSlide 
                ? "h-8 md:h-10 bg-accent-gold shadow-[0_0_15px_rgba(212,165,116,0.6)]" 
                : "h-1.5 md:h-2 bg-white/10 hover:bg-white/30"
            )} />
          </button>
        ))}
      </div>
      
      {/* Footer Info removed */}
    </main>
  );
}

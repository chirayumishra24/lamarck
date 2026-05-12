'use client';

import { useState, useEffect, useCallback } from 'react';
import { slides } from '@/lib/slides-data';
import Slide from './Slide';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Keyboard, LayoutGrid } from 'lucide-react';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

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
    <main className="relative h-screen w-screen bg-[#050505] overflow-hidden select-none font-sans">
      {/* Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Decorative Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />

      <AnimatePresence mode="wait" custom={direction}>
        <Slide key={currentSlide} data={slides[currentSlide]} isActive={true} />
      </AnimatePresence>

      {/* Top Navigation / Progress */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
             <LayoutGrid size={18} className="text-accent-gold" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-accent-gold font-bold">
            Evolutionary Biology Series
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8 pointer-events-auto">
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent-gold to-white shadow-[0_0_10px_rgba(212,165,116,0.5)]"
              initial={false}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold tracking-widest pointer-events-auto uppercase">
          <span>{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="opacity-20">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-10 left-10 z-50 flex items-center gap-6 pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-0 transition-all group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-0 transition-all group"
          >
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="hidden md:flex flex-col pointer-events-none">
          <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Current Subject</div>
          <div className="text-sm font-serif italic text-accent-gold">{slides[currentSlide].title}</div>
        </div>
      </div>

      {/* Vertical Dot Nav */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-50">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentSlide ? 1 : -1);
              setCurrentSlide(i);
            }}
            className="group relative flex items-center justify-end"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className="absolute right-8 text-[10px] uppercase tracking-[0.2em] text-accent-gold font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
              {slide.title}
            </span>
            <div className={cn(
              "w-2 transition-all duration-500 rounded-full",
              i === currentSlide 
                ? "h-10 bg-accent-gold shadow-[0_0_15px_rgba(212,165,116,0.6)]" 
                : "h-2 bg-white/10 hover:bg-white/30"
            )} />
          </button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-10 right-10 z-50 pointer-events-none hidden lg:block">
        <div className="text-right space-y-1">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Interactive Presentation</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 font-bold flex items-center justify-end gap-2">
            <Keyboard size={10} /> Use Arrow Keys to Navigate
          </div>
        </div>
      </div>

      {/* Enter Hint Overlay */}
      <AnimatePresence>
        {currentSlide === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
          >
            <div className="px-6 py-3 rounded-full glass-card border-accent-gold/30 flex items-center gap-4">
              <div className="w-6 h-6 rounded-md bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center text-[10px] font-bold text-accent-gold">
                ↵
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent-gold font-bold">
                Press Enter to Begin Journey
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

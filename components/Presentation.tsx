'use client';

import { useState, useEffect, useCallback } from 'react';
import { slides } from '@/lib/slides-data';
import Slide from './Slide';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Keyboard } from 'lucide-react';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1 < slides.length ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        prevSlide();
      } else if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key) - 1;
        if (num < slides.length) setCurrentSlide(num);
      } else if (e.key === '0') {
        if (9 < slides.length) setCurrentSlide(9);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <main className="relative h-screen w-screen bg-[#0f0f0f] overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <Slide key={currentSlide} data={slides[currentSlide]} isActive={true} />
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-[#d4a574]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-8 left-0 w-full flex justify-between px-12 items-center pointer-events-none">
        <div className="flex gap-2 items-center text-[#9a9590] text-xs uppercase tracking-widest bg-black/20 backdrop-blur-sm p-2 px-4 rounded-full border border-white/5">
          <Keyboard size={14} className="text-[#d4a574]" />
          <span>Slide {currentSlide + 1} of {slides.length}</span>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Slide Navigation Dots (Vertical) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2 transition-all duration-300 rounded-full ${
              i === currentSlide 
                ? 'h-8 bg-[#d4a574]' 
                : 'h-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Enter Hint */}
      {currentSlide < slides.length - 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[#d4a574] font-medium"
        >
          Press Enter to Continue
        </motion.div>
      )}
    </main>
  );
}

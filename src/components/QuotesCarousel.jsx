import React, { useState, useEffect } from 'react';
import { CONTENT_KIT } from '../lib/contentKit';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function QuotesCarousel({ lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const quotes = CONTENT_KIT.quotes;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, quotes.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <section 
      className="py-14 bg-gradient-to-b from-[#FFF6E8] to-[#FFF0DE]/40 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Quote Card */}
        <div className="relative bg-[#FEF6D9]/90 border border-[#F6C343]/50 rounded-3xl p-8 sm:p-12 shadow-soft text-center transition-all duration-300">
          
          <div className="absolute top-4 left-6 text-[#F28C28]/30">
            <Quote className="w-12 h-12 transform -rotate-12" />
          </div>

          <div className="relative z-10 min-h-[110px] flex items-center justify-center">
            <p className="font-kalam text-xl sm:text-2xl md:text-3xl text-[#4B2E1E] leading-relaxed transition-opacity duration-300">
              "{quotes[currentIndex][lang]}"
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              aria-label="Previous Quote"
              className="w-9 h-9 rounded-full bg-white/90 border border-[#E8DAC2] text-[#4B2E1E] flex items-center justify-center hover:bg-[#F6C343] hover:text-[#4B2E1E] transition-all shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to quote ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? 'w-6 bg-[#B85F00]' : 'w-2 bg-[#F6C343]/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Quote"
              className="w-9 h-9 rounded-full bg-white/90 border border-[#E8DAC2] text-[#4B2E1E] flex items-center justify-center hover:bg-[#F6C343] hover:text-[#4B2E1E] transition-all shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}


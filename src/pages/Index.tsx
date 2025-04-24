import React, { useState, useEffect, Fragment } from 'react';
import SearchBar from '@/components/SearchBar';
import BrandReveal from '@/components/BrandReveal';
import CTAButtons from '@/components/CTAButtons';

const Index = () => {
  console.log('Mounting Index page');
  const [showBrand, setShowBrand] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);
  const [animateGrid, setAnimateGrid] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // If reduced motion is preferred, show everything immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowBrand(true);
      setAnimateGrid(true);
      setShowCTAs(true);
    }
  }, [prefersReducedMotion]);

  const questions = [
    "Why is everything dropping again?",
    "Should I sell, hold, or buy the dip?",
    "Where can I find clarity?"
  ];

  const handleTypingComplete = () => {
    setShowBrand(true);
    setTimeout(() => {
      setAnimateGrid(true);
    }, 100);
  };

  const handleBrandComplete = () => {
    // Smoother transition - start fading in CTAs earlier but slower
    setTimeout(() => setShowCTAs(true), 500);
  };

  return (
    <div className="hero-vignette relative min-h-screen bg-[#101727] text-white flex items-center justify-center overflow-hidden">
      {/* Background grid with enhanced styling */}
      <div className={`bg-grid ${animateGrid ? 'bg-grid-animated' : ''}`}></div>
      
      {/* Animated background particles + noise texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="particles-container"></div>
        <div className="noise-overlay"></div>
      </div>
      
      {/* SEO hidden text */}
      <div className="seo-text">
        Market moving fast. What's my next move? Need real clarity? Swipefolio. Get early access. Join our mission.
      </div>
      
      <noscript>
        <div className="seo-text">
          Market moving fast. What's my next move? Need real clarity? Swipefolio. Get early access. Join our mission.
        </div>
      </noscript>
      
      {/* Main content container */}
      <div className="relative z-10 px-6 max-w-2xl mx-auto text-center flex flex-col justify-center min-h-[500px]">
        <div className="ambient-glow"></div>
        <div className="spotlight-overlay"></div>
        
        {/* Search Bar - Always visible */}
        <div className="mb-8 relative">
          <SearchBar 
            lines={questions}
            onComplete={handleTypingComplete}
            prefersReducedMotion={prefersReducedMotion}
            keepVisible={false}
          />
          {!showBrand && (
            <button onClick={handleTypingComplete} className="absolute right-0 top-full mt-2 text-xs text-white/50 hover:text-white focus:outline-none">
              Been here before?
            </button>
          )}
        </div>
        
        {/* Brand Reveal - Fixed height space */}
        <div className="h-20 flex items-center justify-center w-[420px] mx-auto">
          {showBrand && (
            <div className="transition-all duration-700 ease-in-out transform opacity-100">
              <BrandReveal
                prefersReducedMotion={prefersReducedMotion}
                onComplete={handleBrandComplete}
              />
            </div>
          )}
        </div>
        
        {/* CTAs - Fixed height space */}
        <div className="h-16 mt-4 flex items-center justify-center w-[420px] mx-auto">
          {showCTAs && (
            <div className="transition-all duration-700 ease-in-out transform opacity-100 translate-y-0">
              <CTAButtons prefersReducedMotion={prefersReducedMotion} visible={showCTAs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

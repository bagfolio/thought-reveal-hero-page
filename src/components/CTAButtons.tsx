import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CTAButtonsProps {
  prefersReducedMotion: boolean;
  visible: boolean;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ prefersReducedMotion, visible }) => {
  const navigate = useNavigate();
  const [showPrimary, setShowPrimary] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    // Only start animations once visible is true
    if (!visible) return;
    if (prefersReducedMotion) {
      setShowPrimary(true);
      setShowSecondary(true);
      return;
    }

    // Show primary immediately
    setShowPrimary(true);
    // Then secondary after a small delay
    setTimeout(() => {
      setShowSecondary(true);
    }, 300);
  }, [prefersReducedMotion, visible]);

  return (
    <div className="flex flex-row items-center justify-center gap-6 mt-6">
      <div className={`transition-opacity duration-400 ${showPrimary ? 'opacity-100' : 'opacity-0'}`}>
        <Button 
          className="rounded-full bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] gradient-breathe text-white text-base md:text-lg py-4 px-8 font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          onClick={() => navigate('/apply')}
        >
          Apply for Early Access
        </Button>
      </div>
      
      <div 
        className={`transition-all duration-400 ${showSecondary 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-5'}`}
      >
        <Button 
          variant="link" 
          onClick={() => navigate('/apply')}
          className="text-white/80 hover:text-white text-base md:text-base transform transition-all duration-300 hover:scale-105"
        >
          Join Our Mission
        </Button>
      </div>
    </div>
  );
};

export default CTAButtons;

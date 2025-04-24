import React, { useState, useEffect, useRef } from 'react';

interface BrandRevealProps {
  prefersReducedMotion: boolean;
  onComplete?: () => void;
}

const BrandReveal: React.FC<BrandRevealProps> = ({ 
  prefersReducedMotion,
  onComplete 
}) => {
  const [text, setText] = useState('');
  const [finalDot, setFinalDot] = useState(false);
   
  const fullText = "Swipefolio.";

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(fullText);
      setFinalDot(true);
      // Trigger next step immediately
      onComplete?.();
      return;
    }
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length - 1) {
        setText(fullText.substring(0, index + 1));
        index++;
      } else {
        // Completed typing all but the dot
        clearInterval(typeInterval);
        setFinalDot(true);
        // Rely on onAnimationEnd of dot for onComplete
      }
    }, 60);
    return () => clearInterval(typeInterval);
  }, [prefersReducedMotion]);

  return (
    <div className="brand-text text-5xl md:text-7xl font-extrabold flex items-center justify-center">
      <span>Swipefolio</span>
      {finalDot && (
        <span
          className="animate-[popScale_200ms_ease-in-out_forwards]"
          onAnimationEnd={() => onComplete?.()}
        >
          .
        </span>
      )}
      {!finalDot && text !== fullText && <span className="cursor cursor-blue"></span>}
    </div>
  );
};

export default BrandReveal;

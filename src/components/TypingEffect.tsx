import React, { FC, useState, useEffect, useRef } from 'react';

interface TypingEffectProps {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBetweenLines?: number;
  onComplete?: () => void;
  prefersReducedMotion: boolean;
  keepVisible?: boolean;
}

const TypingEffect: FC<TypingEffectProps> = ({
  lines,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseBeforeDelete = 600,
  pauseBetweenLines = 300,
  onComplete,
  prefersReducedMotion,
  keepVisible = false
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any existing timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Immediately display final line if reduced motion is preferred
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(lines[lines.length - 1]);
      setCurrentLineIndex(lines.length - 1);
      setIsDone(true);
      if (onComplete) onComplete();
    }
  }, [prefersReducedMotion, lines, onComplete]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const currentLine = lines[currentLineIndex];

    if (isTyping) {
      // If we haven't completed the current line
      if (displayText.length < currentLine.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentLine.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Completed typing the current line
        if (currentLineIndex === lines.length - 1) {
          setIsDone(true);
          // Show underline under "clarity"
          setShowUnderline(true);
          // onComplete will fire via underline span's onAnimationEnd
        } else {
          // For other lines, wait, then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, pauseBeforeDelete);
        }
      }
    } else {
      // We're deleting
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // We've deleted the entire line, move to the next one
        timeoutRef.current = setTimeout(() => {
          setCurrentLineIndex(currentLineIndex + 1);
          setIsTyping(true);
        }, pauseBetweenLines);
      }
    }
  }, [
    displayText, 
    currentLineIndex, 
    isTyping, 
    lines, 
    typingSpeed, 
    deletingSpeed, 
    pauseBeforeDelete, 
    pauseBetweenLines, 
    onComplete,
    prefersReducedMotion
  ]);

  // Find the word "clarity" in the text to underline it
  const getTextWithUnderline = () => {
    if (!showUnderline || !displayText.includes('clarity')) {
      return <>{displayText}</>;
    }

    const clarityIndex = displayText.indexOf('clarity');
    const beforeClarity = displayText.substring(0, clarityIndex);
    const clarity = displayText.substring(clarityIndex, clarityIndex + 7);
    const afterClarity = displayText.substring(clarityIndex + 7);

    return (
      <>
        {beforeClarity}
        <span className="relative">
          {clarity}
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white animate-[underline_300ms_ease-in-out_forwards_800ms]" onAnimationEnd={onComplete}></span>
        </span>
        {afterClarity}
      </>
    );
  };

  return (
    <div aria-live="polite" className="relative">
      {getTextWithUnderline()}
      {!isDone && <span className="cursor"></span>}
    </div>
  );
};

export default TypingEffect;

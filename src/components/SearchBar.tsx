import React from 'react';
import TypingEffect from './TypingEffect';

interface SearchBarProps {
  lines: string[];
  onComplete?: () => void;
  prefersReducedMotion: boolean;
  keepVisible?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ lines, onComplete, prefersReducedMotion, keepVisible = false }) => {
  return (
    <div className="relative w-[420px] mx-auto h-15" style={{ boxSizing: 'border-box' }}>
      {onComplete && (
        <button
          onClick={onComplete}
          className="absolute right-0 top-full mt-2 text-xs text-white/50 hover:text-white focus:outline-none"
        >
          Been here before?
        </button>
      )}
      <div 
        tabIndex={0}
        className="relative p-4 rounded-lg border border-white/20 bg-[#111214] h-full flex items-center w-full focus-within:ring-2 focus-within:ring-[#4e82ee] focus-within:ring-opacity-50 transition-shadow duration-300"
      >
        <div className="flex items-center gap-3 w-full" style={{ width: '100%' }}>
          <div className="text-white/50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="min-h-[1.5em] overflow-hidden flex justify-start pl-2" style={{ width: '100%', flexGrow: 0, flexShrink: 0 }}>
            <TypingEffect
              lines={lines}
              onComplete={onComplete}
              prefersReducedMotion={prefersReducedMotion}
              keepVisible={keepVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

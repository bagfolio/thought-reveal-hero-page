import React, { useState } from 'react';
import { roleConfig } from './taskConfig';

interface Step1Props {
  selectedTracks: string[];
  onSelect: (trackId: string) => void;
  onNext: () => void;
}

const Step1_SelectTracks: React.FC<Step1Props> = ({ selectedTracks, onSelect, onNext }) => {
  const [openDesc, setOpenDesc] = useState<string | null>(null);
  const tracks = [
    'Full-Stack Software Engineer',
    'Cloud & Infrastructure',
    'Product Design & Experience',
    'Content Creator & Social Media',
    'Partnerships & Growth',
    'Financial Analyst & Insight',
    'Machine Learning & Personalization',
  ];
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Select up to 3 Tracks</h2>
      <div className="flex flex-wrap gap-4 mb-6 justify-center items-start">
        {tracks.map((t) => {
          const isSelected = selectedTracks.includes(t);
          return (
            <div
              key={t}
              onClick={() => onSelect(t)}
              className={`self-start w-full sm:w-1/2 md:w-1/3 p-4 rounded cursor-pointer bg-gray-800 transition-all ${
                isSelected ? 'border-2 border-[#8B5CF6]' : 'border border-transparent'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{t}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDesc(openDesc === t ? null : t);
                  }}
                  className="text-sm text-blue-400 hover:underline"
                >
                  {openDesc === t ? 'Hide Details' : 'Learn More'}
                </button>
              </div>
              {openDesc === t && (
                <p className="mt-2 text-gray-300">{roleConfig[t].description}</p>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={onNext}
        disabled={selectedTracks.length < 1}
        className={`mt-4 px-6 py-2 rounded-full text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
          selectedTracks.length >= 1
            ? 'bg-[#8B5CF6] hover:bg-[#7C3AED]'
            : 'bg-gray-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Step1_SelectTracks;

import React, { useState, useMemo } from 'react';

interface Step2Props {
  selectedTracks: string[];
  onNext: (weights: Record<string, number>) => void;
}

const Step2_PointAllocator: React.FC<Step2Props> = ({ selectedTracks, onNext }) => {
  // Initialize weights for each track
  const initialWeights = useMemo(
    () => selectedTracks.reduce((acc, t) => ({ ...acc, [t]: 0 }), {} as Record<string, number>),
    [selectedTracks]
  );
  const [weights, setWeights] = useState<Record<string, number>>(initialWeights);
  const total = Object.values(weights).reduce((sum, v) => sum + v, 0);
  const remaining = 100 - total;
  const handleChange = (track: string, value: number) => {
    setWeights((prev) => ({ ...prev, [track]: value }));
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Allocate 100 Points</h2>
      <p className="mb-2 text-gray-400">Points Remaining: {remaining}</p>
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded mb-6">
        {selectedTracks.map((t) => (
          <div key={t} className="mb-4">
            <label className="block mb-1">
              {t}: <span className="font-mono">{weights[t]}</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={weights[t]}
              onChange={(e) => handleChange(t, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => onNext(weights)}
        disabled={remaining !== 0}
        className={`mt-4 px-6 py-2 rounded-full text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
          remaining === 0 ? 'bg-[#8B5CF6] hover:bg-[#7C3AED]' : 'bg-gray-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Step2_PointAllocator;

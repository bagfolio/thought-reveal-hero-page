import React, { useState, useMemo } from 'react';
import { roleConfig } from './taskConfig';

interface Step3Props {
  selectedTracks: string[];
  onNext: (responses: string[]) => void;
}

const Step3_MicroTasks: React.FC<Step3Props> = ({ selectedTracks, onNext }) => {
  const tasks = useMemo(
    () => selectedTracks.flatMap(track => {
      const cfg = roleConfig[track];
      return [
        { track, question: cfg.questions[0], description: cfg.description },
        { track, question: cfg.questions[1], description: cfg.description }
      ];
    }),
    [selectedTracks]
  );
  const [responses, setResponses] = useState<string[]>(() => tasks.map(() => ''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTasks = tasks.length;
  const currentTask = tasks[currentIndex];
  const canProceed = responses[currentIndex].trim().length > 0;
  const handleNext = () => {
    if (!canProceed) return;
    if (currentIndex === totalTasks - 1) {
      onNext(responses);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-2">Step 3: Quick Showcase</h2>
      <p className="mb-2 text-gray-400">
        Task {currentIndex + 1} of {totalTasks}
      </p>
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded mb-4">
        <label className="block mb-2 font-semibold">
          {currentTask.question}
        </label>
        <textarea
          value={responses[currentIndex]}
          onChange={e =>
            setResponses(prev => {
              const updated = [...prev];
              updated[currentIndex] = e.target.value;
              return updated;
            })
          }
          rows={4}
          className="w-full p-2 bg-gray-900 rounded text-white"
          placeholder="Your answer..."
        />
      </div>
      <button
        onClick={handleNext}
        disabled={!canProceed}
        className={`mt-4 px-6 py-2 rounded-full text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
          canProceed ? 'bg-[#8B5CF6] hover:bg-[#7C3AED]' : 'bg-gray-600'
        }`}
      >
        {currentIndex === totalTasks - 1 ? 'Finish Tasks' : 'Next Task'}
      </button>
    </div>
  );
};

export default Step3_MicroTasks;

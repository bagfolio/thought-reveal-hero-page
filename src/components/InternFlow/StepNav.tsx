import React from 'react';

interface StepNavProps {
  step: number;
}

const labels = [
  'Select Tracks',
  'Allocate Points',
  'Micro-Tasks',
  'Details',
  'Review',
  'Done'
];

const StepNav: React.FC<StepNavProps> = ({ step }) => (
  <div className="flex items-center justify-center space-x-6">
    {labels.map((label, idx) => {
      const isActive = step === idx + 1;
      return (
        <div
          key={idx}
          className={`text-sm ${isActive ? 'font-semibold text-white' : 'text-gray-400'}`}
        >
          {label}
        </div>
      );
    })}
  </div>
);

export default StepNav;

import React, { useState } from 'react';
import StepNav from './StepNav';
import Step1_SelectTracks from './Step1_SelectTracks';
import Step2_PointAllocator from './Step2_PointAllocator';
import Step3_MicroTasks from './Step3_MicroTasks';
import Step4_SubmissionForm from './Step4_SubmissionForm';
import Step5_Review from './Step5_Review';
import ConfirmationModal from './ConfirmationModal';

const InternFlow: React.FC = () => {
  console.log('Mounting InternFlow component');
  const [step, setStep] = useState(1);
  // State for selected tracks
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [responses, setResponses] = useState<string[]>([]);
  const [formData, setFormData] = useState<{ name: string; email: string; linkedIn: string; github: string; resume: File | null } | null>(null);
  return (
    <div className="intern-flow-container min-h-screen bg-[#101727] text-white p-6">
      <StepNav step={step} />
      <div className="mt-8">
        {step === 1 && (
          <Step1_SelectTracks
            selectedTracks={selectedTracks}
            onSelect={(trackId) => {
              setSelectedTracks((prev) =>
                prev.includes(trackId)
                  ? prev.filter((t) => t !== trackId)
                  : prev.length < 3
                  ? [...prev, trackId]
                  : prev
              );
            }}
            onNext={() => setStep(selectedTracks.length === 1 ? 3 : 2)}
          />
        )}
        {step === 2 && (
          <Step2_PointAllocator
            selectedTracks={selectedTracks}
            onNext={(wts) => { setWeights(wts); setStep(3); }}
          />
        )}
        {step === 3 && (
          <Step3_MicroTasks
            selectedTracks={selectedTracks}
            onNext={(res) => { setResponses(res); setStep(4); }}
          />
        )}
        {step === 4 && (
          <Step4_SubmissionForm onNext={(fd) => { setFormData(fd); setStep(5); }} />
        )}
        {step === 5 && formData && (
          <Step5_Review
            selectedTracks={selectedTracks}
            weights={weights}
            responses={responses}
            formData={formData}
            onConfirm={() => setStep(6)}
          />
        )}
        {step === 6 && <ConfirmationModal />}
      </div>
    </div>
  );
};

export default InternFlow;

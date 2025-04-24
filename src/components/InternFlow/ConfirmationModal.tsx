import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationModal: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101727] text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
      <p className="mb-6 text-center max-w-md">
        Thanks for your interest in Swipefolio. We'll review your submission and be in touch within 7 business days.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-[#8B5CF6] rounded-full text-white font-semibold hover:bg-[#7C3AED] transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ConfirmationModal;

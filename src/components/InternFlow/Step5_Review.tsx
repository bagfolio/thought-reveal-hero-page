import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { roleConfig } from './taskConfig';

interface FormDataType {
  name: string;
  email: string;
  linkedIn: string;
  github: string;
  resume: File | null;
}

interface Step5ReviewProps {
  selectedTracks: string[];
  weights: Record<string, number>;
  responses: string[];
  formData: FormDataType;
  onConfirm: () => void;
}

const Step5_Review: React.FC<Step5ReviewProps> = ({ selectedTracks, weights, responses, formData, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tasks = selectedTracks.flatMap(track => {
    const cfg = roleConfig[track];
    return [
      { track, question: cfg.questions[0] },
      { track, question: cfg.questions[1] }
    ];
  });

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      let resumeUrl = '';
      if (formData.resume) {
        const filePath = `${formData.email}_${Date.now()}.pdf`;
        const { error: uploadErr } = await supabase.storage
          .from('resumes')
          .upload(filePath, formData.resume, { cacheControl: '3600', upsert: false });
        if (uploadErr) throw uploadErr;
        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);
        resumeUrl = publicUrl;
      }
      // Insert all application data into single table
      const { error } = await supabase
        .from('applications')
        .insert({
          name: formData.name,
          email: formData.email,
          linkedin: formData.linkedIn,
          github: formData.github,
          resume_url: resumeUrl,
          selected_tracks: selectedTracks,
          weights: weights,
          responses: responses,
          submitted_at: new Date(),
        });
      if (error) throw error;
      onConfirm();
    } catch (err) {
      console.error(err);
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-6 py-8 bg-gray-800 rounded max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center">Review Your Application</h2>
      <section>
        <h3 className="font-semibold">Tracks & Weights</h3>
        <ul className="list-disc list-inside">
          {selectedTracks.map(track => (
            <li key={track}>{track}: {weights[track]}%</li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-semibold">Micro-Task Responses</h3>
        {tasks.map((t, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold">{t.question}</p>
            <p className="ml-4">{responses[idx]}</p>
          </div>
        ))}
      </section>
      <section>
        <h3 className="font-semibold">Your Details</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        {formData.linkedIn && (
          <p>
            LinkedIn:{' '}
            <a href={formData.linkedIn} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
              {formData.linkedIn}
            </a>
          </p>
        )}
        {formData.github && (
          <p>
            GitHub:{' '}
            <a href={formData.github} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
              {formData.github}
            </a>
          </p>
        )}
        {formData.resume && <p>Resume: {formData.resume.name}</p>}
      </section>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        onClick={handleConfirm}
        disabled={loading}
        className={`mt-4 px-6 py-2 rounded-full text-white font-semibold transition ${
          loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#8B5CF6] hover:bg-[#7C3AED]'
        }`}
      >
        {loading ? 'Submitting...' : 'Confirm & Send'}
      </button>
    </div>
  );
};

export default Step5_Review;

import React, { useState } from 'react';

interface FormDataType {
  name: string;
  email: string;
  linkedIn: string;
  github: string;
  resume: File | null;
}

interface Step4Props {
  onNext: (formData: FormDataType) => void;
}

const Step4_SubmissionForm: React.FC<Step4Props> = ({ onNext }) => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    linkedIn: '',
    github: '',
    resume: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'resume' && files) {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-center">Step 4: Final Details</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"
      />
      <input
        type="url"
        name="linkedIn"
        placeholder="LinkedIn URL (optional)"
        value={formData.linkedIn}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"
      />
      <input
        type="url"
        name="github"
        placeholder="GitHub/Portfolio URL (optional)"
        value={formData.github}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"
      />
      <div>
        <label className="block mb-1">Resume (PDF)</label>
        <input
          type="file"
          name="resume"
          accept="application/pdf"
          onChange={handleChange}
          className="w-full text-sm text-gray-400"
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-[#8B5CF6] rounded-full text-white font-semibold hover:bg-[#7C3AED] transition"
      >
        Continue to Review
      </button>
    </form>
  );
};

export default Step4_SubmissionForm;

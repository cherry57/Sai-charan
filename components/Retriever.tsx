import React, { useState, FormEvent } from 'react';

interface RetrieverProps {
  onRetrieve: (key: string) => void;
  error: string | null;
}

export const Retriever: React.FC<RetrieverProps> = ({ onRetrieve, error }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onRetrieve(key);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">View a Shared Image</h2>
      <p className="text-gray-400 mb-6 text-center">Enter the share key you received to load the image.</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter share key..."
          className="flex-grow w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
        >
          Load Image
        </button>
      </form>
      {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
    </div>
  );
};

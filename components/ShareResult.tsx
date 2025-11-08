import React, { useState } from 'react';
import { LinkIcon } from './icons/LinkIcon';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ShareResultProps {
  sharedKey: string;
  onShareAnother: () => void;
}

export const ShareResult: React.FC<ShareResultProps> = ({ sharedKey, onShareAnother }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sharedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center text-center p-4">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
        <LinkIcon />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Your key is ready!</h2>
      <p className="text-gray-400 mb-6">Share this key with anyone to let them view your image.</p>
      
      <div className="relative flex items-center w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg p-1 mb-6">
        <input
          type="text"
          value={sharedKey}
          readOnly
          className="w-full bg-transparent text-gray-300 px-3 py-2 border-none focus:outline-none focus:ring-0"
        />
        <button
          onClick={handleCopy}
          className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>

      <button
        onClick={onShareAnother}
        className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 transition-colors"
      >
        Share Another Image
      </button>
    </div>
  );
};

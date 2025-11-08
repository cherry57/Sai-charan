import React from 'react';

interface ImagePreviewProps {
  src: string;
  fileName: string;
  onShare: () => void;
  onCancel: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, fileName, onShare, onCancel }) => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <img src={src} alt="Preview" className="max-w-full lg:max-w-xl max-h-[50vh] object-contain rounded-lg shadow-lg mb-4" />
      <p className="text-gray-400 mb-6 truncate max-w-xs sm:max-w-md">{fileName}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onCancel}
          className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onShare}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all transform hover:scale-105"
        >
          Generate Share Key
        </button>
      </div>
    </div>
  );
};

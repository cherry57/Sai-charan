import React, { ChangeEvent } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface UploaderProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

export const Uploader: React.FC<UploaderProps> = ({ onFileChange, error }) => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <label
        htmlFor="file-upload"
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon />
          <p className="mb-2 text-lg text-gray-400"><span className="font-semibold text-gray-300">Click to upload</span> or drag and drop</p>
          <p className="text-sm text-gray-500">PNG, JPG, GIF, WEBP</p>
        </div>
        <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={onFileChange} />
      </label>
      {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
    </div>
  );
};

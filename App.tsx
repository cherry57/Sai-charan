import React, { useState, ChangeEvent } from 'react';
import { Uploader } from './components/Uploader';
import { ImagePreview } from './components/ImagePreview';
import { ShareResult } from './components/ShareResult';
import { Retriever } from './components/Retriever';
import { Spinner } from './components/Spinner';

type ViewMode = 'share' | 'retrieve';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('share');
  
  // Share state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sharedKey, setSharedKey] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [shareError, setShareError] = useState<string | null>(null);

  // Retrieve state
  const [retrievedImageUrl, setRetrievedImageUrl] = useState<string | null>(null);
  const [isRetrieving, setIsRetrieving] = useState<boolean>(false);
  const [retrieveError, setRetrieveError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleResetShare();
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setShareError('Please select a valid image file.');
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleShare = async () => {
    if (!imageFile) return;
    setIsSharing(true);
    setShareError(null);
    try {
      const base64Image = await fileToBase64(imageFile);
      const key = `pixelperfect-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(key, base64Image);
      setSharedKey(key);
    } catch (error) {
      setShareError('Failed to process the image. Please try again.');
      console.error(error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleResetShare = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl(null);
    setSharedKey(null);
    setIsSharing(false);
    setShareError(null);
  };

  const handleRetrieve = (key: string) => {
    if (!key.trim()) {
      setRetrieveError('Please enter a share key.');
      return;
    }
    setIsRetrieving(true);
    setRetrieveError(null);
    setRetrievedImageUrl(null);

    // Simulate network delay for better UX
    setTimeout(() => {
      try {
        const imageData = localStorage.getItem(key);
        if (imageData) {
          setRetrievedImageUrl(imageData);
        } else {
          setRetrieveError('Image not found. The key is invalid or the image has been removed.');
        }
      } catch (error) {
        setRetrieveError('An error occurred while retrieving the image.');
        console.error(error);
      } finally {
        setIsRetrieving(false);
      }
    }, 500);
  };
  
  const handleResetRetrieve = () => {
    setRetrievedImageUrl(null);
    setIsRetrieving(false);
    setRetrieveError(null);
  }

  const renderShareView = () => {
    if (isSharing) {
      return <div className="flex flex-col items-center justify-center h-64"><Spinner /><p className="mt-4 text-lg text-gray-400">Generating secure key...</p></div>;
    }
    if (sharedKey) {
      return <ShareResult sharedKey={sharedKey} onShareAnother={handleResetShare} />;
    }
    if (previewUrl && imageFile) {
      return <ImagePreview src={previewUrl} fileName={imageFile.name} onShare={handleShare} onCancel={handleResetShare} />;
    }
    return <Uploader onFileChange={handleFileChange} error={shareError} />;
  };

  const renderRetrieveView = () => {
    if(isRetrieving) {
      return <div className="flex flex-col items-center justify-center h-64"><Spinner /><p className="mt-4 text-lg text-gray-400">Retrieving image...</p></div>;
    }
    if(retrievedImageUrl) {
        return (
            <div className="w-full flex flex-col items-center">
                <img src={retrievedImageUrl} alt="Retrieved content" className="max-w-full lg:max-w-2xl max-h-[60vh] object-contain rounded-lg shadow-2xl mb-6" />
                <button onClick={handleResetRetrieve} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors">
                    Retrieve Another
                </button>
            </div>
        );
    }
    return <Retriever onRetrieve={handleRetrieve} error={retrieveError} />;
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            PixelPerfect Share
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Instant, high-fidelity image sharing.</p>
        </header>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700 shadow-2xl">
          <div className="flex justify-center border-b border-gray-700 mb-6">
            <button
              onClick={() => setViewMode('share')}
              className={`px-4 py-3 text-lg font-semibold transition-colors duration-200 ${viewMode === 'share' ? 'text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            >
              Share Image
            </button>
            <button
              onClick={() => setViewMode('retrieve')}
              className={`px-4 py-3 text-lg font-semibold transition-colors duration-200 ${viewMode === 'retrieve' ? 'text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            >
              Retrieve Image
            </button>
          </div>

          <div className="min-h-[300px] flex items-center justify-center">
            {viewMode === 'share' ? renderShareView() : renderRetrieveView()}
          </div>
        </div>
        <footer className="text-center text-gray-500 mt-8 text-sm">
            <p>Images are stored locally in your browser and are not uploaded to any server.</p>
        </footer>
      </div>
    </div>
  );
}

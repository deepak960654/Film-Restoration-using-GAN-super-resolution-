
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ModelSelector } from './components/ModelSelector';
import { ImageViewer } from './components/ImageViewer';
import { Spinner } from './components/Spinner';
import { RestoreIcon } from './components/Icons';
import { GANModel } from './types';
import { restoreImage } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<GANModel>(GANModel.CodeFormer);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      setRestoredImage(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRestoreClick = useCallback(async () => {
    if (!originalImage || !originalImageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRestoredImage(null);

    try {
      const base64Data = originalImage.split(',')[1];
      if (!base64Data) {
        throw new Error("Invalid image format.");
      }
      
      const restoredBase64 = await restoreImage(base64Data, originalImageFile.type, selectedModel);
      
      setRestoredImage(`data:image/png;base64,${restoredBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image restoration.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, originalImageFile, selectedModel]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        {isLoading && <Spinner />}
        <div className="w-full max-w-5xl bg-gray-800/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-700">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <ImageUploader onImageUpload={handleImageUpload} />
            <div className="flex-grow">
              <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
            </div>
            <button
              onClick={handleRestoreClick}
              disabled={isLoading || !originalImage}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400/50"
            >
              <RestoreIcon />
              {isLoading ? 'Restoring...' : 'Restore Image'}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ImageViewer title="Original" imageUrl={originalImage} />
            <ImageViewer 
              title="Restored" 
              imageUrl={restoredImage} 
              isLoading={isLoading}
              isDownloadable={!!restoredImage}
              isShareable={!!restoredImage}
            />
          </div>

        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini. For demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default App;

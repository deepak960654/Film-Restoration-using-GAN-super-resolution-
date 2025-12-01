
import React from 'react';
import { ImageIcon, LoadingIcon, DownloadIcon, ShareIcon } from './Icons';

interface ImageViewerProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
  isDownloadable?: boolean;
  isShareable?: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ title, imageUrl, isLoading = false, isDownloadable = false, isShareable = false }) => {
  const handleShare = async () => {
    if (!imageUrl || !navigator.share) {
        alert('Web Share API is not supported in your browser.');
        return;
    }

    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'restored-image.png', { type: blob.type });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'GAN Restored Image',
                text: 'Check out this image I restored using the GAN Image Restorer!',
            });
        } else {
             alert("Your browser doesn't support sharing files.");
        }
    } catch (error) {
        console.error('Error sharing image:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        alert(`An error occurred while trying to share: ${errorMessage}`);
    }
  };
  
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-300">{title}</h2>
      <div className="aspect-square w-full bg-gray-900/70 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600 overflow-hidden relative">
        {imageUrl ? (
          <>
            <img src={imageUrl} alt={title} className="object-contain w-full h-full" />
             {(isDownloadable || isShareable) && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {isShareable && navigator.share && (
                  <button
                      onClick={handleShare}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-400/50"
                      aria-label="Share restored image"
                      title="Share restored image"
                  >
                      <ShareIcon />
                  </button>
                )}
                {isDownloadable && (
                  <a
                    href={imageUrl}
                    download="restored-image.png"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-400/50"
                    aria-label="Download restored image"
                    title="Download restored image"
                  >
                    <DownloadIcon />
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            {isLoading ? (
              <>
                <LoadingIcon />
                <span className="mt-2">Processing...</span>
              </>
            ) : (
              <>
                <ImageIcon />
                <span className="mt-2 text-sm">{title} image will appear here</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface ImageGalleryProps {
  existingImages: string[];
  setExistingImages: (imgs: string[]) => void;
  onDeleteImage: (imgUrl: string) => Promise<void>;
}

export default function ImageGallery({
  existingImages,
  setExistingImages,
  onDeleteImage,
}: ImageGalleryProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (previewIndex === null || existingImages.length <= 1) return;

    const interval = setInterval(() => {
      setPreviewIndex((prev) =>
        prev !== null ? (prev + 1) % existingImages.length : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [previewIndex, existingImages.length]);

  const handleDelete = async (img: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this image?');
    if (!confirmed) return;

    try {
      await onDeleteImage(img);
      setExistingImages((prev) => prev.filter((i) => i !== img));
      toast.success('Image deleted successfully');
      if (existingImages[previewIndex || 0] === img) {
        setPreviewIndex(null);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete image');
    }
  };

  return (
    <>
      {/* Thumbnail Preview */}
      <div className="flex flex-wrap gap-3">
        {existingImages.map((img, idx) => (
          <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden group">
            <Image
              src={img}
              alt={`Image ${idx}`}
              fill
              className="object-cover rounded-md border border-gray-300 dark:border-gray-700 cursor-pointer"
              onClick={() => setPreviewIndex(idx)}
            />
            <button
              type="button"
              onClick={() => handleDelete(img)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Fullscreen Preview */}
      {previewIndex !== null && existingImages[previewIndex] && (
        <div
          onClick={() => setPreviewIndex(null)}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
        >
          <div
            className="relative w-[80vw] h-[70vh] max-w-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={existingImages[previewIndex]}
              alt="Full Preview"
              fill
              className="object-contain rounded-lg"
            />

            {/* Close Button */}
            <button
              onClick={() => setPreviewIndex(null)}
              className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-black text-xs px-2 py-1 rounded shadow"
            >
              ✕
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(existingImages[previewIndex])}
              className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded shadow"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

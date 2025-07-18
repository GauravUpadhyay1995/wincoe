'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';


export default function Gallery() {
  const galleryImages = Array(6)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      src: `/images/grid-image/image-0${i + 1}.png`,
      alt: `Event photo ${i + 1}`
    }));

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  const openModal = (index: number) => {
    setSelectedImage(galleryImages[index]);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigate = (dir: 'prev' | 'next') => {
    const isNext = dir === 'next';
    setDirection(isNext ? 1 : -1);

    const newIndex = isNext
      ? (currentIndex + 1) % galleryImages.length
      : (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    setSelectedImage(galleryImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  // 👇 Rolling + sliding variants
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      rotate: direction > 0 ? 360 : -360,
      opacity: 0
    }),
    center: {
      x: 0,
      rotate: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      rotate: direction < 0 ? 360 : -360,
      opacity: 0
    })
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Photo Gallery Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{margin: '-100px' }}
          className="max-w-7xl mx-auto"
        >

          <motion.h2
            className="text-3xl font-bold text-orange-600 flex items-center justify-center gap-4 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
           
          >
            <div className=" flex items-center justify-center transform transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="64"
                height="64"
                fill="none"
                stroke="#ec4a0a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="10" width="40" height="30" rx="2" ry="2" />
                <rect x="14" y="16" width="40" height="30" rx="2" ry="2" transform="rotate(8 34 31)" />
                <rect x="10" y="22" width="40" height="30" rx="2" ry="2" transform="rotate(-10 30 37)" />
                <circle cx="22" cy="20" r="2" fill="#ec4a0a" />
                <path d="M12 36l6-6 8 10 6-8 10 12" />
              </svg>

            </div>
            Photo Gallery
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
           
            transition={{ delay: 0.1 }}
          >
            Moments captured from WIN CoE events and activities
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                viewport={{margin: '-50px' }}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-4 hover:border-orange-600"
                whileHover={{
                  scale: 1.03,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                onClick={() => openModal(index)}
              >
                <div className="aspect-[4/3] relative">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-orange/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="p-3 bg-white/90 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
           
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: '#e87638ff',
                boxShadow: '0 10px 25px -5px rgba(78, 33, 3, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-orange-600 text-white font-medium rounded-full shadow-lg transition-all"
            >
              View More Photos
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm "
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="relative max-w-2xl w-full mx-4 "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center text-orange-300 hover:text-white bg-orange-900/90 hover:bg-orange-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/30 border border-orange-300/30 hover:border-orange-600"
                aria-label="Close modal"
              >
                <XMarkIcon className="h-10 w-10" />
              </button>

              {/* Image with rolling transition */}
              <div className="relative aspect-video bg-orange rounded-xl overflow-hidden shadow-2xl border-4 border-orange-600">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.img
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-full  "
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 500, damping: 30 },
                      rotate: { duration: 0.6 },
                      opacity: { duration: 0.1 }
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('prev');
                  }}
                  className="p-2 text-orange-600 hover:text-orange-400 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="h-8 w-8" />
                </button>

                <span className="text-orange-600 text-3xl">
                  {currentIndex + 1} / {galleryImages.length}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('next');
                  }}
                  className="p-2 text-orange-600 hover:text-orange-400 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="h-8 w-8" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

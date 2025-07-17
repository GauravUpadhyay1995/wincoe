import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {  PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Variants } from "framer-motion";


interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUploading: boolean;
}

const UploadModal = ({
  isOpen,
  onClose,
  isUploading,
}: UploadModalProps) => {

  const [isDragging, setIsDragging] = useState(false);
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  
const modalVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 500
    }
  },
  exit: { opacity: 0, y: 20, scale: 0.95 }
};

  const fetchScreenshots = async (): Promise<void> => {
    try {
      const response = await fetch('/api/screenshots', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        
      }
    } catch (error) {
      console.error('Error fetching screenshots:', error);
      toast.error('Failed to fetch screenshots');
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchScreenshots();
    }
  }, [isOpen]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };



  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] overflow-y-auto p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="fixed inset-0 bg-black/70 dark:bg-black/80"
          variants={backdropVariants}
          onClick={onClose}
        />

        <div className="flex min-h-screen items-center justify-center">
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 text-left shadow-2xl border border-gray-200 dark:border-gray-700"
            variants={modalVariants}
          >
          

            <motion.button
              onClick={onClose}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={isUploading}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
           
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              {/* Upload Section */}
              {!user?.isPaid && (
                <motion.div 
                  className="flex-1"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  custom={0}
                >
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                    Upload Payment Screenshot
                  </h3>

                  <div className="mt-2">
                    <motion.div
                      className={`flex justify-center rounded-lg border-2 border-dashed ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600'} px-4 sm:px-6 py-8 sm:py-10 transition-colors duration-200`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                    
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="text-center">
                         <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500" />
                            <motion.div 
                              className="mt-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              
                              <p className="pl-1 text-gray-500 dark:text-gray-400">or drag and drop</p>
                              <p className="text-xs leading-5 text-gray-600 dark:text-gray-400 mt-2">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </motion.div>
                          </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="mt-6 flex flex-col sm:flex-row justify-end gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button
                      type="button"
                      onClick={onClose}
                      className="rounded-full bg-white dark:bg-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-lg ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isUploading}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="button"
               
                      className="rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg"
                     
                    >
                      {isUploading ? (
                        <span className="flex items-center justify-center">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Uploading...
                        </span>
                      ) : (
                        'Upload'
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadModal;
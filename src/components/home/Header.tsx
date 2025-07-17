"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '@/context/AuthContext';
// import { ThemeToggleButton } from '../common/ThemeToggleButton';

import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { loading } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Loading state UI
  const LoadingHeader = () => (
    <header className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl rounded-b-2xl'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link href="/" className="block p-2 rounded-2xl">
              <span className="font-bold text-xl sm:text-2xl lg:text-3xl gradient-text dark:gradient-text transition-colors duration-300">
                <Image
                  src={theme === "dark" ? "/images/logo/wincoe.svg" : "/images/logo/wincoe.svg"}
                  alt="WIN CoE"
                  width={120}
                  height={10}
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <ThemeToggleButton /> */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-orange-200 dark:bg-orange-700 animate-pulse"></div>
              <div className="h-4 w-24 bg-orange-200 dark:bg-orange-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* <ThemeToggleButton /> */}
            <div className="w-8 h-8 rounded-full bg-orange-200 dark:bg-orange-700 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingHeader />;
  }


  return (
    <header className={` fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl rounded-b-2xl' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link href="/" className="block p-2 rounded-2xl">
              <span className="font-bold text-xl sm:text-2xl lg:text-3xl gradient-text dark:gradient-text transition-colors duration-300">
                <Image
                  src={theme === "dark" ? "/images/logo/wincoe.svg" : "/images/logo/wincoe.svg"}
                  alt="WIN CoE"
                  width={120}
                  height={10}
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Horizontal Menu */}
          <div className="hidden md:flex items-center space-x-4">


            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
              Home
            </Link>

            <Link
              href="about/"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="teams/"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
              Teams
            </Link>
            <Link
              href="news/"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
              News
            </Link>



            {/* <ThemeToggleButton /> */}


          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 focus:outline-none transition-all duration-300"
            >
              <span className="sr-only">Open menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            {/* <ThemeToggleButton /> */}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-b-2xl shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">

              <Link
                href="/"
                className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="about/" className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors duration-200"
              >
                About Us
              </Link>

              <Link
                href="teams/"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
              >
                Teams
              </Link>
              <Link
                href="news"
                className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors duration-200"
              >
                News
              </Link>

            </div>
          </div>
        )}



      </div>
    </header>
  );
};

export default Header;
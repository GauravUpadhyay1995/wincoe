"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useAuth } from '@/context/Auth/AuthContext'; // Corrected import path
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { loading, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLoginClick = () => {
    // Implement your login modal/logic here
    console.log("Login button clicked! (Modal/logic to be implemented)");
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
     { href: '/teams', label: 'Teams' },
    { href: '/events', label: 'Events' },
    { href: '/news', label: 'News' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  // Framer Motion variants for mobile menu
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, scaleY: 0.95, originY: 0 },
    visible: { opacity: 1, y: 0, scaleY: 1, originY: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, scaleY: 0.95, originY: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Framer Motion variants for theme icon smooth transition
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -90 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, rotate: 90, transition: { duration: 0.2 } },
  };


  const LoadingHeader = () => (
    <header className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 backdrop-blur-md shadow-xl rounded-b-2xl ${theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="w-28 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-orange-200 dark:bg-orange-700 animate-pulse"></div>
            <div className="h-4 w-24 bg-orange-200 dark:bg-orange-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );

  // if (loading) return <LoadingHeader />;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? `${theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-md shadow-md rounded-b-xl` : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Content */}
        <div className="flex items-center justify-between h-20 relative">

          {/* Logo (Left Aligned) - Enhanced Design */}
          <div className="flex-shrink-0 z-20">
            <Link
              href="/"
              className={`block p-2 rounded-lg transition-all duration-300 transform
                         
                         `}
              aria-label="Go to Home page"
            >
              <Image src="/images/logo/wincoe.svg" alt="WIN CoE Logo" width={120} height={40} priority />
            </Link>
          </div>

          {/* Desktop Navigation (Center Aligned) */}
          <nav className="hidden md:flex flex-1 justify-center" aria-label="Main navigation">
            <div className="flex items-center space-x-2 lg:space-x-4">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group
                    ${theme === 'dark' ? 'text-gray-200 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'}
                    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                    ${theme === 'dark' ? 'after:bg-orange-400' : 'after:bg-orange-500'}
                    after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:rounded`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right-aligned content (Theme Toggle, Auth Buttons, Mobile Toggle) */}
          <div className="flex items-center space-x-2 sm:space-x-4 ml-auto md:ml-0 z-20">

            {/* Theme Toggle Button with Smooth Icon Change (Original Outlined Icons) */}
            {/* <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110
                ${theme === 'dark'
                  ? 'text-yellow-400 hover:bg-gray-800 active:scale-95' // Keep yellow for dark mode sun
                  : 'text-gray-700 hover:bg-gray-100 active:scale-95'}
                focus:outline-none focus:ring-2 focus:ring-orange-500 relative flex items-center justify-center`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="moon" // Unique key for moon icon
                    variants={iconVariants} // Use the same animation variants
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute" // Position absolute to allow smooth transition
                  >
                   
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun" // Unique key for sun icon
                    variants={iconVariants} // Use the same animation variants
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute" // Position absolute to allow smooth transition
                  >
                   
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.575l.707-.707M6.707 17.293l-.707.707M18.66 18.66l-.707-.707M5.34 5.34l-.707-.707M12 17a5 5 0 100-10 5 5 0 000 10z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </button> */}
          
            {/* <button
              onClick={handleLoginClick}
              className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 cursor-pointer"
              aria-label="Login to your account"
            >
              Login
            </button> */}
            {/* )} */}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-all duration-300
                ${theme === 'dark' ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-800/50' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}
                focus:outline-none focus:ring-2 focus:ring-orange-500`}
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
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
          </div>
        </div>

        {/* Mobile Menu (Animated with Framer Motion) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              id="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`md:hidden absolute left-0 w-full px-4 pb-4
                ${theme === 'dark' ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'}
                border-t backdrop-blur-lg rounded-b-xl shadow-lg
                transform origin-top`}
              aria-label="Mobile navigation"
            >
              <div className="pt-2 pb-3 space-y-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500
                      ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-800/50 hover:text-orange-400' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {/* Mobile specific login/dashboard button */}
                <hr className={`my-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                {/* {user ? (
                  <Link
                    href="/dashboard"
                    className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500
                            ${theme === 'dark' ? 'text-orange-400 hover:bg-gray-800/50' : 'text-orange-600 hover:bg-orange-50'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLoginClick();
                      setIsMobileMenuOpen(false); // Close menu after click
                    }}
                    className={`w-full text-left px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500
                            ${theme === 'dark' ? 'text-orange-400 hover:bg-gray-800/50' : 'text-orange-600 hover:bg-orange-50'}`}
                    aria-label="Login to your account"
                  >
                    Login
                  </button>
                )} */}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/teams', label: 'Teams' },
    {
      href: '/events',
      label: 'Events',
      submenu: [
        { href: '/events', label: 'Events' },
        { href: '/gallery', label: 'Gallery' },
      ]
    },
    {
      href: '/more',
      label: 'More',
      submenu: [
        { href: '/news', label: 'News' },
        { href: '/steering-committee', label: 'Steering Committee' },
        { href: '/contact', label: 'Contact' },
      ]
    },
  ];

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

  useEffect(() => {
    // Set animation flag after first load
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000); // Delay slightly to ensure page is loaded

    return () => clearTimeout(timer);
  }, []);

const toggleSubmenu = (menuKey: string) => {
  setOpenSubmenus(prev => ({
    ...prev,
    [menuKey]: !prev[menuKey], // Toggle the clicked submenu
    // Close all other submenus
    ...Object.keys(prev).reduce((acc, key) => {
      if (key !== menuKey) acc[key] = false;
      return acc;
    }, {} as Record<string, boolean>)
  }));
};


  const closeAllSubmenus = () => {
    setOpenSubmenus({});
  };

  const handleLoginClick = () => {
    console.log("Login button clicked!");
  };

  // Animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, scaleY: 0.95, originY: 0 },
    visible: { opacity: 1, y: 0, scaleY: 1, originY: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, scaleY: 0.95, originY: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -90 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, rotate: 90, transition: { duration: 0.2 } },
  };

  const submenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? `${theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-md shadow-md rounded-b-xl` : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Content */}
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <div className="flex-shrink-0 z-20">
            <Link
              href="/"
              className={`block p-2 rounded-lg transition-all duration-300 transform`}
              aria-label="Go to Home page"
              onClick={closeAllSubmenus}
            >
              <Image src="/images/logo/wincoe.svg" alt="WIN CoE Logo" width={120} height={40} priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center" aria-label="Main navigation">
            <div className="flex items-center space-x-2 lg:space-x-4">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.href}
                  className="relative group"
                  initial={hasAnimated ? false : "hidden"}
                  animate="visible"
                  variants={menuItemVariants}
                  transition={{ delay: hasAnimated ? 0 : index * 0.1 }}
                >
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group
                          ${theme === 'dark' ? 'text-gray-200 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'}
                          after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                          ${theme === 'dark' ? 'after:bg-orange-400' : 'after:bg-orange-500'}
                          after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:rounded`}
                      >
                        {item.label}
                        <svg
                          className={`ml-1 h-4 w-4 inline transition-transform duration-200 ${openSubmenus[item.label] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <AnimatePresence>
                        {openSubmenus[item.label] && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={submenuVariants}
                            className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg z-50 origin-top-left
                              ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                          >
                            <div className="py-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className={`block px-4 py-2 text-sm transition-colors duration-200
                                    ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                  onClick={closeAllSubmenus}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group
                        ${theme === 'dark' ? 'text-gray-200 hover:text-orange-400' : 'text-gray-700 hover:text-orange-600'}
                        after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                        ${theme === 'dark' ? 'after:bg-orange-400' : 'after:bg-orange-500'}
                        after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:rounded`}
                      onClick={closeAllSubmenus}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Right-aligned content */}
          <div className="flex items-center space-x-2 sm:space-x-4 ml-auto md:ml-0 z-20">
            {/* Theme Toggle Button */}
            {/* <motion.div
              initial={hasAnimated ? false : "hidden"}
              animate="visible"
              variants={menuItemVariants}
              transition={{ delay: hasAnimated ? 0 : navLinks.length * 0.1 }}
            >
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110
                  ${theme === 'dark'
                    ? 'text-yellow-400 hover:bg-gray-800 active:scale-95'
                    : 'text-gray-700 hover:bg-gray-100 active:scale-95'}
                  focus:outline-none focus:ring-2 focus:ring-orange-500 relative flex items-center justify-center`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="moon"
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.575l.707-.707M6.707 17.293l-.707.707M18.66 18.66l-.707-.707M5.34 5.34l-.707-.707M12 17a5 5 0 100-10 5 5 0 000 10z" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div> */}

            {/* Mobile Menu Toggle Button */}
            <motion.div
              initial={hasAnimated ? false : "hidden"}
              animate="visible"
              variants={menuItemVariants}
              transition={{ delay: hasAnimated ? 0 : (navLinks.length + 1) * 0.1 }}
            >
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
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
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
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className={`w-full text-left px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200 flex justify-between items-center
                            ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-800/50 hover:text-orange-400' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                        >
                          {item.label}
                          <svg
                            className={`ml-2 h-4 w-4 transition-transform duration-200 ${openSubmenus[item.label] ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <AnimatePresence>
                          {openSubmenus[item.label] && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={submenuVariants}
                              className="pl-4"
                            >
                              {item.submenu.map((subItem, subIndex) => (
                                <motion.div
                                  key={subItem.href}
                                  initial={{ opacity: 0, x: 30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.05 }}
                                >
                                  <Link
                                    href={subItem.href}
                                    className={`block px-4 py-2 text-sm rounded-lg transition-colors duration-200
                                      ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-800/50 hover:text-orange-400' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'}`}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      closeAllSubmenus();
                                    }}
                                  >
                                    {subItem.label}
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200
                          ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-800/50 hover:text-orange-400' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          closeAllSubmenus();
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
{/*                 
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <hr className={`my-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                  <button
                    onClick={() => {
                      handleLoginClick();
                      setIsMobileMenuOpen(false);
                      closeAllSubmenus();
                    }}
                    className={`w-full text-left px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200
                            ${theme === 'dark' ? 'text-orange-400 hover:bg-gray-800/50' : 'text-orange-600 hover:bg-orange-50'}`}
                    aria-label="Login to your account"
                  >
                    Login
                  </button>
                </motion.div> */}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
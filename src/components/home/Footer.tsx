'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// Assuming MOBILE_WHATSAPP is correctly configured in your .env
const MOBILE_WHATSAPP = process.env.NEXT_PUBLIC_COMPANY_MOBILE_WHATSAPP;

import { useTheme } from '@/context/ThemeContext'; // Ensure this path is correct

const Footer = () => {
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Animate footer on load and set up WhatsApp pulse effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000); // Pulse duration
    }, 5000); // Interval between pulses

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12, // Slightly increased damping for smoother bounce
      },
    },
  };

  const linkVariants = {
    rest: { scale: 1, color: theme === 'dark' ? '#d1d5db' : '#4b5563' }, // Default text color
    hover: {
      scale: 1.05,
      color: theme === 'dark' ? '#fb923c' : '#ea580c', // Orange-300 dark, Orange-600 light
      transition: { duration: 0.2 },
    },
  };

  const iconLinkVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.2, transition: { type: 'spring', stiffness: 300, damping: 10 } },
  };

  return (
    <motion.footer
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`bg-gradient-to-br from-orange-50/70 via-cyan-50/70 to-blue-50/70 dark:from-gray-900 dark:via-gray-950 dark:to-black
                  border-t border-orange-200/50 dark:border-gray-800/50 mt-auto pt-16 pb-8 shadow-inner`} // Enhanced gradient and shadow
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* WhatsApp Floating Button */}
        <motion.div
          className="fixed bottom-6 right-6 z-[100]"
          initial={{ scale: 0, x: 50, y: 50 }}
          animate={{
            scale: 1,
            x: 0,
            y: 0,
            transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.8 },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <a
            href={`https://wa.me/${MOBILE_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="inline-block"
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -8, 0], // Slightly less aggressive bounce
                transition: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 4, // Slower bounce
                  ease: 'easeInOut',
                },
              }}
            >
              <motion.div
                animate={{
                  scale: isPulsing ? [1, 1.15, 1] : 1, // Slightly smaller pulse
                  boxShadow: isPulsing
                    ? `0 0 0 10px ${theme === 'dark' ? 'rgba(251, 146, 60, 0.3)' : 'rgba(234, 88, 12, 0.3)'}` // Thinner, color-aware pulse
                    : 'none',
                  transition: {
                    duration: 0.8, // Faster pulse fade
                    ease: 'easeOut',
                  },
                }}
              >
                <Image
                  src="/images/whatsapp-512.png" // Ensure this path is correct
                  alt="WhatsApp chat"
                  width={60} // Slightly larger button
                  height={60}
                  className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 text-center md:text-left" // Increased gap-y for mobile
          variants={containerVariants}
        >
          {/* Column 1: College/Org Info */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md">
              <motion.span
                className="font-bold text-3xl gradient-text dark:gradient-text"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Image
                  src={theme === "dark" ? "/images/logo/wincoe.svg" : "/images/logo/wincoe.svg"} // Consider different logos for light/dark theme if designed
                  alt="WIN CoE Logo"
                  width={140} // Slightly larger logo
                  height={45} // Adjusted height for aspect ratio
                  priority // Good for core elements
                />
              </motion.span>
            </Link>
            <motion.p
              className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-sm" // Added max-width for better readability
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 0.3 } },
              }}
            >
              Fostering innovation and community, WIN CoE at IIT Delhi is your hub for groundbreaking events, research, and collaborative initiatives. Join us in shaping the future!
            </motion.p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <motion.a href="#" target="_blank" rel="noopener noreferrer" aria-label="WIN CoE on Facebook" variants={iconLinkVariants} initial="rest" whileHover="hover">
                <Image src="/images/facebook.svg" alt="Facebook" width={24} height={24} className="filter grayscale hover:grayscale-0 transition-all duration-300" />
              </motion.a>
              <motion.a href="#" target="_blank" rel="noopener noreferrer" aria-label="WIN CoE on Twitter" variants={iconLinkVariants} initial="rest" whileHover="hover">
                <Image src="/images/twitter.svg" alt="Twitter" width={24} height={24} className="filter grayscale hover:grayscale-0 transition-all duration-300" />
              </motion.a>
              <motion.a href="#" target="_blank" rel="noopener noreferrer" aria-label="WIN CoE on LinkedIn" variants={iconLinkVariants} initial="rest" whileHover="hover">
                <Image src="/images/linkedin.svg" alt="LinkedIn" width={24} height={24} className="filter grayscale hover:grayscale-0 transition-all duration-300" />
              </motion.a>
              <motion.a href="#" target="_blank" rel="noopener noreferrer" aria-label="WIN CoE on Instagram" variants={iconLinkVariants} initial="rest" whileHover="hover">
                <Image src="/images/instagram.svg" alt="Instagram" width={24} height={24} className="filter grayscale hover:grayscale-0 transition-all duration-300" />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-bold text-gray-900 dark:text-white mb-5 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500" // Underline effect
              whileHover={{ scale: 1.02 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3 text-base">
              {[
                { path: '/', text: 'Home' },
                { path: '/about', text: 'About Us' },
                { path: '/events', text: 'Upcoming Events' }, // More specific for event site
                { path: '/news', text: 'Latest News' },
                { path: '/gallery', text: 'Event Gallery' }, // New link for photos
                { path: '/contact', text: 'Contact Us' },
              ].map((link) => (
                <motion.li
                  key={link.path}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredLink(link.path)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <Link
                    href={link.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400
                               transition-colors duration-300 py-1 block relative group" // Added group for hover effect
                  >
                    <motion.span
                      variants={linkVariants}
                      initial="rest"
                      whileHover="hover"
                      className="inline-block"
                    >
                      {link.text}
                    </motion.span>
                    <AnimatePresence>
                      {hoveredLink === link.path && (
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          exit={{ width: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 h-0.5 bg-orange-500" // Underline
                          layoutId="footer-underline" // Unique layoutId
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Details */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-bold text-gray-900 dark:text-white mb-5 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500"
              whileHover={{ scale: 1.02 }}
            >
              Get in Touch
            </motion.h3>
            <ul className="space-y-3 text-base">
              {[
                {
                  icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                  text: '+91 89297 27568',
                  href: 'tel:+918929727568',
                },
                {
                  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                  text: 'Mon-Fri: 9:00 AM - 6:00 PM', // More detailed time
                },
                {
                  icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                  text: 'info@wincoe.ac.in', // Changed to a more generic info email
                  href: 'mailto:info@wincoe.ac.in',
                },
              ].map((item, index) => (
                <motion.li key={index} variants={itemVariants} whileHover={{ x: 5 }}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 flex items-center justify-center md:justify-start gap-2 py-1"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300 flex items-center justify-center md:justify-start gap-2 py-1">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                      {item.text}
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Address & Map Link */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-bold text-gray-900 dark:text-white mb-5 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500"
              whileHover={{ scale: 1.02 }}
            >
              Campus Location
            </motion.h3>
            <motion.address
              className="not-italic text-base text-gray-700 dark:text-gray-300 space-y-2 flex flex-col items-center md:items-start"
              whileHover={{ x: 5 }}
            >
              <span>WIN CoE Foundation</span>
              <span>Block-3, Room No: 299B</span>
              <span>CBME, IIT Delhi,</span>
              <span>New Delhi, 110016, India</span> {/* Added "India" for clarity */}
            </motion.address>
            <motion.div className="mt-4" variants={itemVariants}>
              <Link
                href="https://www.google.com/maps/place/Indian+Institute+of+Technology+Delhi/@28.5451578,77.192585,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-full
             hover:bg-orange-600 transition-colors duration-300 shadow-md hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                View on Map
              </Link>

            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center" // More padding for separator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.8 } }} // Increased delay
        >
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400"
            whileHover={{ scale: 1.01 }} // Subtle hover for copyright
          >
            © {new Date().getFullYear()} WIN CoE Foundation. All rights reserved. Developed with ❤️ by Codelabs India.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
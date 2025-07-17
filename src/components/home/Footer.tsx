'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
const MOBILE_WHATSAPP = process.env.NEXT_PUBLIC_COMPANY_MOBILE_WHATSAPP;
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const linkVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      color: theme === 'dark' ? '#fb923c' : '#ea580c'
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={`bg-white dark:bg-gray-900 border-t border-orange-100 dark:border-orange-900/20 mt-auto`}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* WhatsApp Floating Button */}
        <motion.div 
          className="fixed bottom-6 right-6 z-[100]"
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            transition: { type: 'spring', stiffness: 200, damping: 15 }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <a
            href={`https://wa.me/${MOBILE_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <motion.div 
              className="relative"
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 3,
                  ease: 'easeInOut'
                }
              }}
            >
              <motion.div
                animate={{
                  scale: isPulsing ? [1, 1.2, 1] : 1,
                  boxShadow: isPulsing ? 
                    theme === 'dark' ? 
                      '0 0 0 0 rgba(234, 88, 12, 0.7)' : 
                      '0 0 0 0 rgba(234, 88, 12, 0.7)' : 
                    'none',
                  transition: {
                    duration: 1,
                    ease: 'easeOut'
                  }
                }}
              >
                <Image
                  src="/images/whatsapp-512.png"
                  alt="WhatsApp chat"
                  width={56}
                  height={56}
                  className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          </a>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left"
          variants={containerVariants}
        >
          {/* Column 1: WIN CoE Info */}
          <motion.div 
            className="min-h-[150px]"
            variants={itemVariants}
          >
            <Link href="/" className="inline-block mb-4">
              <motion.span 
                className="font-bold text-3xl gradient-text dark:gradient-text"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Image
                  src={theme === "dark" ? "/images/logo/wincoe.svg" : "/images/logo/wincoe.svg"}
                  alt="WIN CoE"
                  width={120}
                  height={10}
                />
              </motion.span>
            </Link>
            <motion.p 
              className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              The Wadhwani Innovation Network – Centre of Excellence (WIN CoE) at IIT Delhi is a collaborative initiative dedicated to transforming the future of healthcare through precision and personalized solutions.
            </motion.p>
          </motion.div>

          {/* Column 2: Contact Us */}
          <motion.div 
            className="min-h-[150px]"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Contact Us
            </motion.h3>
            <ul className="space-y-4 text-sm">
              {[
                { 
                  icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                  text: '+91 89297 27568',
                  href: 'tel:+917428400144'
                },
                { 
                  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                  text: 'Mon-Fri 9am-6pm'
                },
                { 
                  icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                  text: 'wincoe@admin.iitd.ac.in',
                  href: 'mailto:wincoe@admin.iitd.ac.in'
                }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 flex items-center justify-center md:justify-start gap-2 py-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-300 flex items-center justify-center md:justify-start gap-2 py-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                      {item.text}
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Address */}
          <motion.div 
            className="min-h-[150px]"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Our Address
            </motion.h3>
            <motion.address 
              className="not-italic text-sm text-gray-600 dark:text-gray-300 space-y-4 flex flex-col items-center md:items-start"
              whileHover={{ x: 5 }}
            >
              <span>WIN CoE Foundation</span>
              <span>Block-3, room no:299B</span>
              <span>Cbme IIT DELHI,</span>
              <span>110016, Delhi</span>
            </motion.address>
          </motion.div>

          {/* Column 4: Useful Links */}
          <motion.div 
            className="min-h-[150px]"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Useful Links
            </motion.h3>
            <ul className="space-y-4 text-sm">
              {[
                { path: '/', text: 'Home' },
                { path: '/about', text: 'About Us' },
                { path: '/teams', text: 'Teams' },
                { path: '/news', text: 'News' }
              ].map((link) => (
                <motion.li 
                  key={link.path}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredLink(link.path)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <Link 
                    href={link.path}
                    className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 py-2 block relative"
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
                          className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                          layoutId="underline"
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          <motion.p 
            className="text-sm text-gray-500 dark:text-gray-400"
            whileHover={{ scale: 1.02 }}
          >
            © {new Date().getFullYear()} WIN CoE Foundation. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
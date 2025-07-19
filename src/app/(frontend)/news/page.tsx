'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from '@/components/common/ScrollAnimation'; // Assuming this component works well
import ReadMoreButton from '@/components/common/ReadMore'; // Assuming this component works well
import { useTheme } from '@/context/ThemeContext'; // Import useTheme for theme-based styling

interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageUrl: string;
    readTime: string;
    featured?: boolean;
}

export default function NewsDisplay({ newsItems = [] }: { newsItems: NewsItem[] }) {
    if (!newsItems.length) {
        newsItems = [
            {
                id: '1',
                title: 'CBME launches online PG Diploma',
                excerpt: 'CBME launches online PG Diploma',
                category: 'Admission',
                date: '2025-06-30 14:55:38',
                imageUrl: 'images/news/news-1.jpg',
                readTime: '4 min',
                featured: true
            },
            {
                id: '2',
                title: 'M.Tech in Biomedical Engineering Admission 2025',
                excerpt: 'M.Tech in Biomedical Engineering Admission 2025',
                category: 'Admission',
                date: '2025-05-02 21:52:55',
                imageUrl: 'images/news/news-2.png',
                readTime: '6 min'
            },
            {
                id: '3',
                title: 'PhD Admissions Sem 1 2025-26',
                excerpt: 'PhD Admissions Sem 1 2025-26',
                category: 'Admission',
                date: '2025-05-02 21:47:37',
                imageUrl: 'images/news/news-3.png',
                readTime: '5 min'
            },
            {
                id: '4',
                title: 'CBME organises Colloquium on "AI in Clinical Decision Making"',
                excerpt: 'From glass morphism to kinetic typography, discover the trends shaping digital interfaces.',
                category: 'Event',
                date: '2024-11-14 18:28:56',
                imageUrl: 'images/news/news-9.png',
                readTime: '7 min'
            },
            {
                id: '5',
                title: 'Anju wins Research Communication Award 2024 and Ayesha Tooba Khan wins certificate of appreciation',
                excerpt: 'Research Communication Award 2024',
                category: 'Achievement',
                date: '2023-10-18',
                imageUrl: 'images/news/news-5.png',
                readTime: '5 min'
            },
            {
                id: '7',
                title: 'CBME Achiever of the Month - June 2024- Ayesha Tooba Khan',
                excerpt: 'Research Communication Award.',
                category: 'Achievement',
                date: '2023-10-14',
                imageUrl: 'images/news/news-6.png',
                readTime: '8 min'
            },
            {
                id: '8',
                title: 'CBME introduces MS (Research) program for doctors and health professionals',
                excerpt: 'Our Master of Science (Research) program aims to bridge the gap between the pressing demands of the healthcare ecosystem and the field of Biomedical Engineering by nurturing highly skilled human resources equipped with interdisciplinary knowledge and scientific acumen.',
                category: 'Research',
                date: '2023-10-12',
                imageUrl: 'images/news/news-8.png',
                readTime: '10 min'
            },
            {
                id: '10',
                title: 'CBME Achievers of the Month - July 2024- Raufiya Jafari & Vidit Gaur',
                excerpt: 'We are delighted to invite you all to the next session of the “CBME Achievers’ Talk” series on 23rd July 2024 (Wednesday) from 3PM to 4PM in the CBME committee room. The achievers of July 2024 are:1) Raufiya Jafari2) Vidit Gaur',
                category: 'Achievement',
                date: '2024-06-09 16:34:24',
                imageUrl: 'images/news/news-7.jpg',
                readTime: '4 min'
            }
        ];
    }
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const staticNews = newsItems;


    const categories = ['all', ...new Set(staticNews.map((item) => item.category))];
    const filteredNews = activeCategory === 'all'
        ? staticNews
        : staticNews.filter((item) => item.category === activeCategory);
    const featuredNews = staticNews.find((item) => item.featured);

    // Animation variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 100, damping: 12 }
        },
        hover: { scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
    };

    // Animation variants for mobile cards (tap effect)
    const mobileCardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
        tap: { scale: 0.98 },
    };

    // Variants for category buttons
    const buttonVariants = {
        rest: { scale: 1, backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff', color: theme === 'dark' ? '#fde68a' : '#ea580c' }, // Yellow-200 for dark, orange-600 for light
        hover: { scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: theme === 'dark' ? '#fb923c' : '#fcd34d' }, // Orange-400 for dark, Yellow-300 for light
        active: { scale: 1, backgroundColor: theme === 'dark' ? '#fb923c' : '#ea580c', color: theme === 'dark' ? '#1f2937' : '#ffffff', boxShadow: '0 4px 15px rgba(251, 146, 60, 0.4)' }, // Orange-400 dark, Orange-600 light
    };

    // Main section background based on theme
    const sectionBgClass = theme === 'dark'
        ? 'bg-gradient-to-r from-gray-900 via-gray-950 to-black text-gray-100'
        : 'bg-gradient-to-r from-orange-50 to-cyan-50 text-gray-800';
    const paddingClass = newsItems.length > 3 ? 'py-20 sm:py-24' : "py-2 sm:py-2";


    return (
        <section className={`${paddingClass} ${sectionBgClass}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <ScrollAnimation animation="fade" delay={400}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <motion.h1
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`text-4xl sm:text-5xl font-extrabold mb-4 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}
                        >
                            Our Latest News & Updates
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                            className={`text-lg sm:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                        >
                            Stay informed with the newest breakthroughs, admissions, events, and achievements from our center.
                        </motion.p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        className="flex overflow-x-auto pb-4 mb-12 gap-3 justify-start sm:justify-center scrollbar-hide" // Added scrollbar-hide for cleaner look
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                variants={buttonVariants}
                                initial="rest"
                                whileHover="hover"
                                animate={activeCategory === category ? 'active' : 'rest'}
                                onClick={() => setActiveCategory(category)}
                                className={`flex-shrink-0 px-6 py-2 rounded-full text-base font-medium transition-all duration-300 ease-in-out whitespace-nowrap
                                    ${activeCategory === category
                                        ? '' // Styles are now handled by buttonVariants active state
                                        : 'hover:border-orange-400 dark:hover:border-orange-300 border border-transparent'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Featured News */}
                    {featuredNews && activeCategory === 'all' && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="mb-16"
                        >
                            <div className={`rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-[1.005] ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                                <div className="md:flex flex-col md:flex-row">
                                    <div className="md:w-1/2 ">
                                        <motion.img
                                            whileHover={{ scale: 1.05 }} // More noticeable zoom on hover
                                            transition={{ duration: 0.5 }}
                                            className="h-64 sm:h-72 w-full object-cover md:h-full md:min-h-[350px]" // Adjusted height
                                            src={featuredNews.imageUrl}
                                            alt={featuredNews.title}
                                        />
                                    </div>
                                    <div className={`p-6 md:p-8 md:w-1/2 flex flex-col justify-center ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
                                        <div className="uppercase tracking-wide text-sm font-semibold mb-2">
                                            <span className={`px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-indigo-700 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
                                                Featured • {featuredNews.category}
                                            </span>
                                        </div>
                                        <motion.h2
                                            whileHover={{ color: theme === 'dark' ? '#fde047' : '#c2410c' }} // Yellow-400 for dark, orange-700 for light
                                            transition={{ duration: 0.3 }}
                                            className={`text-2xl sm:text-3xl font-extrabold mb-3 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                                        >
                                            {featuredNews.title}
                                        </motion.h2>
                                        <p className={`text-base mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{featuredNews.excerpt}</p>
                                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {featuredNews.date} • {featuredNews.readTime} read1
                                            </span>
                                            <ReadMoreButton itemId={featuredNews.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* News Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" // Increased gap for better spacing
                    >
                        <AnimatePresence>
                            {filteredNews
                                .filter((item) => !item.featured || activeCategory !== 'all')
                                .map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        whileHover={!isMobile ? 'hover' : undefined}
                                        whileTap={isMobile ? 'tap' : undefined}
                                        variants={isMobile ? mobileCardVariants : cardVariants}
                                        transition={{ duration: 0.4, delay: index * 0.05 }} // Staggered entry animation
                                        className={`rounded-2xl overflow-hidden shadow-lg transform ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
                                    >
                                        <div className="h-48 sm:h-56 overflow-hidden"> {/* Adjusted height */}
                                            <motion.img
                                                whileHover={!isMobile ? { scale: 1.1 } : {}}
                                                transition={{ duration: 0.5 }}
                                                className="w-full h-full object-cover"
                                                src={item.imageUrl}
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="p-5 flex flex-col h-[calc(100%-15rem)]"> {/* Added flex-col and height calculation */}
                                            <div className="flex justify-between items-center mb-3">
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-purple-700 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                                                    {item.category}
                                                </span>
                                                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.readTime} read</span>
                                            </div>
                                            <h3 className={`text-lg sm:text-xl font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                                            <p className={`text-sm mb-4 line-clamp-3 flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.excerpt}</p>
                                            <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                                                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</span>
                                                <ReadMoreButton itemId={item.id} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </motion.div>
                </ScrollAnimation>
            </div>
        </section>
    );
};


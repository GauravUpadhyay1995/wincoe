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

const NewsDisplay = () => {
    const { theme } = useTheme(); // Use the theme context

    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768); // Changed breakpoint for mobile
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const staticNews: NewsItem[] = [
        {
            id: '1',
            title: 'CBME launches online PG Diploma',
            excerpt: 'The Centre for Biomedical Engineering (CBME) at IIT Delhi is proud to announce the launch of its new online PG Diploma program, designed to bridge the gap between medical practice and technological innovation.',
            category: 'Admission',
            date: 'June 30, 2025', // More readable date format
            imageUrl: '/images/news/news-1.jpg',
            readTime: '4 min',
            featured: true
        },
        {
            id: '2',
            title: 'M.Tech in Biomedical Engineering Admission 2025 Open',
            excerpt: 'Applications are now open for the Master of Technology (M.Tech) program in Biomedical Engineering for the academic year 2025-26. Explore advanced studies and research opportunities.',
            category: 'Admission',
            date: 'May 02, 2025',
            imageUrl: '/images/news/news-2.jpg',
            readTime: '6 min'
        },
        {
            id: '3',
            title: 'PhD Admissions for Semester 1, 2025-26 Announced',
            excerpt: 'The Biomedical Engineering department invites applications for its highly competitive PhD program for the upcoming academic year. Discover cutting-edge research opportunities.',
            category: 'Admission',
            date: 'May 02, 2025',
            imageUrl: '/images/news/news-3.jpg',
            readTime: '5 min'
        },
        {
            id: '4',
            title: 'CBME Organizes Colloquium on "AI in Clinical Decision Making"',
            excerpt: 'Join us for a special colloquium focusing on the transformative role of Artificial Intelligence in enhancing clinical decision-making processes, featuring leading experts.',
            category: 'Event',
            date: 'Nov 14, 2024',
            imageUrl: '/images/news/news-4.jpg',
            readTime: '7 min'
        },
        {
            id: '5',
            title: 'Anju Wins Research Communication Award 2024; Ayesha Khan Receives Appreciation',
            excerpt: 'Congratulations to Anju for winning the prestigious Research Communication Award 2024, and Ayesha Tooba Khan for receiving a certificate of appreciation for her outstanding contributions.',
            category: 'Achievement',
            date: 'Oct 18, 2023',
            imageUrl: '/images/news/news-5.jpg',
            readTime: '5 min'
        },
        {
            id: '6',
            title: 'Dr. Sharma’s Team Publishes Breakthrough in Neuro-Imaging',
            excerpt: 'Dr. Sharma and her team have published groundbreaking research in advanced neuro-imaging techniques, opening new avenues for understanding brain disorders.',
            category: 'Research',
            date: 'Sep 25, 2024',
            imageUrl: '/images/news/news-6.jpg', // Assuming you have a news-6.jpg
            readTime: '8 min'
        },
        {
            id: '7',
            title: 'CBME Achiever of the Month - June 2024: Ayesha Tooba Khan',
            excerpt: 'We celebrate Ayesha Tooba Khan, our Achiever of the Month for June 2024, for her dedication and significant contributions to ongoing research projects.',
            category: 'Achievement',
            date: 'Oct 14, 2023', // This date seems off, assuming it should be more recent for June 2024 achiever
            imageUrl: '/images/news/news-1.jpg',
            readTime: '8 min'
        },
        {
            id: '8',
            title: 'MS (Research) Program Launched for Doctors & Health Professionals',
            excerpt: 'Our Master of Science (Research) program aims to bridge the gap between healthcare demands and Biomedical Engineering, nurturing highly skilled professionals with interdisciplinary knowledge.',
            category: 'Research',
            date: 'Oct 12, 2023',
            imageUrl: '/images/news/news-7.jpg',
            readTime: '10 min'
        },
        {
            id: '9',
            title: 'New Collaborative Research on AI in Healthcare Announced',
            excerpt: 'CBME has announced a new collaborative research initiative focused on integrating cutting-edge AI technologies into healthcare solutions, fostering interdisciplinary partnerships.',
            category: 'Research',
            date: 'June 09, 2024',
            imageUrl: '/images/news/news-8.jpg', // Assuming you have a news-8.jpg
            readTime: '6 min'
        },
        {
            id: '10',
            title: 'CBME Achievers of the Month - July 2024: Raufiya Jafari & Vidit Gaur',
            excerpt: 'We are delighted to invite you all to the next session of the “CBME Achievers’ Talk” series on July 23, 2024. This month, we recognize Raufiya Jafari and Vidit Gaur for their outstanding work.',
            category: 'Achievement',
            date: 'June 09, 2024',
            imageUrl: '/images/news/news-9.jpg', // Assuming you have a news-9.jpg
            readTime: '4 min'
        },
        {
            id: '11',
            title: 'CBME Achiever of the Month - June 2024: Ayesha Tooba Khan', // Duplicate title, kept for demonstration
            excerpt: 'The third session of the “CBME Achievers’ Talk” series on June 26, 2024, will feature Ayesha Tooba Khan, sharing her insights and experiences.',
            category: 'Achievement',
            date: 'June 09, 2024',
            imageUrl: '/images/news/news-10.jpg', // Assuming you have a news-10.jpg
            readTime: '7 min'
        },
        {
            id: '12',
            title: 'Himanshu Rikhari Awarded Best Research Paper at 2024 IEEE InC4',
            excerpt: 'CBME congratulates Mr. Himanshu Rikhari, a 4th-year PhD student at MedImg lab, for receiving the Best Research Paper Award at the 2024 IEEE International Conference on Contemporary Computing and Communications (InC4) for his work "Lung Nodule Segmentation with CT Imaging use Deep Learning ResNet."',
            category: 'Research',
            date: 'June 09, 2024',
            imageUrl: '/images/news/news-11.jpg', // Assuming you have a news-11.jpg
            readTime: '9 min'
        }
    ];

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

    return (
        <section className={`py-20 sm:py-24 ${sectionBgClass}`}>
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
                                                {featuredNews.date} • {featuredNews.readTime} read
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
                                        <div className="p-5 flex flex-col h-[calc(100%-12rem)]"> {/* Added flex-col and height calculation */}
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

export default NewsDisplay;
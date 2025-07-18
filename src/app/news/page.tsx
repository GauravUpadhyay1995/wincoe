'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import ReadMoreButton from '@/components/common/ReadMore';

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

    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const staticNews: NewsItem[] = [
        {
            id: '1',
            title: 'UQ HDR Student Mobility Program',
            excerpt: 'Vercel announces major update to Next.js featuring built-in Server Actions and improved performance.',
            category: 'technology',
            date: '2023-10-26',
            imageUrl: 'images/news/news-1.jpg',
            readTime: '4 min',
            featured: true
        },
        {
            id: '2',
            title: 'The Rise of AI-Powered Development Tools',
            excerpt: 'How GitHub Copilot and similar tools are changing the way developers write code.',
            category: 'technology',
            date: '2023-10-24',
            imageUrl: 'images/news/news-2.jpg',
            readTime: '6 min'
        },
        {
            id: '3',
            title: 'Sustainable Web Design Practices',
            excerpt: 'Learn how optimizing your website can reduce energy consumption and carbon emissions.',
            category: 'environment',
            date: '2023-10-22',
            imageUrl: 'images/news/news-3.jpg',
            readTime: '5 min'
        },
        {
            id: '4',
            title: '2024 UI Design Trends: What to Expect',
            excerpt: 'From glass morphism to kinetic typography, discover the trends shaping digital interfaces.',
            category: 'design',
            date: '2023-10-20',
            imageUrl: 'images/news/news-4.jpg',
            readTime: '7 min'
        },
        {
            id: '5',
            title: 'Remote Work: Productivity Tips for Developers',
            excerpt: 'Expert strategies for maintaining focus and efficiency when working from home.',
            category: 'business',
            date: '2023-10-18',
            imageUrl: 'images/news/news-5.jpg',
            readTime: '5 min'
        },
        {
            id: '6',
            title: 'TypeScript 5.2 Adds New Utility Types',
            excerpt: 'Latest TypeScript release introduces several quality-of-life improvements for developers.',
            category: 'technology',
            date: '2023-10-16',
            imageUrl: 'images/news/news-6.jpg',
            readTime: '3 min'
        },
        {
            id: '7',
            title: 'The Psychology of Color in Web Design',
            excerpt: 'How different color schemes affect user behavior and conversion rates.',
            category: 'design',
            date: '2023-10-14',
            imageUrl: 'images/news/news-1.jpg',
            readTime: '8 min'
        },
        {
            id: '8',
            title: 'CBME launches online PG Diploma',
            excerpt: 'CBME launches online PG Diploma',
            category: 'development',
            date: '2023-10-12',
            imageUrl: 'images/news/news-7.jpg',
            readTime: '10 min'
        },
        {
            id: '9',
            title: 'CBME introduces MS (Research) program for doctors and health professionals',
            excerpt: 'Our Master of Science (Research) program aims to bridge the gap between the pressing demands of the healthcare ecosystem and the field of Biomedical Engineering by nurturing highly skilled human resources equipped with interdisciplinary knowledge and scientific acumen.',
            category: 'technology',
            date: '2023-10-10',
            imageUrl: 'images/news/news-1.jpg',
            readTime: '6 min'
        },
        {
            id: '10',
            title: 'CBME Achievers of the Month - July 2024- Raufiya Jafari & Vidit Gaur',
            excerpt: 'We are delighted to invite you all to the next session of the “CBME Achievers’ Talk” series on 23rd July 2024 (Wednesday) from 3PM to 4PM in the CBME committee room. The achievers of July 2024 are:1) Raufiya Jafari2) Vidit Gaur',
            category: 'environment',
            date: '2023-10-08',
            imageUrl: 'images/news/news-1.jpg',
            readTime: '4 min'
        },
        {
            id: '11',
            title: 'CBME Achiever of the Month - June 2024- Ayesha Tooba Khan',
            excerpt: 'SWe are delighted to invite you all to the third session of the “CBME Achievers’ Talk” series on 26th June 2024 (Wednesday) from 3PM to 4PM in the CBME committee room. The achiever for the month of June 2024 is Ayesha Tooba Khan.',
            category: 'design',
            date: '2023-10-06',
            imageUrl: 'images/news/news-1.jpg',
            readTime: '7 min'
        },
        {
            id: '12',
            title: 'Anju wins Research Communication Award 2024 and Ayesha Tooba Khan wins certificate of appreciation',
            excerpt: 'PhD student Anju (2019BMZ8613) has won the Research Communication Award 2024 for her submission titled "Plants also get sick". The award recognizes her ability to effectively communicate her research and scientific contributions. The award carries a cash prize and a certificate.PhD student Ayesha Tooba Khan (2020BMZ8122) has also received a certificate of appreciation for her excellent submission titled "Learning from slips". Congratulations Anju and Ayesha!!!',
            category: 'development',
            date: '2023-10-04',
            imageUrl: 'images/news/news-1.jpg',
            readTime: '9 min'
        }
    ];

    const categories = ['all', ...new Set(staticNews.map((item) => item.category))];
    const filteredNews = activeCategory === 'all'
        ? staticNews
        : staticNews.filter((item) => item.category === activeCategory);
    const featuredNews = staticNews.find((item) => item.featured);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        hover: { scale: 1.03 },
    };

    const mobileCardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
        tap: { scale: 0.98 },
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 ">
            <Header />
            <main className="overflow-hidden">
                <section className="py-24 bg-gradient-to-r from-orange-50 to-cyan-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <ScrollAnimation animation="fade" delay={400}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <div className="text-center mb-8 sm:mb-16">
                                    <motion.h1
                                        initial={{ y: -20 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-3xl sm:text-4xl font-bold text-orange-600 mb-3"
                                    >
                                        Latest News
                                    </motion.h1>
                                    <motion.p
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="text-lg text-gray-600"
                                    >
                                        Stay updated with our curated news feed
                                    </motion.p>
                                </div>

                                {/* Category Filter */}
                                <motion.div
                                    className="flex overflow-x-auto pb-4 mb-8 gap-2 justify-start sm:justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {categories.map((category) => (
                                        <motion.button
                                            key={category}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveCategory(category)}
                                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                                    ? 'bg-orange-300 text-orange-600 shadow-md'
                                                    : 'bg-white text-orange-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </motion.button>
                                    ))}
                                </motion.div>

                                {/* Featured News */}
                                {featuredNews && activeCategory === 'all' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="mb-12"
                                    >
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ">
                                            <div className="md:flex">
                                                <div className="md:w-1/2 ">
                                                    <motion.img
                                                        whileHover={{ scale: 1.03 }}
                                                        className="h-48 sm:h-64 w-full object-cover md:h-full "
                                                        src={featuredNews.imageUrl}
                                                        alt={featuredNews.title}
                                                    />
                                                </div>
                                                <div className="p-6 md:w-1/2 bg-gradient-to-r from-orange-50 to-cyan-50">
                                                    <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-1">
                                                        Featured • {featuredNews.category}
                                                    </div>
                                                    <motion.h2
                                                        whileHover={{ color: '#4f46e5' }}
                                                        className="text-xl font-bold text-gray-900 mb-2"
                                                    >
                                                        {featuredNews.title}
                                                    </motion.h2>
                                                    <p className="text-sm text-gray-600 mb-3">{featuredNews.excerpt}</p>
                                                    <div className="flex justify-between items-center mt-4">
                                                        <span className="text-xs text-gray-500">
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
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    <AnimatePresence>
                                        {filteredNews
                                            .filter((item) => !item.featured || activeCategory !== 'all')
                                            .map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    layout
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="hidden"
                                                    whileHover={!isMobile ? 'hover' : undefined}
                                                    whileTap={isMobile ? 'tap' : undefined}
                                                    variants={isMobile ? mobileCardVariants : cardVariants}
                                                    transition={{ duration: 0.3 }}
                                                    className="bg-gradient-to-r from-orange-50 to-cyan-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl "
                                                >
                                                    <div className="h-40 sm:h-48 overflow-hidden">
                                                        <motion.img
                                                            whileHover={!isMobile ? { scale: 1.1 } : {}}
                                                            className="w-full h-full object-cover"
                                                            src={item.imageUrl}
                                                            alt={item.title}
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                                                                {item.category}
                                                            </span>
                                                            <span className="text-xs text-gray-500">{item.readTime}</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.excerpt}</p>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs text-gray-500">{item.date}</span>
                                                            <ReadMoreButton itemId={item.id} />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        </ScrollAnimation>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default NewsDisplay;

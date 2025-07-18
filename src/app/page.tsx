"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import Carousel from '@/components/carousel/carousel';
import UpcomingEvent from './(frontend)/events/upcomming';
import ScrollLinked from '@/components/wave/scrollLinked';
import WhatWeDo from '@/components/what-we-do/page';
import NewsEvents from './(frontend)/events/page';
import Gallery from './(frontend)/events/gallery';
import Photo from './(frontend)/events/photo';
import ImportantDocuments from './important-document/page';
import { motion } from "framer-motion";

export default function HomePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const images = [
        {
            title: "Personalized Medicine & Rehabilitation",
            subtitle: "Empowering recovery with tailored treatments",
            bgImage: "/images/gallery/gallery-1.jpg",
            cta: "Learn More",
            ctaLink: "/programs/rehabilitation"
        },
        {
            title: "EXPLORE OUR WORLD-CLASS INFRASTRUCTURE",
            subtitle: "Cutting-edge labs, innovation hubs, and smart classrooms",
            bgImage: "/images/gallery/gallery-2.jpg",
            cta: "Explore Campus",
            ctaLink: "/infrastructure"
        },
        {
            title: "Diagnostic Tools",
            subtitle: "Advanced tools for accurate health assessments",
            bgImage: "/images/gallery/gallery-3.jpg",
            cta: "See Our Tech",
            ctaLink: "/facilities/diagnostics"
        },
        {
            title: "Bio-Imaging and AI as Diagnostic Tools",
            subtitle: "Integrating AI with imaging for early detection",
            bgImage: "/images/gallery/gallery-4.jpg",
            cta: "See How It Works",
            ctaLink: "/research/bio-imaging-ai"
        },
        {
            title: "Assistive Technology for Elderly & Disabled",
            subtitle: "Innovations enhancing mobility and independence",
            bgImage: "/images/gallery/gallery-5.jpeg",
            cta: "Explore Solutions",
            ctaLink: "/research/assistive-tech"
        },
        {
            title: "Low-cost wearables health devices",
            subtitle: "Affordable tech for real-time health monitoring",
            bgImage: "/images/gallery/gallery-6.jpg",
            cta: "Discover Devices",
            ctaLink: "/projects/wearables"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-orange-50 to-cyan-50 text-gray-800 dark:text-white dark:from-gray-900 dark:to-gray-800">
            <Header />
            <main className="flex-grow">
                <ScrollLinked />

                {/* Hero Section */}
                <section className="relative min-h-screen pt-24 overflow-hidden shadow-xl">
                    <Carousel images={images} />
                </section>

                {/* What We Do */}
                <section className="py-12 px-4">
                    <WhatWeDo />
                </section>

                {/* Upcoming Events */}
                <section className="py-12 bg-gradient-to-b from-orange-100 to-white dark:from-gray-800 dark:to-gray-900">
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>
                            <motion.h2
                                className="text-3xl font-bold text-center text-orange-600 mb-10"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex justify-center items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ec4a0a" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                                    </svg>
                                    Upcoming Events
                                </div>
                            </motion.h2>

                            <UpcomingEvent
                                title="Annual HealthTech Symposium"
                                date="2025-10-15T18:00:00"
                                description="Join us for the premier gathering of healthcare innovators."
                                image="/images/gallery/gallery-1.jpg"
                                ctaText="Secure Your Spot"
                                delay={0}
                            />
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Gallery */}
                <section className="py-12">
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>
                            <Gallery />
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Photo */}
                <section className="py-12 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>
                            <Photo />
                        </ScrollAnimation>
                    </div>
                </section>

                {/* News & Events */}
                <section className="py-12">
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>
                            <NewsEvents />
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Important Documents */}
                <section className="py-12 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>
                            <ImportantDocuments />
                        </ScrollAnimation>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import Carousel from '@/components/carousel/carousel';
import ScrollLinked from '@/components/wave/scrollLinked';
import WhatWeDo from '@/app/(frontend)/what-we-do/page';
import Photo from './(frontend)/events/photo';
// import ImportantDocuments from './(frontend)/docs-links/page';
import { motion } from "framer-motion";
import NewsDisplay from './(frontend)/news/page';
import ThematicAreas from '@/components/common/ThematicArea';
import Events from '@/app/(frontend)/events/page'

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
        // {
        //     title: "EXPLORE OUR WORLD-CLASS INFRASTRUCTURE",
        //     subtitle: "Cutting-edge labs, innovation hubs, and smart classrooms",
        //     bgImage: "/images/gallery/gallery-2.jpg",
        //     cta: "Explore Campus",
        //     ctaLink: "/infrastructure"
        // },
        // {
        //     title: "Diagnostic Tools",
        //     subtitle: "Advanced tools for accurate health assessments",
        //     bgImage: "/images/gallery/gallery-3.jpg",
        //     cta: "See Our Tech",
        //     ctaLink: "/facilities/diagnostics"
        // },
        // {
        //     title: "Bio-Imaging and AI as Diagnostic Tools",
        //     subtitle: "Integrating AI with imaging for early detection",
        //     bgImage: "/images/gallery/gallery-4.jpg",
        //     cta: "See How It Works",
        //     ctaLink: "/research/bio-imaging-ai"
        // },
        // {
        //     title: "Assistive Technology for Elderly & Disabled",
        //     subtitle: "Innovations enhancing mobility and independence",
        //     bgImage: "/images/gallery/gallery-5.jpeg",
        //     cta: "Explore Solutions",
        //     ctaLink: "/research/assistive-tech"
        // },
        // {
        //     title: "Low-cost wearables health devices",
        //     subtitle: "Affordable tech for real-time health monitoring",
        //     bgImage: "/images/gallery/gallery-6.jpg",
        //     cta: "Discover Devices",
        //     ctaLink: "/projects/wearables"
        // }
    ];
    const Pastevents = [

        {
            title: "WIN CoE Inauguration",
            date: "December 2024",
            description:
                "Official launch of the Wadhwani Innovation Network Centre of Excellence",
            image: "/images/past-events/image-01.jpg",
        },

        {
            title: "First Grant Recipients Announcement",
            date: "March 2025",
            description: "Celebrating the first round of grant recipients",
            image: "/images/past-events/image-02.jpg",
        },
        {
            title: "HealthTech Symposium",
            date: "June 2025",
            description: "Annual symposium on healthcare technology innovations",
            image: "/images/past-events/image-03.jpg",
        },
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
                    <WhatWeDo customLimit={2} />
                </section>

             

                {/*  Events */}
                <section className="py-12">
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>

                            <Events customLimit={1} />
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Photo */}
                <section className="py-12 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>
                            <Photo customLimit={6} />
                        </ScrollAnimation>
                    </div>
                </section>

                {/* News */}
                <section >
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>
                            <NewsDisplay customLimit={3} />
                        </ScrollAnimation>
                    </div>
                </section>

                {/* Important Documents */}
                {/* <section className="py-12 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
                    <div className="container mx-auto max-w-6xl px-4">
                        <ScrollAnimation animation="fade" delay={400}>
                            <ImportantDocuments />
                        </ScrollAnimation>
                    </div>
                </section> */}
                <section className="py-12 px-4">
                    <ThematicAreas />
                </section>
            </main>
            <Footer />
        </div>
    );
}

// environment variables
// JWT_SECRET=your_super_secret_key_here
// NEXT_PUBLIC_API_URL=http://localhost:3000/api
// MONGODB_URI="mongodb://localhost:27017"
// MONGODB_DB="db_wincoe"

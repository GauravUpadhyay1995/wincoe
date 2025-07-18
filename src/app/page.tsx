"use client";


import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import Carousel from '@/components/carousel/carousel';
import UpcomingEvent from './events/upcomming';
import { useState, useEffect } from 'react';
// import WavyText from '@/components/wave/page'; // Assuming WavyText is in the wave folder   
// import MouseCursor from '@/components/wave/cursor'; // Assuming cursor is in the wave folder 
import ScrollLinked from '@/components/wave/scrollLinked'; // Assuming scrollLinked is in the wave folder   
import WhatWeDo from '@/components/what-we-do/page'; // Assuming team is in the teams folder
import NewsEvents from '../app/events/page'; // Assuming NewsEvents is in the events folder  
import Gallery from '../app/events/gallery';
import Photo from '../app/events/photo'; // Assuming Photo is in the events folder
import { motion } from "framer-motion";
import ImportantDocuments from './important-document/page';




export default function HomePage() {
    useEffect(() => {
        document.title = 'Rewards | WIN CoE';
    }, []);

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




    // const [isVisible, setIsVisible] = useState(false);

    const [mounted, setMounted] = useState(false);






    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (

        <div className="min-h-screen flex flex-col bg-gradient-to-r from-orange-50 to-cyan-50">
            <Header />
            <main className="flex-grow">
                <ScrollLinked />
                {/* Hero Section */}
                <section className=" relative min-h-screen flex items-center pt-20   bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden  shadow-lg">
                    <Carousel images={images} />
                </section>
                <section className=" ">
                    <WhatWeDo />
                </section>




                {/* upcomming Section */}
                <section className="mt-4">
                    <div className="container max-w-6xl mx-auto"> {/* Increased max-width */}
                        <div className="flex flex-col md:flex-row items-center gap-12"> {/* Flex container */}

                            <div className="w-full">
                                <ScrollAnimation animation="fade" className="mb-12" delay={400}>
                                    <motion.h2
                                        className="text-3xl font-bold text-orange-600 flex items-center justify-center gap-4 mb-4"
                                        initial={{ opacity: 0, y: -20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#ec4a0a" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                                        </svg>

                                        Upcoming Events
                                    </motion.h2>
                                    <UpcomingEvent
                                        title="Annual HealthTech Symposium"
                                        date="2025-10-15T18:00:00" // ISO format with time
                                        description="Join us for the premier gathering of healthcare innovators."
                                        image="/images/gallery/gallery-1.jpg"
                                        ctaText="Secure Your Spot"
                                        delay={0}
                                    />

                                </ScrollAnimation>


                            </div>


                        </div>
                    </div>
                </section>

                {/* gallery Section */}
                <section className="mt-10">
                    <div className="container mx-auto max-w-6xl"> {/* Increased max-width */}
                        <div className="flex flex-col md:flex-row items-center gap-12"> {/* Flex container */}

                            <div className="w-full">
                                <ScrollAnimation animation="fade" className="mb-12" delay={400}>

                                    <Gallery />

                                </ScrollAnimation>


                            </div>



                        </div>
                    </div>
                </section>
                {/* photo Section */}
                <section className="mt-10">
                    <div className="container mx-auto max-w-6xl"> {/* Increased max-width */}
                        <div className="flex flex-col md:flex-row items-center gap-12"> {/* Flex container */}

                            <div className="w-full">
                                <ScrollAnimation animation="fade" className="mb-12" delay={400}>

                                    <Photo />

                                </ScrollAnimation>


                            </div>



                        </div>
                    </div>
                </section>

                {/* video Section */}
                <section className="shadow-inner-top">
                    <div className="container mx-auto  max-w-6xl"> {/* Increased max-width */}
                        <div className="flex flex-col md:flex-row items-center gap-12"> {/* Flex container */}

                            <div className="w-full">
                                <ScrollAnimation animation="fade" className="mb-12" delay={400}>
                                    <NewsEvents />

                                </ScrollAnimation>


                            </div>


                        </div>
                    </div>
                </section>
                {/* Important document Section */}
                <section className="shadow-inner-top">
                    <div className="container mx-auto  max-w-6xl"> {/* Increased max-width */}
                        <div className="flex flex-col md:flex-row items-center gap-12"> {/* Flex container */}

                            <div className="w-full">
                                <ScrollAnimation animation="fade" className="mb-12" delay={400}>
                                    <ImportantDocuments />

                                </ScrollAnimation>


                            </div>


                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}




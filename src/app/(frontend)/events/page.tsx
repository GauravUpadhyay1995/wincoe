"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import PastEvents from "./pastEvent";

const events = [
  {
    title: "WIN CoE Inauguration",
    date: "December 2024",
    description: "Official launch of the Wadhwani Innovation Network Centre of Excellence",
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
  // ... (rest same)
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
};

export default function NewsEvents() {
  const { theme } = useTheme();

  const upcomingEvents = [
    {
      id: 1,
      title: "Future of Healthcare Summit 2025",
      date: "August 20, 2025",
      time: "9:00 AM - 5:00 PM IST",
      location: "IIT Delhi Auditorium",
      description: "Join industry leaders and researchers to discuss the future trends in healthcare technology and innovation.",
      link: "/events/healthcare-summit",
    },
    {
      id: 2,
      title: "Workshop: AI in Medical Imaging",
      date: "September 5-6, 2025",
      time: "10:00 AM - 4:00 PM IST",
      location: "WIN CoE Lab, IIT Delhi",
      description: "A hands-on workshop exploring the latest advancements and applications of AI in medical imaging diagnostics.",
      link: "/events/ai-imaging-workshop",
    },
    {
      id: 3,
      title: "Guest Lecture: Precision Oncology",
      date: "October 1, 2025",
      time: "3:00 PM - 4:30 PM IST",
      location: "Online (Zoom)",
      description: "Dr. Emily Chen from Stanford University will share insights on the cutting-edge research in precision oncology.",
      link: "/events/precision-oncology-lecture",
    },
  ];

  // Fix: Trigger animation after mount
  const [animateVisible, setAnimateVisible] = useState(false);
  useEffect(() => {
    setAnimateVisible(true);
  }, []);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-gray-800"}`}>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('/images/hero/news-events-hero.jpg')] bg-cover bg-center"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-4 text-white text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="inline-block bg-gradient-to-r from-orange-400 to-cyan-300 text-transparent bg-clip-text">
                Events
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-3xl mx-auto font-medium"
              variants={itemVariants}
            >
              Stay updated with the latest from WIN CoE: breakthroughs, collaborations, and upcoming gatherings.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={animateVisible ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-7xl mx-auto"
        >
         <motion.h2
            className="text-3xl font-bold text-orange-600 flex items-center justify-center gap-4 mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ margin: '-100px' }}

          >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#ec4a0a" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>

            Upcoming Events
          </motion.h2>

          <motion.p
           
            className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto"
          >
            Don't miss out on our upcoming seminars, workshops, and conferences.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                className={`rounded-xl shadow-lg p-6 flex flex-col h-full cursor-pointer ${
                  theme === "dark" ? "bg-gray-800 hover:shadow-purple-500/20" : "bg-white hover:shadow-xl"
                }`}
                whileHover={{ y: -5 }}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  {event.title}
                </h3>
                <p className={`text-sm flex items-center mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  <FiCalendar className="mr-2 text-orange-500" /> {event.date}
                </p>
                <p className={`text-sm flex items-center mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  <FiClock className="mr-2 text-orange-500" /> {event.time}
                </p>
                <p className={`text-sm flex items-center mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  <FiMapPin className="mr-2 text-orange-500" /> {event.location}
                </p>
                <p className={`text-base flex-grow ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {event.description}
                </p>
                <Link
                  href={event.link}
                  className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Past Events */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={animateVisible ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-7xl mx-auto"
        >
          <PastEvents events={events} />
        </motion.div>
      </section>
    </div>
  );
}

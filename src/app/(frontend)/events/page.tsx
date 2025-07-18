"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiPlay, FiX, FiCalendar, FiMapPin, FiGlobe, FiClock } from 'react-icons/fi'; // Added more icons
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext'; // Assuming you have ThemeContext

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.15,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
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
  const { theme } = useTheme(); // Use the theme context
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    videoUrl: string; // This should be the full YouTube embed URL or just the video ID
    description: string;
    speaker: string;
  } | null>(null);

  // Dummy Video Data (using a common placeholder YouTube ID for demonstration)
  const videos = [
    {
      title: "Director's Welcome Message",
      speaker: "Prof. Rakesh Kumar",
      description: "A warm welcome from the Director, highlighting the vision and mission of WIN-CoE IIT Delhi.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder YouTube video ID
    },
    {
      title: "Vision Behind WIN CoE",
      speaker: "Prof. Neetu Singh",
      description: "Insights into the foundational vision of WIN CoE, its innovative approach, and impact on healthcare.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Objectives & Focus Areas",
      speaker: "Dr. Anjali Sharma",
      description: "Detailed explanation of WIN CoE's core objectives and key research focus areas for future grants.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Collaborative Research Initiatives",
      speaker: "Dr. Rohan Gupta",
      description: "Exploring the collaborative spirit at WIN CoE and how interdisciplinary teams drive innovation.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Impact on Public Health",
      speaker: "Dr. Priya Singh",
      description: "Discussion on how WIN CoE's research translates into tangible benefits for public health and society.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Future of Personalized Medicine",
      speaker: "Prof. Vivek Mehta",
      description: "A look into the future of personalized medicine and WIN CoE's role in shaping it.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
  ];

  // Dummy News Data
  const newsArticles = [
    {
      id: 1,
      title: "WIN CoE Secures Major Grant for AI in Diagnostics",
      date: "July 10, 2025",
      image: "/images/news/news1.jpg", // Placeholder image
      snippet: "WIN CoE at IIT Delhi has been awarded a significant grant to advance AI-driven diagnostic tools, promising faster and more accurate disease detection...",
      link: "/news/ai-diagnostics-grant"
    },
    {
      id: 2,
      title: "Breakthrough in Personalized Cancer Therapy Announced",
      date: "June 28, 2025",
      image: "/images/news/news2.jpg", // Placeholder image
      snippet: "Researchers at WIN CoE have made a groundbreaking discovery in developing personalized cancer therapies, offering new hope for patients...",
      link: "/news/cancer-therapy-breakthrough"
    },
    {
      id: 3,
      title: "New Partnership with Global Pharma Giant Formed",
      date: "June 15, 2025",
      image: "/images/news/news3.jpg", // Placeholder image
      snippet: "WIN CoE is proud to announce a strategic partnership with a leading global pharmaceutical company to accelerate drug discovery...",
      link: "/news/pharma-partnership"
    },
    {
      id: 4,
      title: "WIN CoE Hosts International Symposium on Bioengineering",
      date: "May 20, 2025",
      image: "/images/news/news4.jpg", // Placeholder image
      snippet: "The recent international symposium brought together top minds in bioengineering, fostering collaboration and knowledge exchange...",
      link: "/news/bioengineering-symposium"
    },
  ];

  // Dummy Event Data
  const upcomingEvents = [
    {
      id: 1,
      title: "Future of Healthcare Summit 2025",
      date: "August 20, 2025",
      time: "9:00 AM - 5:00 PM IST",
      location: "IIT Delhi Auditorium",
      description: "Join industry leaders and researchers to discuss the future trends in healthcare technology and innovation.",
      link: "/events/healthcare-summit"
    },
    {
      id: 2,
      title: "Workshop: AI in Medical Imaging",
      date: "September 5-6, 2025",
      time: "10:00 AM - 4:00 PM IST",
      location: "WIN CoE Lab, IIT Delhi",
      description: "A hands-on workshop exploring the latest advancements and applications of AI in medical imaging diagnostics.",
      link: "/events/ai-imaging-workshop"
    },
    {
      id: 3,
      title: "Guest Lecture: Precision Oncology",
      date: "October 1, 2025",
      time: "3:00 PM - 4:30 PM IST",
      location: "Online (Zoom)",
      description: "Dr. Emily Chen from Stanford University will share insights on the cutting-edge research in precision oncology.",
      link: "/events/precision-oncology-lecture"
    },
  ];


  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  // Parallax effect for the hero section background if needed
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const openVideo = (video: typeof videos[0]) => {
    setSelectedVideo({
      title: video.title,
      videoUrl: video.videoUrl,
      description: video.description,
      speaker: video.speaker
    });
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  // Refs for section animations
  const videoBytesRef = useRef(null);
  const videoBytesInView = useInView(videoBytesRef, { once: true, amount: 0.2 });

  const newsRef = useRef(null);
  const newsInView = useInView(newsRef, { once: true, amount: 0.2 });

  const eventsRef = useRef(null);
  const eventsInView = useInView(eventsRef, { once: true, amount: 0.2 });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-800'}`} ref={containerRef}>

      {/* Hero Section for News & Events */}
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
                News & Events
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


      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center text-orange-300 hover:text-white bg-gray-900/90 hover:bg-orange-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/30 border border-orange-300/30 hover:border-orange-600"
                aria-label="Close video"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Video Container */}
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Bytes Section */}
      <section ref={videoBytesRef} className={`py-20 container mx-auto px-4 ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
        <motion.div
          initial="hidden"
          animate={videoBytesInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            className={`text-4xl font-extrabold flex items-center justify-center gap-4 mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            variants={itemVariants}
          >
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center transform transition-transform">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white ml-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            Video Bytes
          </motion.h2>

          <motion.p
            className={`text-lg text-center mb-12 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            variants={itemVariants}
          >
            Insights from our leadership and partners about WIN CoE's vision and opportunities.
          </motion.p>

          <div className="flex items-center justify-end mb-4">
            <Link
              href="/events" // Link to a dedicated events page for all videos
              className="text-sm font-medium text-orange-600 hover:text-orange-800 transition-colors"
            >
              View All Videos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => {
              // Extract YouTube video ID from URL for thumbnail
              const videoIdMatch = video.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
              const videoId = videoIdMatch ? videoIdMatch[1] : 'dQw4w9WgXcQ'; // Fallback to a common placeholder
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

              return (
                <motion.div
                  key={index}
                  variants={cardVariants} // Apply card animation variant
                  className={`rounded-xl shadow-lg p-6 flex flex-col h-full cursor-pointer
                             ${theme === 'dark' ? 'bg-gray-800 hover:shadow-orange-500/20' : 'bg-white hover:shadow-xl'}`}
                  whileHover={{ y: -5 }} // Subtle lift on hover
                  onClick={() => openVideo(video)}
                >
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden group">
                    {/* YouTube Thumbnail */}
                    <Image
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3} // Prioritize loading for first few videos
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <div className="relative z-10 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <FiPlay className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge (dummy for now) */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      4:43
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {video.title}
                    </h3>
                    <p className={`text-sm mb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {video.speaker}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => openVideo(video)}
                      className="inline-flex items-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors"
                    >
                      Watch Video
                      <FiPlay className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Latest News Section */}
      <section ref={newsRef} className={`py-20 container mx-auto px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div
          initial="hidden"
          animate={newsInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            className={`text-4xl font-extrabold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            variants={itemVariants}
          >
            Latest News
          </motion.h2>
          <motion.p
            className={`text-lg text-center mb-12 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            variants={itemVariants}
          >
            Stay informed with the latest updates, achievements, and breakthroughs from WIN CoE.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsArticles.map((article, index) => (
              <motion.div
                key={article.id}
                variants={cardVariants}
                className={`rounded-xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer
                           ${theme === 'dark' ? 'bg-gray-800 hover:shadow-cyan-500/20' : 'bg-white hover:shadow-xl'}`}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {article.date}
                  </p>
                  <h3 className={`text-xl font-bold mb-3 flex-grow ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {article.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.snippet}
                  </p>
                  <Link
                    href={article.link}
                    className="mt-4 inline-flex items-center text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold text-lg shadow-lg
                         hover:from-cyan-600 hover:to-blue-700 transition-colors duration-300
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
            >
              View All News
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Upcoming Events Section */}
      <section ref={eventsRef} className={`py-20 container mx-auto px-4 ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
        <motion.div
          initial="hidden"
          animate={eventsInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            className={`text-4xl font-extrabold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            variants={itemVariants}
          >
            Upcoming Events
          </motion.h2>
          <motion.p
            className={`text-lg text-center mb-12 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            variants={itemVariants}
          >
            Don't miss out on our upcoming seminars, workshops, and conferences.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                className={`rounded-xl shadow-lg p-6 flex flex-col h-full cursor-pointer
                           ${theme === 'dark' ? 'bg-gray-800 hover:shadow-purple-500/20' : 'bg-white hover:shadow-xl'}`}
                whileHover={{ y: -5 }}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {event.title}
                </h3>
                <p className={`text-sm flex items-center mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FiCalendar className="mr-2 text-orange-500" /> {event.date}
                </p>
                <p className={`text-sm flex items-center mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FiClock className="mr-2 text-orange-500" /> {event.time}
                </p>
                <p className={`text-sm flex items-center mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FiMapPin className="mr-2 text-orange-500" /> {event.location}
                </p>
                <p className={`text-base flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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

          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg
                         hover:from-purple-600 hover:to-pink-700 transition-colors duration-300
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
            >
              View All Events
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
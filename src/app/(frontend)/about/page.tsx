'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Assuming you have a ThemeContext. If not, you can remove the related lines
// import { useTheme } from '@/context/ThemeContext';

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

type Particle = {
  width: number;
  height: number;
  left: string;
  top: string;
  x: number;
  y: number;
  duration: number;
};

export default function About() {
  const [particles, setParticles] = useState<Particle[]>([]);
  // const { theme } = useTheme(); // Uncomment if you have a ThemeContext

  // Use a mock theme for this self-contained component if you don't have a context
  const theme = 'light';

  // Generate particles for hero section
  useEffect(() => {
    const generated = [...Array(10)].map(() => ({
      width: Math.random() * 12 + 6,
      height: Math.random() * 12 + 6,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 120,
      duration: Math.random() * 12 + 8,
    }));
    setParticles(generated);
  }, []);

  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.3 });

  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, amount: 0.4 });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <>

      {/* --- Hero Section --- */}
      <section className="relative h-[70vh] min-h-[650px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('/images/about/about.jpg')] bg-cover bg-center"
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

        {/* Animated Particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/15 dark:bg-white/10 filter blur-sm"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: p.left,
              top: p.top,
            }}
            animate={{
              y: [0, p.y, 0],
              x: [0, p.x, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center max-w-6xl mx-auto"
          >
            <div className="overflow-hidden">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
                variants={itemVariants}
              >
                <span className="inline-block">About </span>
                <span className="inline-block bg-gradient-to-r from-orange-400 to-cyan-300 text-transparent bg-clip-text">
                  WIN CoE
                </span>
              </motion.h1>
            </div>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-3xl mx-auto font-medium"
              variants={itemVariants}
            >
              Driving <span className="text-orange-300">Innovation</span>. Transforming{' '}
              <span className="text-cyan-300">Healthcare</span>.
            </motion.p>

            <motion.div className="mt-12" variants={itemVariants}>
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-cyan-600 text-white rounded-full font-semibold text-lg shadow-lg
                             hover:from-orange-600 hover:to-cyan-700 transition-colors duration-300
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Work
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0, 1, 0], y: [0, 15, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <svg
            className="w-8 h-8 text-white animate-bounce-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* --- Introduction Section --- */}
      <section ref={introRef} className={`py-20 px-4 container mx-auto ${theme === 'dark' ? 'dark:bg-gray-950' : 'bg-white'}`}>
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <motion.div
              className={`w-20 h-1 bg-gradient-to-r from-orange-500 to-cyan-400 mb-6 rounded-full ${theme === 'dark' ? 'bg-orange-400' : ''}`}
              initial={{ width: 0 }}
              animate={introInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8 }}
            />
            <motion.p
              className={`text-xl leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              variants={itemVariants}
            >
              The <strong className="text-orange-600 dark:text-orange-400">Wadhwani Innovation Network – Centre of Excellence (WIN CoE)</strong> at IIT Delhi is a collaborative initiative dedicated to transforming the future of healthcare through precision and personalized solutions.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Strategic Partnership Card */}
            <motion.div
              className={`p-8 rounded-2xl shadow-xl transition-all duration-300
                            ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-br from-orange-50 to-white border border-gray-100'}`}
              whileHover={{ y: -8, boxShadow: "0 25px 40px -12px rgba(0, 0, 0, 0.25)" }}
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-100'}`}>
                  <svg className={`w-7 h-7 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Strategic Partnership</h3>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Established via a strategic partnership between the <strong className="text-orange-600 dark:text-orange-400">Wadhwani Charitable Foundation</strong> and <strong className="text-orange-600 dark:text-orange-400">IIT Delhi</strong> in December 2024, WIN CoE aims to accelerate translational research that delivers direct patient and societal benefits.
              </p>
            </motion.div>

            {/* Collaborative Ecosystem Card */}
            <motion.div
              className={`p-8 rounded-2xl shadow-xl transition-all duration-300
                            ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-br from-cyan-50 to-white border border-gray-100'}`}
              whileHover={{ y: -8, boxShadow: "0 25px 40px -12px rgba(0, 0, 0, 0.25)" }}
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-cyan-100'}`}>
                  <svg className={`w-7 h-7 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Collaborative Ecosystem</h3>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                At WIN CoE, clinicians, engineers, scientists, and industry experts converge to create impactful healthcare technologies supported by IIT Delhi&apos;s strong research ecosystem.
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <motion.p
              className={`text-xl leading-relaxed p-8 rounded-xl border-l-4
                            ${theme === 'dark' ? 'bg-gray-800 border-orange-500 text-gray-300' : 'bg-gradient-to-r from-gray-50 to-white border-orange-500 text-gray-700'}`}
              whileHover={{ scale: 1.005, boxShadow: theme === 'dark' ? '0 4px 10px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.08)' }}
            >
              By bridging the gap between lab research and real-world clinical implementation, WIN CoE fuels innovation and promotes the commercialization of life-changing health technologies.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* --- Mission Section --- */}
        <motion.div
          ref={missionRef}
          className="bg-gradient-to-br from-orange-500 to-blue-800 p-10 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden my-20 max-w-5xl mx-auto"
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          {/* Decorative elements - more vibrant */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full mix-blend-overlay"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full mix-blend-overlay"></div>

          <motion.div
            className="relative z-10"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 flex items-center">
              <span className="bg-white/20 p-3 rounded-xl mr-4 flex-shrink-0">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Core Objectives & Mission
            </h2>

            <motion.ul
              className="space-y-6 md:space-y-8 text-xl"
              variants={sectionVariants}
            >
              {[
                'Accelerating translation of patient-specific research, products, and technologies.',
                'Building capacity through advanced training and employability programs.',
                'Fostering robust collaborations with a focus on personalized healthcare.',
                'Developing innovative, affordable, and accessible healthcare solutions.',
                'Creating a dynamic platform for interdisciplinary research and innovation.'
              ].map((point, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start text-white"
                  whileHover={{ x: 10, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <span className="bg-white/30 p-1.5 rounded-full mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* --- Stats Section --- */}
        <motion.div
          ref={statsRef}
          className="grid md:grid-cols-3 gap-8 my-20 max-w-5xl mx-auto px-4"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          {[
            { number: '10+', label: 'Research Projects', color: 'from-orange-500 to-orange-600' },
            { number: '50+', label: 'Collaborators', color: 'from-cyan-500 to-cyan-600' },
            { number: '5+', label: 'Patents Filed', color: 'from-indigo-500 to-indigo-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gradient-to-br ${stat.color} text-white p-8 rounded-xl shadow-lg text-center cursor-pointer`}
              whileHover={{ scale: 1.07, boxShadow: '0 20px 30px rgba(0,0,0,0.3)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <motion.p
                className="text-5xl md:text-6xl font-bold mb-2"
                initial={{ scale: 0.8 }}
                animate={statsInView ? { scale: 1 } : { scale: 0.8 }}
                transition={{ type: 'spring', bounce: 0.4, delay: 0.2 + index * 0.1 }}
              >
                {stat.number}
              </motion.p>
              <p className="text-xl md:text-2xl">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Call to Action (CTA) Section --- */}
        <motion.div
          ref={ctaRef}
          className={`my-20 p-12 text-center rounded-2xl shadow-xl max-w-4xl mx-auto
                        ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            variants={itemVariants}
          >
            Ready to Innovate with Us?
          </motion.h2>
          <motion.p
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            variants={itemVariants}
          >
            Whether you're a researcher, a student, or an industry partner, we invite you to connect with WIN CoE and be a part of our journey to redefine healthcare.
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold text-xl shadow-lg
                           hover:from-orange-600 hover:to-pink-600 transition-colors duration-300
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('Navigate to Contact Page')}
            >
              Join Our Network
            </motion.button>
          </motion.div>
        </motion.div>

      </section>
    </>

  );
}
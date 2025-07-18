"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaFilePdf, FaFileAlt } from "react-icons/fa";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { MdOutlineDownload } from "react-icons/md";
import Link from 'next/link';

const documents = [
    {
        title: "CDSCO MEDICAL DEVICES RULES",
        icon: <FaFilePdf className="text-red-500 w-6 h-6" />,
        url: "/images/documents/doc-1.pdf",
    },
    {
        title: "IIT Delhi, Institute Ethics Committee",
        icon: <BsFillFileEarmarkTextFill className="text-blue-500 w-6 h-6" />,
        url: "/images/documents/doc-2.pdf",
    },
    {
        title: "Medical device Testing laboratory, 2023",
        icon: <FaFileAlt className="text-green-500 w-6 h-6" />,
        url: "/images/documents/doc-3.pdf",
    },
];

export default function ImportantDocuments() {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [inView, controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, rotate: -5, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.33, 1, 0.68, 1],
            },
        },
        hover: {
            scale: 1.05,
            y: -10,
            rotate: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            },
        },
    };

    return (
        <section className="py-10" ref={ref}>
            <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-end mb-4">

                    <Link
                        href="/events"
                        className="text-sm font-medium text-orange-600 hover:text-orange-800 transition-colors"
                    >
                        View All →
                    </Link>
                </div>

                <motion.h2
                    className="text-4xl font-bold mb-10 text-orange-600 flex items-center justify-center gap-4 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: -30 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.8,
                                ease: "easeOut"
                            }
                        }
                    }}
                >
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ec4a0a"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                        initial={{ scale: 0 }}
                        animate={controls}
                        variants={{
                            hidden: { scale: 0 },
                            visible: {
                                scale: 1,
                                transition: {
                                    delay: 0.3,
                                    type: "spring",
                                    stiffness: 200
                                }
                            }
                        }}
                    >
                        <path d="M 30.398438 2 L 7 2 L 7 48 L 43 48 L 43 14.601563 Z M 15 28 L 31 28 L 31 30 L 15 30 Z M 35 36 L 15 36 L 15 34 L 35 34 Z M 35 24 L 15 24 L 15 22 L 35 22 Z M 30 15 L 30 4.398438 L 40.601563 15 Z" />
                    </motion.svg>
                    Links & Documents
                </motion.h2>

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    viewport={{ amount: 0.3 }} // ✅ Fix for mobile
                >
                    {documents.map((doc, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-br from-orange-50 to-cyan-50 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg cursor-pointer group relative overflow-hidden hover:border-4 hover:border-orange-600"
                            variants={cardVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                            viewport={{ amount: 0.3 }} // ✅ Fix for mobile
                        >
                            <AnimatePresence>
                                <motion.div
                                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900 opacity-10 group-hover:opacity-20"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 20,
                                        ease: "linear",
                                        repeatType: "loop"
                                    }}
                                    viewport={{ amount: 0.3 }} // ✅ Fix for mobile
                                />
                            </AnimatePresence>

                            <motion.div
                                className="flex items-center justify-center mb-4"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.3 + index * 0.1,
                                    type: "spring",
                                    stiffness: 250
                                }}
                                viewport={{ amount: 0.3 }} // ✅ Fix for mobile
                            >
                                {doc.icon}
                            </motion.div>

                            <motion.h3
                                className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                {doc.title}
                            </motion.h3>

                            <motion.a
                                href={doc.url}
                                download 
                                target="_blank"
                                rel="noopener noreferrer"

                                className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 text-sm font-medium transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <motion.span
                                    animate={{
                                        y: [0, -3, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <MdOutlineDownload className="w-4 h-4" />
                                </motion.span>
                                Download
                            </motion.a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiMail, FiX, } from 'react-icons/fi';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

type TeamMember = {
    id: string;
    name: string;
    title: string;
    image: string;
    bio?: string;
    department?: string;
    social?: {
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
};

type TeamSectionProps = {
    sectionTitle: string;
    members: TeamMember[];
};


const sampleData: TeamSectionProps[] = [
    {
        sectionTitle: '',
        members: [
            {
                id: 'Neetu-Singh',
                name: 'Prof. Neetu Singh',
                title: 'Head & Professor',
                image: '/images/teams/team-8.jpg',
                bio: `Neetu Singh obtained her Bachelor's and Master's degrees from the University of Mumbai. She then moved to the USA to pursue doctoral work in chemistry under Prof. Andrew Lyon at the Georgia Institute of Technology, Atlanta. At Georgia Tech, her research focused on developing novel synthetic routes for designing multifunctional hydrogel nanoparticles.
                After completing her PhD, she relocated to Cambridge, MA, for postdoctoral studies at the Harvard-MIT Division of Health Sciences and Technology under Prof. Sangeeta Bhatia. In the Bhatia laboratory, her work centered on developing nanomaterials for RNA therapy research.
                Upon returning to India, she joined the Polymer Sciences and Engineering Division at the National Chemical Laboratory (NCL), Pune, in 2012. In April 2014, she became an Assistant Professor at the Center for Biomedical Engineering (CBME), IIT-Delhi, and was promoted to Associate Professor in March 2019. At IIT-Delhi, she is establishing a research program focused on probing nanomaterials' biological activity and formulating "design rules" for biosystems in biomedical and technological applications.`,
                department: 'Centre for Biomedical Engineering',
                social: {
                    twitter: 'https://twitter.com/rajeev_physics',
                    email: 'Sneetu@iitd.ac.in',
                },
            },
            {
                id: 'amit-mehndritta',
                name: 'Dr. Amit Mehndritta',
                title: 'Associate Professor',
                image: '/images/teams/team-9.jpg',
                bio: 'Dr. Amit Mehndiratta received his D.Phil. in Engineering Science from University of Oxford, UK. Amit is a fully qualified medical doctor with MBBS from Dr. MGR Medical University, Chennai, India and Master’s in Medical Technology from Indian Institute of Technology Kharagpur (IIT-Kgp). Over the last eleven years Amit has been involved in doing extensive research in field of clinical radiology, biomedical imaging and neuro-assistive technology. Amit has been working as a post-doctoral research fellow at Institute of Biomedical Engineering at University of Oxford, UK before relocating to IIT Delhi as Assistant Professor in Biomedical Engineering. At Oxford he has been working towards development of novel algorithms for quantitative estimation of haemodynamics and analysis of perfusion imaging using Magnetic Resonance Imaging (MRI). The research has shown potential clinical prospects in early diagnosis and therapeutic monitoring of patients with cerebral ischemia and stroke.',
                department: 'Centre for Biomedical Engineering',
                social: {
                    linkedin: 'https://linkedin.com/in/asha-sharma',
                    email: 'amehndiratta@cbme.iitd.ac.in',
                },
            },
            {
                id: 'Ankushi-Bansal',
                name: 'Dr. Ankushi Bansal ',
                title: 'Principal Project Scientist',
                image: '/images/teams/team-6.jpg',

                department: 'Centre for Biomedical Engineering',
                social: {
                    twitter: 'https://twitter.com/rajeev_physics',
                    email: 'wincoe@admin.iitd.ac.in',
                },
            },
            {
                id: 'Neha-Burman',
                name: 'Ms. Neha Burman',
                title: 'Senior Project Manager',
                image: '/images/teams/team-7.jpg',
                department: 'Centre for Biomedical Engineering',
                social: {
                    twitter: 'https://twitter.com/rajeev_physics',
                    email: 'wincoe@admin.iitd.ac.in',
                },
            },
            {
                id: 'rajeev-malhotra-3',
                name: 'Mr. Abhishek Nayak',
                title: 'Junior Project Assistant',
                image: '/images/teams/team-4.png',
                department: 'Centre for Biomedical Engineering',
                social: {
                    twitter: 'https://twitter.com/rajeev_physics',
                },
            },

        ],
    },
];

const UniversityTeams: React.FC<{ teams?: TeamSectionProps[] }> = ({ teams = sampleData }) => {
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: {
            opacity: 0,
            y: -50,
            rotateX: 90
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 1.2,
                ease: [0.42, 0, 0.58, 1] // cubic-bezier for easeInOut
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotateY: 15
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: "easeInOut" // Use a string instead of cubic-bezier array
            }
        },
        hover: {
            y: -15,
            scale: 1.03,
            rotateY: 5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: {
            scale: 0.7,
            opacity: 0,
            filter: 'blur(4px)'
        },
        visible: {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3
            }
        }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.3
            }
        }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const handleMemberClick = (member: TeamMember) => {
        setSelectedMember(member);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedMember(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-50 to-cyan-50">
            <Header />
            <main className="overflow-hidden">
                {/* Hero Section */}
                <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex flex-col items-center">
                            <div className="w-full">
                                <ScrollAnimation animation="fade" className="mb-16" delay={400}>
                                    <motion.h2
                                        className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={titleVariants}
                                    >
                                        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Win CoE Team</span>
                                    </motion.h2>
                                    <motion.p
                                        className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: 0.4 }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        The brilliant minds driving innovation and excellence at our center
                                    </motion.p>
                                </ScrollAnimation>

                                <div className="mt-1">
                                    {teams.map((team, index) => (
                                        <motion.div
                                            key={index}
                                            className="mb-28 "
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, margin: "-100px" }}
                                            variants={containerVariants}
                                        >
                                            {team.sectionTitle && (
                                                <motion.h3
                                                    className="text-2xl font-bold text-gray-800 dark:text-white mb-8 border-b pb-2 border-gray-200 dark:border-gray-700"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        x: 0,
                                                        transition: { delay: 0.2 }
                                                    }}
                                                    viewport={{ once: true }}
                                                >
                                                    {team.sectionTitle}
                                                </motion.h3>
                                            )}

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
                                                {team.members.map((member, i) => (
                                                    <motion.div
                                                        key={member.id}
                                                        className=" shadow-xl text-center relative overflow-hidden border border-gray-100  group cursor-pointer  bg-gradient-to-r from-orange-50 to-cyan-50  p-8 rounded-3xl"
                                                        variants={cardVariants}
                                                        whileHover="hover"
                                                        onClick={() => handleMemberClick(member)}
                                                    >
                                                        {/* Floating particles */}
                                                        {[...Array(5)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="absolute rounded-full bg-orange-400/20 dark:bg-orange-500/20"


                                                            />
                                                        ))}

                                                        {/* Profile Image */}
                                                        <motion.div
                                                            className="w-40 h-40 mx-auto mb-6 relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:border-orange-400 transition-all duration-500"
                                                            variants={imageVariants}
                                                        >
                                                            <Image
                                                                src={member.image}
                                                                alt={member.name}
                                                                fill
                                                                style={{ objectFit: 'cover' }}
                                                            // className="grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                        </motion.div>

                                                        {/* Member Info */}
                                                        <motion.h3
                                                            className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{
                                                                opacity: 1,
                                                                y: 0,
                                                                transition: { delay: 0.2 + i * 0.05 }
                                                            }}
                                                            viewport={{ once: true }}
                                                        >
                                                            {member.name}
                                                        </motion.h3>
                                                        <motion.p
                                                            className="text-md text-gray-500 dark:text-gray-400 mb-4 font-medium"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{
                                                                opacity: 1,
                                                                y: 0,
                                                                transition: { delay: 0.3 + i * 0.05 }
                                                            }}
                                                            viewport={{ once: true }}
                                                        >
                                                            {member.title}
                                                        </motion.p>

                                                        {/* Department */}
                                                        {member.department && (
                                                            <motion.p
                                                                className="text-sm text-orange-500 dark:text-orange-400 mb-6"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                whileInView={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                    transition: { delay: 0.4 + i * 0.05 }
                                                                }}
                                                                viewport={{ once: true }}
                                                            >
                                                                {member.department}
                                                            </motion.p>
                                                        )}

                                                        {/* Social Links */}
                                                        <motion.div
                                                            className="flex justify-center gap-4 mt-3"
                                                            initial={{ opacity: 0 }}
                                                            whileInView={{
                                                                opacity: 1,
                                                                transition: { delay: 0.5 + i * 0.05 }
                                                            }}
                                                            viewport={{ once: true }}
                                                        >
                                                            {member.social?.linkedin && (
                                                                <motion.a
                                                                    href={member.social.linkedin}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                                                    whileHover={{
                                                                        y: -5,
                                                                        scale: 1.2,
                                                                        transition: { type: "spring", stiffness: 400 }
                                                                    }}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <FiLinkedin className="w-6 h-6" />
                                                                </motion.a>
                                                            )}
                                                            {member.social?.twitter && (
                                                                <motion.a
                                                                    href={member.social.twitter}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sky-400 dark:text-sky-300 hover:text-sky-600 dark:hover:text-sky-200 transition-colors"
                                                                    whileHover={{
                                                                        y: -5,
                                                                        scale: 1.2,
                                                                        transition: { type: "spring", stiffness: 400 }
                                                                    }}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <FiTwitter className="w-6 h-6" />
                                                                </motion.a>
                                                            )}
                                                            {member.social?.email && (
                                                                <motion.a
                                                                    href={`mailto:${member.social.email}`}
                                                                    className="text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                                                                    whileHover={{
                                                                        y: -5,
                                                                        scale: 1.2,
                                                                        transition: { type: "spring", stiffness: 400 }
                                                                    }}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <FiMail className="w-6 h-6" />
                                                                </motion.a>
                                                            )}
                                                        </motion.div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Member Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 "
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={backdropVariants}
                            onClick={closeModal}
                        />

                        <motion.div
                            className="fixed inset-0 flex items-center justify-center p-4 z-50 "
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={modalVariants}
                        >
                            <div className="bg-gradient-to-r from-orange-100 to-cyan-100 dark:from-gray-700 
                            
                            rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                                <button
                                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    onClick={closeModal}
                                >
                                    <FiX className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                                </button>

                                <div className="grid md:grid-cols-2 gap-8 p-8">
                                    <div className="relative">
                                        <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-lg">
                                            <Image
                                                src={selectedMember.image}
                                                alt={selectedMember.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="mt-6 flex justify-center gap-6">
                                            {selectedMember.social?.linkedin && (
                                                <motion.a
                                                    href={selectedMember.social.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <FiLinkedin className="w-6 h-6" />
                                                </motion.a>
                                            )}
                                            {selectedMember.social?.twitter && (
                                                <motion.a
                                                    href={selectedMember.social.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-full text-sky-500 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-800/50 transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <FiTwitter className="w-6 h-6" />
                                                </motion.a>
                                            )}
                                            {selectedMember.social?.email && (
                                                <motion.a
                                                    href={`mailto:${selectedMember.social.email}`}
                                                    className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-full text-rose-500 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800/50 transition-colors"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <FiMail className="w-6 h-6" />
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                            {selectedMember.name}
                                        </h2>
                                        <p className="text-xl text-orange-500 dark:text-orange-400 font-medium mb-4">
                                            {selectedMember.title}
                                        </p>
                                        {selectedMember.department && (
                                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                                {selectedMember.department}
                                            </p>
                                        )}
                                        <div className="prose dark:prose-invert max-w-none">
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {selectedMember.bio || "No biography available."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default UniversityTeams;
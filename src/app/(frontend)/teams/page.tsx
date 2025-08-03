'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiMail, FiX, FiFacebook } from 'react-icons/fi';
import useSWR from 'swr';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

type TeamMember = {
  _id: string;
  name: string;
  designation: string;
  department: string;
  profileImage: string;
  description?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UniversityTeams() {
  const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
  const { data, error, isLoading } = useSWR('/api/v1/admin/teams/list', fetcher);

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
    hidden: { opacity: 0, y: -50, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 1.2, ease: [0.42, 0, 0.58, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8, rotateY: 15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.7, opacity: 0, filter: 'blur(4px)' },
    visible: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    hover: { scale: 1.1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 15 }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
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

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!data?.data?.teams?.length) return <EmptyState />;

  const teamMembers = data.data.teams;

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-cyan-50">
      <Header />
      <main className="overflow-hidden">
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center">
              <div className="w-full">
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
                  whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                  viewport={{ once: true }}
                >
                  The brilliant minds driving innovation and excellence at our center
                </motion.p>

                <motion.div
                  className="mt-16"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                >
                  <motion.h3
                    className="text-2xl font-bold text-gray-800 dark:text-white mb-8 border-b pb-2 border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                    viewport={{ once: true }}
                  >
                    Our Team
                  </motion.h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {teamMembers.map((member: TeamMember, i: number) => (
                      <motion.div
                        key={member._id}
                        className="shadow-xl text-center relative overflow-hidden border border-gray-100 group cursor-pointer bg-gradient-to-r from-orange-50 to-cyan-50 p-8 rounded-3xl"
                        variants={cardVariants}
                        whileHover="hover"
                        onClick={() => handleMemberClick(member)}
                      >
                        <motion.div
                          className="w-40 h-40 mx-auto mb-6 relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:border-orange-400 transition-all duration-500"
                          variants={imageVariants}
                        >
                          <Image
                            src={member.profileImage}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>

                        <motion.h3
                          className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.05 } }}
                          viewport={{ once: true }}
                        >
                          {member.name}
                        </motion.h3>
                        <motion.p
                          className="text-md text-gray-500 dark:text-gray-400 mb-4 font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.05 } }}
                          viewport={{ once: true }}
                        >
                          {member.designation}
                        </motion.p>

                        {member.department && (
                          <motion.p
                            className="text-sm text-orange-500 dark:text-orange-400 mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.05 } }}
                            viewport={{ once: true }}
                          >
                            {member.department}
                          </motion.p>
                        )}

                        <motion.div
                          className="flex justify-center gap-4 mt-3"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1, transition: { delay: 0.5 + i * 0.05 } }}
                          viewport={{ once: true }}
                        >
                          {member.socialLinks?.linkedin && (
                            <SocialLink href={member.socialLinks.linkedin} icon={<FiLinkedin />} color="blue" />
                          )}
                          {member.socialLinks?.twitter && (
                            <SocialLink href={member.socialLinks.twitter} icon={<FiTwitter />} color="sky" />
                          )}
                          {member.socialLinks?.email && (
                            <SocialLink href={`mailto:${member.socialLinks.email}`} icon={<FiMail />} color="rose" />
                          )}
                          {member.socialLinks?.facebook && (
                            <SocialLink href={member.socialLinks.facebook} icon={<FiFacebook />} color="indigo" />
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MemberModal 
        member={selectedMember} 
        onClose={closeModal} 
        variants={{ modal: modalVariants, backdrop: backdropVariants }}
      />

      <Footer />
    </div>
  );
}

// Sub-components for better organization
function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">Failed to load team members</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">No team members found</p>
    </div>
  );
}

function SocialLink({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-${color}-600 dark:text-${color}-400 hover:text-${color}-800 dark:hover:text-${color}-300 transition-colors`}
      whileHover={{ y: -5, scale: 1.2, transition: { type: "spring", stiffness: 400 } }}
      onClick={(e) => e.stopPropagation()}
    >
      {icon}
    </motion.a>
  );
}

function MemberModal({ member, onClose, variants }: { 
  member: TeamMember | null; 
  onClose: () => void;
  variants: {
    modal: typeof modalVariants;
    backdrop: typeof backdropVariants;
  };
}) {
  if (!member) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants.backdrop}
          onClick={onClose}
        />

        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants.modal}
        >
          <div className="bg-gradient-to-r from-orange-100 to-cyan-100 dark:from-gray-700 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={onClose}
            >
              <FiX className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="relative">
                <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={member.profileImage}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-6 flex justify-center gap-6">
                  {member.socialLinks?.linkedin && (
                    <SocialButton href={member.socialLinks.linkedin} icon={<FiLinkedin />} color="blue" />
                  )}
                  {member.socialLinks?.twitter && (
                    <SocialButton href={member.socialLinks.twitter} icon={<FiTwitter />} color="sky" />
                  )}
                  {member.socialLinks?.email && (
                    <SocialButton href={`mailto:${member.socialLinks.email}`} icon={<FiMail />} color="rose" />
                  )}
                  {member.socialLinks?.facebook && (
                    <SocialButton href={member.socialLinks.facebook} icon={<FiFacebook />} color="indigo" />
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h2>
                <p className="text-xl text-orange-500 dark:text-orange-400 font-medium mb-4">
                  {member.designation}
                </p>
                {member.department && (
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {member.department}
                  </p>
                )}
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">
                    {member.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

function SocialButton({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 bg-${color}-100 dark:bg-${color}-900/30 rounded-full text-${color}-600 dark:text-${color}-400 hover:bg-${color}-200 dark:hover:bg-${color}-800/50 transition-colors`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}

import GrantCard from '@/components/GrantCard';
import { motion } from 'framer-motion';

export default function WhatWeDo() {
    return (
        <div className="min-h-screen bg-gray-50 ">


            <>
                {/* Hero Section */}
                <section className="relative py-32 bg-blue-900 rounded-b-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90 rounded-b-2xl"></div>
                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                        >
                            What <span className="text-blue-300">We Do</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-blue-100 max-w-3xl mx-auto"
                        >
                            Supporting innovation across Technology Readiness Levels (TRLs)
                        </motion.p>
                    </div>
                </section>

                {/* Grants Section */}
                <section className="py-16 container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-orange-600  mb-4">Grant Schemes</h2>
                        <p className="text-lg text-gray-600">
                            Through regular calls for proposals, WIN CoE nurtures cutting-edge bioengineering research at IIT Delhi by offering funding, mentorship and support services in areas like diagnostics, therapeutics, MedTech and Personalized healthcare. WinCoE offer two targeted grant schemes to accelerate innovation across Technology readiness levels (TRL’s):
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <GrantCard
                            title="Accelerator Grant (A Grant)"
                            amount="Up to ₹50 Lakhs/year"
                            duration="Maximum 2 years"
                            requirements={[
                                "TRL 3 → TRL 5 (Proof-of-concept to early validation)",
                                "Clinical partner required"
                            ]}
                            trlRange="TRL 3-5"
                            delay={0}

                        />

                        <GrantCard
                      
                            title="Translational Grant (T-Grant)"
                            amount="Up to ₹75 Lakhs/year"
                            duration="Maximum 2 years"
                            requirements={[
                                "TRL 5 → TRL 7 (Validation to clinical trial)",
                                "Clinical partner and preferably industry partner required"
                            ]}
                            trlRange="TRL 5-7"
                            delay={0.2}

                        />

                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className=" max-w-6xl mx-auto mt-16 bg-gradient-to-r from-orange-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Comprehensive Support</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Beyond funding, WIN CoE provides comprehensive support including mentorship from industry experts, access to state-of-the-art facilities, IP guidance, and connections to potential investors and industry partners.
                                </p>
                            </div>
                            <div className="md:w-1/3 flex justify-center">
                                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-cyan-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    View Current RFPs
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </>

        </div>
    );
}
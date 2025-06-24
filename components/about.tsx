"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ForwardedRef, RefObject } from "react";
import { useAbout } from "@/hooks/useApi";

export function About({forwardRef}: {forwardRef:ForwardedRef<HTMLElement> | RefObject<HTMLElement>}) {
    const { data: aboutData, loading, error } = useAbout();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    if (loading) {
        return (
            <section ref={forwardRef} className="relative py-10 px-4 bg-background flex justify-center items-center w-full">
                <div className="w-[90%] max-w-screen-xl">
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="flex items-center gap-2">
                            <Icon icon="ph:spinner" className="animate-spin text-primary text-2xl" />
                            <span className="text-foreground/70">Loading about...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section ref={forwardRef} className="relative py-10 px-4 bg-background flex justify-center items-center w-full">
                <div className="w-[90%] max-w-screen-xl">
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="text-center">
                            <Icon icon="ph:warning" className="text-danger text-3xl mb-2 mx-auto" />
                            <p className="text-danger mb-2">Failed to load about data</p>
                            <p className="text-foreground/50 text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Default content if about data is empty
    const aboutContent = aboutData?.about || `I am a software engineer with over 5 years of experience in developing and maintaining web applications. My expertise lies in full-stack development, with a strong foundation in both front-end and back-end technologies. I am proficient in languages such as JavaScript, Python, and Java, and frameworks like React, Angular, and Spring Boot. I am also experienced in working with databases like MySQL, PostgreSQL, and MongoDB. I am a team player and enjoy collaborating with others to achieve project goals.`;

    return (
        <section ref={forwardRef} className="relative py-10 px-4 bg-background flex justify-center items-center w-full">
            <div className="w-[90%] max-w-screen-xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            About Me
                        </h2>
                    </motion.div>

                    {/* Main Content - Single Column Text */}
                    <motion.div variants={itemVariants} className="space-y-6 text-foreground/80">
                        <p className="text-lg md:text-xl leading-relaxed">
                            {aboutContent}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
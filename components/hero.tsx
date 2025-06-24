
"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import bg from "@/public/hero-bg.jpg";
import { useIntro } from "@/hooks/useApi";
import { RefObject } from "react";

interface HeroProps {
    projectsRef: RefObject<HTMLElement>;
    contactRef: RefObject<HTMLElement>;
}

export function Hero({ projectsRef, contactRef }: HeroProps) {
    const { data: intro, loading, error } = useIntro();

    const scrollToSection = (ref: RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <section className="relative min-h-[80vh] flex items-center justify-center py-16 w-full">
                {/* Background with gradient */}
                <div className="absolute z-10 opacity-40 inset-0 bg-gradient-to-t from-black via-neutral-900 to-transparent" />
                <Image
                    src={bg}
                    layout="fill"
                    alt="bg" />
                
                {/* Loading state */}
                <div className="relative z-10 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <Icon icon="ph:spinner" className="animate-spin text-white text-3xl" />
                        <span className="text-white/90 text-lg">Loading...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="relative min-h-[80vh] flex items-center justify-center py-16 w-full">
                {/* Background with gradient */}
                <div className="absolute z-10 opacity-40 inset-0 bg-gradient-to-t from-black via-neutral-900 to-transparent" />
                <Image
                    src={bg}
                    layout="fill"
                    alt="bg" />
                
                {/* Error state */}
                <div className="relative z-10 text-center">
                    <Icon icon="ph:warning" className="text-danger text-4xl mb-4 mx-auto" />
                    <p className="text-danger mb-2 text-lg">Failed to load intro data</p>
                    <p className="text-white/50 text-sm">{error}</p>
                </div>
            </section>
        );
    }    return (
        <section className="relative min-h-[80vh] flex items-center justify-center py-16 w-full">
            {/* Background with gradient */}
            <div className="absolute z-10 opacity-40 inset-0 bg-gradient-to-t from-black via-neutral-900 to-transparent" />
            <Image
                src={bg}
                layout="fill"
                alt="bg" />

            {/* Main content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white dark:text-white mb-6">
                        {intro?.title || "Hi, I'm Sarah"}
                    </h1>

                    <motion.p
                        className="text-lg md:text-xl text-white/90 dark:text-white/90 max-w-3xl mx-auto leading-relaxed mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {intro?.subtitle || "A passionate software engineer with a focus on building scalable and efficient applications. I love solving complex problems and continuously learning new technologies."}
                    </motion.p>                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Button
                            size="lg"
                            className="bg-white text-black hover:bg-white/90 font-semibold px-8"
                            radius="full"
                            onPress={() => scrollToSection(projectsRef)}
                        >
                            View My Work
                        </Button>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="border-white text-white hover:bg-white/10 font-semibold px-8"
                            radius="full"
                            onPress={() => scrollToSection(contactRef)}
                        >
                            Contact Me
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <motion.div
                    className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <motion.div
                        className="w-1 h-3 bg-white rounded-full mt-2"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
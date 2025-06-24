"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { ForwardedRef, RefObject } from "react";
import { useSkills } from "@/hooks/useApi";

export function Skills({forwardRef}: {forwardRef:ForwardedRef<HTMLElement> | RefObject<HTMLElement>}) {
    const { data: skills, loading, error } = useSkills();    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
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
            <section ref={forwardRef} className="py-10 px-4 bg-background flex justify-center items-center w-full">
                <div className="max-w-screen-xl w-[90%]">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills</h2>
                    </div>
                    <div className="flex items-center justify-center py-20">
                        <div className="flex items-center gap-3">
                            <Icon icon="ph:spinner" className="animate-spin text-primary text-3xl" />
                            <span className="text-foreground/60 text-lg">Loading skills...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section ref={forwardRef} className="py-10 px-4 bg-background flex justify-center items-center w-full">
                <div className="max-w-screen-xl w-[90%]">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills</h2>
                    </div>
                    <div className="text-center py-20">
                        <Icon icon="ph:warning" className="text-danger text-4xl mb-4 mx-auto" />
                        <p className="text-danger mb-2 text-lg">Failed to load skills data</p>
                        <p className="text-foreground/50 text-sm">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    // Transform backend data to match the component's expected structure
    const skillCategories = skills ? [
        {
            icon: <Icon icon="mdi:code-braces" className="h-8 w-8" />,
            title: "Programming Languages",
            skills: skills.languages || [],
        },
        {
            icon: <Icon icon="mdi:web" className="h-8 w-8" />,
            title: "Frontend",
            skills: skills.frontend || [],
        },
        {
            icon: <Icon icon="mdi:server" className="h-8 w-8" />,
            title: "Backend",
            skills: skills.backend || [],
        },
        {
            icon: <Icon icon="mdi:database" className="h-8 w-8" />,
            title: "Databases",
            skills: skills.databases || [],
        },
    ].filter(category => category.skills.length > 0) : [];

    return (
        <section ref={forwardRef} className="py-10 px-4 bg-background flex justify-center items-center w-full">
            <div className="max-w-screen-xl w-[90%]">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Skills
                        </h2>
                    </motion.div>                    {/* Skills Grid */}
                    {skillCategories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                            {skillCategories.map((category, index) => (
                                <motion.div
                                    key={category.title}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Card className="h-full border border-divider hover:border-primary/30 transition-colors duration-300">
                                        <CardBody className="p-6">
                                            {/* Icon */}
                                            <motion.div
                                                className="mb-4 text-foreground/60"
                                                initial={{ scale: 0.8 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                                viewport={{ once: true }}
                                            >
                                                {category.icon}
                                            </motion.div>

                                            {/* Title */}
                                            <motion.h3
                                                className="text-lg font-semibold text-foreground mb-3"
                                                variants={itemVariants}
                                            >
                                                {category.title}
                                            </motion.h3>

                                            {/* Skills List */}
                                            <motion.div
                                                className="space-y-1"
                                                variants={itemVariants}
                                            >
                                                {category.skills.map((skill: string, skillIndex: number) => (
                                                    <motion.p
                                                        key={skill}
                                                        className="text-sm text-foreground/70"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            delay: index * 0.1 + skillIndex * 0.05 + 0.5,
                                                            duration: 0.1
                                                        }}
                                                        viewport={{ once: true }}
                                                    >
                                                        {skill}
                                                    </motion.p>
                                                ))}
                                            </motion.div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Icon icon="ph:code" className="text-foreground/30 text-4xl mb-4 mx-auto" />
                            <p className="text-foreground/60">No skills data available</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
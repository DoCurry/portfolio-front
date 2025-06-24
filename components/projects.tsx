"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { ForwardedRef, RefObject } from "react";
import { useProjects } from "@/hooks/useApi";

export function Projects({forwardRef}: {forwardRef:ForwardedRef<HTMLElement> | RefObject<HTMLElement>}) {
    const { data: projects, loading, error } = useProjects();    const containerVariants = {
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
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h2>
                    </div>
                    <div className="flex items-center justify-center py-20">
                        <div className="flex items-center gap-3">
                            <Icon icon="ph:spinner" className="animate-spin text-primary text-3xl" />
                            <span className="text-foreground/60 text-lg">Loading projects...</span>
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
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h2>
                    </div>
                    <div className="text-center py-20">
                        <Icon icon="ph:warning" className="text-danger text-4xl mb-4 mx-auto" />
                        <p className="text-danger mb-2 text-lg">Failed to load projects data</p>
                        <p className="text-foreground/50 text-sm">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={forwardRef} className="py-10 px-4 bg-background flex justify-center items-center w-full">
            <div className="max-w-screen-xl w-[90%]">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Projects
                        </h2>
                    </motion.div>                    {/* Projects Grid */}
                    {projects && projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="group"
                                >
                                    <Card className="h-full border border-divider hover:border-primary/30 transition-all duration-300 overflow-hidden">
                                        {/* Project Image */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            />

                                            {/* Project image or placeholder */}
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                                                    <Icon
                                                        icon="mdi:image-outline"
                                                        className="w-16 h-16 text-foreground/20"
                                                    />
                                                </div>
                                            )}

                                            {/* Overlay button - GitHub */}
                                            {project.githubUrl && (
                                                <motion.div
                                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    initial={{ scale: 0.8 }}
                                                    whileHover={{ scale: 1 }}
                                                >
                                                    <Button
                                                        isIconOnly
                                                        variant="solid"
                                                        color="default"
                                                        size="sm"
                                                        className="bg-white/90 text-black hover:bg-white"
                                                        as="a"
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Icon icon="mdi:github" width="16" height="16" />
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </div>

                                        <CardBody className="p-6">
                                            {/* Category Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                                                viewport={{ once: true }}
                                            >
                                                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                                                    {project.category}
                                                </span>
                                            </motion.div>

                                            {/* Project Title */}
                                            <motion.h3
                                                className="text-xl font-bold text-foreground mb-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                                                viewport={{ once: true }}
                                            >
                                                {project.title}
                                            </motion.h3>

                                            {/* Project Description */}
                                            <motion.p
                                                className="text-sm text-foreground/70 mb-4 line-clamp-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                                                viewport={{ once: true }}
                                            >
                                                {project.description}
                                            </motion.p>

                                            {/* Technologies */}
                                            <motion.div
                                                className="flex flex-wrap gap-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 + 0.6, duration: 0.3 }}
                                                viewport={{ once: true }}
                                            >
                                                {project.technologies.map((tech: string, techIndex: number) => (
                                                    <motion.span
                                                        key={tech}
                                                        className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded border border-secondary/20"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{
                                                            delay: index * 0.1 + techIndex * 0.05 + 0.7,
                                                            duration: 0.2
                                                        }}
                                                        viewport={{ once: true }}
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </motion.div>
                                        </CardBody>

                                        <CardFooter className="px-6 pb-6 pt-0">
                                            <Button
                                                variant="bordered"
                                                size="sm"
                                                className="w-full"
                                                startContent={<Icon icon="mdi:github" width="16" height="16" />}
                                                as="a"
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                disabled={!project.githubUrl}
                                            >
                                                View Code
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Icon icon="ph:folder-open" className="text-foreground/30 text-4xl mb-4 mx-auto" />
                            <p className="text-foreground/60">No projects data available</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
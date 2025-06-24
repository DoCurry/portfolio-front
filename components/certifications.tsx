"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { ForwardedRef, RefObject } from "react";
import { useCertifications } from "@/hooks/useApi";

export function Certifications({ forwardRef }: { forwardRef: ForwardedRef<HTMLElement> | RefObject<HTMLElement> }) {
    const { data: certifications, loading, error } = useCertifications(); const containerVariants = {
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
            <section ref={forwardRef} className="relative py-10 px-4 bg-background flex justify-center items-center w-full">
                <div className="w-[90%] max-w-screen-xl">
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Certifications</h2>
                    </div>
                    <div className="flex items-center justify-center py-20">
                        <div className="flex items-center gap-3">
                            <Icon icon="ph:spinner" className="animate-spin text-primary text-3xl" />
                            <span className="text-foreground/60 text-lg">Loading certifications...</span>
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
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Certifications</h2>
                    </div>
                    <div className="text-center py-20">
                        <Icon icon="ph:warning" className="text-danger text-4xl mb-4 mx-auto" />
                        <p className="text-danger mb-2 text-lg">Failed to load certifications data</p>
                        <p className="text-foreground/50 text-sm">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={forwardRef} className="relative py-10 px-4 bg-background flex justify-center items-center w-full">
            <div className="w-[90%] max-w-screen-xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >

                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            Certifications
                        </h2>
                    </motion.div>


                    {certifications && certifications.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -4 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="group"
                                >
                                    <Card className="h-full border border-divider hover:border-primary/30 transition-all duration-300 overflow-hidden">
                                        <CardBody className="p-6">
                                            <div className="flex gap-4">
                                                {/* Certification Icon */}
                                                <motion.div
                                                    className="flex-shrink-0"
                                                    initial={{ scale: 0.8 }}
                                                    whileInView={{ scale: 1 }}
                                                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center border border-primary/20">
                                                        {cert.image ? (
                                                            <img
                                                                src={cert.image}
                                                                alt={cert.name}
                                                                className="w-8 h-8 object-contain"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="mdi:certificate"
                                                                className="w-8 h-8 text-primary"
                                                            />
                                                        )}
                                                    </div>
                                                </motion.div>

                                                {/* Certification Details */}
                                                <div className="flex-1 space-y-3">
                                                    {/* Title */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <div className="flex items-start justify-between gap-2 mb-1">
                                                            <h3 className="text-lg font-bold text-foreground line-clamp-2">
                                                                {cert.name}
                                                            </h3>
                                                        </div>

                                                        <p className="text-sm text-primary font-medium">
                                                            {cert.issuer}
                                                        </p>
                                                    </motion.div>

                                                    {/* Date and Credential */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                                                        viewport={{ once: true }}
                                                        className="flex flex-col gap-1"
                                                    >
                                                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                                                            <Icon icon="mdi:calendar" className="w-4 h-4" />
                                                            <span>Issued: {cert.issueDate}</span>
                                                        </div>
                                                        {cert.credentialId && (
                                                            <div className="flex items-center gap-2 text-xs text-foreground/60">
                                                                <Icon icon="mdi:certificate" className="w-4 h-4" />
                                                                <span>ID: {cert.credentialId}</span>
                                                            </div>
                                                        )}
                                                    </motion.div>

                                                    {/* Technologies */}
                                                    {cert.technologies && cert.technologies.length > 0 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1 + 0.6, duration: 0.3 }}
                                                            viewport={{ once: true }}
                                                        >
                                                            <div className="flex flex-wrap gap-2">
                                                                {cert.technologies.map((tech: string, techIndex: number) => (
                                                                    <motion.span
                                                                        key={tech}
                                                                        className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded border border-secondary/20"
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                                        transition={{
                                                                            delay: index * 0.1 + techIndex * 0.03 + 0.7,
                                                                            duration: 0.2
                                                                        }}
                                                                        viewport={{ once: true }}
                                                                        whileHover={{ scale: 1.05 }}
                                                                    >
                                                                        {tech}
                                                                    </motion.span>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Verify Button */}
                                                    {cert.url && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1 + 0.8, duration: 0.3 }}
                                                            viewport={{ once: true }}
                                                            className="pt-2"
                                                        >
                                                            <a
                                                                href={cert.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                                                            >
                                                                <Icon icon="mdi:external-link" className="w-3 h-3" />
                                                                <span>Verify Credential</span>
                                                            </a>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Icon icon="ph:certificate" className="text-foreground/30 text-4xl mb-4 mx-auto" />
                            <p className="text-foreground/60">No certifications data available</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

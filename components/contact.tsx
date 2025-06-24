"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { ForwardedRef, RefObject } from "react";
import { useContact } from "@/hooks/useApi";

export function Contact({ forwardRef }: { forwardRef: ForwardedRef<HTMLElement> | RefObject<HTMLElement> }) {
    const { data: contact, loading, error } = useContact(); const containerVariants = {
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
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact</h2>
                    </div>
                    <div className="flex items-center justify-center py-20">
                        <div className="flex items-center gap-3">
                            <Icon icon="ph:spinner" className="animate-spin text-primary text-3xl" />
                            <span className="text-foreground/60 text-lg">Loading contact information...</span>
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
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact</h2>
                    </div>
                    <div className="text-center py-20">
                        <Icon icon="ph:warning" className="text-danger text-4xl mb-4 mx-auto" />
                        <p className="text-danger mb-2 text-lg">Failed to load contact information</p>
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
                            Contact
                        </h2>
                    </motion.div>


                    <motion.div variants={itemVariants} className="space-y-8">
                        {contact ? (
                            <div className="space-y-6">
                                {contact.email && (
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                                            <Icon icon="mdi:email" className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-200"
                                            >
                                                {contact.email}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}

                                {contact.phone && (
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                                            <Icon icon="mdi:phone" className="w-6 h-6 text-secondary" />
                                        </div>
                                        <div>
                                            <a
                                                href={`tel:${contact.phone}`}
                                                className="text-lg font-medium text-foreground hover:text-secondary transition-colors duration-200"
                                            >
                                                {contact.phone}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}

                                {contact.linkedin && (
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center border border-success/20">
                                            <Icon icon="mdi:linkedin" className="w-6 h-6 text-success" />
                                        </div>
                                        <div>
                                            <a
                                                href={contact.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg font-medium text-foreground hover:text-success transition-colors duration-200"
                                            >
                                                {contact.linkedin.replace('https://', '').replace('http://', '')}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}

                                {contact.github && (
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center border border-warning/20">
                                            <Icon icon="mdi:github" className="w-6 h-6 text-warning" />
                                        </div>
                                        <div>
                                            <a
                                                href={contact.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg font-medium text-foreground hover:text-warning transition-colors duration-200"
                                            >
                                                {contact.github.replace('https://', '').replace('http://', '')}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <Icon icon="ph:address-book" className="text-foreground/30 text-4xl mb-4 mx-auto" />
                                <p className="text-foreground/60">No contact information available</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

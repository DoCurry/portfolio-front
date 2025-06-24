"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { ForwardedRef, RefObject } from "react";
import { useExperience } from "@/hooks/useApi";

export function Experience({forwardRef}: {forwardRef:ForwardedRef<HTMLElement> | RefObject<HTMLElement>}) {
  const { data: experiences, loading, error } = useExperience();  const containerVariants = {
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <Icon icon="ph:spinner" className="animate-spin text-primary text-3xl" />
              <span className="text-foreground/60 text-lg">Loading experience...</span>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>
          </div>
          <div className="text-center py-20">
            <Icon icon="ph:warning" className="text-danger text-4xl mb-4 mx-auto" />
            <p className="text-danger mb-2 text-lg">Failed to load experience data</p>
            <p className="text-foreground/50 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );  }

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
              Experience
            </h2>
          </motion.div>          {/* Experience List */}
          <div className="space-y-8">
            {experiences && experiences.length > 0 ? (
              experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border border-divider hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <CardBody className="p-8">
                      <div className="flex gap-6">
                        {/* Company Icon */}
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 flex-shrink-0">
                          <Icon 
                            icon="mdi:office-building" 
                            className="w-6 h-6 text-primary"
                          />
                        </div>
                        
                        <div className="flex-1">
                          {/* Header Info */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h3 className="text-xl font-bold text-foreground">
                              {experience.company}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-foreground/60">
                                {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-foreground/70 mb-4">
                            <span className="font-medium text-primary">
                              {experience.position}
                            </span>
                            <span className="hidden md:inline">•</span>
                            <span className="flex items-center gap-1">
                              <Icon icon="mdi:map-marker" className="w-4 h-4" />
                              {experience.location}
                            </span>
                          </div>

                          {/* Description Bullet Points */}
                          <ul className="space-y-2 mb-6">
                            {experience.responsibilities.map((responsibility: string, pointIndex: number) => (
                              <li
                                key={pointIndex}
                                className="flex items-start gap-3 text-sm text-foreground/80"
                              >
                                <Icon 
                                  icon="mdi:circle-small" 
                                  className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                                />
                                <span>{responsibility}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech: string) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full border border-secondary/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <Icon icon="ph:briefcase" className="text-foreground/30 text-4xl mb-4 mx-auto" />
                <p className="text-foreground/60">No experience data available</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
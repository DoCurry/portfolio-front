"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { ForwardedRef, RefObject } from "react";
import { useEducation } from "@/hooks/useApi";

export function Education({forwardRef}: {forwardRef:ForwardedRef<HTMLElement> | RefObject<HTMLElement>}) {
  const { data: educations, loading, error } = useEducation();
  console.log("Education data:", educations);

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
              <span className="text-foreground/70">Loading education...</span>
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
              <p className="text-danger mb-2">Failed to load education data</p>
              <p className="text-foreground/50 text-sm">{error}</p>
            </div>
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
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Education
            </h2>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-6">
            {educations && educations.length > 0 ? (
              educations.map((education) => (
                <motion.div
                  key={education.id}
                  variants={itemVariants}
                >
                  <Card className="shadow-lg border border-divider/20 hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                    <CardBody className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          {/* Degree and Field */}
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {education.degree} in {education.field}
                          </h3>
                          
                          {/* Institution */}
                          <h4 className="text-lg font-semibold text-primary mb-2">
                            {education.institution}
                          </h4>
                          
                          {/* Location */}
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Icon icon="ph:map-pin" className="text-sm" />
                            <span>{education.location}</span>
                          </div>
                        </div>

                        {/* Date Range */}
                        <div className="flex items-center gap-2 text-right">
                          <Icon icon="ph:calendar" className="text-primary" />
                          <span className="font-semibold text-foreground">
                            {education.startDate} - {education.endDate}
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div variants={itemVariants} className="text-center py-8">
                <Icon icon="ph:graduation-cap" className="text-foreground/30 text-4xl mb-4 mx-auto" />
                <p className="text-foreground/70">No education data available</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

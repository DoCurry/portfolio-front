"use client"
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Navbar } from "@/components/navbar";
import { forwardRef, useRef } from "react";

export default function Home() {
  const AboutRef = useRef<HTMLElement>(null);
  const ProjectsRef = useRef<HTMLElement>(null);
  const ExperienceRef = useRef<HTMLElement>(null);
  const EducationRef = useRef<HTMLElement>(null);
  const SkillsRef = useRef<HTMLElement>(null);
  const CertificationsRef = useRef<HTMLElement>(null);
  const ContactRef = useRef<HTMLElement>(null);

  const sectionRefs = {
    about: AboutRef,
    projects: ProjectsRef,
    experience: ExperienceRef,
    education: EducationRef,
    skills: SkillsRef,
    certifications: CertificationsRef,
    contact: ContactRef,
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Navbar sectionRefs={sectionRefs} />
      <Hero projectsRef={ProjectsRef} contactRef={ContactRef} />
      <Skills forwardRef={SkillsRef} />
      <Experience forwardRef={ExperienceRef} />
      <Education forwardRef={EducationRef} />
      <Projects forwardRef={ProjectsRef} />
      <Certifications forwardRef={CertificationsRef} />
      <Contact forwardRef={ContactRef} />
    </section>
  );
}

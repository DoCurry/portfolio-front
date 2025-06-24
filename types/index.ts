import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Backend API Types
export interface Intro {
  title: string;
  subtitle: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  category: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  image: string;
  technologies: string[];
  url: string;
}

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface PortfolioData {
  intro: Intro;
  about: string;
  skills: Skills;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  contact: Contact;
}

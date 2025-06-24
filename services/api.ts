import axios from 'axios';
import {
  PortfolioData,
  Intro,
  Skills,
  Experience,
  Education,
  Project,
  Certification,
  Contact
} from '@/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5187/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class PortfolioAPI {
  // Get all portfolio data at once
  static async getPortfolioData(): Promise<PortfolioData> {
    const response = await api.get<PortfolioData>('/portfolio');
    return response.data;
  }

  // Get individual sections
  static async getIntro(): Promise<Intro> {
    const response = await api.get<Intro>('/portfolio/intro');
    return response.data;
  }

  static async getAbout(): Promise<{ about: string }> {
    const response = await api.get<{ about: string }>('/portfolio/about');
    return response.data;
  }

  static async getSkills(): Promise<Skills> {
    const response = await api.get<Skills>('/portfolio/skills');
    return response.data;
  }

  static async getExperience(): Promise<Experience[]> {
    const response = await api.get<Experience[]>('/portfolio/experience');
    return response.data;
  }
  static async getEducation(): Promise<Education[]> {
    const response = await api.get<Education[]>('/portfolio/education');
    return response.data;
  }

  static async getProjects(): Promise<Project[]> {
    const response = await api.get<Project[]>('/portfolio/projects');
    return response.data;
  }

  static async getCertifications(): Promise<Certification[]> {
    const response = await api.get<Certification[]>('/portfolio/certifications');
    return response.data;
  }

  static async getContact(): Promise<Contact> {
    const response = await api.get<Contact>('/portfolio/contact');
    return response.data;
  }
}

export default PortfolioAPI;

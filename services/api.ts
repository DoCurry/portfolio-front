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
import FallbackDataService from './fallback';

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

// Helper function to handle API calls with fallback
async function apiCallWithFallback<T>(
  apiCall: () => Promise<T>,
  fallbackCall: () => T,
  endpoint: string
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    console.warn(`API call to ${endpoint} failed:`, error);
    
    // Check if fallback is enabled
    const fallbackEnabled = process.env.NEXT_PUBLIC_ENABLE_FALLBACK === 'true';
    
    if (fallbackEnabled) {
      console.log(`Using fallback data for ${endpoint}`);
      return fallbackCall();
    } else {
      console.error(`Fallback disabled, re-throwing error for ${endpoint}`);
      throw error;
    }
  }
}

export class PortfolioAPI {
  // Get all portfolio data at once
  static async getPortfolioData(): Promise<PortfolioData> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<PortfolioData>('/portfolio');
        return response.data;
      },
      () => FallbackDataService.getPortfolioData(),
      '/portfolio'
    );
  }

  // Get individual sections
  static async getIntro(): Promise<Intro> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<Intro>('/portfolio/intro');
        return response.data;
      },
      () => FallbackDataService.getIntro(),
      '/portfolio/intro'
    );
  }

  static async getAbout(): Promise<{ about: string }> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<{ about: string }>('/portfolio/about');
        return response.data;
      },
      () => FallbackDataService.getAbout(),
      '/portfolio/about'
    );
  }

  static async getSkills(): Promise<Skills> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<Skills>('/portfolio/skills');
        return response.data;
      },
      () => FallbackDataService.getSkills(),
      '/portfolio/skills'
    );
  }

  static async getExperience(): Promise<Experience[]> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<Experience[]>('/portfolio/experience');
        return response.data;
      },
      () => FallbackDataService.getExperience(),
      '/portfolio/experience'
    );
  }

  static async getEducation(): Promise<Education[]> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<Education[]>('/portfolio/education');
        return response.data;
      },
      () => FallbackDataService.getEducation(),
      '/portfolio/education'
    );
  }

  static async getProjects(): Promise<Project[]> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<Project[]>('/portfolio/projects');
        return response.data;
      },
      () => FallbackDataService.getProjects(),
      '/portfolio/projects'
    );
  }

  static async getCertifications(): Promise<Certification[]> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<Certification[]>('/portfolio/certifications');
        return response.data;
      },
      () => FallbackDataService.getCertifications(),
      '/portfolio/certifications'
    );
  }

  static async getContact(): Promise<Contact> {
    return apiCallWithFallback(
      async () => {
        const response = await api.get<Contact>('/portfolio/contact');
        return response.data;
      },
      () => FallbackDataService.getContact(),
      '/portfolio/contact'
    );
  }
}

export default PortfolioAPI;

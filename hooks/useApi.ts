import { useState, useEffect } from 'react';
import PortfolioAPI from '@/services/api';
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

// Generic hook for API calls
export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error('API Error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Specific hooks for each API endpoint
export const usePortfolioData = () => 
  useApi<PortfolioData>(() => PortfolioAPI.getPortfolioData());

export const useIntro = () => 
  useApi<Intro>(() => PortfolioAPI.getIntro());

export const useAbout = () => 
  useApi<{ about: string }>(() => PortfolioAPI.getAbout());

export const useSkills = () => 
  useApi<Skills>(() => PortfolioAPI.getSkills());

export const useExperience = () => 
  useApi<Experience[]>(() => PortfolioAPI.getExperience());

export const useEducation = () => 
  useApi<Education[]>(() => PortfolioAPI.getEducation());

export const useProjects = () => 
  useApi<Project[]>(() => PortfolioAPI.getProjects());

export const useCertifications = () => 
  useApi<Certification[]>(() => PortfolioAPI.getCertifications());

export const useContact = () => 
  useApi<Contact>(() => PortfolioAPI.getContact());

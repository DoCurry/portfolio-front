import portfolioData from '@/data/portfolio-data.json';
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

// Local fallback data service
export class FallbackDataService {
  private static data: PortfolioData = portfolioData as PortfolioData;

  static getPortfolioData(): PortfolioData {
    return this.data;
  }

  static getIntro(): Intro {
    return this.data.intro;
  }

  static getAbout(): { about: string } {
    return { about: this.data.about };
  }

  static getSkills(): Skills {
    return this.data.skills;
  }

  static getExperience(): Experience[] {
    return this.data.experience;
  }

  static getEducation(): Education[] {
    return this.data.education;
  }

  static getProjects(): Project[] {
    return this.data.projects;
  }

  static getCertifications(): Certification[] {
    return this.data.certifications;
  }

  static getContact(): Contact {
    return this.data.contact;
  }
}

export default FallbackDataService;

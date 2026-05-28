export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  githubLink?: string;
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credlyLink?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
}

export type TemplateStyle = 'minimal' | 'corporate' | 'creative' | 'technical' | 'academic';
export type OutputFormat = 'html' | 'pdf' | 'pptx';
export type FontStyle = 'modern' | 'classic' | 'mono' | 'humanist';
export type LayoutStyle = 'single' | 'two-column';

export interface PortfolioData {
  // Personal
  fullName: string;
  jobTitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto?: string; // base64

  // Skills
  skills: string[];
  languages: string[];

  // Experience
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  testimonials: Testimonial[];

  // Social
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  youtube: string;
  website: string;

  // Customization
  template: TemplateStyle;
  primaryColor: string;
  fontStyle: FontStyle;
  layout: LayoutStyle;
  outputFormat: OutputFormat;
  sections: {
    skills: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    certifications: boolean;
    testimonials: boolean;
    languages: boolean;
    social: boolean;
  };
}

export const defaultPortfolioData: PortfolioData = {
  fullName: '',
  jobTitle: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  skills: [],
  languages: [],
  workExperience: [],
  education: [],
  projects: [],
  certifications: [],
  testimonials: [],
  linkedin: '',
  github: '',
  twitter: '',
  instagram: '',
  youtube: '',
  website: '',
  template: 'minimal',
  primaryColor: '#00C9A7',
  fontStyle: 'modern',
  layout: 'single',
  outputFormat: 'html',
  sections: {
    skills: true,
    experience: true,
    education: true,
    projects: true,
    certifications: true,
    testimonials: false,
    languages: true,
    social: true,
  },
};

export type FormStep =
  | 'personal'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'social'
  | 'template'
  | 'generate';

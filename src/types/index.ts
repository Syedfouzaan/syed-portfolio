export interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  proficiency: number;
}

export interface SkillCategory {
  [category: string]: Skill[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  shortDesc: string;
  fullDesc: string;
  tech: string[];
  metrics: ProjectMetric[];
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  github: string;
  demo: string | null;
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  specialization: string;
  coursework: string[];
  logo?: string;
}

export interface Certification {
  name: string;
  provider: string;
  year: string;
  verifyUrl: string;
  category: string;
}

export interface Achievement {
  title: string;
  event: string;
  date: string;
  icon: string;
  impact: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

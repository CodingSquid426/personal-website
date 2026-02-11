export interface Project {
  title: string;
  role?: string;
  description: string;
  tags: string[];
  link?: string;
  linkText?: string;
}

export interface Publication {
  title: string;
  venue: string;
  description?: string;
  link?: string;
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description?: string;
}

export interface LeadershipRole {
  organization: string;
  role: string;
  description: string;
}

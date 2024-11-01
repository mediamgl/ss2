export interface Episode {
  id: number;
  title: string;
  guest: string;
  date: string;
  duration: string;
  description: string;
  image: string;
  audioUrl: string;
  tags: string[];
  showNotes: {
    topics: string[];
    links: Array<{ title: string; url: string }>;
    timestamps: Array<{ time: string; topic: string }>;
  };
}

export interface FormData {
  companyName: string;
  website: string;
  stage: string;
  location: string;
  industry: string;
  name: string;
  role: string;
  email: string;
  linkedin: string;
  problem: string;
  solution: string;
  challenges: string;
  lessons: string;
  advice: string;
  coverImage: string;
  founderImage: string;
  videoUrl?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}
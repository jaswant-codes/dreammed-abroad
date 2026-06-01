export interface Country {
  name: string;
  slug: string;
  heroImage: string;
  flagEmoji: string;
  overview: string;
  shortDescription: string;
  tuitionRange: string;
  duration: string;
  medium: string;
  recognition: string[];
  benefits: { title: string; description: string }[];
  topUniversities: string[];
  feeStructure: { item: string; cost: string }[];
  eligibility: string[];
  admissionProcess: string[];
  documentsRequired: string[];
  hostelAndFood: string;
  careerOpportunities: string[];
  faqs: FAQ[];
  metaTitle: string;
  metaDescription: string;
}

export interface University {
  name: string;
  slug: string;
  country: string;
  countrySlug: string;
  flagEmoji: string;
  image: string;
  ranking: string;
  established: string;
  tuitionFee: string;
  hostelFee: string;
  duration: string;
  medium: string;
  overview: string;
  recognition: string[];
  eligibility: string[];
  admissionProcess: string[];
  facilities: string[];
  gallery?: {
    src: string;
    alt: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}

export interface Testimonial {
  id: number;
  name: string;
  university: string;
  country: string;
  quote: string;
  rating: number;
  year: string;
  initials: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  neetScore?: string;
  preferredCountry?: string;
  budget?: string;
  message?: string;
  source: string;
  createdAt: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

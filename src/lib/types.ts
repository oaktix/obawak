// TypeScript Definitions for Obawak Consult Website & CMS

export interface HomepageContent {
  id: string;
  key: string;
  content: {
    hero?: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      stats: { label: string; value: string }[];
    };
    aboutPreview?: {
      title: string;
      subtitle: string;
      text: string;
      bullets: string[];
    };
    whyChooseUs?: {
      title: string;
      subtitle: string;
      items: { title: string; description: string; icon: string }[];
    };
    contactInfo?: {
      phone: string;
      email: string;
      address: string;
      hours: string;
    };
  };
  updated_at: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string; // Lucide Icon name
  short_description: string;
  long_description: string;
  benefits: string[];
  process_steps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  image_url?: string;
  is_featured: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  client?: string;
  service_id?: string;
  service_title?: string; // Derived field
  location?: string;
  completion_date?: string;
  is_featured: boolean;
  cover_image: string;
  images?: string[]; // Derived gallery urls
  created_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number; // 1-5
  photo_url?: string;
  is_approved: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary: string;
  featured_image: string;
  category: string;
  published: boolean;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[]; // List of services requested
  project_scale: 'residential' | 'commercial' | 'industrial';
  timeline: string;
  budget: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'contacted';
  created_at: string;
}

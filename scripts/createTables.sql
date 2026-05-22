-- Supabase tables for Obawak Consult seed data
-- Run this script in your Supabase project's SQL editor or via Supabase CLI

-- 1. homepage_content
CREATE TABLE IF NOT EXISTS public.homepage_content (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "key" text NOT NULL,
  content jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. services
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  icon text,
  short_description text,
  long_description text,
  benefits text[],
  process_steps jsonb,
  faqs jsonb,
  image_url text,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. projects
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  client text,
  service_id text,
  service_title text,
  location text,
  completion_date date,
  is_featured boolean DEFAULT false,
  cover_image text,
  created_at timestamp with time zone DEFAULT now()
);

-- 4. project_images (join table)
CREATE TABLE IF NOT EXISTS public.project_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- 5. testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  role text,
  company text,
  content text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  photo_url text,
  is_approved boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- 6. blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  content text,
  summary text,
  featured_image text,
  category text,
  published boolean DEFAULT false,
  published_at timestamp with time zone,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT now()
);

-- 7. inquiries
CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text,
  status text CHECK (status IN ('unread','read','responded')) DEFAULT 'unread',
  created_at timestamp with time zone DEFAULT now()
);

-- 8. quote_requests
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  services text[],
  project_scale text CHECK (project_scale IN ('residential','commercial','industrial')),
  timeline text,
  budget text,
  description text,
  status text CHECK (status IN ('pending','reviewed','contacted')) DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable pgcrypto for uuid generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

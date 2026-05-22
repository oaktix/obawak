-- Obawak Consult Website & CMS Database Schema
-- Run this directly in your Supabase SQL Editor

-- -------------------------------------------------------------
-- Enable UUID extensions
-- -------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------
-- Helper: Updated At Trigger Function
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------
-- 1. Homepage Content Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS homepage_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TRIGGER update_homepage_content_modtime
    BEFORE UPDATE ON homepage_content
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- -------------------------------------------------------------
-- 2. Services Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    icon TEXT NOT NULL, -- Name of Lucide Icon (e.g. 'Zap', 'Shield', 'Wifi')
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    benefits JSONB DEFAULT '[]'::jsonb NOT NULL, -- Array of strings
    process_steps JSONB DEFAULT '[]'::jsonb NOT NULL, -- Array of strings/objects
    faqs JSONB DEFAULT '[]'::jsonb NOT NULL, -- Array of objects {question, answer}
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- 3. Projects Table (Portfolio)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    client TEXT,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    location TEXT,
    completion_date DATE,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    cover_image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- 4. Project Images (Multi-image Gallery)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- 5. Testimonials Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5 NOT NULL,
    photo_url TEXT,
    is_approved BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- 6. Blog Posts Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- Rich-text or Markdown content
    summary TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. 'Safety', 'Energy', 'Security'
    published BOOLEAN DEFAULT false NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- 7. Inquiries Table (Standard Contact)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL, -- 'unread', 'read', 'responded'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- 8. Quote Requests Table (Detailed Interactive Wizard)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    services JSONB DEFAULT '[]'::jsonb NOT NULL, -- Array of service titles/slugs requested
    project_scale TEXT NOT NULL, -- 'residential', 'commercial', 'industrial'
    timeline TEXT NOT NULL, -- e.g. 'immediate', '1-3 months', 'flexible'
    budget TEXT NOT NULL, -- e.g. '< $5k', '$5k - $20k', '$20k+'
    description TEXT,
    status TEXT DEFAULT 'pending' NOT NULL, -- 'pending', 'reviewed', 'contacted'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- Enable Row Level Security (RLS)
-- -------------------------------------------------------------
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------
-- RLS Policies
-- -------------------------------------------------------------

-- Public Read Policies
CREATE POLICY "Allow public read on homepage_content" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Allow public read on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on project_images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Allow public read on approved testimonials" ON testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Allow public read on published blog_posts" ON blog_posts FOR SELECT USING (published = true);

-- Public Write Policies (Forms)
CREATE POLICY "Allow public inserts on inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts on quote_requests" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts on testimonials" ON testimonials FOR INSERT WITH CHECK (true);

-- Admin CRUD Policies (Service Role or Authenticated)
-- For simple setup, we allow all operations (true) since the admin dashboard uses a local password mechanism.
CREATE POLICY "Allow admin CRUD on homepage_content" ON homepage_content USING (true);
CREATE POLICY "Allow admin CRUD on services" ON services USING (true);
CREATE POLICY "Allow admin CRUD on projects" ON projects USING (true);
CREATE POLICY "Allow admin CRUD on project_images" ON project_images USING (true);
CREATE POLICY "Allow admin CRUD on testimonials" ON testimonials USING (true);
CREATE POLICY "Allow admin CRUD on blog_posts" ON blog_posts USING (true);
CREATE POLICY "Allow admin CRUD on inquiries" ON inquiries USING (true);
CREATE POLICY "Allow admin CRUD on quote_requests" ON quote_requests USING (true);

-- -------------------------------------------------------------
-- Indexes for performance Optimization
-- -------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_service ON projects(service_id);
CREATE INDEX IF NOT EXISTS idx_project_images_project ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);

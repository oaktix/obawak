// src/app/admin/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ArrowRight, Home, Settings, Grid2X2, FileText, MessageSquare, Calendar, BookOpen } from "lucide-react";
import { getServices, getProjects, getBlogPosts, getTestimonials, getInquiries, getQuoteRequests } from "@/lib/db";
import { Service, Project, BlogPost, Testimonial } from "@/lib/types";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {
  // Add counts state for metric cards
  const [counts, setCounts] = useState({ services: 0, projects: 0, blogPosts: 0, testimonials: 0, inquiries: 0, quotes: 0 });
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, projectsData, blogsData, testimonialsData, inquiriesData, quotesData] = await Promise.all([
          getServices(),
          getProjects(),
          getBlogPosts(),
          getTestimonials(),
          getInquiries(),
          getQuoteRequests(),
        ]);
        // Set counts for metric cards
        setCounts({
          services: servicesData.length,
          projects: projectsData.length,
          blogPosts: blogsData.length,
          testimonials: testimonialsData.length,
          inquiries: inquiriesData.length,
          quotes: quotesData.length,
        });
        // Set preview data
        setServices(servicesData);
        setPosts(blogsData);
        setTestimonials(testimonialsData);
        setProjects(projectsData);
      } catch (e) {
        console.error("Failed to load admin data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-premium text-white py-20 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Overview of core content and inbound requests for Obawak Consult.
          </p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-md hover:bg-accent-dark transition-colors shadow-lg">
            Contact Support
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

          {/* PREVIEW SECTIONS */}
          <section className="py-8">
            <h2 className="font-display text-2xl mb-4">Recent Services</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.slice(0, 3).map((s) => (
                <li key={s.id} className="p-4 bg-white rounded shadow">
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.short_description}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="py-8">
            <h2 className="font-display text-2xl mb-4">Recent Blog Posts</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.slice(0, 3).map((b) => (
                <li key={b.id} className="p-4 bg-white rounded shadow">
                  <h3 className="font-medium">{b.title}</h3>
                  <p className="text-sm text-gray-600">{b.summary}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="py-8">
            <h2 className="font-display text-2xl mb-4">Recent Testimonials</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.slice(0, 3).map((t) => (
                <li key={t.id} className="p-4 bg-white rounded shadow">
                  <p className="italic">"{t.content}"</p>
                  <p className="mt-2 text-sm font-medium">- {t.name}, {t.company}</p>
                </li>
              ))}
            </ul>
          </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={Home} title="Services" count={counts.services} />
            <StatCard icon={Grid2X2} title="Portfolio Projects" count={counts.projects} />
            <StatCard icon={FileText} title="Blog Posts" count={counts.blogPosts} />
            <StatCard icon={MessageSquare} title="Testimonials" count={counts.testimonials} />
            <StatCard icon={Calendar} title="Inquiries" count={counts.inquiries} />
            <StatCard icon={BookOpen} title="Quote Requests" count={counts.quotes} />
          </div>
        </div>
      </section>
    </div>
  );
}

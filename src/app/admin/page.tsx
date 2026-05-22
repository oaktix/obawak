// src/app/admin/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ArrowRight, Home, Settings, Grid2X2, FileText, MessageSquare, Calendar, BookOpen, Zap } from "lucide-react";
import { getServices, getProjects, getBlogPosts, getTestimonials, getInquiries, getQuoteRequests } from "@/lib/db";
import { Service, Project, BlogPost, Testimonial } from "@/lib/types";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {
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
        setCounts({
          services: servicesData.length,
          projects: projectsData.length,
          blogPosts: blogsData.length,
          testimonials: testimonialsData.length,
          inquiries: inquiriesData.length,
          quotes: quotesData.length,
        });
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
      <section className="bg-gradient-premium text-white py-16 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Overview of core content and inbound requests for Obawak Consult.
          </p>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="py-10">
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

      {/* PREVIEW SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">

        {/* Recent Services */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-bold text-primary">Recent Services</h2>
            <Link href="/admin/services" className="text-sm text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1 transition-colors">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.slice(0, 3).map((s) => (
              <li key={s.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary">{s.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{s.short_description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Blog Posts */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-bold text-primary">Recent Blog Posts</h2>
            <Link href="/admin/blog" className="text-sm text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1 transition-colors">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.slice(0, 3).map((b) => (
              <li key={b.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">{b.category}</span>
                  {b.published && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Published</span>}
                </div>
                <h3 className="font-semibold text-primary mb-1">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{b.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Testimonials */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-bold text-primary">Recent Testimonials</h2>
            <Link href="/admin/testimonials" className="text-sm text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1 transition-colors">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((t) => (
              <li key={t.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-sm">★</span>
                  ))}
                </div>
                <p className="italic text-sm text-gray-700 leading-relaxed mb-3">&ldquo;{t.content.length > 120 ? t.content.slice(0, 120) + '…' : t.content}&rdquo;</p>
                <p className="text-sm font-medium text-primary">— {t.name}{t.company ? `, ${t.company}` : ''}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Portfolio */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-bold text-primary">Recent Portfolio</h2>
            <Link href="/admin/portfolio" className="text-sm text-accent hover:text-accent-dark font-medium inline-flex items-center gap-1 transition-colors">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 3).map((p) => (
              <li key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200 relative">
                  {p.cover_image && (
                    <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
                  )}
                  {p.is_featured && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-accent text-primary text-xs font-bold rounded">Featured</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary mb-1">{p.title}</h3>
                  <p className="text-xs text-gray-500">{p.client} • {p.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}

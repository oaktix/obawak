// src/app/portfolio/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, ArrowRight, Check, Briefcase, Calendar, Image as ImageIcon } from "lucide-react";
import { getProjectBySlug } from "@/lib/db";
import { Project } from "@/lib/types";

export default function PortfolioDetailPage() {
  const { slug } = useParams() as { slug: string };
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (e) {
        console.error("Failed to load project", e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-16 px-4">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="font-display text-2xl font-bold text-primary">Project Not Found</h2>
          <p className="text-sm text-gray-500">The requested case study could not be located.</p>
          <Link href="/portfolio" className="inline-flex items-center justify-center px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-premium text-white py-24 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="flex items-center space-x-3 text-accent bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit">
            <Briefcase className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">CASE STUDY</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">{project.title}</h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl">{project.description}</p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-md hover:bg-accent-dark transition-colors shadow-lg">
            Request Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`${project.title} image ${i + 1}`} className="object-cover w-full h-64 rounded-lg shadow" />
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-primary">Overview</h2>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-500">
            <div>
              <h3 className="font-bold text-primary mb-2">Location</h3>
              <p>{project.location || "Nigeria"}</p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-2">Completed</h3>
              <p>{project.completion_date ? new Date(project.completion_date).toLocaleDateString() : "—"}</p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-2">Service</h3>
              <p>{project.service_title || "General"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-gradient-premium text-white py-16 text-center border-t border-accent/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-30" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Ready for Your Next Infrastructure Project?</h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto font-light leading-relaxed">Connect with our engineers for a free initial consultation and feasibility review.</p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-md hover:bg-accent-dark transition-transform shadow-lg">
            Consult Our Engineers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

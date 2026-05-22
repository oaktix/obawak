// src/app/about/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHomepageContent } from "@/lib/db";
import { HomepageContent } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [about, setAbout] = useState<HomepageContent["content"]["aboutPreview"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const hp = await getHomepageContent();
        setAbout(hp.content.aboutPreview);
      } catch (e) {
        console.error("Failed to load about content", e);
      } finally {
        setLoading(false);
      }
    };
    load();
    // Refresh on local DB updates
    window.addEventListener("storage_db_update", load);
    return () => window.removeEventListener("storage_db_update", load);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary">Loading About Page...</p>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary">About information not available.</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">
            {about.subtitle}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            {about.title}
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {about.text}
          </p>
        </div>
        <ul className="space-y-4 max-w-3xl mx-auto">
          {about.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start">
              <ArrowRight className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-primary/90 font-medium">{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-shadow shadow-md"
          >
            Explore Our Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

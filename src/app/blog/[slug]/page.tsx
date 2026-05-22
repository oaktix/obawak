// src/app/blog/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, ArrowRight, Calendar, Check } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/db";
import { BlogPost } from "@/lib/types";

export default function BlogDetailPage() {
  const { slug } = useParams() as { slug: string };
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getBlogPostBySlug(slug);
        setPost(data);
      } catch (e) {
        console.error("Failed to load blog post", e);
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-16 px-4">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="font-display text-2xl font-bold text-primary">Article Not Found</h2>
          <p className="text-sm text-gray-500">The requested blog post could not be located.</p>
          <Link href="/blog" className="inline-flex items-center justify-center px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            Back to Blog
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
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">{post.title}</h1>
          <div className="flex items-center space-x-3 text-sm text-white/70">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
          </div>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-md hover:bg-accent-dark transition-colors shadow-lg">
            Get In Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 prose prose-lg">
          {/* The blog content is assumed to be HTML or markdown rendered as raw HTML */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-gradient-premium text-white py-16 text-center border-t border-accent/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-30" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Ready to Discuss Your Next Project?</h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto font-light leading-relaxed">Contact our team for a complimentary consultation.</p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-md hover:bg-accent-dark transition-transform shadow-lg">
            Consult Our Engineers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

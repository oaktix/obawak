// src/app/about/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target, Lightbulb, ShieldCheck, Award, Zap, Building } from "lucide-react";
import { getHomepageContent } from "@/lib/db";
import { HomepageContent } from "@/lib/types";

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative bg-gradient-premium text-white py-24 md:py-32 overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center text-xs font-semibold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full animate-fade-in">
              <Building className="h-3.5 w-3.5 mr-1.5" /> Corporate Overview
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight animate-slide-up">
              Engineering the Future of Infrastructure.
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light animate-slide-up max-w-2xl">
              Obawak Consult is a premier multi-disciplinary engineering firm dedicated to delivering high-performance security, networking, and renewable energy solutions across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* EXECUTIVE SUMMARY (Pulled from Homepage Content) */}
      {/* ------------------------------------------------------------- */}
      {about && (
        <section className="py-20 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold tracking-widest text-accent uppercase">
                  {about.subtitle || "Who We Are"}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  {about.title || "Setting the Standard in Technical Excellence"}
                </h2>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light">
                  {about.text}
                </p>
                <div className="pt-4 border-t border-gray-200 mt-6">
                  <h3 className="font-semibold text-primary mb-4 text-sm uppercase tracking-wider">Core Distinctions</h3>
                  <ul className="space-y-3">
                    {about.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-accent mr-3 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-primary/90 font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* High-end Image Grid */}
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square border border-gray-200 group">
                    <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80" alt="Engineers working" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] border border-gray-200 group">
                    <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80" alt="Solar Installation" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] border border-gray-200 group">
                    <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80" alt="Networking Equipment" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square border border-gray-200 bg-primary group flex items-center justify-center p-8">
                     <div className="text-center">
                        <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">15+</div>
                        <div className="text-sm font-medium text-white/80 uppercase tracking-widest">Years Experience</div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CORPORATE VALUES */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-accent uppercase">Corporate Philosophy</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light">
              We operate on a strict code of engineering ethics, ensuring every project is delivered safely, sustainably, and securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-accent hover:shadow-xl transition-all duration-300 group">
              <div className="bg-primary/5 text-primary p-4 rounded-xl w-fit mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-display">Uncompromising Quality</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                From component selection to final deployment, we adhere strictly to international ISO standards, ensuring long-term reliability and zero-compromise safety.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-accent hover:shadow-xl transition-all duration-300 group">
              <div className="bg-primary/5 text-primary p-4 rounded-xl w-fit mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-display">Innovative Engineering</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We stay ahead of the technology curve, constantly integrating the latest advancements in smart networking, AI security analytics, and next-gen solar technologies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-accent hover:shadow-xl transition-all duration-300 group">
              <div className="bg-primary/5 text-primary p-4 rounded-xl w-fit mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-display">Client-Centric Delivery</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Every technical solution is tailor-made. We meticulously analyze client requirements to deliver systems that perfectly align with operational and budget constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* MISSION & VISION STATEMENT */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Award className="h-8 w-8 text-accent" />
                <h2 className="font-display text-2xl md:text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-white/80 leading-relaxed font-light text-lg">
                To empower businesses and communities through the design, implementation, and maintenance of robust technological infrastructure. We strive to create environments that are secure, connected, and powered by sustainable energy.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Zap className="h-8 w-8 text-accent" />
                <h2 className="font-display text-2xl md:text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-white/80 leading-relaxed font-light text-lg">
                To be the foremost engineering consultancy in Africa, recognized globally for pioneering integrated solutions that bridge the gap between heavy infrastructure and digital intelligence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CTA SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Ready to Work With the Experts?
          </h2>
          <p className="text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
            Discover how our team of certified engineers can transform your operational infrastructure. From blueprints to final deployment, we handle it all.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-bold rounded-md text-white bg-primary hover:bg-primary-dark shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Explore Our Capabilities
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-sm font-bold rounded-md text-primary bg-white hover:bg-gray-50 hover:border-primary transition-all"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

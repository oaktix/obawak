"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Zap, 
  Shield, 
  Network, 
  Sun, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Briefcase,
  Loader2 
} from "lucide-react";
import { getServiceBySlug, getProjects } from "@/lib/db";
import { Service, Project } from "@/lib/types";

const IconMap: { [key: string]: React.ComponentType<any> } = {
  Zap: Zap,
  Shield: Shield,
  Network: Network,
  Sun: Sun,
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<Service | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  // Accordion active index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const srv = await getServiceBySlug(slug);
        setService(srv);
        
        if (srv) {
          const allProjects = await getProjects();
          const related = allProjects.filter((p) => p.service_id === srv.id);
          setRelatedProjects(related);
        }
      } catch (e) {
        console.error("Failed to load service detail:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider text-primary/80 uppercase">Loading Engineering Details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-16 px-4">
        <div className="text-center space-y-6 max-w-md">
          <h2 className="font-display text-2xl font-bold text-primary">Service Catalogue Missing</h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            The requested capability or service has either been archived or is undergoing revision. Explore our standard catalog.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-md text-white bg-primary hover:bg-primary-dark shadow"
          >
            Return to Core Services
          </Link>
        </div>
      </div>
    );
  }

  const ServiceIcon = IconMap[service.icon] || Zap;

  return (
    <div className="bg-white">
      {/* ------------------------------------------------------------- */}
      {/* HEADER HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-premium text-white py-24 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center space-x-3 text-accent bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit">
              <ServiceIcon className="h-4.5 w-4.5" />
              <span className="text-xs font-bold tracking-widest uppercase">CAPABILITY SCHEMATIC</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl">
              {service.short_description}
            </p>
            <div className="pt-2">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-md text-primary bg-accent hover:bg-accent-dark shadow-lg"
              >
                Inquire About this Infrastructure
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* DETAILED CONTENT */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Descriptions & Workflow */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Technical Description */}
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-primary">Technical Scope & Deployment</h2>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light">
                  {service.long_description}
                </p>
              </div>

              {/* Workflow Steps */}
              {service.process_steps.length > 0 && (
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-bold text-primary">Our Step-by-Step Methodology</h3>
                  <div className="relative border-l-2 border-gray-100 pl-4 space-y-8">
                    {service.process_steps.map((step, i) => (
                      <div key={i} className="relative group pl-6">
                        <div className="absolute -left-[23px] top-0 h-4.5 w-4.5 rounded-full border-4 border-white bg-accent group-hover:bg-primary transition-colors"></div>
                        <div className="space-y-1.5">
                          <h4 className="font-display text-sm sm:text-base font-bold text-primary">
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Benefits, FAQs, Specifications */}
            <div className="lg:col-span-4 space-y-10">
              
              {/* Benefits Card */}
              {service.benefits.length > 0 && (
                <div className="bg-primary text-white border border-accent/10 rounded-2xl p-6 shadow-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-20"></div>
                  <div className="relative z-10 space-y-4">
                    <h3 className="font-display text-base font-bold tracking-wider text-accent uppercase">
                      EXPECTED BENEFITS
                    </h3>
                    <ul className="space-y-3.5">
                      {service.benefits.map((b, i) => (
                        <li key={i} className="flex items-start text-xs leading-relaxed font-light text-white/95">
                          <Check className="h-4.5 w-4.5 text-accent mr-2.5 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-display text-sm font-bold tracking-widest text-primary uppercase">
                    RELATED CASE STUDIES
                  </h3>
                  <div className="space-y-3">
                    {relatedProjects.map((p) => (
                      <Link
                        key={p.id}
                        href={`/portfolio/${p.slug}`}
                        className="flex items-center space-x-4 p-3 border border-gray-200 rounded-xl hover:shadow-md hover:border-primary/10 transition-all group"
                      >
                        <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.cover_image} alt={p.title} className="object-cover w-full h-full" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
                            {p.title}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-mono flex items-center">
                            <Briefcase className="h-3 w-3 mr-1" /> {p.location || "Nigeria"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Accordion Section */}
          {service.faqs.length > 0 && (
            <div className="pt-20 border-t border-gray-100 max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold tracking-widest text-accent uppercase">FAQ SHEETS</span>
                <h3 className="font-display text-2xl font-extrabold text-primary">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3.5 pt-4">
                {service.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left font-display text-sm sm:text-base font-bold text-primary hover:text-accent transition-colors focus:outline-none cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-accent" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isOpen ? "max-h-[300px] border-t border-gray-100" : "max-h-0"
                        }`}
                      >
                        <p className="p-5 text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER CTA */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-premium text-white py-16 text-center border-t border-accent/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
            Ready to Partner on Your Next Infrastructure Project?
          </h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Connect directly with an engineering expert for a free initial consultation and consumption feasibility review.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-md text-primary bg-accent hover:bg-accent-dark shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Consult Our Engineers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

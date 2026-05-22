"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, 
  Shield, 
  Network, 
  Sun, 
  ArrowRight, 
  Check, 
  ClipboardCheck, 
  Cpu, 
  Wrench, 
  FileCheck,
  ShieldCheck,
  Loader2 
} from "lucide-react";
import { getServices } from "@/lib/db";
import { Service } from "@/lib/types";

const IconMap: { [key: string]: React.ComponentType<any> } = {
  Zap: Zap,
  Shield: Shield,
  Network: Network,
  Sun: Sun,
};

export default function ServicesPage() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (e) {
      console.error("Failed to load services:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
    window.addEventListener("storage_db_update", loadServices);
    return () => window.removeEventListener("storage_db_update", loadServices);
  }, []);

  const workflowSteps = [
    {
      step: "01",
      title: "Diagnostic Site Audit",
      description: "Our certified engineers deploy thermal cameras, power consumption data loggers, and sightline vulnerability scanners to map out the exact baseline conditions of your building.",
      icon: ClipboardCheck,
    },
    {
      step: "02",
      title: "Precision System Blueprinting",
      description: "We translate audits into detailed schematic models (Load calculations, Single-Line Diagrams, server cable pathways, and solar roof anchor layouts) compliant with international regulations.",
      icon: Cpu,
    },
    {
      step: "03",
      title: "Professional First & Second Fixes",
      description: "Deploying high-impact fire-retardant conduits and industrial cable routing trays, terminated with Fluke instruments and high-conductivity copper conductors.",
      icon: Wrench,
    },
    {
      step: "04",
      title: "Testing, Commissioning & Sign-Off",
      description: "We execute meticulous dielectric insulation checks, circuit load testing, IP tripwire calibrations, and provide you with a comprehensive physical and digital handoff packet.",
      icon: FileCheck,
    },
    {
      step: "05",
      title: "Dedicated SLA Maintenance",
      description: "Every deployment is backed by custom Service Level Agreements offering preventative thermal checks, battery-inverter diagnostics, and 24/7 priority emergency dispatch.",
      icon: ShieldCheck,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider text-primary/80 uppercase">Loading Engineering Catalogue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* ------------------------------------------------------------- */}
      {/* HEADER HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-premium text-white py-20 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">SERVICES CATALOGUE</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Resilient Infrastructure Systems
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            From industrial power balancing to managed optical networking and off-grid high-capacity solar systems, we deliver engineering mastery.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CAPABILITIES CATALOGUE GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-accent uppercase">WHAT WE BUILD</span>
            <h2 className="font-display text-3xl font-extrabold text-primary tracking-tight">
              Core Engineering Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service) => {
              const ServiceIcon = IconMap[service.icon] || Zap;
              return (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200/80 rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/5 text-primary group-hover:bg-accent group-hover:text-primary p-4 rounded-xl shadow-sm transition-colors shrink-0">
                        <ServiceIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed font-light">
                      {service.long_description}
                    </p>

                    {/* Features Snippet */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold tracking-widest text-primary uppercase">EXPECTED BENEFITS:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.benefits.slice(0, 2).map((b, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-600 font-medium">
                            <Check className="h-4 w-4 text-accent mr-2 shrink-0" />
                            <span className="line-clamp-1">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100/60 mt-8 flex items-center justify-between">
                    <Link
                      href={`/quote?service=${service.slug}`}
                      className="text-xs font-bold text-accent bg-primary hover:bg-primary-dark border border-transparent px-4 py-2 rounded-md shadow transition-colors"
                    >
                      Request Engineering Quote
                    </Link>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center text-xs font-bold text-primary hover:text-accent transition-colors group/dbtn"
                    >
                      Technical Deep Dive
                      <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover/dbtn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* METHODOLOGY / WORKFLOW */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-accent uppercase">THE BLUEPRINT</span>
            <h2 className="font-display text-3xl font-extrabold text-primary tracking-tight">
              Our Professional Integration Methodology
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
              We employ a highly structured, safety-validated project pipeline to ensure absolute quality and transparency.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {workflowSteps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={i} className="space-y-4 relative group">
                  {/* Step Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-extrabold text-gray-200 group-hover:text-accent transition-colors">
                      {step.step}
                    </span>
                    <StepIcon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-bold text-primary">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CTA SECTION */}
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

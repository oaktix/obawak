"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Calendar, MapPin, Loader2 } from "lucide-react";
import { getProjects, getServices } from "@/lib/db";
import { Project, Service } from "@/lib/types";

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const loadData = async () => {
    try {
      const proj = await getProjects();
      const srv = await getServices();
      setProjects(proj);
      setServices(srv);
    } catch (e) {
      console.error("Failed to load portfolio database:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("storage_db_update", loadData);
    return () => window.removeEventListener("storage_db_update", loadData);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider text-primary/80 uppercase">Loading Case Studies...</p>
        </div>
      </div>
    );
  }

  // Filter projects by active tab
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.service_id === activeFilter);

  return (
    <div className="bg-white">
      {/* ------------------------------------------------------------- */}
      {/* HEADER HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-premium text-white py-20 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">SELECTED COMMISSIONS</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Case Studies
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our engineering deployments, highlighting technical safety standards, structured cables, and renewable power balancing.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PORTFOLIO GRID WITH CATEGORIES */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            <button
              onClick={() => setActiveFilter("all")}
              className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-primary border-primary text-white shadow"
                  : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
              }`}
            >
              All Projects ({projects.length})
            </button>
            {services.map((srv) => {
              const count = projects.filter((p) => p.service_id === srv.id).length;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveFilter(srv.id)}
                  className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
                    activeFilter === srv.id
                      ? "bg-primary border-primary text-white shadow"
                      : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                  }`}
                >
                  {srv.title} ({count})
                </button>
              );
            })}
          </div>

          {/* Grid Projects */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden aspect-16/10 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-sm text-accent text-[9px] font-bold px-2.5 py-1 rounded tracking-widest uppercase">
                      {project.service_title}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3 mb-6">
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-gray-500 font-mono">
                        {project.location && (
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-accent" /> {project.location}
                          </span>
                        )}
                        {project.completion_date && (
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-accent" />
                            {new Date(project.completion_date).toLocaleDateString(undefined, {year: 'numeric', month: 'short'})}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold text-primary leading-snug group-hover:text-accent transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-mono">Client: {project.client || "Confidential"}</span>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center text-xs font-bold text-primary group-hover:text-accent transition-colors group/abtn"
                      >
                        Read Case Study
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover/abtn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-16 text-center max-w-md mx-auto space-y-4">
              <Briefcase className="h-10 w-10 text-gray-400 mx-auto" />
              <h3 className="font-display text-base font-bold text-primary">No Projects Catalogued</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                There are no case study commissions loaded for this specific category yet. Browse our standard sections.
              </p>
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

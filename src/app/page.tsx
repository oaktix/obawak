"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, 
  Shield, 
  Network, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  Cpu, 
  Leaf, 
  PhoneCall, 
  ShieldAlert,
  Loader2
} from "lucide-react";
import { 
  getHomepageContent, 
  getServices, 
  getProjects, 
  getTestimonials, 
  getBlogPosts 
} from "@/lib/db";
import { HomepageContent, Service, Project, Testimonial, BlogPost } from "@/lib/types";
import { SEED_HOMEPAGE, SEED_SERVICES } from "@/lib/seed";

// Helper to resolve icon name to Lucide Component
const IconMap: { [key: string]: React.ComponentType<any> } = {
  Zap: Zap,
  Shield: Shield,
  Network: Network,
  Sun: Sun,
  ShieldAlert: ShieldAlert,
  Cpu: Cpu,
  Leaf: Leaf,
  PhoneCall: PhoneCall,
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Filtering projects
  const [activeFilter, setActiveFilter] = useState("all");
  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const loadData = async () => {
    try {
      const hpData = await getHomepageContent();
      const srvData = await getServices();
      const projData = await getProjects();
      const testData = await getTestimonials(true);
      const blogData = await getBlogPosts(true);

      // Always fall back to seed data so the page never stays blank
      setHomepage(hpData || SEED_HOMEPAGE);
      setServices((srvData.length ? srvData : SEED_SERVICES).filter(s => s.is_featured));
      setProjects(projData);
      setTestimonials(testData);
      setBlogs(blogData.slice(0, 3)); // show top 3
    } catch (e) {
      console.error("Home page load failed:", e);
      // Hard fallback – show seed data so the page is never blank
      setHomepage(SEED_HOMEPAGE);
      setServices(SEED_SERVICES.filter(s => s.is_featured));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Listen to local database updates
    window.addEventListener("storage_db_update", loadData);
    return () => window.removeEventListener("storage_db_update", loadData);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider text-primary/80 uppercase">Loading Infrastructure...</p>
        </div>
      </div>
    );
  }

  // If homepage is still null after loading (should not happen with seed fallback)
  if (!homepage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">Could not load page content. Please refresh.</p>
        </div>
      </div>
    );
  }

  const { hero, aboutPreview, whyChooseUs } = homepage.content;

  // Filter projects by category
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.service_id === activeFilter);

  // Extract unique services from projects to build filter tabs
  const projectCategories = Array.from(
    new Map(
      projects
        .filter(p => p.service_id && p.service_title)
        .map(p => [p.service_id, p.service_title])
    ).entries()
  );

  return (
    <div className="overflow-hidden bg-white">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative bg-gradient-premium text-white py-24 md:py-32 overflow-hidden border-b border-accent/15">
        {/* Animated structural overlay grids */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl text-center md:text-left space-y-6">
            <span className="inline-flex items-center text-xs font-semibold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full animate-fade-in">
              <Zap className="h-3.5 w-3.5 mr-1.5 animate-pulse" /> Engineering Excellence
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight animate-slide-up">
              {hero?.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-3xl animate-slide-up">
              {hero?.subtitle}
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up">
              <Link
                href={hero?.ctaLink || "/quote"}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-accent-dark shadow-xl hover:shadow-accent/20 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {hero?.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-base font-medium rounded-md text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-200"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
            {hero?.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-accent/40 transition-colors group"
              >
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-accent group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium tracking-wide text-white/60 mt-1 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURED SERVICES PREVIEW */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-accent uppercase">OUR CORE EXPERTISE</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Infrastructural Capabilities
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              We design, build, and support high-spec engineering networks that guarantee continuous operations and maximum capacity performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const ServiceIcon = IconMap[service.icon] || Zap;
              return (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200/80 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="bg-primary/5 text-primary group-hover:bg-accent group-hover:text-primary p-4 rounded-xl w-fit transition-colors duration-300 mb-6 shadow-sm">
                    <ServiceIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">
                    {service.short_description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-bold text-primary group-hover:text-accent transition-colors w-fit group/btn"
                  >
                    View Engineering Specs
                    <ArrowRight className="ml-1.5 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* ABOUT COMPANY PREVIEW */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual grid illustration */}
            <div className="lg:col-span-6 relative grid grid-cols-12 gap-4">
              {/* Main premium illustration image */}
              <div className="col-span-8 overflow-hidden rounded-2xl shadow-xl border border-gray-200 relative aspect-4/3 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                  alt="Industrial Engineering"
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]"></div>
              </div>
              <div className="col-span-4 mt-8 overflow-hidden rounded-2xl shadow-lg border border-gray-200 relative aspect-square group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80"
                  alt="Networking Cabinet"
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="col-span-4 col-start-9 -mt-16 overflow-hidden rounded-2xl shadow-lg border border-gray-200 relative aspect-square group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
                  alt="Solar Panels Mounting"
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-accent uppercase">
                {aboutPreview?.subtitle}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                {aboutPreview?.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light">
                {aboutPreview?.text}
              </p>
              
              <ul className="space-y-3.5 pt-2">
                {aboutPreview?.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-primary/95 font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-md text-white bg-primary hover:bg-primary-dark shadow-md transition-colors"
                >
                  Our Corporate History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* WHY CHOOSE US */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-primary text-white relative overflow-hidden border-y border-accent/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-accent uppercase">
              {whyChooseUs?.subtitle}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              {whyChooseUs?.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs?.items.map((item, i) => {
              const ItemIcon = IconMap[item.icon] || ShieldAlert;
              return (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent/40 hover:bg-white/8 transition-all duration-300 group flex items-start"
                >
                  <div className="bg-accent/15 text-accent p-3.5 rounded-xl mr-5 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <ItemIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PORTFOLIO GRID PREVIEW */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-accent uppercase">SELECTED WORKS</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                Case Study Showcases
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-primary border-primary text-white"
                    : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                }`}
              >
                All Projects
              </button>
              {projectCategories.map(([id, title]) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id!)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    activeFilter === id
                      ? "bg-primary border-primary text-white"
                      : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative overflow-hidden aspect-16/10 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-accent text-[10px] font-bold px-2.5 py-1 rounded tracking-widest uppercase">
                    {project.service_title}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2 mb-6">
                    <h3 className="font-display text-lg font-bold text-primary leading-snug group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center text-xs font-bold text-primary hover:text-accent transition-colors group/pbtn"
                  >
                    View Project Case Study
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover/pbtn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* TESTIMONIALS SECTION */}
      {/* ------------------------------------------------------------- */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-b border-gray-200/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4 block">
              CLIENT TESTIMONIALS
            </span>

            {/* Quote icon banner background */}
            <div className="text-8xl text-accent/15 select-none font-serif leading-none absolute -top-8 left-12">
              “
            </div>

            <div className="min-h-[220px] flex items-center justify-center">
              <div className="max-w-3xl space-y-6 transition-all duration-300">
                <div className="flex justify-center space-x-1 text-accent">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-light text-primary/90 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div>
                  <h4 className="font-display text-base font-bold text-primary">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {testimonials[currentTestimonial].role}
                    {testimonials[currentTestimonial].company && `, ${testimonials[currentTestimonial].company}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            {testimonials.length > 1 && (
              <div className="flex justify-center space-x-2.5 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                      currentTestimonial === i ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* LATEST BLOG INSIGHTS */}
      {/* ------------------------------------------------------------- */}
      {blogs.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-accent uppercase">TECHNICAL PUBLICATIONS</span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  Insights & Engineering Circulars
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors group/allb"
              >
                Browse All Publications
                <ArrowRight className="ml-1.5 h-4 w-4 transform group-hover/allb:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative overflow-hidden aspect-16/10 shrink-0 bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-xs text-gray-500 font-semibold">
                        <span className="text-accent uppercase tracking-wider">{post.category}</span>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-primary leading-snug hover:text-accent transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-light">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center text-gray-400 font-medium">
                        <BookOpen className="h-4 w-4 mr-1.5" /> 5 min read
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-bold text-primary hover:text-accent transition-colors"
                      >
                        Read Publication
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* FINAL CALL-TO-ACTION (CTA) */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-premium text-white py-20 relative overflow-hidden border-t border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-40"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-bold tracking-widest text-accent uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            READY TO COMMENCE PLANNING?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Schedule a Custom Technical Audit Today
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
            Whether you require a high-density corporate network, a smart battery-solar microgrid, or industrial-grade power factor optimization, our certified specialists are ready to engineer your solution.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-md text-primary bg-accent hover:bg-accent-dark shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Launch Interactive Quote Wizard
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-sm font-semibold rounded-md text-white hover:bg-white/5 transition-all"
            >
              Consult Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, BookOpen, Calendar, BookOpenCheck, Loader2 } from "lucide-react";
import { getBlogPosts } from "@/lib/db";
import { BlogPost } from "@/lib/types";

export default function BlogIndexPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  // Search query state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const loadBlogs = async () => {
    try {
      const data = await getBlogPosts(true);
      setPosts(data);
    } catch (e) {
      console.error("Failed to load blog insights database:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
    window.addEventListener("storage_db_update", loadBlogs);
    return () => window.removeEventListener("storage_db_update", loadBlogs);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider text-primary/80 uppercase">Loading Publications...</p>
        </div>
      </div>
    );
  }

  // Extract unique categories for filter pills
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  // Filter posts based on search query and active category pill
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Pick first article as featured post (if any exist)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = featuredPost ? filteredPosts.slice(1) : [];

  return (
    <div className="bg-white">
      {/* ------------------------------------------------------------- */}
      {/* HEADER HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-premium text-white py-20 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">TECHNICAL CIRCULARS</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Insights & Publications
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Read professional guides, power optimization whitepapers, security network analyzes, and solar transition blueprints written by our master engineers.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SEARCH AND FILTER BAR */}
      {/* ------------------------------------------------------------- */}
      <section className="py-8 bg-gray-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              onClick={() => setActiveCategory("all")}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-primary border-primary text-white"
                  : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary border-primary text-white"
                    : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 max-w-md">
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-200 text-xs rounded-lg pl-9 pr-4 py-2.5 w-full focus:outline-none focus:border-primary"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* BLOG GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredPosts.length > 0 ? (
            <div className="space-y-16">
              
              {/* Featured Post Card */}
              {featuredPost && searchQuery === "" && activeCategory === "all" && (
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto overflow-hidden relative bg-gray-50 min-h-[300px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-primary text-[9px] font-bold px-2.5 py-1 rounded tracking-widest uppercase">
                      FEATURED ARTICLE
                    </div>
                  </div>
                  
                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-xs text-gray-500 font-semibold">
                        <span className="text-accent uppercase tracking-wider">{featuredPost.category}</span>
                        <span>•</span>
                        <span>{new Date(featuredPost.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl font-extrabold text-primary leading-tight hover:text-accent transition-colors">
                        <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                        {featuredPost.summary}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-gray-100 mt-8 flex items-center justify-between">
                      <span className="inline-flex items-center text-xs text-gray-400 font-medium">
                        <BookOpen className="h-4 w-4 mr-1.5" /> 5 min read
                      </span>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="text-xs font-bold text-primary hover:text-accent transition-colors"
                      >
                        Read Publication
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchQuery !== "" || activeCategory !== "all" ? filteredPosts : standardPosts).map((post) => (
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
                        <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-semibold">
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

                      <div className="pt-4 border-t border-gray-100 mt-6 flex items-center justify-between text-xs">
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
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-16 text-center max-w-md mx-auto space-y-4">
              <BookOpenCheck className="h-10 w-10 text-gray-400 mx-auto" />
              <h3 className="font-display text-base font-bold text-primary">No Publications Match</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                No technical insights matched your query: <strong>"{searchQuery}"</strong>. Try clearing search filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

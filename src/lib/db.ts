// @ts-nocheck
import { isSupabaseConfigured, supabase } from "./supabase";
import { SEED_HOMEPAGE, SEED_SERVICES, SEED_PROJECTS, SEED_TESTIMONIALS, SEED_BLOGS, SEED_INQUIRIES, SEED_QUOTES } from "./seed";
import { HomepageContent, Service, Project, Testimonial, BlogPost, Inquiry, QuoteRequest } from "./types";

interface LocalDB {
  homepage: HomepageContent;
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  inquiries: Inquiry[];
  quotes: QuoteRequest[];
}

const DEFAULT_DB: LocalDB = {
  homepage: SEED_HOMEPAGE,
  services: SEED_SERVICES,
  projects: SEED_PROJECTS,
  testimonials: SEED_TESTIMONIALS,
  blogs: SEED_BLOGS,
  inquiries: SEED_INQUIRIES,
  quotes: SEED_QUOTES,
};

// Keep in-memory copy on server-side HMR
const globalForDb = globalThis as unknown as {
  obawakLocalDb: LocalDB | undefined;
};

// Helper: Safely retrieve db either from memory (server) or localStorage (client)
function getLocalDB(): LocalDB {
  if (typeof window === "undefined") {
    if (!globalForDb.obawakLocalDb) {
      globalForDb.obawakLocalDb = JSON.parse(JSON.stringify(DEFAULT_DB));
    }
    return globalForDb.obawakLocalDb!;
  }
  
  try {
    const raw = localStorage.getItem("obawak_local_db");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Local DB read failed, resetting", e);
  }
  
  // Set default if not found or errored
  const db = JSON.parse(JSON.stringify(DEFAULT_DB));
  try {
    localStorage.setItem("obawak_local_db", JSON.stringify(db));
  } catch (e) {}
  return db;
}

// Helper: Persist local changes
function saveLocalDB(db: LocalDB) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("obawak_local_db", JSON.stringify(db));
      // Dispatch storage event to sync other tabs/components
      window.dispatchEvent(new Event("storage_db_update"));
    } catch (e) {}
  } else {
    globalForDb.obawakLocalDb = db;
  }
}

// -------------------------------------------------------------
// 1. HOMEPAGE CONTENT OPERATIONS
// -------------------------------------------------------------
export async function getHomepageContent(): Promise<HomepageContent> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("homepage_content")
        .select("*")
        .eq("key", "default")
        .single();
      if (!error && data) return data;
    } catch (e) {
      console.error("Supabase getHomepageContent failed", e);
    }
  }
  return getLocalDB().homepage;
}

export async function updateHomepageContent(content: HomepageContent["content"]): Promise<HomepageContent> {
  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("homepage_content")
      .upsert({ key: "default", content, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  
  const db = getLocalDB();
  db.homepage.content = content;
  db.homepage.updated_at = new Date().toISOString();
  saveLocalDB(db);
  return db.homepage;
}

// -------------------------------------------------------------
// 2. SERVICES OPERATIONS
// -------------------------------------------------------------
export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      // @ts-ignore
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (data) return data;
    } catch (e) {
      console.error("Supabase getServices failed", e);
    }
  }
  return getLocalDB().services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  }
  const services = getLocalDB().services;
  return services.find((s) => s.slug === slug) || null;
}

export async function createService(serviceData: Omit<Service, "id" | "created_at">): Promise<Service> {
  const newService: Service = {
    ...serviceData,
    id: "service-" + Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("services")
      .insert([newService])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  db.services.push(newService);
  saveLocalDB(db);
  return newService;
}

export async function updateService(id: string, serviceData: Partial<Service>): Promise<Service> {
  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("services")
      .update(serviceData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Service not found");
  
  db.services[index] = { ...db.services[index], ...serviceData };
  saveLocalDB(db);
  return db.services[index];
}

export async function deleteService(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    return;
  }

  const db = getLocalDB();
  db.services = db.services.filter((s) => s.id !== id);
  // Orphan projects service ties
  db.projects = db.projects.map((p) => p.service_id === id ? { ...p, service_id: undefined, service_title: undefined } : p);
  saveLocalDB(db);
}

// -------------------------------------------------------------
// 3. PROJECTS OPERATIONS (PORTFOLIO)
// -------------------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("projects").select("*, services (title)").order("created_at", { ascending: false });
      if (error) throw error;
      const db = getLocalDB();
      return data.map((p: any) => {
        const service = db.services.find((s) => s.id === p.service_id);
        return {
          ...p,
          service_title: service ? service.title : p.service_title || "General",
        };
      });
    } catch (e) {
      // Suppressed supabase error for projects
    }
  }
  const db = getLocalDB();
  return db.projects.map((p) => {
    const service = db.services.find((s) => s.id === p.service_id);
    return {
      ...p,
      service_title: service ? service.title : p.service_title || "General",
    };
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        services (title),
        project_images (image_url)
      `)
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      service_title: data.services?.title || "General",
      images: data.project_images?.map((img: any) => img.image_url) || []
    };
  }

  const db = getLocalDB();
  const proj = db.projects.find((p) => p.slug === slug);
  if (!proj) return null;
  const service = db.services.find((s) => s.id === proj.service_id);
  return {
    ...proj,
    service_title: service ? service.title : proj.service_title || "General"
  };
}

export async function createProject(projectData: Omit<Project, "id" | "created_at">): Promise<Project> {
  const newProject: Project = {
    ...projectData,
    id: "project-" + Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { images, ...insertable } = newProject as any;
    const { data, error } = await supabase
      .from("projects")
      .insert([insertable])
      .select()
      .single();
    if (error) throw error;

    // Insert gallery images if specified
    if (images && images.length > 0) {
      const inserts = images.map((url: string) => ({
        project_id: data.id,
        image_url: url
      }));
      await supabase.from("project_images").insert(inserts);
    }
    return { ...data, images: images || [] };
  }

  const db = getLocalDB();
  db.projects.push(newProject);
  saveLocalDB(db);
  return newProject;
}

export async function updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
  if (isSupabaseConfigured && supabase) {
    const { images, ...updatable } = projectData as any;
    // @ts-ignore
    const { data, error } = await supabase
      .from("projects")
      .update(updatable)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    if (images) {
      // Re-write project images gallery
      await supabase.from("project_images").delete().eq("project_id", id);
      if (images.length > 0) {
        const inserts = images.map((url: string) => ({
          project_id: id,
          image_url: url
        }));
        await supabase.from("project_images").insert(inserts);
      }
    }
    return { ...data, images: images || [] };
  }

  const db = getLocalDB();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Project not found");

  db.projects[index] = { ...db.projects[index], ...projectData };
  saveLocalDB(db);
  return db.projects[index];
}

export async function deleteProject(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    return;
  }

  const db = getLocalDB();
  db.projects = db.projects.filter((p) => p.id !== id);
  saveLocalDB(db);
}

// -------------------------------------------------------------
// 4. TESTIMONIALS OPERATIONS
// -------------------------------------------------------------
export async function getTestimonials(onlyApproved = true): Promise<Testimonial[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (onlyApproved) {
        query = query.eq("is_approved", true);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (e) {
      console.error("Supabase failed, falling back to local DB:", e);
    }
  }
  
  const testimonials = getLocalDB().testimonials;
  return onlyApproved ? testimonials.filter((t) => t.is_approved) : testimonials;
}

export async function createTestimonial(testimonialData: Omit<Testimonial, "id" | "created_at">): Promise<Testimonial> {
  const newTestimonial: Testimonial = {
    ...testimonialData,
    id: "testimonial-" + Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("testimonials")
      .insert([newTestimonial])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  db.testimonials.push(newTestimonial);
  saveLocalDB(db);
  return newTestimonial;
}

export async function updateTestimonial(id: string, testimonialData: Partial<Testimonial>): Promise<Testimonial> {
  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("testimonials")
      .update(testimonialData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  const index = db.testimonials.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Testimonial not found");

  db.testimonials[index] = { ...db.testimonials[index], ...testimonialData };
  saveLocalDB(db);
  return db.testimonials[index];
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;
    return;
  }

  const db = getLocalDB();
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  saveLocalDB(db);
}

// -------------------------------------------------------------
// 5. BLOG POSTS OPERATIONS
// -------------------------------------------------------------
export async function getBlogPosts(onlyPublished = true): Promise<BlogPost[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (onlyPublished) {
        query = query.eq("published", true);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (e) {
      console.error("Supabase failed, falling back to local DB:", e);
    }
  }

  const blogs = getLocalDB().blogs;
  return onlyPublished ? blogs.filter((b) => b.published) : blogs;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  const blogs = getLocalDB().blogs;
  return blogs.find((b) => b.slug === slug) || null;
}

export async function createBlogPost(blogData: Omit<BlogPost, "id" | "created_at">): Promise<BlogPost> {
  const newBlog: BlogPost = {
    ...blogData,
    id: "blog-" + Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString(),
    published_at: blogData.published ? new Date().toISOString() : undefined
  };

  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([newBlog])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  db.blogs.push(newBlog);
  saveLocalDB(db);
  return newBlog;
}

export async function updateBlogPost(id: string, blogData: Partial<BlogPost>): Promise<BlogPost> {
  const updates = { ...blogData };
  if (updates.published && !updates.published_at) {
    updates.published_at = new Date().toISOString();
  }

  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  const index = db.blogs.findIndex((b) => b.id === id);
  if (index === -1) throw new Error("Blog post not found");

  db.blogs[index] = { ...db.blogs[index], ...updates };
  saveLocalDB(db);
  return db.blogs[index];
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    return;
  }

  const db = getLocalDB();
  db.blogs = db.blogs.filter((b) => b.id !== id);
  saveLocalDB(db);
}

// -------------------------------------------------------------
// 6. INQUIRIES OPERATIONS (CONTACT FORMS)
// -------------------------------------------------------------
export async function getInquiries(): Promise<Inquiry[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      // @ts-ignore
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    } catch (e) {
      console.error("Supabase getInquiries failed", e);
    }
  }

  // Fallback to local DB
  return getLocalDB().inquiries.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createInquiry(inquiryData: Omit<Inquiry, "id" | "created_at" | "status">): Promise<Inquiry> {
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: "inquiry-" + Math.random().toString(36).substring(2, 11),
    status: "unread",
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("inquiries")
      .insert([newInquiry])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  db.inquiries.push(newInquiry);
  saveLocalDB(db);
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<Inquiry> {
  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  const index = db.inquiries.findIndex((i) => i.id === id);
  if (index === -1) throw new Error("Inquiry not found");

  db.inquiries[index].status = status;
  saveLocalDB(db);
  return db.inquiries[index];
}

export async function deleteInquiry(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) throw error;
    return;
  }

  const db = getLocalDB();
  db.inquiries = db.inquiries.filter((i) => i.id !== id);
  saveLocalDB(db);
}

// -------------------------------------------------------------
// 7. QUOTE REQUESTS OPERATIONS
// -------------------------------------------------------------
export async function getQuoteRequests(): Promise<QuoteRequest[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      // @ts-ignore
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    } catch (e) {
      console.error("Supabase getQuoteRequests failed", e);
    }
  }

  // Fallback to local DB
  return getLocalDB().quotes.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createQuoteRequest(quoteData: Omit<QuoteRequest, "id" | "created_at" | "status">): Promise<QuoteRequest> {
  const newQuote: QuoteRequest = {
    ...quoteData,
    id: "quote-" + Math.random().toString(36).substring(2, 11),
    status: "pending",
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("quote_requests")
      .insert([newQuote])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  db.quotes.push(newQuote);
  saveLocalDB(db);
  return newQuote;
}

export async function updateQuoteRequestStatus(id: string, status: QuoteRequest["status"]): Promise<QuoteRequest> {
  if (isSupabaseConfigured && supabase) {
    // @ts-ignore
    const { data, error } = await supabase
      .from("quote_requests")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const db = getLocalDB();
  const index = db.quotes.findIndex((q) => q.id === id);
  if (index === -1) throw new Error("Quote request not found");

  db.quotes[index].status = status;
  saveLocalDB(db);
  return db.quotes[index];
}

export async function deleteQuoteRequest(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("quote_requests").delete().eq("id", id);
    if (error) throw error;
    return;
  }

  const db = getLocalDB();
  db.quotes = db.quotes.filter((q) => q.id !== id);
  saveLocalDB(db);
}

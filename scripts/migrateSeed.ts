// scripts/migrateSeed.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
"use strict";
import { createClient } from "@supabase/supabase-js";
import * as seed from "../src/lib/seed.ts";

// Create a Supabase client directly (bypass the possibly‑null helper)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase environment variables are missing. Please set them in .env.local");
  process.exit(1);
}
// Prefer service role key for admin actions; fallback to anon key if not provided.
const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

// Generic upsert helper (no strict typing to avoid TS issues)
async function upsertTable(table: string, rows: any[]) {
  if (!rows || rows.length === 0) return;
  const { data, error } = await supabase.from(table).upsert(rows, { onConflict: "id" });
  if (error) {
    console.error(`❌ Error upserting ${table}:`, error);
  } else {
    console.log(`✅ Upserted ${rows.length} rows into ${table}`);
  }
}

async function migrate() {
  console.log("🚀 Starting seed migration to Supabase...");

  // 1. Homepage – single row with a fixed key
  await upsertTable("homepage_content", [seed.SEED_HOMEPAGE]);

  // 2. Services
  await upsertTable("services", seed.SEED_SERVICES);

  // 3. Projects (portfolio) – split images into separate table
  const projects = seed.SEED_PROJECTS.map(p => {
    // Preserve all fields except images (handled separately)
    const { images, ...rest } = p as any;
    return rest;
  });
  await upsertTable("projects", projects);

  // Insert project images if any
  const projectImages = seed.SEED_PROJECTS.flatMap(p => {
    const imgs = (p as any).images || [];
    return imgs.map((url: string) => ({ project_id: p.id, image_url: url }));
  });
  if (projectImages.length) {
    await upsertTable("project_images", projectImages);
  }

  // 4. Testimonials
  await upsertTable("testimonials", seed.SEED_TESTIMONIALS);

  // 5. Blog posts
  await upsertTable("blog_posts", seed.SEED_BLOGS);

  // 6. Inquiries
  await upsertTable("inquiries", seed.SEED_INQUIRIES);

  // 7. Quote requests
  await upsertTable("quote_requests", seed.SEED_QUOTES);

  console.log("🎉 Migration complete!");
}

migrate().catch(err => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});

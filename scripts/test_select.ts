import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

async function run() {
  console.log("--- Testing queries with Anon Key ---");

  const resServices = await supabase.from("services").select("*").order("created_at", { ascending: false });
  console.log("Services: data length =", resServices.data?.length, "error =", resServices.error);

  const resProjects = await supabase.from("projects").select("*, services (title)").order("created_at", { ascending: false });
  console.log("Projects (with services): data length =", resProjects.data?.length, "error =", resProjects.error);

  const resTestimonials = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  console.log("Testimonials: data length =", resTestimonials.data?.length, "error =", resTestimonials.error);

  const resBlogs = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  console.log("Blogs: data length =", resBlogs.data?.length, "error =", resBlogs.error);
}

run();

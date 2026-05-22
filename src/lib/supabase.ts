import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Only initialize Supabase if both parameters are explicitly provided
export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("http")
);

// Guard: createClient throws synchronously for invalid URLs (e.g. empty string
// during SSR hydration before env vars are injected). Wrapping in try/catch
// ensures the module never crashes and always gracefully falls back to local DB.
let _client: ReturnType<typeof createClient> | null = null;
if (isSupabaseConfigured) {
  try {
    _client = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.warn("[supabase] createClient failed – falling back to local DB:", e);
    _client = null;
  }
}
export const supabase = _client;

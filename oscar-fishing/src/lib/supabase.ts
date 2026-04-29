import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for comment storage.
 *
 * Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * in your .env.local file. See README for full setup instructions.
 *
 * The client is safe to import on the server (API routes) and client side.
 * The anon key is intentionally public — Row Level Security (RLS) enforces
 * that anonymous users can only INSERT, never read pending comments.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Gracefully degrade when env vars are not yet configured
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const supabaseConfigured = Boolean(supabase);

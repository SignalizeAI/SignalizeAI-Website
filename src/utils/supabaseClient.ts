"use client";

import { createClient } from "@supabase/supabase-js";

let browserClient: ReturnType<typeof createClient> | null = null;
const FALLBACK_SUPABASE_URL = "https://qcvnfvbzxbnrquxtjihp.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjdm5mdmJ6eGJucnF1eHRqaWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTc5MTEsImV4cCI6MjA4NzY1NzkxMX0.7KZQLgHx76DYhDu-PMvCsbR_Gw105zio6SHjhqOY55Q";

export function getSupabaseClient() {
  if (browserClient) return browserClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

  browserClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
  });

  return browserClient;
}

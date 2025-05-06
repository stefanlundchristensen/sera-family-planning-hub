
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Supabase client configuration
 * 
 * Using direct values from your Supabase project
 */
const supabaseUrl = "https://mstefpauvetioyjeosos.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zdGVmcGF1dmV0aW95amVvc29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNjQ5ODksImV4cCI6MjA2MDY0MDk4OX0.gxQEq2_lyrN09cm59FvXeB8suqLfRHDFhaosyLCvRko";

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase configuration values. Please check your setup.\n" +
    "Required values: supabaseUrl, supabaseAnonKey"
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

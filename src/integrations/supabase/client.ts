import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Supabase client configuration
 * 
 * Environment variables must be prefixed with VITE_ to be exposed to the client
 * Create a .env file based on .env.example to set these values
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please check your .env file.\n" +
    "Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY"
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
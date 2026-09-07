import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

/**
 * Public, anon-key client. Safe to use in Server Components and client code.
 * RLS restricts it to read-only access on the catalog tables and storage bucket.
 */
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

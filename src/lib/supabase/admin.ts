import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

/**
 * Service-role client. Bypasses RLS entirely - only import this from
 * Server Actions or other server-only code, never from client components.
 */
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

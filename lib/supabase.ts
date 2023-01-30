import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.DB_URL as string,
  process.env.ANON_KEY as string
);

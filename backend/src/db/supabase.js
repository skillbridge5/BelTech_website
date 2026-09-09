import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// supabase-js supports the new sb_* key format directly.
// The secret key gives service-role level access (bypasses RLS).
export const supabase = createClient(url, secretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

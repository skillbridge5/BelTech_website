import { createClient } from "@supabase/supabase-js";
import ws from "ws";

const url = process.env.SUPABASE_URL || "https://placeholder-project.supabase.co";
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-secret-key";

// supabase-js supports the new sb_* key format directly.
// The secret key gives service-role level access (bypasses RLS).
export const supabase = createClient(url, secretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  realtime: {
    transport: ws,
  },
});



import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import {
  ensureLocalAdmin,
  findLocalAdminByEmail,
  findLocalAdminById,
  updateLocalAdmin,
} from "../lib/adminStore.js";

const router = Router();

function isMissingOrAuthError(error) {
  const msg = String(error?.message || error || "").toLowerCase();
  return (
    msg.includes("invalid api key") ||
    msg.includes("jwt") ||
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    error?.code === "42P01" ||
    error?.code === "PGRST205"
  );
}

async function trySupabaseAdmin(email) {
  try {
    const { data, error } = await supabase
      .from("admins")
      .select("id, email, password_hash")
      .eq("email", email.toLowerCase())
      .maybeSingle();
    if (error) {
      if (isMissingOrAuthError(error)) return { unavailable: true, error };
      return { unavailable: false, error };
    }
    return { unavailable: false, data };
  } catch (error) {
    return { unavailable: true, error };
  }
}

// Ensure the admin user exists (seeded from env vars on first run)
export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  // Always ensure a local fallback admin for development.
  try {
    await ensureLocalAdmin(email, password);
  } catch (err) {
    console.error("Seed local admin error:", err.message);
  }

  const { data, error } = await supabase
    .from("admins")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Seed admin: query error", error.message);
    console.log(`Using local admin fallback: ${email}`);
    return;
  }

  if (data) return; // already exists

  const hash = await bcrypt.hash(password, 10);
  const { error: insertError } = await supabase
    .from("admins")
    .insert({ email, password_hash: hash });

  if (insertError) {
    console.error("Seed admin: insert error", insertError.message);
  } else {
    console.log(`Admin seeded: ${email}`);
  }
};

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalized = email.toLowerCase();

  // Prefer local .env admin for local development (Supabase key is often a placeholder).
  if (
    process.env.ADMIN_EMAIL &&
    process.env.ADMIN_PASSWORD &&
    normalized === process.env.ADMIN_EMAIL.toLowerCase()
  ) {
    const local = await ensureLocalAdmin(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    );
    if (local) {
      const validLocal = await bcrypt.compare(password, local.password_hash);
      if (validLocal) {
        const token = jwt.sign(
          { sub: local.id, email: local.email, source: "local" },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );
        return res.json({ token });
      }
    }
  }

  const sb = await trySupabaseAdmin(normalized);
  if (!sb.unavailable && sb.data) {
    const valid = await bcrypt.compare(password, sb.data.password_hash);
    if (valid) {
      const token = jwt.sign(
        { sub: sb.data.id, email: sb.data.email, source: "supabase" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );
      return res.json({ token });
    }
  }

  // Last resort: any stored local admin for this email
  const local = await findLocalAdminByEmail(normalized);
  if (local) {
    const valid = await bcrypt.compare(password, local.password_hash);
    if (valid) {
      const token = jwt.sign(
        { sub: local.id, email: local.email, source: "local" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );
      return res.json({ token });
    }
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// PUT /auth/account — update the logged-in admin's email and/or password
router.put("/account", requireAuth, async (req, res) => {
  const { currentPassword, email, password } = req.body || {};
  const source = req.user.source || "supabase";

  let admin = null;

  if (source === "local") {
    admin = await findLocalAdminById(req.user.sub);
  } else {
    const { data, error } = await supabase
      .from("admins")
      .select("id, email, password_hash")
      .eq("id", req.user.sub)
      .maybeSingle();

    if (error && isMissingOrAuthError(error)) {
      admin = await findLocalAdminById(req.user.sub);
    } else if (!error) {
      admin = data;
    } else {
      return res.status(401).json({ message: error.message });
    }
  }

  if (!admin) {
    return res.status(401).json({ message: "Admin not found" });
  }

  const valid = await bcrypt.compare(currentPassword || "", admin.password_hash);
  if (!valid) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }

  const newEmail =
    typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null;
  const newPassword = typeof password === "string" && password ? password : null;

  if (newEmail === admin.email) {
    return res
      .status(400)
      .json({ message: "New email is the same as the current one" });
  }

  if (!newEmail && !newPassword) {
    return res
      .status(400)
      .json({ message: "Provide a new email or a new password" });
  }

  const updates = {};
  if (newEmail) updates.email = newEmail;
  if (newPassword) updates.password_hash = await bcrypt.hash(newPassword, 10);

  let updated;
  if (source === "local" || !(await trySupabaseAdmin(admin.email)).data) {
    updated = await updateLocalAdmin(admin.id, updates);
  } else {
    const { data, error: updateError } = await supabase
      .from("admins")
      .update(updates)
      .eq("id", admin.id)
      .select("id, email")
      .single();
    if (updateError) {
      return res.status(500).json({ message: updateError.message });
    }
    updated = data;
  }

  if (!updated) {
    return res.status(500).json({ message: "Failed to update account" });
  }

  const token = jwt.sign(
    { sub: updated.id, email: updated.email, source },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return res.json({ data: { email: updated.email }, token });
});

export default router;

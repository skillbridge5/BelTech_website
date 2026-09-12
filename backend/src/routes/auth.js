import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Ensure the admin user exists (seeded from env vars on first run)
export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const { data, error } = await supabase
    .from("admins")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Seed admin: query error", error.message);
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

  const { data, error } = await supabase
    .from("admins")
    .select("id, email, password_hash")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (error || !data) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { sub: data.id, email: data.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return res.json({ token });
});

// PUT /auth/account — update the logged-in admin's email and/or password
router.put("/account", requireAuth, async (req, res) => {
  const { currentPassword, email, password } = req.body || {};

  const { data: admin, error } = await supabase
    .from("admins")
    .select("id, email, password_hash")
    .eq("id", req.user.sub)
    .maybeSingle();

  if (error || !admin) {
    return res
      .status(401)
      .json({ message: error ? error.message : "Admin not found" });
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

  const { data: updated, error: updateError } = await supabase
    .from("admins")
    .update(updates)
    .eq("id", admin.id)
    .select("id, email")
    .single();

  if (updateError) {
    return res.status(500).json({ message: updateError.message });
  }

  const token = jwt.sign(
    { sub: updated.id, email: updated.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return res.json({ data: { email: updated.email }, token });
});

export default router;

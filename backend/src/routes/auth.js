import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../db/supabase.js";

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

export default router;

import { Router } from "express";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "solutions";

const sanitizeName = (name = "") => {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60);
  return base || "image.png";
};

// POST /upload (admin)
// Body: { fileName, dataUrl } where dataUrl is a base64 data URL
router.post("/", requireAuth, async (req, res) => {
  const { fileName = "", dataUrl = "" } = req.body || {};

  if (!dataUrl || typeof dataUrl !== "string") {
    return res.status(400).json({ message: "dataUrl is required" });
  }

  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    return res.status(400).json({ message: "Invalid data URL format" });
  }

  const contentType = match[1];
  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length) {
    return res.status(400).json({ message: "Empty file" });
  }

  const safeName = sanitizeName(fileName);
  const path = `${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType, upsert: true });

  if (error) return res.status(500).json({ message: error.message });

  const url = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path).data.publicUrl;

  return res.status(201).json({ data: { url } });
});

export default router;
import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import { isSupabaseAvailable } from "../db/repository.js";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "solutions";
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED_UPLOADS = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

const sanitizeName = (name = "") => {
  const ext = path.extname(String(name)).toLowerCase().replace(/[^a-z0-9.]/g, "");
  const base = path
    .basename(String(name), path.extname(String(name)))
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 48);
  return `${base || "image"}${ext}`;
};

function getPublicBaseUrl(req) {
  const configured = String(process.env.PUBLIC_BASE_URL || "").trim().replace(/\/$/, "");
  if (configured) return configured;
  const proto = String(req.headers["x-forwarded-proto"] || req.protocol || "http")
    .split(",")[0]
    .trim();
  const host = String(req.headers["x-forwarded-host"] || req.get("host") || "localhost:4000")
    .split(",")[0]
    .trim();
  return `${proto}://${host}`;
}

// POST /upload (admin)
// Body: { fileName, dataUrl } where dataUrl is a base64 data URL
router.post("/", requireAuth, async (req, res) => {
  try {
    const { fileName = "", dataUrl = "" } = req.body || {};

    if (!dataUrl || typeof dataUrl !== "string") {
      return res.status(400).json({ message: "dataUrl is required" });
    }

    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ message: "Invalid data URL format" });
    }

    const contentType = String(match[1] || "").toLowerCase();
    const ext = ALLOWED_UPLOADS[contentType];
    if (!ext) {
      return res.status(400).json({ message: "Unsupported image type" });
    }

    const buffer = Buffer.from(match[2], "base64");
    if (!buffer.length) {
      return res.status(400).json({ message: "Empty file" });
    }
    if (buffer.length > MAX_UPLOAD_BYTES) {
      return res.status(413).json({ message: "Image too large (max 8MB)" });
    }

    const safeName = sanitizeName(fileName);
    const base = path.basename(safeName, path.extname(safeName)).slice(0, 48) || "image";
    const pathName = `${Date.now()}-${randomUUID().slice(0, 8)}-${base}.${ext}`;

    // If Supabase is available, attempt Supabase Storage upload
    if (await isSupabaseAvailable()) {
      try {
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(pathName, buffer, { contentType, upsert: false });

        if (!error) {
          const url = supabase.storage.from(BUCKET).getPublicUrl(pathName).data.publicUrl;
          return res.status(201).json({ data: { url } });
        }
        console.warn("[Upload] Supabase Storage upload failed, using local storage fallback:", error.message);
      } catch (err) {
        console.warn("[Upload] Supabase Storage exception, using local storage fallback:", err.message);
      }
    }

    // Local storage fallback: save in backend/uploads and return accessible URL
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    fs.writeFileSync(path.join(uploadDir, pathName), buffer);

    const url = `${getPublicBaseUrl(req)}/uploads/${pathName}`;
    return res.status(201).json({ data: { url } });
  } catch (err) {
    console.error("POST /upload error:", err);
    return res.status(500).json({ message: "Failed to upload image" });
  }
});

export default router;
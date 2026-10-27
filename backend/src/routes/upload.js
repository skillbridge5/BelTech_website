import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import { isSupabaseAvailable } from "../db/repository.js";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "solutions";

const sanitizeName = (name = "") => {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60);
  return base || "image.png";
};

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

    const contentType = match[1];
    const buffer = Buffer.from(match[2], "base64");
    if (!buffer.length) {
      return res.status(400).json({ message: "Empty file" });
    }

    const safeName = sanitizeName(fileName);
    const pathName = `${Date.now()}-${safeName}`;

    // If Supabase is available, attempt Supabase Storage upload
    if (await isSupabaseAvailable()) {
      try {
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(pathName, buffer, { contentType, upsert: true });

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

    const host = req.get("host") || "localhost:4000";
    const protocol = req.protocol || "http";
    const url = `${protocol}://${host}/uploads/${pathName}`;

    return res.status(201).json({ data: { url } });
  } catch (err) {
    console.error("POST /upload error:", err);
    return res.status(500).json({ message: "Failed to upload image" });
  }
});

export default router;
import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "solutions";

if (!url || !secretKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const clients = [
  { file: "eyoha.png", name: "Eyoha Digitals", testimonial: "Eyoha Digitals loved our website!" },
  { file: "RohaCake.png", name: "Roha Cake and Bread Bakery", testimonial: "Roha Bakery saw amazing growth with our product." },
  { file: "skillBridge.png", name: "SkillBridge Institute of Technology", testimonial: "SkillBridge praises the website we built." },
  { file: "diligent.png", name: "Diligent Trade Solutions", testimonial: "Diligent Trade saw great results from our ERP." },
  { file: "firma.jpg", name: "Firma Media and Communications", testimonial: "Odoo ERP Enterprise - Finance, Sales, Project" },
];

const logosDir = join(__dirname, "..", "..", "src", "assets", "clientLogo");

const uploadLogo = async (file) => {
  const buffer = await readFile(join(logosDir, file));
  const ext = file.split(".").pop();
  const contentType =
    ext === "jpg" ? "image/jpeg" : ext === "png" ? "image/png" : "image/jpeg";
  const path = `testimonials/${file}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType, upsert: true });

  if (error) throw new Error(`Upload failed for ${file}: ${error.message}`);

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
};

const seed = async () => {
  const { data: existing, error: selErr } = await supabase
    .from("testimonials")
    .select("name");

  if (selErr) {
    console.error(
      `Could not read testimonials table: ${selErr.message}\n\nDid you run the schema.sql (testimonials block) in the Supabase SQL editor first?`
    );
    process.exit(1);
  }

  const existingNames = new Set((existing || []).map((r) => r.name));

  for (const client of clients) {
    const imageUrl = await uploadLogo(client.file);
    if (existingNames.has(client.name)) {
      console.log(`Skipping (already exists): ${client.name}`);
      continue;
    }
    const { error } = await supabase.from("testimonials").insert({
      name: client.name,
      testimonial: client.testimonial,
      image_url: imageUrl,
      priority: 0,
    });
    if (error) {
      console.error(`Insert failed for ${client.name}: ${error.message}`);
      process.exit(1);
    }
    console.log(`Seeded: ${client.name}`);
  }

  console.log("Seeding complete.");
};

seed();
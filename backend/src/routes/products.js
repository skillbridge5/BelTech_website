import { Router } from "express";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const sanitize = (body = {}) => ({
  title: body.title ?? "",
  description: body.description ?? "",
  image_url: body.imageUrl ?? body.image_url ?? "",
  link: body.link ?? "",
  priority:
    typeof body.priority === "number" && body.priority >= 0
      ? Math.round(body.priority)
      : 0,
});

const mapRow = (row) => ({
  _id: row.id,
  title: row.title,
  description: row.description,
  imageUrl: row.image_url,
  link: row.link,
  priority: row.priority ?? 0,
  createdAt: row.created_at,
});

// GET /products (public)
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("priority", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ message: error.message });
  return res.json({ data: { products: (data || []).map(mapRow) } });
});

// GET /products/:id (public)
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", req.params.id)
    .maybeSingle();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Product not found" });
  return res.json({ data: mapRow(data) });
});

// POST /products (admin)
router.post("/", requireAuth, async (req, res) => {
  const body = sanitize(req.body);
  if (!body.title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const { data, error } = await supabase
    .from("products")
    .insert(body)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  return res.status(201).json({ data: mapRow(data) });
});

// PUT /products/:id (admin)
router.put("/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .update(sanitize(req.body))
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Product not found" });
  return res.json({ data: mapRow(data) });
});

// DELETE /products/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ message: error.message });
  return res.status(204).send();
});

export default router;
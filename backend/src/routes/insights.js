import { Router } from "express";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const sanitize = (body = {}) => ({
  title: body.title ?? "",
  description: body.description ?? "",
  detail: body.detail ?? "",
  date: body.date ? new Date(body.date).toISOString() : new Date().toISOString(),
  image_url: body.imageUrl ?? body.image_url ?? "",
});

const mapRow = (row) => ({
  _id: row.id,
  title: row.title,
  description: row.description,
  detail: row.detail,
  date: row.date,
  imageUrl: row.image_url,
  createdAt: row.created_at,
});

// GET /insights (public)
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .order("date", { ascending: false });

  if (error) return res.status(500).json({ message: error.message });
  const insights = (data || []).map(mapRow);
  return res.json({ data: { insights } });
});

// POST /insights (admin)
router.post("/", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("insights")
    .insert(sanitize(req.body))
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  return res.status(201).json({ data: mapRow(data) });
});

// PUT /insights/:id (admin)
router.put("/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("insights")
    .update(sanitize(req.body))
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Insight not found" });
  return res.json({ data: mapRow(data) });
});

// DELETE /insights/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  const { error } = await supabase
    .from("insights")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ message: error.message });
  return res.status(204).send();
});

export default router;

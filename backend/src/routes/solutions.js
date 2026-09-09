import { Router } from "express";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const sanitize = (body = {}) => ({
  title: body.title ?? "",
  description: body.description ?? "",
  detail: body.detail ?? "",
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
  detail: row.detail,
  imageUrl: row.image_url,
  link: row.link,
  priority: row.priority ?? 0,
  createdAt: row.created_at,
});

// GET /solutions (public)
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .order("priority", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ message: error.message });
  const solutions = (data || []).map(mapRow);
  return res.json({ data: { solutions } });
});

// GET /solutions/:id (public)
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .eq("id", req.params.id)
    .maybeSingle();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Solution not found" });
  return res.json({ data: mapRow(data) });
});

// POST /solutions (admin)
router.post("/", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("solutions")
    .insert(sanitize(req.body))
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  return res.status(201).json({ data: mapRow(data) });
});

// PUT /solutions/:id (admin)
router.put("/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("solutions")
    .update(sanitize(req.body))
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Solution not found" });
  return res.json({ data: mapRow(data) });
});

// DELETE /solutions/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  const { error } = await supabase
    .from("solutions")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ message: error.message });
  return res.status(204).send();
});

export default router;

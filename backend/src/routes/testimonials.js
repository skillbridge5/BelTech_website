import { Router } from "express";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const sanitize = (body = {}) => {
  const name = body.name ?? body.testimonialName ?? "";
  return {
    name,
    testimonial: body.testimonial ?? "",
    image_url: body.imageUrl ?? body.image_url ?? "",
    priority:
      typeof body.priority === "number" && body.priority >= 0
        ? Math.round(body.priority)
        : 0,
  };
};

const mapRow = (row) => ({
  _id: row.id,
  name: row.name,
  testimonial: row.testimonial,
  imageUrl: row.image_url,
  priority: row.priority ?? 0,
  createdAt: row.created_at,
});

// GET /testimonials (public)
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("priority", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ message: error.message });
  return res.json({ data: { testimonials: (data || []).map(mapRow) } });
});

// POST /testimonials (admin)
router.post("/", requireAuth, async (req, res) => {
  const body = sanitize(req.body);
  if (!body.name || !body.testimonial) {
    return res
      .status(400)
      .json({ message: "Name and testimonial are required" });
  }

  const { data, error } = await supabase
    .from("testimonials")
    .insert(body)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  return res.status(201).json({ data: mapRow(data) });
});

// PUT /testimonials/:id (admin)
router.put("/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("testimonials")
    .update(sanitize(req.body))
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Testimonial not found" });
  return res.json({ data: mapRow(data) });
});

// DELETE /testimonials/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ message: error.message });
  return res.status(204).send();
});

export default router;
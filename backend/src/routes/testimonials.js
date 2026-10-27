import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../db/repository.js";

const router = Router();

const sanitize = (body = {}) => {
  const name = String(body.name ?? body.testimonialName ?? "").trim();
  return {
    name,
    testimonial: String(body.testimonial ?? "").trim(),
    image_url: String(body.imageUrl ?? body.image_url ?? "").trim(),
    priority:
      typeof body.priority === "number" && !isNaN(body.priority)
        ? Math.round(body.priority)
        : parseInt(body.priority, 10) || 0,
  };
};

// GET /testimonials (public)
router.get("/", async (req, res) => {
  try {
    const testimonials = await getTestimonials();
    return res.json({ data: { testimonials } });
  } catch (err) {
    console.error("GET /testimonials error:", err);
    return res.status(500).json({ message: "Failed to load testimonials" });
  }
});

// GET /testimonials/:id (public)
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await getTestimonialById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    return res.json({ data: testimonial });
  } catch (err) {
    console.error("GET /testimonials/:id error:", err);
    return res.status(500).json({ message: "Failed to load testimonial" });
  }
});

// POST /testimonials (admin)
router.post("/", requireAuth, async (req, res) => {
  try {
    const body = sanitize(req.body);
    if (!body.name || !body.testimonial) {
      return res.status(400).json({ message: "Name and testimonial are required" });
    }
    const created = await createTestimonial(body);
    return res.status(201).json({ data: created });
  } catch (err) {
    console.error("POST /testimonials error:", err);
    return res.status(500).json({ message: "Failed to create testimonial" });
  }
});

// PUT /testimonials/:id (admin)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const body = sanitize(req.body);
    const updated = await updateTestimonial(req.params.id, body);
    if (!updated) return res.status(404).json({ message: "Testimonial not found" });
    return res.json({ data: updated });
  } catch (err) {
    console.error("PUT /testimonials/:id error:", err);
    return res.status(500).json({ message: "Failed to update testimonial" });
  }
});

// DELETE /testimonials/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await deleteTestimonial(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Testimonial not found" });
    return res.status(204).send();
  } catch (err) {
    console.error("DELETE /testimonials/:id error:", err);
    return res.status(500).json({ message: "Failed to delete testimonial" });
  }
});

export default router;
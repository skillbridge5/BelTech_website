import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getInsights,
  getInsightById,
  createInsight,
  updateInsight,
  deleteInsight,
} from "../db/repository.js";

const router = Router();

const sanitize = (body = {}) => ({
  title: String(body.title ?? "").trim(),
  description: String(body.description ?? "").trim(),
  detail: String(body.detail ?? "").trim(),
  date: body.date ? new Date(body.date).toISOString() : new Date().toISOString(),
  image_url: String(body.imageUrl ?? body.image_url ?? "").trim(),
});

// GET /insights (public)
router.get("/", async (req, res) => {
  try {
    const insights = await getInsights();
    return res.json({ data: { insights } });
  } catch (err) {
    console.error("GET /insights error:", err);
    return res.status(500).json({ message: "Failed to load insights" });
  }
});

// GET /insights/:id (public)
router.get("/:id", async (req, res) => {
  try {
    const insight = await getInsightById(req.params.id);
    if (!insight) return res.status(404).json({ message: "Insight not found" });
    return res.json({ data: insight });
  } catch (err) {
    console.error("GET /insights/:id error:", err);
    return res.status(500).json({ message: "Failed to load insight" });
  }
});

// POST /insights (admin)
router.post("/", requireAuth, async (req, res) => {
  try {
    const body = sanitize(req.body);
    if (!body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const created = await createInsight(body);
    return res.status(201).json({ data: created });
  } catch (err) {
    console.error("POST /insights error:", err);
    return res.status(500).json({ message: "Failed to create insight" });
  }
});

// PUT /insights/:id (admin)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const body = sanitize(req.body);
    const updated = await updateInsight(req.params.id, body);
    if (!updated) return res.status(404).json({ message: "Insight not found" });
    return res.json({ data: updated });
  } catch (err) {
    console.error("PUT /insights/:id error:", err);
    return res.status(500).json({ message: "Failed to update insight" });
  }
});

// DELETE /insights/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await deleteInsight(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Insight not found" });
    return res.status(204).send();
  } catch (err) {
    console.error("DELETE /insights/:id error:", err);
    return res.status(500).json({ message: "Failed to delete insight" });
  }
});

export default router;

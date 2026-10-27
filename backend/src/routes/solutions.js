import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getSolutions,
  getSolutionById,
  createSolution,
  updateSolution,
  deleteSolution,
} from "../db/repository.js";

const router = Router();

const sanitize = (body = {}) => {
  const title = String(body.title ?? "").trim();
  let link = String(body.link ?? "").trim();

  if (link.startsWith("http://") || link.startsWith("https://")) {
    try {
      const parsed = new URL(link);
      link = parsed.pathname;
    } catch {}
  }

  if (!link && title) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    link = `/projects/${slug}`;
  }

  return {
    title,
    description: String(body.description ?? "").trim(),
    detail: String(body.detail ?? "").trim(),
    situation: String(body.situation ?? "").trim(),
    built: String(body.built ?? "").trim(),
    impact: String(body.impact ?? "").trim(),
    image_url: String(body.imageUrl ?? body.image_url ?? "").trim(),
    link,
    priority:
      typeof body.priority === "number" && !isNaN(body.priority)
        ? Math.round(body.priority)
        : parseInt(body.priority, 10) || 0,
  };
};

// GET /solutions (public)
router.get("/", async (req, res) => {
  try {
    const solutions = await getSolutions();
    return res.json({ data: { solutions } });
  } catch (err) {
    console.error("GET /solutions error:", err);
    return res.status(500).json({ message: "Failed to load solutions" });
  }
});

// GET /solutions/:id (public)
router.get("/:id", async (req, res) => {
  try {
    const solution = await getSolutionById(req.params.id);
    if (!solution) return res.status(404).json({ message: "Solution not found" });
    return res.json({ data: solution });
  } catch (err) {
    console.error("GET /solutions/:id error:", err);
    return res.status(500).json({ message: "Failed to load solution" });
  }
});

// POST /solutions (admin)
router.post("/", requireAuth, async (req, res) => {
  try {
    const body = sanitize(req.body);
    if (!body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const created = await createSolution(body);
    return res.status(201).json({ data: created });
  } catch (err) {
    console.error("POST /solutions error:", err);
    return res.status(500).json({ message: "Failed to create solution" });
  }
});

// PUT /solutions/:id (admin)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const body = sanitize(req.body);
    const updated = await updateSolution(req.params.id, body);
    if (!updated) return res.status(404).json({ message: "Solution not found" });
    return res.json({ data: updated });
  } catch (err) {
    console.error("PUT /solutions/:id error:", err);
    return res.status(500).json({ message: "Failed to update solution" });
  }
});

// DELETE /solutions/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await deleteSolution(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Solution not found" });
    return res.status(204).send();
  } catch (err) {
    console.error("DELETE /solutions/:id error:", err);
    return res.status(500).json({ message: "Failed to delete solution" });
  }
});

export default router;

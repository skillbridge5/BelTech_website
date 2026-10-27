import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../db/repository.js";

const router = Router();

const sanitize = (body = {}) => {
  const title = String(body.title ?? "").trim();
  let link = String(body.link ?? "").trim();

  // If a full URL is provided (e.g., http://localhost:5173/products/slug), strip host to keep relative route
  if (link.startsWith("http://") || link.startsWith("https://")) {
    try {
      const parsed = new URL(link);
      link = parsed.pathname;
    } catch {}
  }

  // Auto-generate slug if empty
  if (!link && title) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    link = `/products/${slug}`;
  }

  return {
    title,
    description: String(body.description ?? "").trim(),
    detail: String(body.detail ?? body.content ?? "").trim(),
    kicker: String(body.kicker ?? "").trim(),
    modules: String(body.modules ?? "").trim(),
    image_url: String(body.imageUrl ?? body.image_url ?? "").trim(),
    link,
    priority:
      typeof body.priority === "number" && !isNaN(body.priority)
        ? Math.round(body.priority)
        : parseInt(body.priority, 10) || 0,
  };
};

// GET /products (public)
router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    return res.json({ data: { products } });
  } catch (err) {
    console.error("GET /products error:", err);
    return res.status(500).json({ message: "Failed to load products" });
  }
});

// GET /products/:id (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json({ data: product });
  } catch (err) {
    console.error("GET /products/:id error:", err);
    return res.status(500).json({ message: "Failed to load product" });
  }
});

// POST /products (admin)
router.post("/", requireAuth, async (req, res) => {
  try {
    const body = sanitize(req.body);
    if (!body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const created = await createProduct(body);
    return res.status(201).json({ data: created });
  } catch (err) {
    console.error("POST /products error:", err);
    return res.status(500).json({ message: "Failed to create product" });
  }
});

// PUT /products/:id (admin)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const body = sanitize(req.body);
    const updated = await updateProduct(req.params.id, body);
    if (!updated) return res.status(404).json({ message: "Product not found" });
    return res.json({ data: updated });
  } catch (err) {
    console.error("PUT /products/:id error:", err);
    return res.status(500).json({ message: "Failed to update product" });
  }
});

// DELETE /products/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    return res.status(204).send();
  } catch (err) {
    console.error("DELETE /products/:id error:", err);
    return res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
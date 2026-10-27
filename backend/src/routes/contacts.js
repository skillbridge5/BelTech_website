import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getContacts,
  getContactById,
  createContact,
  updateContactStatus,
  deleteContact,
} from "../db/repository.js";

const router = Router();

// POST /contact (public - contact form)
router.post("/", async (req, res) => {
  try {
    const b = req.body || {};
    const name = String(b.name || b.firstName || "").trim();
    const email = String(b.email || "").trim();
    const message = String(b.message || "").trim();

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const created = await createContact({
      name,
      last_name: String(b.lastName || b.last_name || "").trim(),
      email,
      phone: String(b.phone || "").trim(),
      organization: String(b.organization || "").trim(),
      message,
      status: "new",
    });

    return res.status(201).json({ data: created });
  } catch (err) {
    console.error("POST /contact error:", err);
    return res.status(500).json({ message: "Failed to submit contact message" });
  }
});

// GET /contact (admin) - list with pagination
router.get("/", requireAuth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));

    const result = await getContacts({ page, limit });
    return res.json({ data: result });
  } catch (err) {
    console.error("GET /contact error:", err);
    return res.status(500).json({ message: "Failed to load contacts" });
  }
});

// GET /contact/:id (admin)
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    return res.json({ data: contact });
  } catch (err) {
    console.error("GET /contact/:id error:", err);
    return res.status(500).json({ message: "Failed to load contact" });
  }
});

// PATCH /contact/:id/status (admin)
router.patch("/:id/status", requireAuth, async (req, res) => {
  try {
    const status = req.body?.status;
    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await updateContactStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    return res.json({ data: updated });
  } catch (err) {
    console.error("PATCH /contact/:id/status error:", err);
    return res.status(500).json({ message: "Failed to update contact status" });
  }
});

// DELETE /contact/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await deleteContact(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    return res.status(204).send();
  } catch (err) {
    console.error("DELETE /contact/:id error:", err);
    return res.status(500).json({ message: "Failed to delete contact" });
  }
});

export default router;

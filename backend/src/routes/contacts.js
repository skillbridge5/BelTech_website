import { Router } from "express";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /contact (public - contact form)
router.post("/", async (req, res) => {
  const b = req.body || {};
  const name = b.name || b.firstName || "";
  if (!name || !b.email || !b.message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert({
      name,
      last_name: b.lastName ?? "",
      email: b.email,
      phone: b.phone ?? "",
      organization: b.organization ?? "",
      message: b.message,
      status: "new",
    })
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  return res.status(201).json({ data });
});

// GET /contact (admin) - list with pagination
router.get("/", requireAuth, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("contacts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return res.status(500).json({ message: error.message });

  return res.json({
    data: { contacts: data || [], totalCount: count ?? 0, page, limit, count: count ?? 0 },
  });
});

// GET /contact/:id (admin)
router.get("/:id", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", req.params.id)
    .maybeSingle();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Contact not found" });
  return res.json({ data });
});

// PATCH /contact/:id/status (admin)
router.patch("/:id/status", requireAuth, async (req, res) => {
  const status = req.body?.status;
  if (!["new", "read", "replied"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const { data, error } = await supabase
    .from("contacts")
    .update({ status })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: "Contact not found" });
  return res.json({ data });
});

// DELETE /contact/:id (admin)
router.delete("/:id", requireAuth, async (req, res) => {
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ message: error.message });
  return res.status(204).send();
});

export default router;

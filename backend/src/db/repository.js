import { supabase } from "./supabase.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.join(__dirname, "../../data/content-store.json");

function isMissingOrAuthError(error) {
  const msg = String(error?.message || error || "").toLowerCase();
  return (
    msg.includes("invalid api key") ||
    msg.includes("apikey") ||
    msg.includes("jwt") ||
    msg.includes("unauthorized") ||
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("fetch failed") ||
    msg.includes("enotfound") ||
    msg.includes("econnrefused") ||
    error?.code === "42P01" ||
    error?.code === "PGRST205" ||
    error?.code === "PGRST301"
  );
}

function hasConfiguredSupabaseKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!key) return false;
  const lower = key.toLowerCase();
  if (
    lower.includes("your-secret-key") ||
    lower.includes("change-this") ||
    lower.includes("placeholder") ||
    key.length < 20
  ) {
    return false;
  }
  return true;
}

let supabaseCheck = { checkedAt: 0, available: false, warned: false };

export async function isSupabaseAvailable() {
  if (!hasConfiguredSupabaseKey()) {
    if (!supabaseCheck.warned) {
      console.log("[Database] Using resilient local content store (SUPABASE_SERVICE_ROLE_KEY is placeholder or unset).");
      supabaseCheck.warned = true;
    }
    return false;
  }
  if (Date.now() - supabaseCheck.checkedAt < 60_000) {
    return supabaseCheck.available;
  }
  try {
    const { error } = await supabase.from("products").select("id").limit(1);
    const ok = !error || !isMissingOrAuthError(error);
    supabaseCheck = { checkedAt: Date.now(), available: ok, warned: true };
    if (!ok && !supabaseCheck.warned) {
      console.warn("[Database] Supabase returned error; falling back to local content store:", error?.message);
    }
    return ok;
  } catch (err) {
    supabaseCheck = { checkedAt: Date.now(), available: false, warned: true };
    return false;
  }
}

const defaultStore = () => ({
  products: [
    {
      id: "prod-ethiopian-hrms",
      title: "Ethiopian HRMS",
      description:
        "An Odoo-based HR and payroll system for Ethiopian businesses, from employees and biometric attendance through payroll, leave, and self-service.",
      image_url: "/assets/homepage/human-resource.svg",
      link: "/products/ethiopian-hrms",
      priority: 0,
      created_at: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "prod-carecentral",
      title: "CareCentral",
      description:
        "A healthcare ERP and hospital management system for patients, clinical work, staff, and administration.",
      image_url: "/assets/homepage/care.jpg",
      link: "/products/carecentral",
      priority: 1,
      created_at: "2026-01-02T00:00:00.000Z",
    },
    {
      id: "prod-school360",
      title: "School360",
      description:
        "Digitize academics, admissions, attendance, examinations, fees, communication, and administration—all from one integrated, modular ERP platform engineered for educational institutions.",
      image_url: "/assets/homepage/school.jpg",
      link: "/products/school360",
      priority: 2,
      created_at: "2026-01-03T00:00:00.000Z",
    },
  ],
  solutions: [
    {
      id: "sol-diligent-trade",
      title: "Diligent Trade",
      description:
        "An import-export company running orders, inventory, and finance in one Odoo system.",
      detail: "Odoo ERP",
      image_url: "/assets/clientLogo/diligent-mark.png",
      link: "/projects/diligent-trade",
      priority: 0,
      created_at: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "sol-skillbridge",
      title: "SkillBridge Institute of Technology",
      description:
        "A site where the institute presents its programs and prospective students can enquire.",
      detail: "Website",
      image_url: "/assets/clientLogo/skillBridge-mark.png",
      link: "/projects/skillbridge",
      priority: 1,
      created_at: "2026-01-02T00:00:00.000Z",
    },
    {
      id: "sol-eyoha",
      title: "Eyoha Digitals",
      description:
        "A site for the studio’s services, portfolio, and consultation requests.",
      detail: "Website",
      image_url: "/assets/clientLogo/eyoha-mark.png",
      link: "/projects/eyoha-digitals",
      priority: 2,
      created_at: "2026-01-03T00:00:00.000Z",
    },
  ],
  testimonials: [
    {
      id: "test-eyoha",
      name: "Eyoha Digitals",
      testimonial: "Eyoha Digitals loved our website!",
      image_url: "/assets/clientLogo/eyoha.png",
      priority: 0,
      created_at: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "test-roha",
      name: "Roha Cake and Bread Bakery",
      testimonial: "Roha Bakery saw amazing growth with our product.",
      image_url: "/assets/clientLogo/RohaCake.png",
      priority: 1,
      created_at: "2026-01-02T00:00:00.000Z",
    },
    {
      id: "test-skillbridge",
      name: "SkillBridge Institute of Technology",
      testimonial: "SkillBridge praises the website we built.",
      image_url: "/assets/clientLogo/skillBridge.png",
      priority: 2,
      created_at: "2026-01-03T00:00:00.000Z",
    },
    {
      id: "test-diligent",
      name: "Diligent Trade Solutions",
      testimonial: "Diligent Trade saw great results from our ERP.",
      image_url: "/assets/clientLogo/diligent.png",
      priority: 3,
      created_at: "2026-01-04T00:00:00.000Z",
    },
    {
      id: "test-firma",
      name: "Firma Media and Communications",
      testimonial: "Odoo ERP Enterprise - Finance, Sales, Project",
      image_url: "/assets/clientLogo/firma.jpg",
      priority: 4,
      created_at: "2026-01-05T00:00:00.000Z",
    },
  ],
  insights: [
    {
      id: "insight-erp-ethiopia",
      title: "How ERP Systems Transform Ethiopian Businesses",
      description:
        "Why integrating sales, inventory, and finance into a single platform like Odoo or ERPNext accelerates business growth.",
      detail:
        "Implementing an ERP system allows companies to eliminate redundant data entry, ensure compliance with Ethiopian tax and payroll laws, and make data-driven operational decisions.",
      date: new Date().toISOString(),
      image_url: "/assets/homepage/business-operations.png",
      created_at: "2026-01-01T00:00:00.000Z",
    },
  ],
  contacts: [],
});

function readStore() {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      const init = defaultStore();
      writeStore(init);
      return init;
    }
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    const store = {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      solutions: Array.isArray(parsed.solutions) ? parsed.solutions : [],
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
      insights: Array.isArray(parsed.insights) ? parsed.insights : [],
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
    };
    return store;
  } catch (err) {
    console.error("Failed to read content store:", err);
    return defaultStore();
  }
}

function writeStore(store) {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

export const mapProduct = (row) => ({
  _id: row.id,
  id: row.id,
  title: row.title || "",
  description: row.description || "",
  detail: row.detail || row.content || "",
  kicker: row.kicker || "",
  modules: row.modules || "",
  imageUrl: row.image_url || "",
  image_url: row.image_url || "",
  link: row.link || "",
  priority: row.priority ?? 0,
  createdAt: row.created_at || new Date().toISOString(),
});

export const mapSolution = (row) => ({
  _id: row.id,
  id: row.id,
  title: row.title || "",
  description: row.description || "",
  detail: row.detail || "",
  situation: row.situation || "",
  built: row.built || "",
  impact: row.impact || "",
  imageUrl: row.image_url || "",
  image_url: row.image_url || "",
  link: row.link || "",
  priority: row.priority ?? 0,
  createdAt: row.created_at || new Date().toISOString(),
});

export const mapInsight = (row) => ({
  _id: row.id,
  id: row.id,
  title: row.title || "",
  description: row.description || "",
  detail: row.detail || "",
  date: row.date || new Date().toISOString(),
  imageUrl: row.image_url || "",
  image_url: row.image_url || "",
  createdAt: row.created_at || new Date().toISOString(),
});

export const mapTestimonial = (row) => ({
  _id: row.id,
  id: row.id,
  name: row.name || "",
  testimonial: row.testimonial || "",
  imageUrl: row.image_url || "",
  image_url: row.image_url || "",
  priority: row.priority ?? 0,
  createdAt: row.created_at || new Date().toISOString(),
});

export const mapContact = (row) => ({
  id: row.id,
  _id: row.id,
  name: row.name || "",
  last_name: row.last_name || "",
  lastName: row.last_name || "",
  email: row.email || "",
  phone: row.phone || "",
  organization: row.organization || "",
  message: row.message || "",
  status: row.status || "new",
  created_at: row.created_at || new Date().toISOString(),
  createdAt: row.created_at || new Date().toISOString(),
});

// ======================== PRODUCTS ========================

export async function getProducts() {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("priority", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) {
        return data.map(mapProduct);
      }
      if (isMissingOrAuthError(error)) {
        supabaseCheck.available = false;
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const sorted = [...store.products].sort((a, b) => {
    if ((a.priority ?? 0) !== (b.priority ?? 0)) {
      return (a.priority ?? 0) - (b.priority ?? 0);
    }
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
  return sorted.map(mapProduct);
}

export async function getProductById(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) return mapProduct(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const row = store.products.find((p) => p.id === id);
  return row ? mapProduct(row) : null;
}

export async function createProduct(payload) {
  const row = {
    id: randomUUID(),
    title: payload.title || "",
    description: payload.description || "",
    image_url: payload.image_url || payload.imageUrl || "",
    link: payload.link || "",
    priority: typeof payload.priority === "number" ? Math.round(payload.priority) : 0,
    created_at: new Date().toISOString(),
  };

  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          title: row.title,
          description: row.description,
          image_url: row.image_url,
          link: row.link,
          priority: row.priority,
        })
        .select()
        .single();
      if (!error && data) return mapProduct(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  store.products.unshift(row);
  writeStore(store);
  return mapProduct(row);
}

export async function updateProduct(id, updates) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.image_url !== undefined && { image_url: updates.image_url }),
          ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
          ...(updates.link !== undefined && { link: updates.link }),
          ...(updates.priority !== undefined && { priority: updates.priority }),
        })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) return mapProduct(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const idx = store.products.findIndex((p) => p.id === id);
  if (idx < 0) return null;

  store.products[idx] = {
    ...store.products[idx],
    ...(updates.title !== undefined && { title: updates.title }),
    ...(updates.description !== undefined && { description: updates.description }),
    ...((updates.image_url !== undefined || updates.imageUrl !== undefined) && {
      image_url: updates.image_url ?? updates.imageUrl,
    }),
    ...(updates.link !== undefined && { link: updates.link }),
    ...(updates.priority !== undefined && { priority: updates.priority }),
  };
  writeStore(store);
  return mapProduct(store.products[idx]);
}

export async function deleteProduct(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) return true;
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const prevLen = store.products.length;
  store.products = store.products.filter((p) => p.id !== id);
  if (store.products.length !== prevLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ======================== SOLUTIONS ========================

export async function getSolutions() {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("solutions")
        .select("*")
        .order("priority", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) {
        return data.map(mapSolution);
      }
      if (isMissingOrAuthError(error)) {
        supabaseCheck.available = false;
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const sorted = [...store.solutions].sort((a, b) => {
    if ((a.priority ?? 0) !== (b.priority ?? 0)) {
      return (a.priority ?? 0) - (b.priority ?? 0);
    }
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
  return sorted.map(mapSolution);
}

export async function getSolutionById(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("solutions")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) return mapSolution(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const row = store.solutions.find((s) => s.id === id);
  return row ? mapSolution(row) : null;
}

export async function createSolution(payload) {
  const row = {
    id: randomUUID(),
    title: payload.title || "",
    description: payload.description || "",
    detail: payload.detail || "",
    image_url: payload.image_url || payload.imageUrl || "",
    link: payload.link || "",
    priority: typeof payload.priority === "number" ? Math.round(payload.priority) : 0,
    created_at: new Date().toISOString(),
  };

  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("solutions")
        .insert({
          title: row.title,
          description: row.description,
          detail: row.detail,
          image_url: row.image_url,
          link: row.link,
          priority: row.priority,
        })
        .select()
        .single();
      if (!error && data) return mapSolution(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  store.solutions.unshift(row);
  writeStore(store);
  return mapSolution(row);
}

export async function updateSolution(id, updates) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("solutions")
        .update({
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.detail !== undefined && { detail: updates.detail }),
          ...(updates.image_url !== undefined && { image_url: updates.image_url }),
          ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
          ...(updates.link !== undefined && { link: updates.link }),
          ...(updates.priority !== undefined && { priority: updates.priority }),
        })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) return mapSolution(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const idx = store.solutions.findIndex((s) => s.id === id);
  if (idx < 0) return null;

  store.solutions[idx] = {
    ...store.solutions[idx],
    ...(updates.title !== undefined && { title: updates.title }),
    ...(updates.description !== undefined && { description: updates.description }),
    ...(updates.detail !== undefined && { detail: updates.detail }),
    ...((updates.image_url !== undefined || updates.imageUrl !== undefined) && {
      image_url: updates.image_url ?? updates.imageUrl,
    }),
    ...(updates.link !== undefined && { link: updates.link }),
    ...(updates.priority !== undefined && { priority: updates.priority }),
  };
  writeStore(store);
  return mapSolution(store.solutions[idx]);
}

export async function deleteSolution(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { error } = await supabase.from("solutions").delete().eq("id", id);
      if (!error) return true;
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const prevLen = store.solutions.length;
  store.solutions = store.solutions.filter((s) => s.id !== id);
  if (store.solutions.length !== prevLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ======================== INSIGHTS ========================

export async function getInsights() {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("insights")
        .select("*")
        .order("date", { ascending: false });
      if (!error && Array.isArray(data)) {
        return data.map(mapInsight);
      }
      if (isMissingOrAuthError(error)) {
        supabaseCheck.available = false;
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const sorted = [...store.insights].sort(
    (a, b) => new Date(b.date || b.created_at || 0) - new Date(a.date || a.created_at || 0)
  );
  return sorted.map(mapInsight);
}

export async function getInsightById(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("insights")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) return mapInsight(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const row = store.insights.find((i) => i.id === id);
  return row ? mapInsight(row) : null;
}

export async function createInsight(payload) {
  const row = {
    id: randomUUID(),
    title: payload.title || "",
    description: payload.description || "",
    detail: payload.detail || "",
    date: payload.date || new Date().toISOString(),
    image_url: payload.image_url || payload.imageUrl || "",
    created_at: new Date().toISOString(),
  };

  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("insights")
        .insert({
          title: row.title,
          description: row.description,
          detail: row.detail,
          date: row.date,
          image_url: row.image_url,
        })
        .select()
        .single();
      if (!error && data) return mapInsight(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  store.insights.unshift(row);
  writeStore(store);
  return mapInsight(row);
}

export async function updateInsight(id, updates) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("insights")
        .update({
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.detail !== undefined && { detail: updates.detail }),
          ...(updates.date !== undefined && { date: updates.date }),
          ...(updates.image_url !== undefined && { image_url: updates.image_url }),
          ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
        })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) return mapInsight(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const idx = store.insights.findIndex((i) => i.id === id);
  if (idx < 0) return null;

  store.insights[idx] = {
    ...store.insights[idx],
    ...(updates.title !== undefined && { title: updates.title }),
    ...(updates.description !== undefined && { description: updates.description }),
    ...(updates.detail !== undefined && { detail: updates.detail }),
    ...(updates.date !== undefined && { date: updates.date }),
    ...((updates.image_url !== undefined || updates.imageUrl !== undefined) && {
      image_url: updates.image_url ?? updates.imageUrl,
    }),
  };
  writeStore(store);
  return mapInsight(store.insights[idx]);
}

export async function deleteInsight(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { error } = await supabase.from("insights").delete().eq("id", id);
      if (!error) return true;
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const prevLen = store.insights.length;
  store.insights = store.insights.filter((i) => i.id !== id);
  if (store.insights.length !== prevLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ======================== TESTIMONIALS ========================

export async function getTestimonials() {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("priority", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) {
        return data.map(mapTestimonial);
      }
      if (isMissingOrAuthError(error)) {
        supabaseCheck.available = false;
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const sorted = [...store.testimonials].sort((a, b) => {
    if ((a.priority ?? 0) !== (b.priority ?? 0)) {
      return (a.priority ?? 0) - (b.priority ?? 0);
    }
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
  return sorted.map(mapTestimonial);
}

export async function getTestimonialById(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) return mapTestimonial(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const row = store.testimonials.find((t) => t.id === id);
  return row ? mapTestimonial(row) : null;
}

export async function createTestimonial(payload) {
  const row = {
    id: randomUUID(),
    name: payload.name || "",
    testimonial: payload.testimonial || "",
    image_url: payload.image_url || payload.imageUrl || "",
    priority: typeof payload.priority === "number" ? Math.round(payload.priority) : 0,
    created_at: new Date().toISOString(),
  };

  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .insert({
          name: row.name,
          testimonial: row.testimonial,
          image_url: row.image_url,
          priority: row.priority,
        })
        .select()
        .single();
      if (!error && data) return mapTestimonial(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  store.testimonials.unshift(row);
  writeStore(store);
  return mapTestimonial(row);
}

export async function updateTestimonial(id, updates) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .update({
          ...(updates.name !== undefined && { name: updates.name }),
          ...(updates.testimonial !== undefined && { testimonial: updates.testimonial }),
          ...(updates.image_url !== undefined && { image_url: updates.image_url }),
          ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
          ...(updates.priority !== undefined && { priority: updates.priority }),
        })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) return mapTestimonial(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const idx = store.testimonials.findIndex((t) => t.id === id);
  if (idx < 0) return null;

  store.testimonials[idx] = {
    ...store.testimonials[idx],
    ...(updates.name !== undefined && { name: updates.name }),
    ...(updates.testimonial !== undefined && { testimonial: updates.testimonial }),
    ...((updates.image_url !== undefined || updates.imageUrl !== undefined) && {
      image_url: updates.image_url ?? updates.imageUrl,
    }),
    ...(updates.priority !== undefined && { priority: updates.priority }),
  };
  writeStore(store);
  return mapTestimonial(store.testimonials[idx]);
}

export async function deleteTestimonial(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (!error) return true;
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const prevLen = store.testimonials.length;
  store.testimonials = store.testimonials.filter((t) => t.id !== id);
  if (store.testimonials.length !== prevLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ======================== CONTACTS ========================

export async function getContacts({ page = 1, limit = 10 } = {}) {
  const safePage = Math.max(1, parseInt(page, 10) || 1);
  const safeLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;

  if (await isSupabaseAvailable()) {
    try {
      const { data, error, count } = await supabase
        .from("contacts")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);
      if (!error && Array.isArray(data)) {
        return {
          contacts: data.map(mapContact),
          totalCount: count ?? data.length,
          page: safePage,
          limit: safeLimit,
          count: count ?? data.length,
        };
      }
      if (isMissingOrAuthError(error)) {
        supabaseCheck.available = false;
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const sorted = [...store.contacts].sort(
    (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
  );
  const totalCount = sorted.length;
  const sliced = sorted.slice(from, from + safeLimit);

  return {
    contacts: sliced.map(mapContact),
    totalCount,
    page: safePage,
    limit: safeLimit,
    count: totalCount,
  };
}

export async function getContactById(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) return mapContact(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const row = store.contacts.find((c) => c.id === id);
  return row ? mapContact(row) : null;
}

export async function createContact(payload) {
  const row = {
    id: randomUUID(),
    name: payload.name || "",
    last_name: payload.last_name || payload.lastName || "",
    email: payload.email || "",
    phone: payload.phone || "",
    organization: payload.organization || "",
    message: payload.message || "",
    status: payload.status || "new",
    created_at: new Date().toISOString(),
  };

  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .insert({
          name: row.name,
          last_name: row.last_name,
          email: row.email,
          phone: row.phone,
          organization: row.organization,
          message: row.message,
          status: row.status,
        })
        .select()
        .single();
      if (!error && data) return mapContact(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  store.contacts.unshift(row);
  writeStore(store);
  return mapContact(row);
}

export async function updateContactStatus(id, status) {
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) return mapContact(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const idx = store.contacts.findIndex((c) => c.id === id);
  if (idx < 0) return null;

  store.contacts[idx] = {
    ...store.contacts[idx],
    status,
  };
  writeStore(store);
  return mapContact(store.contacts[idx]);
}

export async function deleteContact(id) {
  if (await isSupabaseAvailable()) {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (!error) return true;
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const prevLen = store.contacts.length;
  store.contacts = store.contacts.filter((c) => c.id !== id);
  if (store.contacts.length !== prevLen) {
    writeStore(store);
    return true;
  }
  return false;
}

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

function readStore() {
  const empty = { products: [], solutions: [], testimonials: [], insights: [], contacts: [] };
  try {
    if (!fs.existsSync(STORE_PATH)) return empty;
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      solutions: Array.isArray(parsed.solutions) ? parsed.solutions : [],
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
      insights: Array.isArray(parsed.insights) ? parsed.insights : [],
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
    };
  } catch (err) {
    console.error("Failed to read content store:", err);
    return empty;
  }
}

function writeStore(store) {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

function normalizeKey(value) {
  return String(value || "").trim().toLowerCase();
}

function sharesIdentity(a, b) {
  const idA = normalizeKey(a?.id);
  const idB = normalizeKey(b?.id);
  if (idA && idA === idB) return true;

  const titleA = normalizeKey(a?.title || a?.name);
  const titleB = normalizeKey(b?.title || b?.name);
  if (titleA && titleA === titleB) return true;

  const linkA = normalizeKey(a?.link);
  const linkB = normalizeKey(b?.link);
  if (linkA && linkA === linkB) return true;

  return false;
}

// Remote wins when the same item exists in both stores. Items that exist
// in only one store are kept, so a save is visible even if the other copy lags.
function mergeContent(remoteRows, localRows) {
  const merged = [];
  for (const row of localRows || []) {
    if (!row || typeof row !== "object") continue;
    if (!merged.some((existing) => sharesIdentity(row, existing))) merged.push(row);
  }
  for (const row of remoteRows || []) {
    if (!row || typeof row !== "object") continue;
    const idx = merged.findIndex((existing) => sharesIdentity(row, existing));
    if (idx === -1) merged.push(row);
    else merged[idx] = { ...merged[idx], ...row };
  }
  return merged;
}

function sortByPriority(rows) {
  return [...rows].sort((a, b) => {
    const priorityA = a.priority ?? 0;
    const priorityB = b.priority ?? 0;
    if (priorityA !== priorityB) return priorityA - priorityB;
    return (
      new Date(b.created_at || b.createdAt || 0).getTime() -
      new Date(a.created_at || a.createdAt || 0).getTime()
    );
  });
}

function sortByDate(rows) {
  return [...rows].sort(
    (a, b) =>
      new Date(b.date || b.created_at || b.createdAt || 0).getTime() -
      new Date(a.date || a.created_at || a.createdAt || 0).getTime()
  );
}

async function readRemoteTable(table, orders) {
  if (!(await isSupabaseAvailable())) return [];
  try {
    let query = supabase.from(table).select("*");
    for (const order of orders) {
      query = query.order(order.column, {
        ascending: order.ascending,
        nullsFirst: false,
      });
    }
    const { data, error } = await query;
    if (!error && Array.isArray(data)) return data;
    if (isMissingOrAuthError(error)) supabaseCheck.available = false;
  } catch {
    supabaseCheck.available = false;
  }
  return [];
}

function upsertLocal(collection, row) {
  const store = readStore();
  const list = store[collection];
  if (!Array.isArray(list) || !row?.id) return;
  const idx = list.findIndex((item) => item.id === row.id);
  if (idx >= 0) list[idx] = { ...list[idx], ...row };
  else list.unshift(row);
  writeStore(store);
}

function removeLocal(collection, id) {
  const store = readStore();
  const list = store[collection];
  if (!Array.isArray(list)) return false;
  const next = list.filter((item) => item.id !== id);
  if (next.length === list.length) return false;
  store[collection] = next;
  writeStore(store);
  return true;
}

const priorityOrder = [
  { column: "priority", ascending: true },
  { column: "created_at", ascending: false },
];

export const mapProduct = (row) => ({
  _id: row.id,
  id: row.id,
  title: row.title || "",
  description: row.description || "",
  detail: row.detail || row.content || "",
  kicker: row.kicker || "",
  modules: row.modules || "",
  flow: row.flow || "",
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
  const remote = await readRemoteTable("products", priorityOrder);
  const merged = mergeContent(remote, readStore().products);
  return sortByPriority(merged).map(mapProduct);
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
    kicker: payload.kicker || "",
    detail: payload.detail || payload.content || "",
    modules: payload.modules || "",
    flow: payload.flow || "",
    image_url: payload.image_url || payload.imageUrl || "",
    link: payload.link || "",
    priority: typeof payload.priority === "number" ? Math.round(payload.priority) : 0,
    created_at: new Date().toISOString(),
  };

  let createdProduct = null;

  if (await isSupabaseAvailable()) {
    try {
      let { data, error } = await supabase
        .from("products")
        .insert({
          title: row.title,
          description: row.description,
          kicker: row.kicker,
          detail: row.detail,
          modules: row.modules,
          image_url: row.image_url,
          link: row.link,
          priority: row.priority,
        })
        .select()
        .single();

      if (error && (error.message?.includes("column") || error.code === "PGRST204" || error.code === "42703")) {
        const res = await supabase
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
        data = res.data;
        error = res.error;
      }

      if (!error && data) {
        createdProduct = mapProduct({ ...row, ...data });
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  // Always write to local content store so local and Supabase remain synchronized and no items disappear
  const store = readStore();
  const storeRow = createdProduct ? { ...row, id: createdProduct.id } : row;
  store.products.unshift(storeRow);
  writeStore(store);

  return createdProduct || mapProduct(row);
}

export async function updateProduct(id, updates) {
  let updatedProduct = null;

  if (await isSupabaseAvailable()) {
    try {
      const updatePayload = {
        ...(updates.title !== undefined && { title: updates.title }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.kicker !== undefined && { kicker: updates.kicker }),
        ...(updates.detail !== undefined && { detail: updates.detail }),
        ...(updates.modules !== undefined && { modules: updates.modules }),
        ...(updates.image_url !== undefined && { image_url: updates.image_url }),
        ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
        ...(updates.link !== undefined && { link: updates.link }),
        ...(updates.priority !== undefined && { priority: updates.priority }),
      };

      let { data, error } = await supabase
        .from("products")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      if (error && (error.message?.includes("column") || error.code === "PGRST204" || error.code === "42703")) {
        const basicPayload = {
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.image_url !== undefined && { image_url: updates.image_url }),
          ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
          ...(updates.link !== undefined && { link: updates.link }),
          ...(updates.priority !== undefined && { priority: updates.priority }),
        };
        const res = await supabase.from("products").update(basicPayload).eq("id", id).select().single();
        data = res.data;
        error = res.error;
      }

      if (!error && data) {
        updatedProduct = mapProduct(data);
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  // Always update local content store as well
  const store = readStore();
  const idx = store.products.findIndex((p) => p.id === id);
  if (idx >= 0) {
    store.products[idx] = {
      ...store.products[idx],
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.kicker !== undefined && { kicker: updates.kicker }),
      ...(updates.detail !== undefined && { detail: updates.detail }),
      ...(updates.modules !== undefined && { modules: updates.modules }),
      ...(updates.flow !== undefined && { flow: updates.flow }),
      ...((updates.image_url !== undefined || updates.imageUrl !== undefined) && {
        image_url: updates.image_url ?? updates.imageUrl,
      }),
      ...(updates.link !== undefined && { link: updates.link }),
      ...(updates.priority !== undefined && { priority: updates.priority }),
    };
    writeStore(store);
    return mapProduct(store.products[idx]);
  }

  return updatedProduct;
}

export async function deleteProduct(id) {
  let remoteDeleted = false;
  let remoteChecked = false;
  if (await isSupabaseAvailable()) {
    remoteChecked = true;
    try {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      remoteDeleted = Boolean(data);
    } catch (error) {
      if (isMissingOrAuthError(error)) supabaseCheck.available = false;
      else throw error;
    }
  }

  const localDeleted = removeLocal("products", id);
  if (remoteChecked) return remoteDeleted || localDeleted;
  return localDeleted;
}

// ======================== SOLUTIONS ========================

export async function getSolutions() {
  const remote = await readRemoteTable("solutions", priorityOrder);
  const merged = mergeContent(remote, readStore().solutions);
  return sortByPriority(merged).map(mapSolution);
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

  let created = null;
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
      if (!error && data) created = mapSolution({ ...row, ...data });
    } catch {
      supabaseCheck.available = false;
    }
  }

  const storeRow = created ? { ...row, id: created.id } : row;
  upsertLocal("solutions", storeRow);
  return created || mapSolution(storeRow);
}

export async function updateSolution(id, updates) {
  let updated = null;
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
      if (!error && data) updated = mapSolution(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const idx = store.solutions.findIndex((s) => s.id === id);
  if (idx >= 0) {
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

  if (updated) {
    upsertLocal("solutions", {
      id: updated.id,
      title: updated.title,
      description: updated.description,
      detail: updated.detail,
      image_url: updated.imageUrl,
      link: updated.link,
      priority: updated.priority,
      created_at: updated.createdAt,
    });
  }
  return updated;
}

export async function deleteSolution(id) {
  let remoteDeleted = false;
  let remoteChecked = false;
  if (await isSupabaseAvailable()) {
    remoteChecked = true;
    try {
      const { data, error } = await supabase
        .from("solutions")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      remoteDeleted = Boolean(data);
    } catch (error) {
      if (isMissingOrAuthError(error)) supabaseCheck.available = false;
      else throw error;
    }
  }

  const localDeleted = removeLocal("solutions", id);
  if (remoteChecked) return remoteDeleted || localDeleted;
  return localDeleted;
}

// ======================== INSIGHTS ========================

export async function getInsights() {
  const remote = await readRemoteTable("insights", [{ column: "date", ascending: false }]);
  const merged = mergeContent(remote, readStore().insights);
  return sortByDate(merged).map(mapInsight);
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

  let createdInsight = null;
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
      if (!error && data) {
        createdInsight = mapInsight({ ...row, ...data });
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  // Always write to local content store so local and Supabase remain synchronized and no items disappear
  const store = readStore();
  const storeRow = createdInsight ? { ...row, id: createdInsight.id } : row;
  store.insights.unshift(storeRow);
  writeStore(store);

  return createdInsight || mapInsight(row);
}

export async function updateInsight(id, updates) {
  let updatedInsight = null;
  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("insights")
        .update({
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.detail !== undefined && { detail: updates.detail }),
          ...(updates.date !== undefined && { date: updates.date }),
          ...((updates.image_url !== undefined || updates.imageUrl !== undefined) && {
            image_url: updates.image_url ?? updates.imageUrl,
          }),
        })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        updatedInsight = mapInsight(data);
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  // Always update local content store as well
  const store = readStore();
  const idx = store.insights.findIndex((i) => i.id === id);
  if (idx >= 0) {
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

  return updatedInsight;
}

export async function deleteInsight(id) {
  let remoteDeleted = false;
  let remoteChecked = false;
  if (await isSupabaseAvailable()) {
    remoteChecked = true;
    try {
      const { data, error } = await supabase
        .from("insights")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      remoteDeleted = Boolean(data);
    } catch (error) {
      if (isMissingOrAuthError(error)) supabaseCheck.available = false;
      else throw error;
    }
  }

  const localDeleted = removeLocal("insights", id);
  if (remoteChecked) return remoteDeleted || localDeleted;
  return localDeleted;
}

// ======================== TESTIMONIALS ========================

export async function getTestimonials() {
  const remote = await readRemoteTable("testimonials", priorityOrder);
  const merged = mergeContent(remote, readStore().testimonials);
  return sortByPriority(merged).map(mapTestimonial);
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

  let created = null;
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
      if (!error && data) created = mapTestimonial({ ...row, ...data });
    } catch {
      supabaseCheck.available = false;
    }
  }

  const storeRow = created ? { ...row, id: created.id } : row;
  upsertLocal("testimonials", storeRow);
  return created || mapTestimonial(storeRow);
}

export async function updateTestimonial(id, updates) {
  let updated = null;
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
      if (!error && data) updated = mapTestimonial(data);
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  const idx = store.testimonials.findIndex((t) => t.id === id);
  if (idx >= 0) {
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

  if (updated) {
    upsertLocal("testimonials", {
      id: updated.id,
      name: updated.name,
      testimonial: updated.testimonial,
      image_url: updated.imageUrl,
      priority: updated.priority,
      created_at: updated.createdAt,
    });
  }
  return updated;
}

export async function deleteTestimonial(id) {
  let remoteDeleted = false;
  let remoteChecked = false;
  if (await isSupabaseAvailable()) {
    remoteChecked = true;
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      remoteDeleted = Boolean(data);
    } catch (error) {
      if (isMissingOrAuthError(error)) supabaseCheck.available = false;
      else throw error;
    }
  }

  const localDeleted = removeLocal("testimonials", id);
  if (remoteChecked) return remoteDeleted || localDeleted;
  return localDeleted;
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
  let remoteDeleted = false;
  let remoteChecked = false;
  if (await isSupabaseAvailable()) {
    remoteChecked = true;
    try {
      const { data, error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle();
      if (error) throw error;
      remoteDeleted = Boolean(data);
    } catch (error) {
      if (isMissingOrAuthError(error)) supabaseCheck.available = false;
      else throw error;
    }
  }

  const localDeleted = removeLocal("contacts", id);
  if (remoteChecked) return remoteDeleted || localDeleted;
  return localDeleted;
}

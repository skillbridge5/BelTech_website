import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.join(__dirname, "../../data/admin-store.json");

function readStore() {
  try {
    if (!fs.existsSync(STORE_PATH)) return { admins: [] };
    const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
    return { admins: Array.isArray(parsed.admins) ? parsed.admins : [] };
  } catch {
    return { admins: [] };
  }
}

function writeStore(store) {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

export async function ensureLocalAdmin(email, password) {
  if (!email || !password) return null;
  const store = readStore();
  const normalized = email.toLowerCase();
  let admin = store.admins.find((a) => a.email === normalized);

  if (!admin) {
    admin = {
      id: randomUUID(),
      email: normalized,
      password_hash: await bcrypt.hash(password, 10),
    };
    store.admins.push(admin);
    writeStore(store);
    return admin;
  }

  // Keep local password in sync with .env so a placeholder Supabase key
  // never permanently blocks login during local development.
  const matches = await bcrypt.compare(password, admin.password_hash);
  if (!matches) {
    admin.password_hash = await bcrypt.hash(password, 10);
    writeStore(store);
  }
  return admin;
}

export async function findLocalAdminByEmail(email) {
  const store = readStore();
  return store.admins.find((a) => a.email === String(email || "").toLowerCase()) || null;
}

export async function findLocalAdminById(id) {
  const store = readStore();
  return store.admins.find((a) => a.id === id) || null;
}

export async function updateLocalAdmin(id, updates) {
  const store = readStore();
  const idx = store.admins.findIndex((a) => a.id === id);
  if (idx < 0) return null;
  store.admins[idx] = { ...store.admins[idx], ...updates };
  writeStore(store);
  return store.admins[idx];
}

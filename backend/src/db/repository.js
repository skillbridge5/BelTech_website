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
      kicker: "Complete HR and payroll management for Ethiopian businesses",
      description:
        "An Odoo-based HR and payroll system for Ethiopian businesses, from employees and biometric attendance through payroll, leave, and self-service.",
      detail: `<p class="lead"><strong>BelTech Ethiopian HRMS</strong> is an enterprise human resource management and payroll system tailored specifically for Ethiopian businesses, tax laws, and labor regulations. Built on top of robust Odoo technology, it streamlines HR operations from attendance capture to tax compliance.</p>

<div class="callout-box callout-info">
  <h4>🇪🇹 Fully Compliant with Ethiopian Labor Regulations</h4>
  <p>Accurately automates income tax bands (0% to 35%), mandatory employee pension (7%), employer pension (11%), severance formulas, and Ethiopian holiday calendar tracking.</p>
</div>

<h2>Core Architectural Highlights</h2>
<p>Unlike generic global HR tools that require clumsy spreadsheet workarounds for Ethiopian tax rules, BelTech HRMS handles end-to-end personnel workflows natively:</p>

<ul>
  <li><strong>Automated Biometric Integration:</strong> Connect directly with ZKTeco and IP-enabled biometric devices. Punch logs automatically calculate work hours, tardiness, and overtime.</li>
  <li><strong>Multi-shift & Overnight Schedules:</strong> Full flexibility for manufacturing plants, hospitals, hotels, and retail chains with rotating shift support.</li>
  <li><strong>Employee Self-Service (ESS):</strong> Staff can submit leave requests, review attendance, and view monthly payslips straight from web or mobile.</li>
  <li><strong>Tax & Pension Reporting:</strong> Generate ready-to-submit monthly declarations for the Ministry of Revenues and Pension Agency with one click.</li>
</ul>

<h2>The Integrated Lifecycle: From Hire to Retire</h2>
<p>Employee records maintain complete career progression histories, contract renewals, disciplinary records, salary revisions, and exit clearances in a unified database.</p>`,
      modules: `Employee Management: Comprehensive profiles, digital contract records, departments, promotions, and career history.
Biometric Attendance: ZKTeco fingerprint and facial recognition device synchronization with automated punch validation.
Shift Scheduling: Fixed, rotating, overnight, and flexible work schedules with automated rest day assignments.
Ethiopian Payroll & Pension: Tax tiered calculations according to Ethiopian labor law, employee (7%) and employer (11%) pension deductions.
Leave Administration: Annual, sick, maternity, and compassionate leave with automatic balance tracking and multi-tier approval flows.
Overtime Management: Standard, weekend, and public holiday overtime rates automatically calculated into monthly payslips.
Salary Advances & Loans: Loan request approvals, customizable repayment schedules, and automatic monthly deductions.
Employee Self-Service: Intuitive portal for leave applications, attendance records, payslip downloads, and HR inquiries.
Ethiopian Calendar Support: Built-in Geez calendar conversion, holidays, and Ethiopian fiscal year synchronizations.
Analytics & Reporting: Real-time workforce headcounts, attendance ratios, payroll summaries, and tax compliance export sheets.`,
      image_url: "/assets/homepage/human-resource.svg",
      link: "/products/ethiopian-hrms",
      priority: 0,
      created_at: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "prod-carecentral",
      title: "CareCentral",
      kicker: "Healthcare ERP and hospital management system",
      description:
        "A healthcare ERP and hospital management system for patients, clinical work, staff, and administration.",
      detail: `<p class="lead"><strong>CareCentral</strong> is an all-in-one healthcare ERP and hospital management system designed to coordinate clinical, diagnostic, pharmaceutical, and financial operations across modern medical facilities.</p>

<div class="callout-box callout-tip">
  <h4>🏥 Unified Patient Record Across All Hospital Units</h4>
  <p>Eliminate paper charts and fragmented departments. From front-desk triage and outpatient consultation to laboratory tests, pharmacy fulfillment, and inpatient wards, every interaction updates the patient’s central electronic health record.</p>
</div>

<h2>Key System Capabilities</h2>
<ul>
  <li><strong>Outpatient & Inpatient Management:</strong> Real-time bed occupancy maps, surgical scheduling, vitals monitoring, and nurse handover notes.</li>
  <li><strong>Laboratory & Imaging Integration:</strong> Barcoded specimen tracking, digital requisition forms, and validated lab result publication directly to patient profiles.</li>
  <li><strong>Pharmacy & Controlled Inventory:</strong> Automated prescription queues, batch number and expiry date tracking, and automated reorder triggers for essential medicines.</li>
  <li><strong>Consolidated Billing:</strong> Multi-department bill collation combining consultation fees, lab procedures, medication dispensing, and bed days into a single transparent invoice with private insurance claims support.</li>
</ul>`,
      modules: `Patient Registration & Records: Digital intake, demographic capture, insurance identification, and medical records.
Outpatient Department (OPD): Doctor consultations, vitals logging, clinical notes, diagnosis coding, and electronic prescriptions.
Inpatient Department (IPD): Admission processing, ward and bed management, nurse charts, and discharge summaries.
Pharmacy & Medication: Prescription queues, barcode dispensing, batch/expiry tracking, and automated stock reordering.
Laboratory Information System (LIS): Test requisition, barcode sample labeling, specimen tracking, and validated lab results.
Billing & Insurance: Unified bill aggregation for consultation, lab, pharmacy, and bed charges with private insurance claims.
Emergency & Triage: Fast-track trauma intake, triage level tagging, and rapid doctor routing.
Hospital Administration & Analytics: Bed occupancy dashboards, department revenue metrics, and staffing allocations.`,
      image_url: "/assets/homepage/care.jpg",
      link: "/products/carecentral",
      priority: 1,
      created_at: "2026-01-02T00:00:00.000Z",
    },
    {
      id: "prod-school360",
      title: "School360",
      kicker: "End-to-end school management platform engineered for educational excellence",
      description:
        "Digitize academics, admissions, attendance, examinations, fees, communication, and administration—all from one integrated, modular ERP platform engineered for educational institutions.",
      detail: `<p class="lead"><strong>School360</strong> is an end-to-end educational institution ERP designed for K-12 schools, colleges, and training institutes. It digitizes student admissions, academic progress, examinations, fee collection, and administrative workflows into one seamless portal.</p>

<div class="callout-box callout-info">
  <h4>🎓 Integrated Academic & Administrative Operations</h4>
  <p>Bridge the gap between administrators, teachers, parents, and students with real-time academic records, biometric student attendance, automated grade books, and secure fee processing.</p>
</div>

<h2>Comprehensive Institutional Capabilities</h2>
<ul>
  <li><strong>Digital Admissions & Enrollment:</strong> Manage student applications, interview scheduling, document verification, and automated student ID generation.</li>
  <li><strong>Fee Management & Billing:</strong> Configurable tuition fee structures, term invoice generation, payment receipts, and automated SMS reminders for pending balances.</li>
  <li><strong>Exams & Continuous Assessment:</strong> Mark entry, customized grading rubrics, automatic GPA computation, and one-click report card printing.</li>
  <li><strong>Parent Portal & Mobile Communication:</strong> Give guardians real-time visibility into attendance records, homework assignments, exam schedules, and teacher feedback.</li>
</ul>`,
      modules: `Student Admissions & Enrollment: Online application forms, document verification, interview scheduling, and student ID generation.
Academic Management: Curriculum planning, class section division, subject assignments, and teacher scheduling.
Fee Management & Invoicing: Tuition fee structures, automated term invoices, bank transfer reconciliations, and penalty tracking.
Attendance Tracking: Daily classroom roll-call, biometric gate logging, and automated SMS alerts to parents for absent students.
Examinations & Report Cards: Exam timetables, continuous assessment recording, GPA calculations, and printable report cards.
Parent & Student Portal: Dedicated web and mobile view for grades, fee payment receipts, upcoming schedules, and school announcements.
Library Automation: Book cataloging, barcode scanning for borrow/return, and automated overdue book alerts.
Staff & Payroll Administration: Teacher qualification tracking, workload monitoring, and monthly staff salary processing.`,
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
  const defaultList = defaultStore().products;
  let products = [];

  if (await isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("priority", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) {
        products = data.map(mapProduct);
      } else if (isMissingOrAuthError(error)) {
        supabaseCheck.available = false;
      }
    } catch {
      supabaseCheck.available = false;
    }
  }

  const store = readStore();
  if (!products.length) {
    products = store.products.map(mapProduct);
  }

  // Ensure default flagship products are always present and never hidden when a new product is created
  const merged = [...products];
  for (const def of defaultList) {
    const exists = merged.some(
      (p) =>
        p.id === def.id ||
        p._id === def.id ||
        (p.title && p.title.toLowerCase() === def.title.toLowerCase()) ||
        (p.link && p.link.toLowerCase() === def.link.toLowerCase())
    );
    if (!exists) {
      merged.push(mapProduct(def));
    }
  }

  return merged.sort((a, b) => {
    if ((a.priority ?? 0) !== (b.priority ?? 0)) {
      return (a.priority ?? 0) - (b.priority ?? 0);
    }
    return new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0);
  });
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
  let row = store.products.find((p) => p.id === id);
  if (!row) {
    // Check default store
    row = defaultStore().products.find((p) => p.id === id);
  }
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
  if (await isSupabaseAvailable()) {
    try {
      await supabase.from("products").delete().eq("id", id);
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
  return true;
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

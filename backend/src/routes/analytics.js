import { Router } from "express";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { supabase } from "../db/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.join(__dirname, "../../data/analytics-store.json");

const SOURCE_KEYS = ["direct", "organic", "social", "referral"];
const EVENT_TYPES = new Set(["click", "cta", "outbound", "scroll", "form", "section", "pageview", "heartbeat", "end", "dwell"]);

function emptyStore() {
  return { sessions: [], pageviews: [], sections: [], events: [] };
}

function readStore() {
  try {
    if (!fs.existsSync(STORE_PATH)) return emptyStore();
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      pageviews: Array.isArray(parsed.pageviews) ? parsed.pageviews : [],
      sections: Array.isArray(parsed.sections) ? parsed.sections : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
    };
  } catch {
    return emptyStore();
  }
}

function writeStore(store) {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

function detectSource(referrer = "", utmSource = "", utmMedium = "") {
  const ref = String(referrer || "").toLowerCase();
  const utm = `${utmSource || ""} ${utmMedium || ""}`.toLowerCase();
  if (utm.includes("google") || utm.includes("bing") || utm.includes("organic") || utm.includes("cpc") || utm.includes("seo")) {
    return utm.includes("cpc") || utm.includes("paid") ? "referral" : "organic";
  }
  if (
    utm.includes("facebook") ||
    utm.includes("twitter") ||
    utm.includes("linkedin") ||
    utm.includes("instagram") ||
    utm.includes("social")
  ) {
    return "social";
  }
  if (!ref) return "direct";
  if (ref.includes("google.") || ref.includes("bing.") || ref.includes("duckduckgo.") || ref.includes("yahoo.")) return "organic";
  if (
    ref.includes("facebook.") ||
    ref.includes("twitter.") ||
    ref.includes("t.co") ||
    ref.includes("linkedin.") ||
    ref.includes("instagram.") ||
    ref.includes("youtube.")
  ) {
    return "social";
  }
  return "referral";
}

function detectDevice(ua = "") {
  const s = String(ua || "").toLowerCase();
  if (/ipad|tablet|kindle|playbook|silk/.test(s)) return "tablet";
  if (/mobi|iphone|android.*mobile|windows phone/.test(s)) return "mobile";
  return "desktop";
}

function startOfLocalDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function startOfLocalWeek(ts = Date.now()) {
  const d = new Date(startOfLocalDay(ts));
  // Monday as first day of week
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  return d.getTime();
}

function startOfLocalMonth(ts = Date.now()) {
  const d = new Date(ts);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function startOfLocalYear(ts = Date.now()) {
  const d = new Date(ts);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function daysBetween(start, end) {
  return Math.max(1, Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1);
}

function rangeWindow(range) {
  const now = Date.now();
  const todayStart = startOfLocalDay(now);

  // Aliases for older clients
  const normalized =
    range === "daily"
      ? "today"
      : range === "weekly"
        ? "week"
        : range === "monthly"
          ? "month"
          : range;

  if (normalized === "today") {
    const hours = Math.min(24, new Date(now).getHours() + 1);
    return { start: todayStart, buckets: hours, mode: "hour" };
  }

  if (normalized === "week") {
    const start = startOfLocalWeek(now);
    return { start, buckets: daysBetween(start, todayStart), mode: "day" };
  }

  if (normalized === "year") {
    const start = startOfLocalYear(now);
    const monthIndex = new Date(now).getMonth(); // 0-11
    return { start, buckets: monthIndex + 1, mode: "month" };
  }

  // month (default)
  const start = startOfLocalMonth(now);
  return { start, buckets: daysBetween(start, todayStart), mode: "day" };
}

function formatBucketLabel(date, mode) {
  if (mode === "hour") {
    return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
  }
  if (mode === "month") {
    return date.toLocaleDateString("en-US", { month: "short" });
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function bucketKey(date, mode) {
  if (mode === "hour") {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
  }
  if (mode === "month") {
    return `${date.getFullYear()}-${date.getMonth()}`;
  }
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function advanceBucket(startTs, index, mode) {
  const d = new Date(startTs);
  if (mode === "hour") {
    d.setHours(d.getHours() + index, 0, 0, 0);
  } else if (mode === "month") {
    d.setMonth(d.getMonth() + index, 1);
    d.setHours(12, 0, 0, 0);
  } else {
    d.setDate(d.getDate() + index);
    d.setHours(12, 0, 0, 0);
  }
  return d;
}

function isMissingTable(error) {
  const msg = String(error?.message || error || "").toLowerCase();
  return (
    msg.includes("could not find the table") ||
    msg.includes("does not exist") ||
    msg.includes("schema cache") ||
    msg.includes("invalid api key") ||
    error?.code === "42P01" ||
    error?.code === "PGRST205"
  );
}

let sbCache = { checkedAt: 0, ok: false };

async function supabaseAvailable() {
  if (Date.now() - sbCache.checkedAt < 60_000) return sbCache.ok;
  const { error } = await supabase.from("analytics_sessions").select("id").limit(1);
  sbCache = { checkedAt: Date.now(), ok: !error };
  if (error && !isMissingTable(error)) {
    console.warn("analytics supabase check:", error.message);
  }
  return sbCache.ok;
}

function isEngaged(session) {
  return (
    (session.duration_ms || 0) >= 15000 ||
    (session.max_scroll || 0) >= 50 ||
    (session.click_count || 0) >= 1 ||
    (session.pageview_count || 0) > 1
  );
}

function pruneStore(store) {
  // Keep ~14 months so "This Year" still has history
  const cutoff = Date.now() - 420 * 24 * 60 * 60 * 1000;
  store.sessions = store.sessions.filter((s) => new Date(s.started_at).getTime() >= cutoff);
  store.pageviews = store.pageviews.filter((p) => new Date(p.viewed_at).getTime() >= cutoff);
  store.sections = store.sections.filter((s) => new Date(s.viewed_at).getTime() >= cutoff);
  store.events = (store.events || []).filter((e) => new Date(e.created_at).getTime() >= cutoff).slice(0, 5000);
  return store;
}

function upsertSessionFile(payload) {
  const store = pruneStore(readStore());
  const now = new Date().toISOString();
  let session = store.sessions.find(
    (s) => s.id === payload.sessionId || (s.visitor_id === payload.visitorId && s.is_active)
  );

  if (!session) {
    session = {
      id: payload.sessionId || randomUUID(),
      visitor_id: payload.visitorId,
      started_at: now,
      ended_at: null,
      last_seen_at: now,
      duration_ms: 0,
      bounced: true,
      source: payload.source,
      referrer: payload.referrer || "",
      country: payload.country || "Unknown",
      city: payload.city || "Unknown",
      device: payload.device,
      landing_page: payload.path || "/",
      current_page: payload.path || "/",
      is_active: true,
      pageview_count: 0,
      max_scroll: 0,
      click_count: 0,
      language: payload.language || "en",
    };
    store.sessions.unshift(session);
  }

  session.last_seen_at = now;
  session.is_active = true;
  session.current_page = payload.path || session.current_page;
  session.device = payload.device || session.device;
  if (payload.country && payload.country !== "Unknown") session.country = payload.country;
  if (payload.city && payload.city !== "Unknown") session.city = payload.city;
  if (payload.language) session.language = payload.language;
  if (payload.durationMs != null) session.duration_ms = Math.max(session.duration_ms || 0, payload.durationMs);
  if (payload.scrollDepth != null) session.max_scroll = Math.max(session.max_scroll || 0, payload.scrollDepth);
  if (payload.clickCount != null) session.click_count = Math.max(session.click_count || 0, payload.clickCount);
  if (payload.pageview) {
    session.pageview_count = (session.pageview_count || 0) + 1;
    if (session.pageview_count > 1) session.bounced = false;
  }
  if (isEngaged(session)) session.bounced = session.pageview_count <= 1 && (session.click_count || 0) === 0 && (session.max_scroll || 0) < 25;
  if (payload.end) {
    session.is_active = false;
    session.ended_at = now;
    if (payload.durationMs != null) session.duration_ms = payload.durationMs;
  }

  writeStore(store);
  return session;
}

function insertPageviewFile(row) {
  const store = pruneStore(readStore());
  store.pageviews.unshift(row);
  writeStore(store);
}

function insertSectionFile(row) {
  const store = pruneStore(readStore());
  const existing = store.sections.find(
    (s) =>
      s.visitor_id === row.visitor_id &&
      s.path === row.path &&
      s.section_id === row.section_id &&
      Date.now() - new Date(s.viewed_at).getTime() < 60_000
  );
  if (existing) {
    existing.dwell_ms = Math.max(existing.dwell_ms || 0, row.dwell_ms || 0);
    existing.viewed_at = row.viewed_at;
  } else {
    store.sections.unshift(row);
  }
  writeStore(store);
}

function insertEventFile(row) {
  const store = pruneStore(readStore());
  store.events = store.events || [];
  store.events.unshift(row);
  if (store.events.length > 5000) store.events = store.events.slice(0, 5000);

  // keep session engagement counters fresh
  const session = store.sessions.find((s) => s.id === row.session_id || (s.visitor_id === row.visitor_id && s.is_active));
  if (session) {
    session.last_seen_at = row.created_at;
    if (row.scroll_depth != null) session.max_scroll = Math.max(session.max_scroll || 0, row.scroll_depth);
    if (row.type === "click" || row.type === "cta" || row.type === "outbound") {
      session.click_count = (session.click_count || 0) + 1;
      if (session.pageview_count <= 1) session.bounced = false;
    }
    session.current_page = row.path || session.current_page;
  }
  writeStore(store);
}

async function loadRangeData(range) {
  const { start } = rangeWindow(range);
  const store = readStore();
  return {
    sessions: store.sessions.filter((s) => new Date(s.started_at).getTime() >= start),
    pageviews: store.pageviews.filter((p) => new Date(p.viewed_at).getTime() >= start),
    sections: store.sections.filter((s) => new Date(s.viewed_at).getTime() >= start),
    events: (store.events || []).filter((e) => new Date(e.created_at).getTime() >= start),
    source: (await supabaseAvailable()) ? "supabase+file" : "file",
  };
}

function buildSummary(range, data) {
  const { start, buckets, mode } = rangeWindow(range);
  const { sessions, pageviews, sections, events } = data;

  const uniqueVisitors = new Set(sessions.map((s) => s.visitor_id)).size;
  const totalPageviews = pageviews.length;
  const avgSessionDuration =
    sessions.length === 0
      ? 0
      : Math.round(sessions.reduce((sum, s) => sum + (s.duration_ms || 0), 0) / sessions.length);

  const bounced = sessions.filter((s) => s.bounced && !isEngaged(s)).length;
  const bounceRate =
    sessions.length === 0 ? 0 : Math.round((bounced / sessions.length) * 1000) / 10;

  const engagedSessions = sessions.filter(isEngaged).length;
  const engagementRate =
    sessions.length === 0 ? 0 : Math.round((engagedSessions / sessions.length) * 1000) / 10;

  const avgScrollDepth =
    sessions.length === 0
      ? 0
      : Math.round(sessions.reduce((sum, s) => sum + (s.max_scroll || 0), 0) / sessions.length);

  const totalClicks = events.filter((e) => ["click", "cta", "outbound"].includes(e.type)).length;
  const ctaClicks = events.filter((e) => e.type === "cta").length;

  const trendMap = new Map();
  for (let i = 0; i < buckets; i++) {
    const d = advanceBucket(start, i, mode);
    const key = bucketKey(d, mode);
    trendMap.set(key, {
      label: formatBucketLabel(d, mode),
      visitors: 0,
      pageviews: 0,
      engaged: 0,
      _visitorSet: new Set(),
      _engagedSet: new Set(),
    });
  }

  for (const pv of pageviews) {
    const d = new Date(pv.viewed_at);
    const bucket = trendMap.get(bucketKey(d, mode));
    if (!bucket) continue;
    bucket.pageviews += 1;
    if (pv.visitor_id) bucket._visitorSet.add(pv.visitor_id);
  }
  for (const s of sessions) {
    const d = new Date(s.started_at);
    const bucket = trendMap.get(bucketKey(d, mode));
    if (!bucket) continue;
    bucket._visitorSet.add(s.visitor_id);
    if (isEngaged(s)) bucket._engagedSet.add(s.visitor_id);
  }

  const trafficTrend = [...trendMap.values()].map(
    ({ label, pageviews: pv, _visitorSet, _engagedSet }) => ({
      label,
      pageviews: pv,
      visitors: _visitorSet.size,
      engaged: _engagedSet.size,
    })
  );

  const sourceCounts = Object.fromEntries(SOURCE_KEYS.map((k) => [k, 0]));
  for (const s of sessions) {
    const key = SOURCE_KEYS.includes(s.source) ? s.source : "direct";
    sourceCounts[key] += 1;
  }
  const sourceTotal = Object.values(sourceCounts).reduce((a, b) => a + b, 0) || 1;
  const trafficSources = SOURCE_KEYS.map((key) => ({
    name: key === "organic" ? "Organic Search" : key.charAt(0).toUpperCase() + key.slice(1),
    key,
    value: sourceCounts[key],
    percent: Math.round((sourceCounts[key] / sourceTotal) * 1000) / 10,
  }));

  const deviceCounts = { desktop: 0, mobile: 0, tablet: 0 };
  for (const s of sessions) {
    const key = deviceCounts[s.device] != null ? s.device : "desktop";
    deviceCounts[key] += 1;
  }
  const deviceTotal = Object.values(deviceCounts).reduce((a, b) => a + b, 0) || 1;
  const devices = Object.entries(deviceCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    key,
    value,
    percent: Math.round((value / deviceTotal) * 1000) / 10,
  }));

  const scrollBuckets = [
    { key: "0-24", label: "0–24%", min: 0, max: 24, value: 0 },
    { key: "25-49", label: "25–49%", min: 25, max: 49, value: 0 },
    { key: "50-74", label: "50–74%", min: 50, max: 74, value: 0 },
    { key: "75-99", label: "75–99%", min: 75, max: 99, value: 0 },
    { key: "100", label: "100%", min: 100, max: 100, value: 0 },
  ];
  for (const s of sessions) {
    const depth = s.max_scroll || 0;
    const bucket = scrollBuckets.find((b) => depth >= b.min && depth <= b.max);
    if (bucket) bucket.value += 1;
  }
  const scrollDistribution = scrollBuckets.map(({ key, label, value }) => ({
    key,
    label,
    value,
    percent: Math.round((value / (sessions.length || 1)) * 1000) / 10,
  }));

  const ctaMap = new Map();
  for (const e of events) {
    if (!["cta", "click", "outbound"].includes(e.type)) continue;
    const label = e.label || "unknown";
    const prev = ctaMap.get(label) || { label, count: 0, type: e.type, path: e.path };
    prev.count += 1;
    if (e.type === "cta") prev.type = "cta";
    ctaMap.set(label, prev);
  }
  const topCtas = [...ctaMap.values()].sort((a, b) => b.count - a.count).slice(0, 10);

  const pageMap = new Map();
  for (const pv of pageviews) {
    const pathKey = pv.path || "/";
    if (!pageMap.has(pathKey)) {
      pageMap.set(pathKey, {
        path: pathKey,
        pageviews: 0,
        dwellTotal: 0,
        dwellCount: 0,
        scrollTotal: 0,
        scrollCount: 0,
        clicks: 0,
      });
    }
    const row = pageMap.get(pathKey);
    row.pageviews += 1;
    if (pv.dwell_ms > 0) {
      row.dwellTotal += pv.dwell_ms;
      row.dwellCount += 1;
    }
    if (pv.scroll_depth != null) {
      row.scrollTotal += pv.scroll_depth;
      row.scrollCount += 1;
    }
  }

  for (const e of events) {
    if (!pageMap.has(e.path || "/")) continue;
    if (["click", "cta", "outbound"].includes(e.type)) {
      pageMap.get(e.path || "/").clicks += 1;
    }
  }

  // attach session scroll to pages via latest session current pages / landing
  for (const s of sessions) {
    const landing = pageMap.get(s.landing_page);
    if (landing && s.max_scroll != null) {
      landing.scrollTotal += s.max_scroll;
      landing.scrollCount += 1;
    }
  }

  const sectionByPath = new Map();
  const sectionGlobal = new Map();
  for (const sec of sections) {
    const pathKey = sec.path || "/";
    if (!sectionByPath.has(pathKey)) sectionByPath.set(pathKey, new Map());
    const inner = sectionByPath.get(pathKey);
    const prev = inner.get(sec.section_id) || { sectionId: sec.section_id, dwellMs: 0, hits: 0 };
    prev.dwellMs += sec.dwell_ms || 0;
    prev.hits += 1;
    inner.set(sec.section_id, prev);

    const g = sectionGlobal.get(sec.section_id) || { sectionId: sec.section_id, dwellMs: 0, hits: 0 };
    g.dwellMs += sec.dwell_ms || 0;
    g.hits += 1;
    sectionGlobal.set(sec.section_id, g);
  }

  const topPages = [...pageMap.values()]
    .map((p) => {
      const secs = [...(sectionByPath.get(p.path)?.values() || [])]
        .sort((a, b) => b.dwellMs - a.dwellMs)
        .slice(0, 4)
        .map((s) => ({
          sectionId: s.sectionId.startsWith("#") ? s.sectionId : `#${s.sectionId}`,
          dwellMs: s.dwellMs,
          hits: s.hits,
        }));
      return {
        path: p.path,
        pageviews: p.pageviews,
        avgDwellMs: p.dwellCount ? Math.round(p.dwellTotal / p.dwellCount) : 0,
        avgScrollDepth: p.scrollCount ? Math.round(p.scrollTotal / p.scrollCount) : 0,
        clicks: p.clicks,
        topSections: secs,
      };
    })
    .sort((a, b) => b.pageviews - a.pageviews)
    .slice(0, 15);

  const topSections = [...sectionGlobal.values()]
    .map((s) => ({
      sectionId: s.sectionId.startsWith("#") ? s.sectionId : `#${s.sectionId}`,
      dwellMs: s.dwellMs,
      hits: s.hits,
    }))
    .sort((a, b) => b.dwellMs - a.dwellMs)
    .slice(0, 8);

  const recentEvents = [...events]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 30)
    .map((e) => ({
      id: e.id,
      type: e.type,
      label: e.label || e.type,
      path: e.path || "/",
      createdAt: e.created_at,
      href: e.href || "",
    }));

  return {
    range,
    kpis: {
      uniqueVisitors,
      totalPageviews,
      avgSessionDuration,
      bounceRate,
      engagementRate,
      avgScrollDepth,
      totalClicks,
      ctaClicks,
    },
    trafficTrend,
    trafficSources,
    devices,
    scrollDistribution,
    topCtas,
    topPages,
    topSections,
    recentEvents,
  };
}

async function loadLiveVisitors() {
  const cutoff = Date.now() - 5 * 60 * 1000;
  const sessions = readStore()
    .sessions.filter((s) => s.is_active && new Date(s.last_seen_at).getTime() >= cutoff)
    .sort((a, b) => new Date(b.last_seen_at) - new Date(a.last_seen_at))
    .slice(0, 30);

  return sessions.map((s) => ({
    id: s.id,
    visitorId: s.visitor_id,
    location: `${s.city || "Unknown"}, ${s.country || "Unknown"}`,
    country: s.country || "Unknown",
    city: s.city || "Unknown",
    device: s.device || "desktop",
    currentPage: s.current_page || "/",
    lastSeenAt: s.last_seen_at,
    durationMs: s.duration_ms || 0,
    scrollDepth: s.max_scroll || 0,
    clickCount: s.click_count || 0,
    engaged: isEngaged(s),
  }));
}

router.post("/collect", async (req, res) => {
  try {
    const b = req.body || {};
    const visitorId = String(b.visitorId || "").slice(0, 80);
    if (!visitorId) return res.status(400).json({ message: "visitorId required" });

    const pathName = String(b.path || "/").slice(0, 300);
    const title = String(b.title || "").slice(0, 300);
    const referrer = String(b.referrer || "").slice(0, 500);
    const utmSource = String(b.utmSource || "").slice(0, 100);
    const utmMedium = String(b.utmMedium || "").slice(0, 100);
    const country = String(b.country || "Unknown").slice(0, 80);
    const city = String(b.city || "Unknown").slice(0, 80);
    const language = String(b.language || "en").slice(0, 20);
    const durationMs = Math.max(0, Math.min(Number(b.durationMs) || 0, 24 * 60 * 60 * 1000));
    const dwellMs = Math.max(0, Math.min(Number(b.dwellMs) || 0, 60 * 60 * 1000));
    const scrollDepth = Math.max(0, Math.min(Number(b.scrollDepth) || 0, 100));
    const clickCount = Math.max(0, Math.min(Number(b.clickCount) || 0, 100000));
    const sectionId = String(b.sectionId || "").replace(/^#/, "").slice(0, 120);
    const label = String(b.label || "").slice(0, 160);
    const href = String(b.href || "").slice(0, 400);
    const type = String(b.type || "pageview");
    if (!EVENT_TYPES.has(type)) return res.status(400).json({ message: "Unknown event type" });

    const device = detectDevice(req.headers["user-agent"] || b.userAgent || "");
    const source = detectSource(referrer, utmSource, utmMedium);
    const sessionId = b.sessionId ? String(b.sessionId).slice(0, 80) : null;
    const now = new Date().toISOString();

    if (type === "heartbeat" || type === "pageview" || type === "end") {
      const session = upsertSessionFile({
        visitorId,
        sessionId,
        path: pathName,
        source,
        referrer,
        country,
        city,
        language,
        device,
        durationMs,
        scrollDepth,
        clickCount,
        pageview: type === "pageview",
        end: type === "end",
      });

      if (type === "pageview") {
        insertPageviewFile({
          id: randomUUID(),
          visitor_id: visitorId,
          session_id: session.id,
          path: pathName,
          title,
          viewed_at: now,
          dwell_ms: 0,
          scroll_depth: 0,
        });
        insertEventFile({
          id: randomUUID(),
          visitor_id: visitorId,
          session_id: session.id,
          type: "pageview",
          label: title || pathName,
          path: pathName,
          href: "",
          scroll_depth: 0,
          created_at: now,
        });
      }

      if ((type === "dwell" || type === "heartbeat") && (dwellMs > 0 || durationMs > 0 || scrollDepth > 0)) {
        const store = readStore();
        const latest = store.pageviews.find((p) => p.session_id === session.id && p.path === pathName);
        if (latest) {
          latest.dwell_ms = Math.max(latest.dwell_ms || 0, dwellMs || 0);
          latest.scroll_depth = Math.max(latest.scroll_depth || 0, scrollDepth || 0);
          writeStore(store);
        }
      }

      return res.json({ ok: true, sessionId: session.id });
    }

    if (type === "section" && sectionId) {
      const session = upsertSessionFile({
        visitorId,
        sessionId,
        path: pathName,
        source,
        referrer,
        country,
        city,
        language,
        device,
        durationMs,
        scrollDepth,
        clickCount,
      });
      insertSectionFile({
        id: randomUUID(),
        visitor_id: visitorId,
        session_id: session.id,
        path: pathName,
        section_id: sectionId,
        dwell_ms: dwellMs,
        viewed_at: now,
      });
      return res.json({ ok: true, sessionId: session.id });
    }

    if (["click", "cta", "outbound", "scroll", "form"].includes(type)) {
      const session = upsertSessionFile({
        visitorId,
        sessionId,
        path: pathName,
        source,
        referrer,
        country,
        city,
        language,
        device,
        durationMs,
        scrollDepth,
        clickCount: type === "scroll" ? clickCount : Math.max(clickCount, 1),
      });

      insertEventFile({
        id: randomUUID(),
        visitor_id: visitorId,
        session_id: session.id,
        type,
        label: label || type,
        path: pathName,
        href,
        scroll_depth: scrollDepth,
        created_at: now,
        meta: b.meta || null,
      });

      if (type === "scroll") {
        const store = readStore();
        const latest = store.pageviews.find((p) => p.session_id === session.id && p.path === pathName);
        if (latest) {
          latest.scroll_depth = Math.max(latest.scroll_depth || 0, scrollDepth);
          writeStore(store);
        }
      }

      return res.json({ ok: true, sessionId: session.id });
    }

    if (type === "dwell") return res.json({ ok: true });

    return res.status(400).json({ message: "Unknown event type" });
  } catch (err) {
    console.error("analytics collect error:", err);
    return res.status(500).json({ message: err.message || "Failed to collect analytics" });
  }
});

router.get("/summary", requireAuth, async (req, res) => {
  try {
    const allowed = ["today", "week", "month", "year", "daily", "weekly", "monthly"];
    const range = allowed.includes(req.query.range) ? req.query.range : "week";
    const data = await loadRangeData(range);
    const summary = buildSummary(range, data);
    return res.json({ data: { ...summary, storage: data.source } });
  } catch (err) {
    console.error("analytics summary error:", err);
    return res.status(500).json({ message: err.message || "Failed to load analytics" });
  }
});

router.get("/live", requireAuth, async (req, res) => {
  try {
    const visitors = await loadLiveVisitors();
    return res.json({ data: { visitors } });
  } catch (err) {
    console.error("analytics live error:", err);
    return res.status(500).json({ message: err.message || "Failed to load live visitors" });
  }
});

export default router;

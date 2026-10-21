import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const VISITOR_KEY = "beltech_vid";
const SESSION_KEY = "beltech_sid";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
const SCROLL_MARKS = [25, 50, 75, 100] as const;

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = uid("v");
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return uid("v");
  }
}

function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = uid("s");
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return uid("s");
  }
}

function detectLocale() {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale || "";
    const region = locale.split("-")[1];
    const lang = (navigator.language || "").split("-")[0] || "en";
    return {
      country: region || "Unknown",
      city: "Unknown",
      language: lang,
    };
  } catch {
    return { country: "Unknown", city: "Unknown", language: "en" };
  }
}

function scrollPercent() {
  const el = document.documentElement;
  const body = document.body;
  const scrollTop = window.scrollY || el.scrollTop || body.scrollTop || 0;
  const height = Math.max(el.scrollHeight, body.scrollHeight) - window.innerHeight;
  if (height <= 0) return 100;
  return Math.min(100, Math.round((scrollTop / height) * 100));
}

function labelForElement(el: HTMLElement | null): string {
  if (!el) return "unknown";
  const explicit =
    el.getAttribute("data-analytics-cta") ||
    el.getAttribute("data-analytics-label") ||
    el.getAttribute("aria-label");
  if (explicit) return explicit.slice(0, 120);

  const text = (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ");
  if (text) return text.slice(0, 80);

  if (el instanceof HTMLAnchorElement && el.href) {
    try {
      return new URL(el.href).pathname.slice(0, 80) || "link";
    } catch {
      return "link";
    }
  }
  return el.tagName.toLowerCase();
}

function closestTrackable(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>(
    "a, button, [role='button'], input[type='submit'], [data-analytics-cta], [data-analytics-label]"
  );
}

function sendBeaconOrFetch(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  const url = `${API_BASE}/analytics/collect`;
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return;
    }
  } catch {
    // fall through
  }
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

/**
 * Lightweight public-site engagement tracker.
 * Tracks pageviews, dwell, sections, scroll depth, clicks/CTAs, forms, and outbound links.
 */
export default function VisitorTracker() {
  const location = useLocation();
  const sessionStartedAt = useRef(Date.now());
  const pageStartedAt = useRef(Date.now());
  const sectionTimers = useRef<Map<string, { entered: number; total: number }>>(new Map());
  const activeSections = useRef<Set<string>>(new Set());
  const scrolledMarks = useRef<Set<number>>(new Set());
  const maxScroll = useRef(0);
  const clickCount = useRef(0);
  const sessionIdRef = useRef(getSessionId());
  const visitorIdRef = useRef(getVisitorId());
  const observedNodes = useRef<WeakSet<Element>>(new WeakSet());

  useEffect(() => {
    const visitorId = visitorIdRef.current;
    const sessionId = sessionIdRef.current;
    const { country, city, language } = detectLocale();
    pageStartedAt.current = Date.now();
    sectionTimers.current = new Map();
    activeSections.current = new Set();
    scrolledMarks.current = new Set();
    maxScroll.current = 0;
    clickCount.current = 0;
    observedNodes.current = new WeakSet();

    const params = new URLSearchParams(window.location.search);
    const base = {
      visitorId,
      sessionId,
      path: location.pathname + location.search,
      title: document.title,
      referrer: document.referrer || "",
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      country,
      city,
      language,
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
    };

    sendBeaconOrFetch({ ...base, type: "pageview" });

    const flushSections = () => {
      const now = Date.now();
      for (const [sectionId, state] of sectionTimers.current.entries()) {
        let dwell = state.total;
        if (activeSections.current.has(sectionId)) {
          dwell += now - state.entered;
          state.entered = now;
          state.total = 0;
        }
        if (dwell < 800) continue;
        sendBeaconOrFetch({
          ...base,
          type: "section",
          sectionId,
          dwellMs: Math.round(dwell),
        });
        if (!activeSections.current.has(sectionId)) {
          state.total = 0;
        }
      }
    };

    const pushEngagement = (extra: Record<string, unknown> = {}) => {
      const durationMs = Date.now() - sessionStartedAt.current;
      const dwellMs = Date.now() - pageStartedAt.current;
      sendBeaconOrFetch({
        ...base,
        type: "heartbeat",
        durationMs,
        dwellMs,
        scrollDepth: maxScroll.current,
        clickCount: clickCount.current,
        ...extra,
      });
    };

    const heartbeat = () => {
      if (document.visibilityState === "hidden") return;
      flushSections();
      pushEngagement();
    };

    const interval = window.setInterval(heartbeat, 12000);

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const raw =
            el.getAttribute("data-analytics-section") ||
            el.id ||
            el.getAttribute("aria-label") ||
            "";
          if (!raw) continue;
          const sectionId = raw.replace(/^#/, "").slice(0, 120);
          if (!sectionTimers.current.has(sectionId)) {
            sectionTimers.current.set(sectionId, { entered: now, total: 0 });
          }
          const state = sectionTimers.current.get(sectionId)!;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            if (!activeSections.current.has(sectionId)) {
              activeSections.current.add(sectionId);
              state.entered = now;
            }
          } else if (activeSections.current.has(sectionId)) {
            state.total += now - state.entered;
            activeSections.current.delete(sectionId);
          }
        }
      },
      { threshold: [0.3, 0.5, 0.75] }
    );

    const watchSections = () => {
      const nodes = document.querySelectorAll<HTMLElement>(
        "section[id], [data-analytics-section], [id$='-section'], main section[id]"
      );
      nodes.forEach((node) => {
        if (!node.id && !node.getAttribute("data-analytics-section")) return;
        if (observedNodes.current.has(node)) return;
        observedNodes.current.add(node);
        observer.observe(node);
      });
    };

    watchSections();
    const mutation = new MutationObserver(() => watchSections());
    mutation.observe(document.body, { childList: true, subtree: true });

    const onScroll = () => {
      const depth = scrollPercent();
      if (depth > maxScroll.current) maxScroll.current = depth;
      for (const mark of SCROLL_MARKS) {
        if (depth >= mark && !scrolledMarks.current.has(mark)) {
          scrolledMarks.current.add(mark);
          sendBeaconOrFetch({
            ...base,
            type: "scroll",
            scrollDepth: mark,
            label: `scroll_${mark}`,
          });
        }
      }
    };

    let scrollTick = 0;
    const onScrollRaf = () => {
      if (scrollTick) return;
      scrollTick = window.requestAnimationFrame(() => {
        scrollTick = 0;
        onScroll();
      });
    };

    const onClick = (event: MouseEvent) => {
      const el = closestTrackable(event.target);
      if (!el) return;

      clickCount.current += 1;
      const label = labelForElement(el);
      const isCta = Boolean(el.getAttribute("data-analytics-cta"));
      const href =
        el instanceof HTMLAnchorElement
          ? el.href
          : el.getAttribute("href") || "";

      let outbound = false;
      if (href) {
        try {
          const url = new URL(href, window.location.origin);
          outbound = url.origin !== window.location.origin;
        } catch {
          outbound = false;
        }
      }

      sendBeaconOrFetch({
        ...base,
        type: outbound ? "outbound" : isCta ? "cta" : "click",
        label,
        href: href.slice(0, 400),
        scrollDepth: maxScroll.current,
        clickCount: clickCount.current,
        meta: {
          tag: el.tagName.toLowerCase(),
          isCta,
          outbound,
        },
      });
    };

    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      const label =
        form.getAttribute("data-analytics-form") ||
        form.getAttribute("name") ||
        form.id ||
        "form_submit";
      sendBeaconOrFetch({
        ...base,
        type: "form",
        label: String(label).slice(0, 120),
        scrollDepth: maxScroll.current,
      });
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        flushSections();
        pushEngagement();
      }
    };

    const onUnload = () => {
      flushSections();
      sendBeaconOrFetch({
        ...base,
        type: "end",
        durationMs: Date.now() - sessionStartedAt.current,
        dwellMs: Date.now() - pageStartedAt.current,
        scrollDepth: maxScroll.current,
        clickCount: clickCount.current,
      });
    };

    onScroll();
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onUnload);

    return () => {
      window.clearInterval(interval);
      if (scrollTick) window.cancelAnimationFrame(scrollTick);
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener("scroll", onScrollRaf);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onUnload);
      flushSections();
      pushEngagement();
    };
  }, [location.pathname, location.search]);

  return null;
}

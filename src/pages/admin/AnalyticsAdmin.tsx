import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Clock3,
  Eye,
  Gauge,
  MousePointerClick,
  Percent,
  RefreshCw,
  ScrollText,
  Target,
  Users,
  Share2,
  Link2,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent } from "../../components/ui/card";
import {
  fetchAnalyticsLive,
  fetchAnalyticsSummary,
  getErrorMessage,
  type AnalyticsLiveVisitor,
  type AnalyticsSummary,
  type SocialPlatformStat,
} from "../../api/client";

type Range = "today" | "week" | "month" | "year";

const PLATFORM_THEMES: Record<
  string,
  { name: string; color: string; badgeBg: string; barBg: string }
> = {
  telegram: { name: "Telegram", color: "#229ED9", badgeBg: "bg-sky-50 text-sky-700 border-sky-200", barBg: "#229ED9" },
  linkedin: { name: "LinkedIn", color: "#0A66C2", badgeBg: "bg-blue-50 text-blue-700 border-blue-200", barBg: "#0A66C2" },
  tiktok: { name: "TikTok", color: "#000000", badgeBg: "bg-neutral-100 text-neutral-900 border-neutral-300", barBg: "#111827" },
  facebook: { name: "Facebook", color: "#1877F2", badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200", barBg: "#1877F2" },
  instagram: { name: "Instagram", color: "#E4405F", badgeBg: "bg-pink-50 text-pink-700 border-pink-200", barBg: "#E4405F" },
  whatsapp: { name: "WhatsApp", color: "#25D366", badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200", barBg: "#25D366" },
  youtube: { name: "YouTube", color: "#FF0000", badgeBg: "bg-red-50 text-red-700 border-red-200", barBg: "#DC2626" },
  email: { name: "Email Newsletter", color: "#EA4335", badgeBg: "bg-amber-50 text-amber-700 border-amber-200", barBg: "#D97706" },
  twitter: { name: "X (Twitter)", color: "#0f1419", badgeBg: "bg-slate-100 text-slate-800 border-slate-300", barBg: "#334155" },
};

function PlatformIcon({ platformKey, className = "h-4 w-4" }: { platformKey: string; className?: string }) {
  const k = (platformKey || "").toLowerCase();
  if (k.includes("telegram") || k === "tg") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
      </svg>
    );
  }
  if (k.includes("linkedin") || k.includes("lnkd")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.4 9.74V9.93H5.06v8.57h2.8z"/>
      </svg>
    );
  }
  if (k.includes("tiktok") || k === "tt") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    );
  }
  if (k.includes("facebook") || k === "fb" || k === "meta") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    );
  }
  if (k.includes("instagram") || k === "ig") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    );
  }
  if (k.includes("whatsapp") || k === "wa") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24"/>
      </svg>
    );
  }
  if (k.includes("youtube") || k === "yt") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  if (k.includes("email") || k.includes("newsletter") || k.includes("signature")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    );
  }
  if (k.includes("twitter") || k === "x" || k === "x.com") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

const SOURCE_COLORS = ["#0078B7", "#10b981", "#f59e0b", "#8b5cf6"];
const DEVICE_COLORS = ["#0078B7", "#06b6d4", "#6366f1"];
const EVENT_STYLES: Record<string, string> = {
  pageview: "bg-sky-50 text-sky-700",
  cta: "bg-emerald-50 text-emerald-700",
  click: "bg-indigo-50 text-indigo-700",
  outbound: "bg-amber-50 text-amber-700",
  scroll: "bg-violet-50 text-violet-700",
  form: "bg-rose-50 text-rose-700",
  section: "bg-slate-100 text-slate-700",
};

function formatDuration(ms: number) {
  if (!ms || ms < 1000) return "0s";
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m === 0) return `${s}s`;
  if (m < 60) return `${m}m ${s}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 15_000) return "just now";
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  return new Date(iso).toLocaleTimeString();
}

function TrendChart({
  data,
}: {
  data: { label: string; visitors: number; pageviews: number; engaged?: number }[];
}) {
  const width = 640;
  const height = 260;
  const pad = { top: 16, right: 16, bottom: 36, left: 36 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const max = Math.max(
    1,
    ...data.map((d) => Math.max(d.pageviews, d.visitors, d.engaged || 0))
  );

  const pointsFor = (key: "pageviews" | "visitors" | "engaged") =>
    data.map((d, i) => {
      const x = pad.left + (data.length <= 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
      const y = pad.top + innerH - ((d[key] || 0) / max) * innerH;
      return { x, y };
    });

  const pagePts = pointsFor("pageviews");
  const visitPts = pointsFor("visitors");
  const engagedPts = pointsFor("engaged");

  const linePath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const areaPath =
    pagePts.length === 0
      ? ""
      : `${linePath(pagePts)} L${pagePts[pagePts.length - 1].x},${pad.top + innerH} L${pagePts[0].x},${pad.top + innerH} Z`;

  const yTicks = Array.from(new Set([0, 0.5, 1].map((t) => Math.round(max * t))));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" role="img">
      <defs>
        <linearGradient id="pvFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0078B7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0078B7" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {yTicks.map((tick, idx) => {
        const y = pad.top + innerH - (tick / max) * innerH;
        return (
          <g key={`tick-${tick}-${idx}`}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y}
              y2={y}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
            <text
              x={pad.left - 8}
              y={y + 4}
              textAnchor="end"
              className="fill-gray-400"
              fontSize="11"
            >
              {tick}
            </text>
          </g>
        );
      })}
      {areaPath && <path d={areaPath} fill="url(#pvFill)" />}
      {pagePts.length > 0 && (
        <path d={linePath(pagePts)} fill="none" stroke="#0078B7" strokeWidth="2.5" />
      )}
      {visitPts.length > 0 && (
        <path d={linePath(visitPts)} fill="none" stroke="#10b981" strokeWidth="2.5" />
      )}
      {engagedPts.length > 0 && (
        <path
          d={linePath(engagedPts)}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
      )}
      {data.map((d, i) => {
        const x =
          pad.left + (data.length <= 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
        const show =
          data.length <= 8 ||
          i === 0 ||
          i === data.length - 1 ||
          i % Math.ceil(data.length / 6) === 0;
        if (!show) return null;
        return (
          <text
            key={`${d.label}-${i}`}
            x={x}
            y={height - 10}
            textAnchor="middle"
            className="fill-gray-400"
            fontSize="11"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

function DonutChart({
  data,
  colors,
  centerLabel,
}: {
  data: { name: string; key: string; value: number; percent: number }[];
  colors: string[];
  centerLabel: string;
}) {
  const size = 160;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const active = data.filter((d) => d.value > 0);
  const total = active.reduce((sum, d) => sum + d.value, 0) || 1;

  let offset = 0;
  const arcs = active.map((item, i) => {
    const len = (item.value / total) * circumference;
    const arc = {
      ...item,
      dash: len,
      gap: circumference - len,
      offset,
      color: colors[i % colors.length],
    };
    offset += len;
    return arc;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-40 w-40" role="img">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth={stroke}
      />
      {arcs.map((arc) => (
        <circle
          key={arc.key}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={arc.color}
          strokeWidth={stroke}
          strokeDasharray={`${arc.dash} ${arc.gap}`}
          strokeDashoffset={-arc.offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      ))}
      <text
        x={size / 2}
        y={size / 2 - 4}
        textAnchor="middle"
        className="fill-gray-900"
        fontSize="20"
        fontWeight="700"
      >
        {total}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 14}
        textAnchor="middle"
        className="fill-gray-400"
        fontSize="11"
      >
        {centerLabel}
      </text>
    </svg>
  );
}

const RANGE_LABELS: Record<Range, string> = {
  today: "Today",
  week: "This Week",
  month: "This Month",
  year: "This Year",
};

const AnalyticsAdmin = () => {
  const [range, setRange] = useState<Range>("week");
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [live, setLive] = useState<AnalyticsLiveVisitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [showLinkBuilder, setShowLinkBuilder] = useState(false);
  const [builderPage, setBuilderPage] = useState("/");
  const [builderPlatform, setBuilderPlatform] = useState("telegram");
  const [builderCampaign, setBuilderCampaign] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const requestIdRef = useRef(0);

  const generatedTrackingUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://beltechsolutions.et";
    const path = builderPage.startsWith("/") ? builderPage : `/${builderPage}`;
    const params = new URLSearchParams();
    params.set("utm_source", builderPlatform);
    params.set("utm_medium", builderPlatform === "email" ? "newsletter" : "social");
    if (builderCampaign.trim()) {
      params.set("utm_campaign", builderCampaign.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_"));
    }
    return `${origin}${path}?${params.toString()}`;
  }, [builderPage, builderPlatform, builderCampaign]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedTrackingUrl);
    setCopiedLink(true);
    toast.success("Campaign link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const load = useCallback(async (silent = false) => {
    const requestId = ++requestIdRef.current;
    if (!silent) {
      setLoading(true);
      setSummary(null);
    } else {
      setRefreshing(true);
    }
    setError("");
    try {
      const [summaryRes, liveRes] = await Promise.all([
        fetchAnalyticsSummary(range),
        fetchAnalyticsLive(),
      ]);
      // Ignore stale responses when the filter changed mid-request
      if (requestId !== requestIdRef.current) return;
      setSummary(summaryRes);
      setLive(liveRes);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(getErrorMessage(err, "Failed to load analytics"));
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [range]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const id = window.setInterval(() => load(true), 15000);
    return () => window.clearInterval(id);
  }, [load]);

  const kpis = useMemo(() => {
    const k = summary?.kpis;
    const ready = Boolean(summary) && !loading;
    return [
      {
        title: "Unique Visitors",
        value: ready ? String(k!.uniqueVisitors) : "—",
        hint: "Distinct visitors in range",
        icon: Users,
        color: "text-[#0078B7] bg-[#0078B7]/10",
      },
      {
        title: "Pageviews",
        value: ready ? String(k!.totalPageviews) : "—",
        hint: "Total page loads",
        icon: Eye,
        color: "text-emerald-600 bg-emerald-50",
      },
      {
        title: "Engagement Rate",
        value: ready ? `${k!.engagementRate ?? 0}%` : "—",
        hint: "Scrolled, clicked, or stayed 15s+",
        icon: Target,
        color: "text-amber-600 bg-amber-50",
      },
      {
        title: "Avg Session",
        value: ready ? formatDuration(k!.avgSessionDuration) : "—",
        hint: "Average time on site",
        icon: Clock3,
        color: "text-cyan-600 bg-cyan-50",
      },
      {
        title: "Avg Scroll Depth",
        value: ready ? `${k!.avgScrollDepth ?? 0}%` : "—",
        hint: "How far visitors read",
        icon: Gauge,
        color: "text-violet-600 bg-violet-50",
      },
      {
        title: "Bounce Rate",
        value: ready ? `${k!.bounceRate}%` : "—",
        hint: "Left without engaging",
        icon: Percent,
        color: "text-rose-600 bg-rose-50",
      },
      {
        title: "Total Clicks",
        value: ready ? String(k!.totalClicks ?? 0) : "—",
        hint: "Links, buttons & CTAs",
        icon: MousePointerClick,
        color: "text-indigo-600 bg-indigo-50",
      },
      {
        title: "CTA Clicks",
        value: ready ? String(k!.ctaClicks ?? 0) : "—",
        hint: "Primary conversion actions",
        icon: ScrollText,
        color: "text-teal-600 bg-teal-50",
      },
    ];
  }, [summary, loading]);

  const sources = summary?.trafficSources || [];
  const devices = summary?.devices || [];
  const hasSourceData = sources.some((s) => s.value > 0);
  const hasDeviceData = devices.some((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="overflow-hidden rounded-2xl border border-[#0078B7]/15 bg-gradient-to-br from-[#0078B7] via-[#0a8ecf] to-[#0ea5e9] p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              Live visitor intelligence
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
            <p className="mt-1 max-w-xl text-sm text-white/85">
              Track traffic, scroll depth, section attention, CTA engagement, and live visitors
              across the BelTech website.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl bg-white/15 px-4 py-2 text-sm backdrop-blur">
              <span className="text-white/70">Active now</span>
              <div className="text-xl font-bold">{live.length}</div>
            </div>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value as Range)}
              className="rounded-xl border-0 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 outline-none shadow-sm"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button
              type="button"
              onClick={() => load(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-[#0078B7] shadow-sm hover:bg-white/90 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          Showing metrics for{" "}
          <span className="font-semibold text-gray-900">{RANGE_LABELS[range]}</span>
          {summary?.kpis ? (
            <span className="text-gray-400">
              {" "}
              · {summary.kpis.uniqueVisitors} visitors · {summary.kpis.totalPageviews}{" "}
              pageviews
            </span>
          ) : null}
        </p>
        {loading && (
          <span className="text-xs font-medium text-[#0078B7]">Updating…</span>
        )}
      </div>

      <div
        key={range}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {kpis.map((stat) => (
          <Card
            key={stat.title}
            className={`border border-gray-200/80 bg-white shadow-sm transition hover:shadow-md ${
              loading ? "opacity-60" : ""
            }`}
          >
            <CardContent className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900 tabular-nums">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{stat.hint}</p>
                </div>
                <div className={`rounded-xl p-2.5 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="border border-gray-200 bg-white shadow-sm xl:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Traffic & Engagement</h2>
                <p className="text-sm text-gray-500">Visitors, pageviews, and engaged sessions</p>
              </div>
              <Activity className="h-5 w-5 text-[#0078B7]" />
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#0078B7]" /> Pageviews
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Visitors
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Engaged
              </span>
            </div>
            <div className="h-72">
              {loading && !summary ? (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  Loading chart…
                </div>
              ) : (
                <TrendChart data={summary?.trafficTrend || []} />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Traffic Sources</h2>
            <p className="mb-4 text-sm text-gray-500">Where visitors arrived from</p>
            {!hasSourceData ? (
              <div className="flex h-56 items-center justify-center text-sm text-gray-400">
                No source data yet
              </div>
            ) : (
              <>
                <DonutChart data={sources} colors={SOURCE_COLORS} centerLabel="sessions" />
                <div className="mt-3 space-y-3">
                  {sources.map((source, i) => (
                    <div key={source.key}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">{source.name}</span>
                        <span className="text-gray-500">
                          {source.value} · {source.percent}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(source.percent, source.value ? 2 : 0)}%`,
                            backgroundColor: SOURCE_COLORS[i % SOURCE_COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dedicated Social Media & Campaign Performance Card */}
      <Card className="border border-gray-200 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-sky-50 text-[#0078B7]">
                  <Share2 className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    Social & Campaign Performance
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      UTM & Referrer Tracking
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Granular visitor breakdown by exact social network (Telegram, LinkedIn, TikTok, Facebook, etc.) and specific post campaigns.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowLinkBuilder(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0078B7] to-[#005C8A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer"
            >
              <Link2 className="h-4 w-4" />
              Create Campaign Link
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-5">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Social Sessions</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {summary?.socialBreakdown?.totalSocialSessions ?? 0}
              </p>
              <span className="text-[11px] text-gray-500">Across all channels</span>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Channels</span>
              <p className="text-2xl font-bold text-[#0078B7] mt-1">
                {summary?.socialBreakdown?.platforms?.length ?? 0}
              </p>
              <span className="text-[11px] text-gray-500">Detected platforms</span>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Top Channel</span>
              <p className="text-lg font-bold text-gray-900 mt-1 truncate">
                {summary?.socialBreakdown?.platforms?.[0]?.platform ?? "—"}
              </p>
              <span className="text-[11px] text-emerald-600 font-medium">
                {summary?.socialBreakdown?.platforms?.[0] ? `${summary.socialBreakdown.platforms[0].percent}% of social` : "No data yet"}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Top Post / Campaign</span>
              <p className="text-lg font-bold text-gray-900 mt-1 truncate">
                {summary?.socialBreakdown?.topCampaigns?.[0]?.campaign ?? "—"}
              </p>
              <span className="text-[11px] text-[#0078B7] font-medium">
                {summary?.socialBreakdown?.topCampaigns?.[0] ? `${summary.socialBreakdown.topCampaigns[0].visitors} visits` : "No campaigns yet"}
              </span>
            </div>
          </div>

          {/* Main 2-Column Content */}
          {(!summary?.socialBreakdown || summary.socialBreakdown.platforms.length === 0) ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-[#0078B7] mb-3">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">No Social or Campaign Traffic Recorded Yet</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto mt-1 mb-4">
                When visitors click links from BelTech's Telegram channel, LinkedIn, TikTok, or links with UTM tags, their exact platform and post name will be tracked here.
              </p>
              <button
                onClick={() => setShowLinkBuilder(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0078B7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005C8A] transition-colors cursor-pointer"
              >
                <Link2 className="h-4 w-4" />
                Generate Your First Tracking Link
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Left Column: Platforms & Expandable Posts */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Platforms & Content Posts
                  </h3>
                  <span className="text-xs text-gray-400">Click platform to expand posts</span>
                </div>

                {summary.socialBreakdown.platforms.map((plat: SocialPlatformStat) => {
                  const theme = PLATFORM_THEMES[plat.key.toLowerCase()] || {
                    name: plat.platform,
                    color: "#0078B7",
                    badgeBg: "bg-slate-50 text-slate-700 border-slate-200",
                    barBg: "#0078B7",
                  };
                  const isExpanded = expandedPlatform === plat.key;

                  return (
                    <div
                      key={plat.key}
                      className="rounded-xl border border-gray-200 bg-white transition-all overflow-hidden hover:border-gray-300"
                    >
                      <button
                        onClick={() => setExpandedPlatform(isExpanded ? null : plat.key)}
                        className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-50/70 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-xs"
                            style={{ backgroundColor: theme.color }}
                          >
                            <PlatformIcon platformKey={plat.key} className="h-5 w-5" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 text-base">{plat.platform}</span>
                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 font-medium">
                                {plat.posts?.length || 0} {plat.posts?.length === 1 ? "post" : "posts"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {plat.visitors} {plat.visitors === 1 ? "visitor" : "visitors"} · {plat.percent}% of social traffic
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-24 hidden sm:block">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${Math.max(plat.percent, 4)}%`, backgroundColor: theme.barBg }}
                              />
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {/* Expandable Posts Breakdown */}
                      {isExpanded && (
                        <div className="bg-gray-50/70 border-t border-gray-100 px-4 py-3">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">
                            Tracked Posts & Campaigns on {plat.platform}:
                          </p>
                          {plat.posts.length === 0 ? (
                            <p className="text-xs text-gray-400 italic">No specific post tags detected (Direct platform visits).</p>
                          ) : (
                            <div className="space-y-2">
                              {plat.posts.map((post, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-gray-200/70 text-xs shadow-2xs"
                                >
                                  <div className="flex items-center gap-2 max-w-[70%]">
                                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: theme.color }} />
                                    <span className="font-medium text-gray-900 truncate" title={post.campaign}>
                                      {post.campaign}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="font-semibold text-gray-700">
                                      {post.visitors} {post.visitors === 1 ? "visit" : "visits"}
                                    </span>
                                    <span className="text-gray-400">({post.percent}%)</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Top Campaigns Leaderboard */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-500" /> Top Content & Posts
                    </h3>
                    <span className="text-xs text-gray-500">Cross-channel</span>
                  </div>

                  {summary.socialBreakdown.topCampaigns.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                      No campaign tags used yet. Use `utm_campaign` in your links to track specific posts.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {summary.socialBreakdown.topCampaigns.map((camp, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-xl bg-white p-3 border border-gray-200 shadow-2xs hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                              #{idx + 1}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-900 truncate" title={camp.campaign}>
                                {camp.campaign}
                              </p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <PlatformIcon platformKey={camp.platform} className="h-3 w-3 text-gray-400 shrink-0" />
                                <span className="text-[11px] text-gray-500 truncate">{camp.platform}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="text-xs font-bold text-gray-900">{camp.visitors} visits</p>
                            <p className="text-[10px] text-gray-400">{camp.percent}% share</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Devices</h2>
            <p className="mb-4 text-sm text-gray-500">Desktop · Mobile · Tablet</p>
            {!hasDeviceData ? (
              <div className="py-10 text-center text-sm text-gray-400">No device data yet</div>
            ) : (
              <>
                <DonutChart data={devices} colors={DEVICE_COLORS} centerLabel="devices" />
                <div className="mt-3 space-y-2">
                  {devices.map((d, i) => (
                    <div key={d.key} className="flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-2 text-gray-700">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: DEVICE_COLORS[i % DEVICE_COLORS.length] }}
                        />
                        {d.name}
                      </span>
                      <span className="font-medium text-gray-900">
                        {d.value} · {d.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Scroll Depth</h2>
            <p className="mb-4 text-sm text-gray-500">How far visitors read on pages</p>
            <div className="space-y-3">
              {(summary?.scrollDistribution || []).length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-400">No scroll data yet</div>
              ) : (
                summary!.scrollDistribution.map((bucket) => (
                  <div key={bucket.key}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-gray-700">{bucket.label}</span>
                      <span className="text-gray-500">
                        {bucket.value} · {bucket.percent}%
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0078B7] to-[#38bdf8]"
                        style={{ width: `${Math.max(bucket.percent, bucket.value ? 3 : 0)}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Top CTAs & Clicks</h2>
            <p className="mb-4 text-sm text-gray-500">What visitors interact with most</p>
            <div className="space-y-2.5">
              {(summary?.topCtas || []).length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-400">
                  Browse the site and click CTAs to populate this list
                </div>
              ) : (
                summary!.topCtas.map((cta, i) => (
                  <div
                    key={`${cta.label}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-[#f8fafc] px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">{cta.label}</p>
                      <p className="text-xs capitalize text-gray-400">{cta.type}</p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-[#0078B7]/10 px-2.5 py-1 text-sm font-semibold text-[#0078B7]">
                      {cta.count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Card className="border border-gray-200 bg-white shadow-sm xl:col-span-3">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Pages & Sections</h2>
            <p className="mb-4 text-sm text-gray-500">
              Popularity, dwell time, scroll depth, and section attention
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="pb-3 pr-3 font-medium">Page</th>
                    <th className="pb-3 pr-3 font-medium">Views</th>
                    <th className="pb-3 pr-3 font-medium">Dwell</th>
                    <th className="pb-3 pr-3 font-medium">Scroll</th>
                    <th className="pb-3 pr-3 font-medium">Clicks</th>
                    <th className="pb-3 font-medium">Top Sections</th>
                  </tr>
                </thead>
                <tbody>
                  {(summary?.topPages || []).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">
                        {loading
                          ? "Loading…"
                          : "No page analytics yet — visit the public site to collect data."}
                      </td>
                    </tr>
                  ) : (
                    summary!.topPages.map((page) => (
                      <tr key={page.path} className="border-b border-gray-100 align-top">
                        <td className="py-3 pr-3 font-medium text-gray-900">{page.path}</td>
                        <td className="py-3 pr-3 text-gray-700">{page.pageviews}</td>
                        <td className="py-3 pr-3 text-gray-700">
                          {formatDuration(page.avgDwellMs)}
                        </td>
                        <td className="py-3 pr-3 text-gray-700">{page.avgScrollDepth ?? 0}%</td>
                        <td className="py-3 pr-3 text-gray-700">{page.clicks ?? 0}</td>
                        <td className="py-3">
                          {page.topSections.length === 0 ? (
                            <span className="text-gray-400">—</span>
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {page.topSections.map((sec) => (
                                <span
                                  key={sec.sectionId}
                                  className="inline-flex items-center rounded-md bg-[#0078B7]/10 px-2 py-0.5 text-xs font-medium text-[#0078B7]"
                                  title={`${formatDuration(sec.dwellMs)} engaged · ${sec.hits} hits`}
                                >
                                  {sec.sectionId}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {(summary?.topSections || []).length > 0 && (
              <div className="mt-6 border-t border-gray-100 pt-5">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Hottest sections site-wide
                </h3>
                <div className="flex flex-wrap gap-2">
                  {summary!.topSections.map((sec) => (
                    <span
                      key={sec.sectionId}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {sec.sectionId}
                      <span className="ml-1.5 text-gray-400">
                        {formatDuration(sec.dwellMs)}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6 xl:col-span-2">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Live Visitors</h2>
                  <p className="text-sm text-gray-500">Active in the last 5 minutes</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  {live.length} live
                </span>
              </div>
              <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
                {live.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-400">
                    No active visitors right now
                  </div>
                ) : (
                  live.map((v) => (
                    <div
                      key={v.id}
                      className="rounded-xl border border-gray-100 bg-[#f8fafc] px-3 py-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{v.location}</p>
                          <p className="mt-0.5 text-xs capitalize text-gray-500">
                            {v.device}
                            {v.engaged ? " · engaged" : ""}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-gray-400">
                          {relativeTime(v.lastSeenAt)}
                        </span>
                      </div>
                      <p className="mt-2 truncate text-sm text-[#0078B7]">{v.currentPage}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-gray-500">
                        <span className="rounded bg-white px-1.5 py-0.5">
                          {formatDuration(v.durationMs || 0)}
                        </span>
                        <span className="rounded bg-white px-1.5 py-0.5">
                          scroll {v.scrollDepth ?? 0}%
                        </span>
                        <span className="rounded bg-white px-1.5 py-0.5">
                          {v.clickCount ?? 0} clicks
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Engagement</h2>
              <p className="mb-4 text-sm text-gray-500">Latest clicks, CTAs, scrolls & forms</p>
              <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                {(summary?.recentEvents || []).length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-400">
                    Engagement events will appear here as visitors interact
                  </div>
                ) : (
                  summary!.recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 rounded-lg border border-gray-50 px-2 py-2"
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          EVENT_STYLES[event.type] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {event.type}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">{event.label}</p>
                        <p className="truncate text-xs text-gray-400">
                          {event.path} · {relativeTime(event.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Campaign Link Builder Modal */}
      {showLinkBuilder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowLinkBuilder(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#0078B7]">
                <Link2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Campaign Link Builder</h3>
                <p className="text-xs text-gray-500">Generate trackable URLs for BelTech social channels</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Destination Page */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  1. Destination Page
                </label>
                <select
                  value={builderPage}
                  onChange={(e) => setBuilderPage(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#0078B7] focus:ring-1 focus:ring-[#0078B7] outline-none"
                >
                  <option value="/">Homepage (/)</option>
                  <option value="/products/ethiopian-hrms">Ethiopian HRMS Product</option>
                  <option value="/products/retail-automation">Retail Automation ERP</option>
                  <option value="/projects">All Projects / Solutions</option>
                  <option value="/projects/diligent-trade">Diligent Trade Case Study</option>
                  <option value="/projects/skillbridge">SkillBridge Case Study</option>
                  <option value="/projects/eyoha-digitals">Eyoha Digitals Case Study</option>
                  <option value="/services">Services & Implementation</option>
                  <option value="/blog">Blog & Insights</option>
                  <option value="/contact">Contact & Book Demo</option>
                </select>
              </div>

              {/* Marketing Platform */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  2. Social Media / Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "telegram", label: "Telegram" },
                    { id: "linkedin", label: "LinkedIn" },
                    { id: "tiktok", label: "TikTok" },
                    { id: "facebook", label: "Facebook" },
                    { id: "instagram", label: "Instagram" },
                    { id: "whatsapp", label: "WhatsApp" },
                    { id: "youtube", label: "YouTube" },
                    { id: "email", label: "Email" },
                    { id: "twitter", label: "X / Twitter" },
                  ].map((p) => {
                    const isSelected = builderPlatform === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setBuilderPlatform(p.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#0078B7] bg-sky-50/80 text-[#0078B7] shadow-xs"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <PlatformIcon platformKey={p.id} className="h-4 w-4 shrink-0" />
                        <span className="truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Post / Campaign Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  3. Post / Campaign Name (Optional)
                </label>
                <input
                  type="text"
                  value={builderCampaign}
                  onChange={(e) => setBuilderCampaign(e.target.value)}
                  placeholder="e.g. hrms_launch, founder_post_1, bio_link"
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#0078B7] focus:ring-1 focus:ring-[#0078B7] outline-none"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Tip: Use names like <code className="text-gray-600 bg-gray-100 px-1 py-0.5 rounded">telegram_channel_hrms</code> or <code className="text-gray-600 bg-gray-100 px-1 py-0.5 rounded">tiktok_bio</code> to recognize the exact post.
                </p>
              </div>

              {/* Generated Link Box */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Generated Tracking URL
                </label>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 font-mono text-xs break-all text-gray-800">
                  {generatedTrackingUrl}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <a
                  href={generatedTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0078B7] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Test Link in New Tab
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLinkBuilder(false)}
                    className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0078B7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#005C8A] transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedLink ? "Copied!" : "Copy Tracking Link"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsAdmin;

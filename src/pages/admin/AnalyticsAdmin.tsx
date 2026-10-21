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
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import {
  fetchAnalyticsLive,
  fetchAnalyticsSummary,
  getErrorMessage,
  type AnalyticsLiveVisitor,
  type AnalyticsSummary,
} from "../../api/client";

type Range = "today" | "week" | "month" | "year";

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

  const yTicks = [0, 0.5, 1].map((t) => Math.round(max * t));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" role="img">
      <defs>
        <linearGradient id="pvFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0078B7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0078B7" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {yTicks.map((tick) => {
        const y = pad.top + innerH - (tick / max) * innerH;
        return (
          <g key={tick}>
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
  const requestIdRef = useRef(0);

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
    </div>
  );
};

export default AnalyticsAdmin;

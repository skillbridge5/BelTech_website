/** Optional GA4 loader. Set VITE_GA4_ID in .env to enable measurement. */
export function initAnalytics() {
  const id = (import.meta.env.VITE_GA4_ID as string | undefined)?.trim();
  if (!id || typeof document === "undefined") return;
  if (document.getElementById("ga4-script")) return;

  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(["js", new Date()]);
  w.dataLayer.push(["config", id, { anonymize_ip: true }]);

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

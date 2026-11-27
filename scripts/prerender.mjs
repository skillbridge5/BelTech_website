/**
 * Post-build prerender for the BelTech Vite SPA.
 *
 * Vite ships a single index.html whose head and body are identical for every
 * route. Search engines and social crawlers therefore see the same title,
 * canonical and empty body on all URLs. This script writes one static HTML
 * file per indexable route after `vite build`, with:
 *   - unique title, description, canonical, robots, OG/Twitter tags
 *   - a single JSON-LD graph (no duplicate static + client blocks)
 *   - real, crawlable body copy inside #root (React replaces it on hydration)
 *
 * Run automatically as part of `npm run build`.
 */
import "dotenv/config";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(
  readFileSync(join(root, "scripts", "seo-content.json"), "utf8"),
);
const siteUrl = (process.env.VITE_SITE_URL || data.siteUrl).replace(/\/$/, "");
const templatePath = join(root, "dist", "index.html");

if (!existsSync(templatePath)) {
  console.error("[prerender] dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}
const template = readFileSync(templatePath, "utf8");

const esc = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const absolute = (path) =>
  !path || path === "/" ? siteUrl : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

const labelFor = (segment) =>
  ({
    "": "Home",
    about: "About",
    services: "Services",
    solutions: "Projects",
    industries: "Industries",
    blog: "Blog",
    contact: "Contact",
    projects: "Projects",
    products: "Products",
    "diligent-trade": "Diligent Trade",
    skillbridge: "SkillBridge",
    "eyoha-digitals": "Eyoha Digitals",
    "ethiopian-hrms": "Ethiopian HRMS",
    carecentral: "CareCentral",
    school360: "School360",
    "insight-erp-ethiopia": "ERP in Ethiopia",
    "odoo-vs-erpnext-ethiopian-companies": "Odoo vs ERPNext",
    "automate-ethiopian-payroll-pension-odoo": "Payroll Automation",
    "biometric-attendance-zkteco-ethiopia": "ZKTeco Attendance",
  })[segment] || segment.replace(/-/g, " ");

function breadcrumbs(path) {
  const parts = path.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }];
  let cumulative = "";
  parts.forEach((part, index) => {
    cumulative += `/${part}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: labelFor(part),
      item: absolute(cumulative),
    });
  });
  return { "@type": "BreadcrumbList", itemListElement: items };
}

function jsonLd(path, route) {
  const o = data.organization;
  const graph = [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: o.name,
      legalName: o.legalName,
      url: o.url,
      logo: o.logo,
      image: o.image,
      email: o.email,
      telephone: o.telephone,
      address: { "@type": "PostalAddress", ...o.address },
      geo: { "@type": "GeoCoordinates", ...o.geo },
      sameAs: o.sameAs,
      areaServed: ["Addis Ababa", "Ethiopia", "East Africa"].map((name) => ({
        "@type": "Place",
        name,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: o.name,
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${absolute(path)}#webpage`,
      url: absolute(path),
      name: route.title,
      description: route.description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${absolute(path)}#breadcrumb` },
    },
    { "@id": `${absolute(path)}#breadcrumb`, ...breadcrumbs(path) },
  ];

  if (route.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${absolute(path)}#faq`,
      mainEntity: route.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  if (route.type === "product") {
    graph.push({
      "@type": "SoftwareApplication",
      name: route.h1,
      description: route.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absolute(path),
      provider: { "@id": `${siteUrl}/#organization` },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/contact`,
      },
    });
  }

  if (path === "/services") {
    graph.push({
      "@type": "ItemList",
      name: "BelTech Solutions ERP services",
      itemListElement: [
        "ERP Implementation",
        "Odoo and ERPNext Consulting",
        "Corporate ERP Training",
        "Business Automation & Integration",
        "Custom Software Development",
      ].map((name, index) => ({
        "@type": "Service",
        position: index + 1,
        name,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: "Ethiopia",
        url: `${siteUrl}/services`,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function bodyHtml(route) {
  const sections = (route.sections || [])
    .map((section) => {
      const paragraphs = (section.paragraphs || [])
        .map((p) => `<p>${esc(p)}</p>`)
        .join("");
      const bullets = section.bullets?.length
        ? `<ul>${section.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
        : "";
      return `<section><h2>${esc(section.h2)}</h2>${paragraphs}${bullets}</section>`;
    })
    .join("");

  const faq = route.faq?.length
    ? `<section><h2>Frequently asked questions</h2>${route.faq
        .map(
          (item) =>
            `<h3>${esc(item.q)}</h3><p>${esc(item.a)}</p>`,
        )
        .join("")}</section>`
    : "";

  return `<div id="root"><main class="seo-static" style="max-width:960px;margin:0 auto;padding:110px 20px 60px;font-family:Arial,sans-serif;color:#1f2937;line-height:1.7">
<h1>${esc(route.h1)}</h1>
<p style="font-size:1.1rem;color:#374151">${esc(route.lead)}</p>
<p><a href="/services">ERP implementation services</a> · <a href="/contact">Request a quotation</a></p>
${sections}${faq}
<section><h2>Work with BelTech Solutions</h2><p>Based in Bole Sub-City, Addis Ababa. Call +251 955 935 455 or email beltechsolns@gmail.com to discuss ERP implementation, training or custom software.</p></section>
</main></div>`;
}

function replaceOnce(source, pattern, replacement, label) {
  if (!pattern.test(source)) {
    console.warn(`[prerender] ${label} not found in template; skipped.`);
    return source;
  }
  return source.replace(pattern, replacement);
}

function buildHtml(path, route) {
  let html = template;
  const canonical = absolute(path);
  const image = `${siteUrl}/og-default.jpg`;
  const verification = process.env.VITE_GSC_VERIFICATION
    ? `<meta name="google-site-verification" content="${esc(process.env.VITE_GSC_VERIFICATION)}" />`
    : "";

  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, "title");
  html = replaceOnce(html, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(route.description)}" />`, "description");
  html = replaceOnce(html, /<meta\s+name="robots"[\s\S]*?\/>/, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`, "robots");
  html = replaceOnce(html, /<link\s+rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${canonical}" />`, "canonical");
  html = replaceOnce(html, /<meta\s+property="og:type"[\s\S]*?\/>/, `<meta property="og:type" content="${esc(route.type || "website")}" />`, "og:type");
  html = replaceOnce(html, /<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${esc(route.title)}" />`, "og:title");
  html = replaceOnce(html, /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${esc(route.description)}" />`, "og:description");
  html = replaceOnce(html, /<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${canonical}" />`, "og:url");
  html = replaceOnce(html, /<meta\s+property="og:image"[\s\S]*?\/>/, `<meta property="og:image" content="${image}" />`, "og:image");
  html = replaceOnce(html, /<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${esc(route.title)}" />`, "twitter:title");
  html = replaceOnce(html, /<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${esc(route.description)}" />`, "twitter:description");
  html = replaceOnce(html, /<meta\s+name="twitter:image"[\s\S]*?\/>/, `<meta name="twitter:image" content="${image}" />`, "twitter:image");
  html = replaceOnce(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" data-beltech-jsonld="true">${JSON.stringify(jsonLd(path, route)).replace(/</g, "\\u003c")}</script>`,
    "JSON-LD",
  );
  html = replaceOnce(html, /<div id="root"><\/div>/, bodyHtml(route), "#root");

  if (verification) {
    html = html.replace(/(<meta charset="UTF-8" \/>)/, `$1\n    ${verification}`);
  }
  return html;
}

let count = 0;
for (const [path, route] of Object.entries(data.routes)) {
  const outputDir = path === "/" ? join(root, "dist") : join(root, "dist", path.replace(/^\//, ""));
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "index.html"), buildHtml(path, route), "utf8");
  count += 1;
}
console.log(`[prerender] wrote ${count} static route HTML files to dist/`);

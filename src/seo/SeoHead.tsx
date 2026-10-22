import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "./config";
import { buildJsonLdGraph } from "./structuredData";
import { CANONICAL_ALIASES, resolvePageSeo } from "./pages";

const META_ATTR = "data-beltech-seo";
const LD_ATTR = "data-beltech-jsonld";

function upsertMeta(
  selector: { name?: string; property?: string },
  content: string
) {
  const attr = selector.name
    ? `meta[name="${selector.name}"]`
    : `meta[property="${selector.property}"]`;
  let el = document.head.querySelector(attr) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    if (selector.name) el.setAttribute("name", selector.name);
    if (selector.property) el.setAttribute("property", selector.property);
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(data: object) {
  let el = document.head.querySelector(
    `script[${LD_ATTR}]`
  ) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute(LD_ATTR, "true");
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

type SeoHeadProps = {
  pathname: string;
};

/**
 * Client-side head manager for the Vite SPA.
 * Google executes JS; this keeps title/description/canonical/OG unique per route.
 * Pair with static robots.txt, sitemap.xml, and solid index.html defaults.
 */
export default function SeoHead({ pathname }: SeoHeadProps) {
  useEffect(() => {
    const page = resolvePageSeo(pathname);
    const canonicalPath =
      CANONICAL_ALIASES[pathname] || page.path || pathname || "/";
    const canonical = absoluteUrl(canonicalPath);
    const image = page.image ? absoluteUrl(page.image) : DEFAULT_OG_IMAGE;
    const robots = page.noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = page.title;

    upsertMeta({ name: "description" }, page.description);
    upsertMeta({ name: "robots" }, robots);
    upsertMeta({ name: "googlebot" }, robots);
    upsertMeta({ name: "author" }, SITE_NAME);
    if (page.keywords?.length) {
      upsertMeta({ name: "keywords" }, page.keywords.join(", "));
    }

    upsertLink("canonical", canonical);

    upsertMeta(
      { property: "og:type" },
      page.type === "article" ? "article" : "website"
    );
    upsertMeta({ property: "og:site_name" }, SITE_NAME);
    upsertMeta(
      { property: "og:locale" },
      SITE_LOCALE === "en" ? "en_US" : SITE_LOCALE
    );
    upsertMeta({ property: "og:title" }, page.title);
    upsertMeta({ property: "og:description" }, page.description);
    upsertMeta({ property: "og:url" }, canonical);
    upsertMeta({ property: "og:image" }, image);

    upsertMeta({ name: "twitter:card" }, "summary_large_image");
    upsertMeta({ name: "twitter:title" }, page.title);
    upsertMeta({ name: "twitter:description" }, page.description);
    upsertMeta({ name: "twitter:image" }, image);

    upsertJsonLd(
      buildJsonLdGraph(canonicalPath, { ...page, path: canonicalPath })
    );

    document.documentElement.lang = SITE_LOCALE;
  }, [pathname]);

  return null;
}

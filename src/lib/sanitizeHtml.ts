import { resolveImageUrl } from "./image";

/**
 * Checks whether a given string appears to contain HTML tags.
 */
export const isHtmlContent = (content?: string): boolean => {
  if (!content || typeof content !== "string") return false;
  return /<(p|h[1-6]|div|span|ul|ol|li|blockquote|img|table|pre|code|figure|hr|br|strong|b|em|i|u|s)[\s>/]/i.test(
    content
  );
};

/**
 * Strips dangerous HTML tags and attributes using browser DOMParser,
 * resolves image URLs, and enforces safe attributes (e.g. target="_blank" on links).
 */
export const sanitizeBlogHtml = (rawHtml?: string): string => {
  if (!rawHtml || typeof rawHtml !== "string") return "";
  if (typeof window === "undefined" || !window.DOMParser) {
    return rawHtml;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    // Remove dangerous tags
    const dangerousTags = [
      "script",
      "style",
      "iframe",
      "object",
      "embed",
      "applet",
      "meta",
      "link",
      "form",
      "input",
      "button",
      "svg",
    ];

    dangerousTags.forEach((tag) => {
      const elements = doc.querySelectorAll(tag);
      elements.forEach((el) => el.remove());
    });

    // Walk all elements and strip inline event handlers or javascript: URIs
    const allElements = doc.body.querySelectorAll("*");
    allElements.forEach((el) => {
      // Remove inline event listeners like onclick, onerror, onload
      const attrNames = Array.from(el.attributes).map((attr) => attr.name);
      for (const attr of attrNames) {
        if (/^on/i.test(attr)) {
          el.removeAttribute(attr);
        }
      }

      // Check href on links
      if (el.tagName.toLowerCase() === "a") {
        const href = el.getAttribute("href") || "";
        if (/^\s*javascript:/i.test(href)) {
          el.removeAttribute("href");
        } else {
          // Open external or anchor links safely
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener noreferrer");
        }
      }

      // Check and resolve src on images
      if (el.tagName.toLowerCase() === "img") {
        const src = el.getAttribute("src") || "";
        if (/^\s*javascript:/i.test(src)) {
          el.removeAttribute("src");
        } else if (src) {
          el.setAttribute("src", resolveImageUrl(src));
          el.setAttribute("loading", "lazy");
        }
      }
    });

    return doc.body.innerHTML;
  } catch (err) {
    console.error("Failed to sanitize blog HTML:", err);
    return rawHtml;
  }
};

/**
 * Calculates estimated reading time in minutes from text/HTML.
 */
export const calculateReadingTime = (content: string): number => {
  if (!content) return 1;
  const text = content.replace(/<[^>]*>/g, " ").trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes);
};


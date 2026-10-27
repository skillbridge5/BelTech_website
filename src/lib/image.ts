/**
 * Helper to ensure image URLs resolve correctly across environments.
 * Handles full URLs (http, https, data:), relative backend uploads (/uploads/...),
 * and public assets (/assets/...).
 */
export const resolveImageUrl = (url?: string, fallback = "/assets/new-logo-free.png"): string => {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Data URLs or already complete external URLs
  if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }

  // Handle localhost:4000 or absolute URLs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Ensure leading slash for relative assets or uploads
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
};

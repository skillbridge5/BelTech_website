/**
 * Helper to ensure image URLs resolve correctly across environments.
 * Handles full URLs (http, https, data:), relative backend uploads (/uploads/...),
 * and public assets (/assets/...).
 */
const getBackendBase = (): string => {
  const apiBase = import.meta.env.VITE_API_BASE;
  if (!apiBase || typeof apiBase !== "string") return "";
  try {
    if (apiBase.startsWith("http://") || apiBase.startsWith("https://")) {
      const url = new URL(apiBase);
      return `${url.protocol}//${url.host}`;
    }
  } catch {
    // fallback
  }
  return "";
};

export const resolveImageUrl = (url?: string, fallback = "/assets/new-logo-free.png"): string => {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Data URLs or already complete external URLs
  if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }

  // Handle absolute URLs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Handle uploads from backend
  if (trimmed.startsWith("/uploads/") || trimmed.startsWith("uploads/")) {
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    const backendOrigin = getBackendBase();
    if (backendOrigin) {
      return `${backendOrigin}${cleanPath}`;
    }
    return cleanPath;
  }

  // Ensure leading slash for relative assets
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
};


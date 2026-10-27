import api from "./axios";

export type ContactPayload = {
  name: string;
  lastName?: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
};

export interface Solution {
  _id: string;
  id?: string;
  title: string;
  description: string;
  detail: string;
  situation?: string;
  built?: string;
  impact?: string;
  imageUrl: string;
  link: string;
  priority: number;
  createdAt?: string;
}

export interface Insight {
  _id: string;
  id?: string;
  title: string;
  description: string;
  detail: string;
  date: string;
  imageUrl: string;
  createdAt?: string;
}

type SolutionPayload = Omit<Solution, "_id" | "id" | "createdAt">;
type InsightPayload = Omit<Insight, "_id" | "id" | "createdAt">;

export interface Testimonial {
  _id: string;
  id?: string;
  name: string;
  testimonial: string;
  imageUrl: string;
  priority: number;
  createdAt?: string;
}

export interface Product {
  _id: string;
  id?: string;
  title: string;
  description: string;
  kicker?: string;
  detail?: string;
  modules?: string;
  imageUrl: string;
  link: string;
  priority: number;
  createdAt?: string;
}

// Helper to remove undefined/empty values
const cleanPayload = (payload: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== undefined && v !== "")
  );
};

// Helper to extract a readable error message from an unknown error
export const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === "object" && "response" in err) {
    const response = (err as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return fallback;
};

// ===== Auth =====
export const adminLogin = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const updateAdminAccount = (payload: {
  currentPassword: string;
  email?: string;
  password?: string;
}) => api.put("/auth/account", payload);

// ===== Upload =====
export const uploadImage = async (file: File): Promise<string> => {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
  const res = await api.post("/upload", { fileName: file.name, dataUrl });
  return res.data.data.url;
};

// ===== Contact =====
// Submit a contact message
export const submitContact = (payload: ContactPayload) => {
  const cleaned = cleanPayload(payload);
  return api.post("/contact", cleaned, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Admin endpoints
export const fetchContacts = (page = 1, limit = 10) =>
  api.get(`/contact?page=${page}&limit=${limit}`);

export const fetchContact = (id: string) => api.get(`/contact/${id}`);

export const updateContactStatus = (
  id: string,
  status: "new" | "read" | "replied"
) => api.patch(`/contact/${id}/status`, { status });

export const deleteContact = (id: string) => api.delete(`/contact/${id}`);

// ===== Insights (public) =====
export const loadInsights = async () => {
  try {
    const res = await api.get("/insights");
    return res.data.data.insights;
  } catch (err) {
    console.error("Failed to fetch insights", err);
    return [];
  }
};

// ===== Solutions =====
export const getSolutions = async (): Promise<Solution[]> => {
  const res = await api.get("/solutions");
  const data = res.data;
  return (data?.data?.solutions || data?.solutions || data?.data || data) ?? [];
};

export const createSolution = (payload: SolutionPayload) =>
  api.post("/solutions", payload);

export const updateSolution = (id: string, payload: SolutionPayload) =>
  api.put(`/solutions/${id}`, payload);

export const deleteSolution = (id: string) => api.delete(`/solutions/${id}`);

// ===== Insights (admin) =====
export const createInsight = (payload: InsightPayload) =>
  api.post("/insights", payload);

export const updateInsight = (id: string, payload: InsightPayload) =>
  api.put(`/insights/${id}`, payload);

export const deleteInsight = (id: string) => api.delete(`/insights/${id}`);

// ===== Testimonials =====
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const res = await api.get("/testimonials");
  const data = res.data;
  return (
    data?.data?.testimonials ||
    data?.testimonials ||
    data?.data ||
    []
  );
};

export const createTestimonial = (payload: {
  name: string;
  testimonial: string;
  imageUrl: string;
  priority: number;
}) => api.post("/testimonials", payload);

export const updateTestimonial = (
  id: string,
  payload: {
    name: string;
    testimonial: string;
    imageUrl: string;
    priority: number;
  }
) => api.put(`/testimonials/${id}`, payload);

export const deleteTestimonial = (id: string) =>
  api.delete(`/testimonials/${id}`);

// ===== Products =====
export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  const data = res.data;
  return (
    data?.data?.products || data?.products || data?.data || (Array.isArray(data) ? data : [])
  );
};

export type ProductPayload = Omit<Product, "_id" | "id" | "createdAt">;

export const createProduct = (payload: ProductPayload) =>
  api.post("/products", payload);

export const updateProduct = (id: string, payload: ProductPayload) =>
  api.put(`/products/${id}`, payload);

export const deleteProduct = (id: string) => api.delete(`/products/${id}`);

// ===== Analytics =====
export type AnalyticsRange = "today" | "week" | "month" | "year";

export interface SocialPostStat {
  campaign: string;
  visitors: number;
  percent: number;
}

export interface SocialPlatformStat {
  platform: string;
  key: string;
  visitors: number;
  percent: number;
  posts: SocialPostStat[];
}

export interface SocialBreakdown {
  totalSocialSessions: number;
  platforms: SocialPlatformStat[];
  topCampaigns: {
    campaign: string;
    platform: string;
    visitors: number;
    percent: number;
  }[];
}

export interface AnalyticsSummary {
  range: AnalyticsRange;
  storage?: string;
  kpis: {
    uniqueVisitors: number;
    totalPageviews: number;
    avgSessionDuration: number;
    bounceRate: number;
    engagementRate: number;
    avgScrollDepth: number;
    totalClicks: number;
    ctaClicks: number;
  };
  trafficTrend: {
    label: string;
    visitors: number;
    pageviews: number;
    engaged?: number;
  }[];
  trafficSources: {
    name: string;
    key: string;
    value: number;
    percent: number;
  }[];
  socialBreakdown?: SocialBreakdown;
  devices: {
    name: string;
    key: string;
    value: number;
    percent: number;
  }[];
  scrollDistribution: {
    key: string;
    label: string;
    value: number;
    percent: number;
  }[];
  topCtas: {
    label: string;
    count: number;
    type: string;
    path?: string;
  }[];
  topPages: {
    path: string;
    pageviews: number;
    avgDwellMs: number;
    avgScrollDepth?: number;
    clicks?: number;
    topSections: { sectionId: string; dwellMs: number; hits: number }[];
  }[];
  topSections: {
    sectionId: string;
    dwellMs: number;
    hits: number;
  }[];
  recentEvents: {
    id: string;
    type: string;
    label: string;
    path: string;
    createdAt: string;
    href?: string;
  }[];
}

export interface AnalyticsLiveVisitor {
  id: string;
  visitorId: string;
  location: string;
  country: string;
  city: string;
  device: string;
  currentPage: string;
  lastSeenAt: string;
  durationMs?: number;
  scrollDepth?: number;
  clickCount?: number;
  engaged?: boolean;
}

export const fetchAnalyticsSummary = async (
  range: AnalyticsRange = "week"
): Promise<AnalyticsSummary> => {
  const res = await api.get(`/analytics/summary?range=${range}`);
  return res.data?.data || res.data;
};

export const fetchAnalyticsLive = async (): Promise<AnalyticsLiveVisitor[]> => {
  const res = await api.get("/analytics/live");
  return res.data?.data?.visitors || res.data?.visitors || [];
};

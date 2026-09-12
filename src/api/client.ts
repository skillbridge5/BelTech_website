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
  title: string;
  description: string;
  detail: string;
  imageUrl: string;
  link: string;
  priority: number;
  createdAt?: string;
}

export interface Insight {
  _id: string;
  title: string;
  description: string;
  detail: string;
  date: string;
  imageUrl: string;
  createdAt?: string;
}

type SolutionPayload = Omit<Solution, "_id" | "createdAt">;
type InsightPayload = Omit<Insight, "_id" | "createdAt">;

export interface Testimonial {
  _id: string;
  name: string;
  testimonial: string;
  imageUrl: string;
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

import api from "./axios";

export type ContactPayload = {
  name: string;
  lastName?: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
};

// Helper to remove undefined values
const cleanPayload = (payload: ContactPayload) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== undefined && v !== "")
  );
};

// Submit a contact message
export const submitContact = (payload: ContactPayload) => {
  const cleaned = cleanPayload(payload);
  return api.post("/contact", cleaned, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Optional: Admin endpoints
export const fetchContacts = (page = 1, limit = 10) =>
  api.get(`/contact?page=${page}&limit=${limit}`);

export const fetchContact = (id: string) => api.get(`/contact/${id}`);

export const updateContactStatus = (
  id: string,
  status: "new" | "read" | "replied"
) => api.patch(`/contact/${id}/status`, { status });

// Fetch insights
export const loadInsights = async () => {
  try {
    const res = await api.get("/insights");
    // Extract the actual array
    return res.data.data.insights;
  } catch (err) {
    console.error("Failed to fetch insights", err);
    return [];
  }
};

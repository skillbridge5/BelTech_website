import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const TOKEN_KEY = "beltech_admin_token";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = String(error?.response?.data?.message || "");
    const url = String(error?.config?.url || "");
    const isLoginRequest = url.includes("/auth/login");

    // Stale/expired JWT: clear session and send admin back to login.
    if (
      status === 401 &&
      !isLoginRequest &&
      (message.includes("Invalid or expired token") ||
        message.includes("Authentication required"))
    ) {
      localStorage.removeItem(TOKEN_KEY);
      if (
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin") &&
        !window.location.pathname.startsWith("/admin/login")
      ) {
        window.location.assign("/admin/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;

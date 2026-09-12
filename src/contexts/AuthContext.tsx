import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { adminLogin } from "../api/client";
import { AuthContext } from "./auth-context";

const TOKEN_KEY = "beltech_admin_token";

const decodeEmail = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return json?.email || null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_KEY)
  );
  const [email, setEmail] = useState<string | null>(() =>
    decodeEmail(localStorage.getItem(TOKEN_KEY))
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem(TOKEN_KEY)
  );

  useEffect(() => {
    setIsAuthenticated(!!token);
    setEmail(decodeEmail(token));
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await adminLogin(email, password);
    const authToken = res.data?.token || res.data?.data?.token;
    if (authToken) {
      localStorage.setItem(TOKEN_KEY, authToken);
      setToken(authToken);
      return;
    }
    throw new Error("No token returned from server");
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setEmail(null);
  };

  const setSession = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setEmail(decodeEmail(newToken));
  };

  return (
    <AuthContext.Provider
      value={{ token, email, isAuthenticated, login, logout, setSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

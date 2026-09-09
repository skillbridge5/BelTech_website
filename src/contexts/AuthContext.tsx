import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { adminLogin } from "../api/client";
import { AuthContext } from "./auth-context";

const TOKEN_KEY = "beltech_admin_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_KEY)
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem(TOKEN_KEY)
  );

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await adminLogin(email, password);
    const authToken = res.data?.token || res.data?.data?.token;
    if (!authToken) {
      throw new Error("No token returned from server");
    }
    localStorage.setItem(TOKEN_KEY, authToken);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

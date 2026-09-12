import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setSession: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

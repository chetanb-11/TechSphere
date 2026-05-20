import { create } from "zustand";

interface AuthUser {
  email: string;
  userId?: string;
  role?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
  clearError: () => void;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("techsphere_user") || "null"),
  isAuthenticated: !!localStorage.getItem("techsphere_user"),
  isLoading: false,
  error: null,

  signin: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ error: data.message || "Invalid email or password", isLoading: false });
        return false;
      }
      const user: AuthUser = { email };
      localStorage.setItem("techsphere_user", JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err: any) {
      set({ error: err.message || "Network error. Please try again.", isLoading: false });
      return false;
    }
  },

  signup: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ error: data.message || "Signup failed", isLoading: false });
        return false;
      }
      const user: AuthUser = { email, userId: data.userId };
      localStorage.setItem("techsphere_user", JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err: any) {
      set({ error: err.message || "Network error. Please try again.", isLoading: false });
      return false;
    }
  },

  signout: () => {
    localStorage.removeItem("techsphere_user");
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));

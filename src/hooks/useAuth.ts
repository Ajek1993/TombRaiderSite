"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "adminToken";
const API_LOGIN = "/api/auth/login";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface UseAuthReturn extends AuthState {
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  getAuthHeaders: () => Record<string, string>;
  clearError: () => void;
}

/**
 * Hook for managing admin authentication
 * Handles JWT token storage, login, logout, and auth headers
 */
export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEY);
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  /**
   * Login with password
   * Returns true if login was successful
   */
  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem(STORAGE_KEY, data.token);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(data.message || "Nieprawidłowe hasło");
        return false;
      }
    } catch (err) {
      console.error("[useAuth] Login error:", err);
      setError("Błąd logowania. Spróbuj ponownie.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout and clear token
   */
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  /**
   * Get headers with auth token for API requests
   */
  const getAuthHeaders = useCallback((): Record<string, string> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }, [token]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAuthenticated,
    token,
    loading,
    error,
    login,
    logout,
    getAuthHeaders,
    clearError,
  };
}

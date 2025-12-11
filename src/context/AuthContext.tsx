"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAuth, UseAuthReturn } from "@/hooks/useAuth";

const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider component
 * Wraps application to provide authentication state
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const authState = useAuth();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 * Must be used within AuthProvider
 */
export function useAuthContext(): UseAuthReturn {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}

/**
 * Optional hook that returns null if not within provider
 * Useful for components that may be used outside auth context
 */
export function useOptionalAuthContext(): UseAuthReturn | null {
  return useContext(AuthContext) ?? null;
}

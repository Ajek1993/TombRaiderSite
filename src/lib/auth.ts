/**
 * JWT Token Verification Utilities
 * Verifies JWT token from Authorization header
 */

import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export interface DecodedToken {
  admin: boolean;
  timestamp: number;
  iat: number;
  exp: number;
}

/**
 * Verify JWT token from request headers
 */
export async function verifyToken(): Promise<DecodedToken | null> {
  try {
    const headersList = await headers();
    const authHeader =
      headersList.get("authorization") || headersList.get("Authorization");

    if (!authHeader) {
      return null;
    }

    // Extract token (format: "Bearer TOKEN")
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return null;
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      console.error("[Auth] JWT_SECRET not configured");
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error(
      "[Auth] Token verification failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return null;
  }
}

/**
 * Verify JWT token from a provided auth header string
 */
export function verifyTokenFromHeader(
  authHeader: string | null
): DecodedToken | null {
  try {
    if (!authHeader) {
      return null;
    }

    // Extract token (format: "Bearer TOKEN")
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return null;
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      console.error("[Auth] JWT_SECRET not configured");
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error(
      "[Auth] Token verification failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return null;
  }
}

/**
 * Generate JWT token for admin
 */
export function generateToken(): string {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }

  const token = jwt.sign(
    {
      admin: true,
      timestamp: Date.now(),
    },
    JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return token;
}

/**
 * Check if request is authenticated (without blocking)
 */
export async function isAuthenticated(): Promise<boolean> {
  const decoded = await verifyToken();
  return decoded !== null && decoded.admin === true;
}

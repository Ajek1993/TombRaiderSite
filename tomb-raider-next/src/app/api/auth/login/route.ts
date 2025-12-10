/**
 * Admin Login API Route
 * POST /api/auth/login
 * Authenticates admin users and returns JWT token
 */

import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validate input
    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Hasło jest wymagane",
        },
        { status: 400 }
      );
    }

    // Check environment variables
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!ADMIN_PASSWORD) {
      console.error("[Auth] ADMIN_PASSWORD not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Błąd konfiguracji serwera",
        },
        { status: 500 }
      );
    }

    if (!JWT_SECRET) {
      console.error("[Auth] JWT_SECRET not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Błąd konfiguracji serwera",
        },
        { status: 500 }
      );
    }

    // Verify password
    if (password === ADMIN_PASSWORD) {
      // Generate JWT token
      const token = generateToken();

      return NextResponse.json({
        success: true,
        token,
        expiresIn: 86400, // 24 hours in seconds
      });
    } else {
      // Wrong password
      return NextResponse.json(
        {
          success: false,
          message: "Nieprawidłowe hasło",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("[Auth] Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Błąd serwera podczas logowania",
      },
      { status: 500 }
    );
  }
}

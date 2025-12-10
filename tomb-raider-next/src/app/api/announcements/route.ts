/**
 * Announcements API Route
 * Handles CRUD operations for TikTok/YouTube stream announcements
 * Uses Google Sheets as database
 */

import { NextRequest, NextResponse } from "next/server";
import {
  fetchAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  type Announcement,
} from "@/lib/google-sheets";
import { verifyTokenFromHeader } from "@/lib/auth";

/**
 * GET /api/announcements
 * Fetch all announcements or filter by status
 */
export async function GET(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (
      !process.env.GOOGLE_SHEETS_ID ||
      !process.env.GOOGLE_SHEETS_CREDENTIALS
    ) {
      return NextResponse.json(
        {
          error: "Google Sheets API not configured",
          message:
            "Please set GOOGLE_SHEETS_ID and GOOGLE_SHEETS_CREDENTIALS environment variables",
        },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const upcoming = searchParams.get("upcoming");

    // Fetch all announcements from Google Sheets
    const announcements = await fetchAnnouncements();

    let filtered = announcements;

    // Filter by status if provided
    if (status) {
      filtered = filtered.filter((ann) => ann.status === status);
    }

    // Filter upcoming announcements (date >= today)
    if (upcoming === "true") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      filtered = filtered.filter((ann) => {
        if (!ann.date) return false;
        const annDate = new Date(ann.date);
        return annDate >= today && ann.status !== "completed";
      });
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      const dateA = new Date(`${a.date} ${a.time || "00:00"}`);
      const dateB = new Date(`${b.date} ${b.time || "00:00"}`);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({
      success: true,
      count: filtered.length,
      announcements: filtered,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch announcements",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/announcements
 * Create new announcement
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (
      !process.env.GOOGLE_SHEETS_ID ||
      !process.env.GOOGLE_SHEETS_CREDENTIALS
    ) {
      return NextResponse.json(
        {
          error: "Google Sheets API not configured",
          message:
            "Please set GOOGLE_SHEETS_ID and GOOGLE_SHEETS_CREDENTIALS environment variables",
        },
        { status: 500 }
      );
    }

    // Require authentication
    const authHeader = request.headers.get("authorization");
    const decoded = verifyTokenFromHeader(authHeader);

    if (!decoded || !decoded.admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "Valid authentication token required",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      date,
      time,
      platform,
      platformLink,
      features,
      status,
      thumbnail,
    } = body;

    // Validate required fields
    if (!title || !date || !time) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Title, date, and time are required fields",
        },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Date must be in YYYY-MM-DD format",
        },
        { status: 400 }
      );
    }

    // Validate time format (HH:MM)
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(time)) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Time must be in HH:MM format",
        },
        { status: 400 }
      );
    }

    // Create announcement object
    const announcement: Omit<Announcement, "id" | "createdAt"> = {
      title,
      description: description || "",
      date,
      time,
      platform: platform || "TikTok",
      platformLink: platformLink || "",
      features: Array.isArray(features) ? features : [],
      status: status || "scheduled",
      thumbnail: thumbnail || "",
    };

    // Add to Google Sheets
    const created = await addAnnouncement(announcement);

    return NextResponse.json(
      {
        success: true,
        announcement: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create announcement",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/announcements
 * Update existing announcement by ID (passed in body)
 */
export async function PUT(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (
      !process.env.GOOGLE_SHEETS_ID ||
      !process.env.GOOGLE_SHEETS_CREDENTIALS
    ) {
      return NextResponse.json(
        {
          error: "Google Sheets API not configured",
          message:
            "Please set GOOGLE_SHEETS_ID and GOOGLE_SHEETS_CREDENTIALS environment variables",
        },
        { status: 500 }
      );
    }

    // Require authentication
    const authHeader = request.headers.get("authorization");
    const decoded = verifyTokenFromHeader(authHeader);

    if (!decoded || !decoded.admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "Valid authentication token required",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Announcement ID is required",
        },
        { status: 400 }
      );
    }

    // Validate date format if provided
    if (updates.date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(updates.date)) {
        return NextResponse.json(
          {
            error: "Validation Error",
            message: "Date must be in YYYY-MM-DD format",
          },
          { status: 400 }
        );
      }
    }

    // Validate time format if provided
    if (updates.time) {
      const timeRegex = /^\d{2}:\d{2}$/;
      if (!timeRegex.test(updates.time)) {
        return NextResponse.json(
          {
            error: "Validation Error",
            message: "Time must be in HH:MM format",
          },
          { status: 400 }
        );
      }
    }

    // Update in Google Sheets
    const updated = await updateAnnouncement(id, updates);

    return NextResponse.json({
      success: true,
      announcement: updated,
    });
  } catch (error) {
    console.error("PUT Error:", error);

    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          error: "Not Found",
          message: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to update announcement",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/announcements
 * Delete announcement by ID (passed in query)
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (
      !process.env.GOOGLE_SHEETS_ID ||
      !process.env.GOOGLE_SHEETS_CREDENTIALS
    ) {
      return NextResponse.json(
        {
          error: "Google Sheets API not configured",
          message:
            "Please set GOOGLE_SHEETS_ID and GOOGLE_SHEETS_CREDENTIALS environment variables",
        },
        { status: 500 }
      );
    }

    // Require authentication
    const authHeader = request.headers.get("authorization");
    const decoded = verifyTokenFromHeader(authHeader);

    if (!decoded || !decoded.admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "Valid authentication token required",
        },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Announcement ID is required",
        },
        { status: 400 }
      );
    }

    // Delete from Google Sheets
    await deleteAnnouncement(id);

    return NextResponse.json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);

    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          error: "Not Found",
          message: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to delete announcement",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * FAQ API Route
 * Handles CRUD operations for frequently asked questions
 * Uses Google Sheets as database
 */

import { NextRequest, NextResponse } from "next/server";
import {
  fetchFAQ,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  type FAQ,
} from "@/lib/google-sheets";
import { verifyTokenFromHeader } from "@/lib/auth";

const VALID_CATEGORIES = [
  "Ogólne/O Kanale",
  "Streamy/Techniczne",
  "Gry/Gameplay",
];

/**
 * GET /api/faq
 * Fetch all FAQ items or filter by category/visibility
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
    const category = searchParams.get("category");
    const visible = searchParams.get("visible");

    // Fetch all FAQ from Google Sheets
    const faqList = await fetchFAQ();

    let filtered = faqList;

    // Filter by category if provided
    if (category) {
      filtered = filtered.filter((faq) => faq.category === category);
    }

    // Filter by visibility if provided
    if (visible !== null) {
      const isVisible = visible === "true" || visible === "1";
      filtered = filtered.filter((faq) => faq.visible === isVisible);
    }

    // Sort by order (ascending)
    filtered.sort((a, b) => {
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      return a.order - b.order;
    });

    return NextResponse.json({
      success: true,
      count: filtered.length,
      faq: filtered,
    });
  } catch (error) {
    console.error("GET FAQ Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch FAQ",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/faq
 * Create new FAQ item
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
    const { question, answer, category, order, visible } = body;

    // Validate required fields
    if (!question || !answer) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Question and answer are required fields",
        },
        { status: 400 }
      );
    }

    // Validate category
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: `Category must be one of: ${VALID_CATEGORIES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Create FAQ object
    const faq: Omit<FAQ, "id" | "createdAt"> = {
      question,
      answer,
      category: category || "Ogólne/O Kanale",
      order: order !== undefined ? parseInt(order) : 0,
      visible: visible !== undefined ? visible : true,
    };

    // Add to Google Sheets
    const created = await addFAQ(faq);

    return NextResponse.json(
      {
        success: true,
        faq: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST FAQ Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create FAQ",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/faq
 * Update existing FAQ item by ID (passed in body)
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
          message: "FAQ ID is required",
        },
        { status: 400 }
      );
    }

    // Validate category if provided
    if (updates.category) {
      if (!VALID_CATEGORIES.includes(updates.category)) {
        return NextResponse.json(
          {
            error: "Validation Error",
            message: `Category must be one of: ${VALID_CATEGORIES.join(", ")}`,
          },
          { status: 400 }
        );
      }
    }

    // Convert order to number if provided
    if (updates.order !== undefined) {
      updates.order = parseInt(updates.order);
    }

    // Update in Google Sheets
    const updated = await updateFAQ(id, updates);

    return NextResponse.json({
      success: true,
      faq: updated,
    });
  } catch (error) {
    console.error("PUT FAQ Error:", error);

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
        error: "Failed to update FAQ",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/faq
 * Delete FAQ item by ID (passed in query)
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
          message: "FAQ ID is required",
        },
        { status: 400 }
      );
    }

    // Delete from Google Sheets
    await deleteFAQ(id);

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.error("DELETE FAQ Error:", error);

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
        error: "Failed to delete FAQ",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

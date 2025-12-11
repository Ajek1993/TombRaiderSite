/**
 * API Endpoint: Stream Announcements
 * Handles CRUD operations for TikTok/YouTube stream announcements
 * Uses Google Sheets as database
 */

const {
  fetchAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../lib/google-sheets");

const { verifyToken } = require("./auth/verify");

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * Main handler for announcements API
 */
module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).json({ ok: true });
  }

  try {
    // Check if Google Sheets is configured
    if (
      !process.env.GOOGLE_SHEETS_ID ||
      !process.env.GOOGLE_SHEETS_CREDENTIALS
    ) {
      return res.status(500).json({
        error: "Google Sheets API not configured",
        message:
          "Please set GOOGLE_SHEETS_ID and GOOGLE_SHEETS_CREDENTIALS environment variables",
      });
    }

    // Require authentication for POST, PUT, DELETE
    if (req.method !== "GET") {
      const decoded = verifyToken(req);

      if (!decoded || !decoded.admin) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "Valid authentication token required",
        });
      }
    }

    // Route based on HTTP method
    switch (req.method) {
      case "GET":
        return await handleGet(req, res);
      case "POST":
        return await handlePost(req, res);
      case "PUT":
        return await handlePut(req, res);
      case "DELETE":
        return await handleDelete(req, res);
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({
          error: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

/**
 * GET /api/announcements
 * Fetch all announcements or filter by status
 */
async function handleGet(req, res) {
  try {
    const { status, upcoming } = req.query;

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
      return dateB - dateA; // Descending order
    });

    return res.status(200).json({
      success: true,
      count: filtered.length,
      announcements: filtered,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return res.status(500).json({
      error: "Failed to fetch announcements",
      message: error.message,
    });
  }
}

/**
 * POST /api/announcements
 * Create new announcement
 */
async function handlePost(req, res) {
  try {
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
    } = req.body;

    // Validate required fields
    if (!title || !date || !time) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Title, date, and time are required fields",
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Date must be in YYYY-MM-DD format",
      });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Time must be in HH:MM format",
      });
    }

    // Create announcement object
    const announcement = {
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

    return res.status(201).json({
      success: true,
      announcement: created,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return res.status(500).json({
      error: "Failed to create announcement",
      message: error.message,
    });
  }
}

/**
 * PUT /api/announcements
 * Update existing announcement by ID (passed in body)
 */
async function handlePut(req, res) {
  try {
    const { id, ...updates } = req.body;

    if (!id) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Announcement ID is required",
      });
    }

    // Validate date format if provided
    if (updates.date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(updates.date)) {
        return res.status(400).json({
          error: "Validation Error",
          message: "Date must be in YYYY-MM-DD format",
        });
      }
    }

    // Validate time format if provided
    if (updates.time) {
      const timeRegex = /^\d{2}:\d{2}$/;
      if (!timeRegex.test(updates.time)) {
        return res.status(400).json({
          error: "Validation Error",
          message: "Time must be in HH:MM format",
        });
      }
    }

    // Update in Google Sheets
    const updated = await updateAnnouncement(id, updates);

    return res.status(200).json({
      success: true,
      announcement: updated,
    });
  } catch (error) {
    console.error("PUT Error:", error);

    if (error.message.includes("not found")) {
      return res.status(404).json({
        error: "Not Found",
        message: error.message,
      });
    }

    return res.status(500).json({
      error: "Failed to update announcement",
      message: error.message,
    });
  }
}

/**
 * DELETE /api/announcements
 * Delete announcement by ID (passed in query)
 */
async function handleDelete(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Announcement ID is required",
      });
    }

    // Delete from Google Sheets
    await deleteAnnouncement(id);

    return res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);

    if (error.message.includes("not found")) {
      return res.status(404).json({
        error: "Not Found",
        message: error.message,
      });
    }

    return res.status(500).json({
      error: "Failed to delete announcement",
      message: error.message,
    });
  }
}

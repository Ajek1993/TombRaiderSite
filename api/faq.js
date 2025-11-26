/**
 * API Endpoint: FAQ
 * Handles CRUD operations for frequently asked questions
 * Uses Google Sheets as database
 */

const {
  fetchFAQ,
  addFAQ,
  updateFAQ,
  deleteFAQ,
} = require('../lib/google-sheets-faq');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Main handler for FAQ API
 */
module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  try {
    // Check if Google Sheets is configured
    if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SHEETS_CREDENTIALS) {
      return res.status(500).json({
        error: 'Google Sheets API not configured',
        message: 'Please set GOOGLE_SHEETS_ID and GOOGLE_SHEETS_CREDENTIALS environment variables',
      });
    }

    // Route based on HTTP method
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({
          error: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error('FAQ API Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * GET /api/faq
 * Fetch all FAQ items or filter by category/visibility
 */
async function handleGet(req, res) {
  try {
    const { category, visible } = req.query;

    // Fetch all FAQ from Google Sheets
    const faqList = await fetchFAQ();

    let filtered = faqList;

    // Filter by category if provided
    if (category) {
      filtered = filtered.filter(faq => faq.category === category);
    }

    // Filter by visibility if provided
    if (visible !== undefined) {
      const isVisible = visible === 'true' || visible === '1';
      filtered = filtered.filter(faq => faq.visible === isVisible);
    }

    // Sort by order (ascending)
    filtered.sort((a, b) => {
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      return a.order - b.order;
    });

    return res.status(200).json({
      success: true,
      count: filtered.length,
      faq: filtered,
    });
  } catch (error) {
    console.error('GET FAQ Error:', error);
    return res.status(500).json({
      error: 'Failed to fetch FAQ',
      message: error.message,
    });
  }
}

/**
 * POST /api/faq
 * Create new FAQ item
 */
async function handlePost(req, res) {
  try {
    const {
      question,
      answer,
      category,
      order,
      visible,
    } = req.body;

    // Validate required fields
    if (!question || !answer) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Question and answer are required fields',
      });
    }

    // Validate category
    const validCategories = ['Ogólne/O Kanale', 'Streamy/Techniczne', 'Gry/Gameplay'];
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: `Category must be one of: ${validCategories.join(', ')}`,
      });
    }

    // Create FAQ object
    const faq = {
      question,
      answer,
      category: category || 'Ogólne/O Kanale',
      order: order !== undefined ? parseInt(order) : 0,
      visible: visible !== undefined ? visible : true,
    };

    // Add to Google Sheets
    const created = await addFAQ(faq);

    return res.status(201).json({
      success: true,
      faq: created,
    });
  } catch (error) {
    console.error('POST FAQ Error:', error);
    return res.status(500).json({
      error: 'Failed to create FAQ',
      message: error.message,
    });
  }
}

/**
 * PUT /api/faq
 * Update existing FAQ item by ID (passed in body)
 */
async function handlePut(req, res) {
  try {
    const { id, ...updates } = req.body;

    if (!id) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'FAQ ID is required',
      });
    }

    // Validate category if provided
    if (updates.category) {
      const validCategories = ['Ogólne/O Kanale', 'Streamy/Techniczne', 'Gry/Gameplay'];
      if (!validCategories.includes(updates.category)) {
        return res.status(400).json({
          error: 'Validation Error',
          message: `Category must be one of: ${validCategories.join(', ')}`,
        });
      }
    }

    // Convert order to number if provided
    if (updates.order !== undefined) {
      updates.order = parseInt(updates.order);
    }

    // Update in Google Sheets
    const updated = await updateFAQ(id, updates);

    return res.status(200).json({
      success: true,
      faq: updated,
    });
  } catch (error) {
    console.error('PUT FAQ Error:', error);

    if (error.message.includes('not found')) {
      return res.status(404).json({
        error: 'Not Found',
        message: error.message,
      });
    }

    return res.status(500).json({
      error: 'Failed to update FAQ',
      message: error.message,
    });
  }
}

/**
 * DELETE /api/faq
 * Delete FAQ item by ID (passed in query)
 */
async function handleDelete(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'FAQ ID is required',
      });
    }

    // Delete from Google Sheets
    await deleteFAQ(id);

    return res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully',
    });
  } catch (error) {
    console.error('DELETE FAQ Error:', error);

    if (error.message.includes('not found')) {
      return res.status(404).json({
        error: 'Not Found',
        message: error.message,
      });
    }

    return res.status(500).json({
      error: 'Failed to delete FAQ',
      message: error.message,
    });
  }
}

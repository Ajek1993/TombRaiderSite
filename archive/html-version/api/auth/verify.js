/**
 * JWT Token Verification Middleware
 * Verifies JWT token from Authorization header
 */

const jwt = require('jsonwebtoken');

/**
 * Verify JWT token from request
 * @param {Object} req - Request object
 * @returns {Object|null} Decoded token or null if invalid
 */
function verifyToken(req) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      return null;
    }

    // Extract token (format: "Bearer TOKEN")
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return null;
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      console.error('[Auth] JWT_SECRET not configured');
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('[Auth] Token verification failed:', error.message);
    return null;
  }
}

/**
 * Middleware function to protect routes
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
function requireAuth(req, res, next) {
  const decoded = verifyToken(req);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - Invalid or missing token'
    });
  }

  // Attach decoded token to request
  req.admin = decoded;
  next();
}

/**
 * Check if request is authenticated (without blocking)
 * @param {Object} req - Request object
 * @returns {boolean} True if authenticated
 */
function isAuthenticated(req) {
  const decoded = verifyToken(req);
  return decoded !== null;
}

module.exports = {
  verifyToken,
  requireAuth,
  isAuthenticated
};

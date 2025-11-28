/**
 * Admin Login API
 * Authenticates admin users and returns JWT token
 */

const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { password } = req.body;

    // Validate input
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Hasło jest wymagane'
      });
    }

    // Check environment variables
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!ADMIN_PASSWORD) {
      console.error('[Auth] ADMIN_PASSWORD not configured');
      return res.status(500).json({
        success: false,
        message: 'Błąd konfiguracji serwera'
      });
    }

    if (!JWT_SECRET) {
      console.error('[Auth] JWT_SECRET not configured');
      return res.status(500).json({
        success: false,
        message: 'Błąd konfiguracji serwera'
      });
    }

    // Verify password
    if (password === ADMIN_PASSWORD) {
      // Generate JWT token
      const token = jwt.sign(
        {
          admin: true,
          timestamp: Date.now()
        },
        JWT_SECRET,
        {
          expiresIn: '24h'
        }
      );

      return res.status(200).json({
        success: true,
        token,
        expiresIn: 86400 // 24 hours in seconds
      });
    } else {
      // Wrong password
      return res.status(401).json({
        success: false,
        message: 'Nieprawidłowe hasło'
      });
    }
  } catch (error) {
    console.error('[Auth] Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Błąd serwera podczas logowania'
    });
  }
};

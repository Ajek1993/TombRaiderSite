/**
 * YouTube Channel API Endpoint
 * Fetches channel information (avatar, subscriber count, etc.)
 */

const { fetchChannelInfo } = require('../lib/youtube-api');
const { getCache, setCache } = require('../lib/cache');

// YouTube channel ID (Bruxa)
const CHANNEL_ID = 'UCqHZWHj8V8BFcfm7FFAK3Og';

/**
 * Vercel serverless function handler
 */
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use GET.'
    });
  }

  try {
    // Check cache first (24-hour cache for channel info)
    const cacheKey = `channel_${CHANNEL_ID}`;
    const cached = getCache(cacheKey);

    if (cached) {
      console.log('[Channel API] Returning cached channel info');
      return res.status(200).json({
        success: true,
        channel: cached,
        cached: true
      });
    }

    // Get API key from environment
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error('[Channel API] YouTube API key not configured');
      return res.status(500).json({
        success: false,
        error: 'YouTube API key not configured'
      });
    }

    console.log(`[Channel API] Fetching channel info for: ${CHANNEL_ID}`);

    // Fetch channel info
    const channelData = await fetchChannelInfo(CHANNEL_ID, apiKey);

    // Cache for 24 hours (channel info doesn't change often)
    setCache(cacheKey, channelData);

    console.log(`[Channel API] Successfully fetched channel: ${channelData.title}`);

    // Return response
    return res.status(200).json({
      success: true,
      channel: channelData,
      cached: false
    });

  } catch (error) {
    console.error('[Channel API] Error:', error.message);

    // Check for quota exceeded error
    if (error.message.includes('quotaExceeded')) {
      return res.status(429).json({
        success: false,
        error: 'YouTube API quota exceeded. Please try again later.',
        quotaExceeded: true
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
};

/**
 * Vercel Serverless Function - YouTube API Endpoint
 * Fetches playlist videos with 24h caching
 */

const { getPlaylistId, isValidCategory } = require('../config/playlists');
const { fetchPlaylistItems } = require('../lib/youtube-api');
const cache = require('../lib/cache');

/**
 * Main handler for YouTube API requests
 */
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  try {
    // Get query parameters
    const { playlist, category } = req.query;

    // Validate input
    if (!playlist && !category) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Please provide either "playlist" or "category" query parameter'
      });
    }

    const categoryKey = playlist || category;

    // Validate category
    if (!isValidCategory(categoryKey)) {
      return res.status(400).json({
        error: 'Invalid category',
        message: `Category "${categoryKey}" does not exist`,
        validCategories: ['tr1', 'tr1ub', 'tr2', 'tr2gold', 'tr3', 'tlolc', 'shorts']
      });
    }

    // Get playlist ID
    const playlistId = getPlaylistId(categoryKey);

    if (!playlistId) {
      return res.status(404).json({
        error: 'Playlist not found',
        message: `No playlist ID found for category "${categoryKey}"`
      });
    }

    // Check cache first
    const cacheKey = cache.getPlaylistKey(playlistId);
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log(`[API] Cache hit for playlist: ${playlistId}`);
      return res.status(200).json({
        success: true,
        category: categoryKey,
        playlistId: playlistId,
        cached: true,
        videos: cachedData,
        count: cachedData.length
      });
    }

    // Get API key from environment
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error('[API] YouTube API key not found in environment variables');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'YouTube API key is not configured'
      });
    }

    // Fetch from YouTube API (all items with pagination)
    console.log(`[API] Fetching playlist from YouTube: ${playlistId}`);
    const videos = await fetchPlaylistItems(playlistId, apiKey);

    // Store in cache
    cache.set(cacheKey, videos);

    console.log(`[API] Successfully fetched ${videos.length} videos for ${categoryKey}`);

    // Return response
    return res.status(200).json({
      success: true,
      category: categoryKey,
      playlistId: playlistId,
      cached: false,
      videos: videos,
      count: videos.length
    });

  } catch (error) {
    console.error('[API] Error:', error);

    // Check if it's a YouTube API error
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 403) {
        return res.status(403).json({
          error: 'YouTube API quota exceeded',
          message: 'Daily API quota has been exceeded. Please try again tomorrow.',
          details: data.error?.message
        });
      }

      if (status === 404) {
        return res.status(404).json({
          error: 'Playlist not found',
          message: 'The requested playlist does not exist or is private'
        });
      }
    }

    // Generic error
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    });
  }
};

/**
 * YouTube Data API v3 Helper Functions
 * Handles fetching playlist items and formatting responses
 */

const axios = require('axios');

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

/**
 * Fetch playlist items from YouTube API
 * @param {string} playlistId - YouTube playlist ID
 * @param {string} apiKey - YouTube API key
 * @param {number} maxResults - Maximum number of results (default: 50, max: 50)
 * @returns {Promise<Array>} Array of video objects
 */
async function fetchPlaylistItems(playlistId, apiKey, maxResults = 50) {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId: playlistId,
        maxResults: Math.min(maxResults, 50),
        key: apiKey
      }
    });

    const items = response.data.items || [];

    // Fetch video details for duration and statistics
    const videoIds = items.map(item => item.contentDetails.videoId).join(',');
    const videoDetails = await fetchVideoDetails(videoIds, apiKey);

    // Merge playlist items with video details
    return items.map(item => {
      const videoId = item.contentDetails.videoId;
      const details = videoDetails[videoId] || {};

      return formatVideoData(item, details);
    });

  } catch (error) {
    console.error('[YouTube API] Error fetching playlist:', error.message);
    throw new Error(`Failed to fetch playlist: ${error.message}`);
  }
}

/**
 * Fetch video details (duration, statistics)
 * @param {string} videoIds - Comma-separated video IDs
 * @param {string} apiKey - YouTube API key
 * @returns {Promise<Object>} Map of videoId -> details
 */
async function fetchVideoDetails(videoIds, apiKey) {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        part: 'contentDetails,statistics',
        id: videoIds,
        key: apiKey
      }
    });

    const videoMap = {};

    (response.data.items || []).forEach(video => {
      videoMap[video.id] = {
        duration: video.contentDetails.duration,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount
      };
    });

    return videoMap;

  } catch (error) {
    console.error('[YouTube API] Error fetching video details:', error.message);
    return {};
  }
}

/**
 * Format video data for frontend consumption
 * @param {object} playlistItem - Playlist item from YouTube API
 * @param {object} videoDetails - Video details (duration, stats)
 * @returns {object} Formatted video object
 */
function formatVideoData(playlistItem, videoDetails) {
  const snippet = playlistItem.snippet;
  const videoId = playlistItem.contentDetails.videoId;

  return {
    id: videoId,
    title: snippet.title,
    description: snippet.description,
    thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || null,
    publishedAt: formatDate(snippet.publishedAt),
    duration: formatDuration(videoDetails.duration),
    views: formatViews(videoDetails.viewCount),
    likes: formatNumber(videoDetails.likeCount),
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    isShort: isShortVideo(videoDetails.duration)
  };
}

/**
 * Parse ISO 8601 duration to seconds
 * @param {string} isoDuration - Duration in ISO 8601 format (e.g., PT1M30S)
 * @returns {number} Duration in seconds
 */
function parseDurationToSeconds(isoDuration) {
  if (!isoDuration) return 0;

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format ISO 8601 duration to readable format (MM:SS or HH:MM:SS)
 * @param {string} isoDuration - Duration in ISO 8601 format
 * @returns {string} Formatted duration
 */
function formatDuration(isoDuration) {
  const totalSeconds = parseDurationToSeconds(isoDuration);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

/**
 * Check if video is a YouTube Short (< 60 seconds)
 * @param {string} isoDuration - Duration in ISO 8601 format
 * @returns {boolean}
 */
function isShortVideo(isoDuration) {
  const seconds = parseDurationToSeconds(isoDuration);
  return seconds > 0 && seconds <= 60;
}

/**
 * Format view count to readable format
 * @param {string|number} views - View count
 * @returns {string} Formatted view count
 */
function formatViews(views) {
  if (!views) return '0';

  const num = parseInt(views);

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return num.toLocaleString();
}

/**
 * Format number to readable format
 * @param {string|number} num - Number
 * @returns {string} Formatted number
 */
function formatNumber(num) {
  if (!num) return '0';
  return parseInt(num).toLocaleString();
}

/**
 * Format ISO date to relative time (e.g., "2 days ago")
 * @param {string} isoDate - Date in ISO format
 * @returns {string} Relative time string
 */
function formatDate(isoDate) {
  if (!isoDate) return 'Unknown';

  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return 'Przed chwilą';
  if (diffMinutes < 60) return `${diffMinutes} ${pluralize(diffMinutes, 'minuta', 'minuty', 'minut')} temu`;
  if (diffHours < 24) return `${diffHours} ${pluralize(diffHours, 'godzina', 'godziny', 'godzin')} temu`;
  if (diffDays === 1) return 'Wczoraj';
  if (diffDays < 7) return `${diffDays} ${pluralize(diffDays, 'dzień', 'dni', 'dni')} temu`;
  if (diffWeeks === 1) return '1 tydzień temu';
  if (diffWeeks < 4) return `${diffWeeks} ${pluralize(diffWeeks, 'tydzień', 'tygodnie', 'tygodni')} temu`;
  if (diffMonths === 1) return '1 miesiąc temu';
  if (diffMonths < 12) return `${diffMonths} ${pluralize(diffMonths, 'miesiąc', 'miesiące', 'miesięcy')} temu`;
  if (diffYears === 1) return '1 rok temu';
  return `${diffYears} ${pluralize(diffYears, 'rok', 'lata', 'lat')} temu`;
}

/**
 * Polish pluralization helper
 * @param {number} count - Number
 * @param {string} one - Singular form
 * @param {string} few - Plural form (2-4)
 * @param {string} many - Plural form (5+)
 * @returns {string} Correct plural form
 */
function pluralize(count, one, few, many) {
  if (count === 1) return one;
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return few;
  return many;
}

// Export
module.exports = {
  fetchPlaylistItems,
  fetchVideoDetails,
  formatVideoData,
  parseDurationToSeconds,
  formatDuration,
  isShortVideo,
  formatViews,
  formatNumber,
  formatDate
};

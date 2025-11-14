/**
 * Simple In-Memory Cache with 24h expiry
 * Stores YouTube API responses to reduce quota usage
 */

const cache = new Map();
const CACHE_VERSION = 'v2'; // Increment to invalidate cache
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Add version prefix to cache key
 * @param {string} key - Original cache key
 * @returns {string} Versioned cache key
 */
function versionedKey(key) {
  return `${CACHE_VERSION}:${key}`;
}

/**
 * Cache entry structure
 */
class CacheEntry {
  constructor(data) {
    this.data = data;
    this.timestamp = Date.now();
    this.expiresAt = Date.now() + CACHE_TTL;
  }

  isExpired() {
    return Date.now() > this.expiresAt;
  }

  getAge() {
    return Date.now() - this.timestamp;
  }
}

/**
 * Get value from cache
 * @param {string} key - Cache key
 * @returns {*} Cached data or null if not found/expired
 */
function get(key) {
  const vKey = versionedKey(key);
  const entry = cache.get(vKey);

  if (!entry) {
    return null;
  }

  if (entry.isExpired()) {
    cache.delete(vKey);
    return null;
  }

  return entry.data;
}

/**
 * Set value in cache
 * @param {string} key - Cache key
 * @param {*} data - Data to cache
 */
function set(key, data) {
  const vKey = versionedKey(key);
  const entry = new CacheEntry(data);
  cache.set(vKey, entry);
}

/**
 * Check if key exists and is not expired
 * @param {string} key - Cache key
 * @returns {boolean}
 */
function has(key) {
  const vKey = versionedKey(key);
  const entry = cache.get(vKey);

  if (!entry) {
    return false;
  }

  if (entry.isExpired()) {
    cache.delete(vKey);
    return false;
  }

  return true;
}

/**
 * Delete specific key from cache
 * @param {string} key - Cache key
 */
function del(key) {
  const vKey = versionedKey(key);
  cache.delete(vKey);
}

/**
 * Clear all cache
 */
function clear() {
  cache.clear();
}

/**
 * Get cache statistics
 * @returns {object} Cache stats
 */
function getStats() {
  let expired = 0;
  let valid = 0;

  cache.forEach((entry) => {
    if (entry.isExpired()) {
      expired++;
    } else {
      valid++;
    }
  });

  return {
    total: cache.size,
    valid,
    expired,
    ttl: CACHE_TTL
  };
}

/**
 * Clean expired entries from cache
 * @returns {number} Number of entries removed
 */
function cleanup() {
  let removed = 0;

  cache.forEach((entry, key) => {
    if (entry.isExpired()) {
      cache.delete(key);
      removed++;
    }
  });

  return removed;
}

/**
 * Get cache key for playlist
 * @param {string} playlistId - YouTube playlist ID
 * @returns {string} Cache key
 */
function getPlaylistKey(playlistId) {
  return `playlist:${playlistId}`;
}

// Auto-cleanup expired entries every hour
setInterval(() => {
  const removed = cleanup();
  if (removed > 0) {
    console.log(`[Cache] Cleaned up ${removed} expired entries`);
  }
}, 60 * 60 * 1000); // 1 hour

// Export
module.exports = {
  get,
  set,
  has,
  del,
  clear,
  getStats,
  cleanup,
  getPlaylistKey,
  CACHE_TTL
};

/**
 * Simple In-Memory Cache with 24h expiry
 * Stores YouTube API responses to reduce quota usage
 */

const cache = new Map<string, CacheEntry>();
const CACHE_VERSION = "v3"; // Increment to invalidate cache (v3: pagination support)
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Add version prefix to cache key
 */
function versionedKey(key: string): string {
  return `${CACHE_VERSION}:${key}`;
}

/**
 * Cache entry structure
 */
class CacheEntry {
  data: unknown;
  timestamp: number;
  expiresAt: number;

  constructor(data: unknown) {
    this.data = data;
    this.timestamp = Date.now();
    this.expiresAt = Date.now() + CACHE_TTL;
  }

  isExpired(): boolean {
    return Date.now() > this.expiresAt;
  }

  getAge(): number {
    return Date.now() - this.timestamp;
  }
}

/**
 * Get value from cache
 */
export function get<T>(key: string): T | null {
  const vKey = versionedKey(key);
  const entry = cache.get(vKey);

  if (!entry) {
    return null;
  }

  if (entry.isExpired()) {
    cache.delete(vKey);
    return null;
  }

  return entry.data as T;
}

/**
 * Set value in cache
 */
export function set(key: string, data: unknown): void {
  const vKey = versionedKey(key);
  const entry = new CacheEntry(data);
  cache.set(vKey, entry);
}

/**
 * Check if key exists and is not expired
 */
export function has(key: string): boolean {
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
 */
export function del(key: string): void {
  const vKey = versionedKey(key);
  cache.delete(vKey);
}

/**
 * Clear all cache
 */
export function clear(): void {
  cache.clear();
}

interface CacheStats {
  total: number;
  valid: number;
  expired: number;
  ttl: number;
}

/**
 * Get cache statistics
 */
export function getStats(): CacheStats {
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
    ttl: CACHE_TTL,
  };
}

/**
 * Clean expired entries from cache
 */
export function cleanup(): number {
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
 */
export function getPlaylistKey(playlistId: string): string {
  return `playlist:${playlistId}`;
}

export { CACHE_TTL };

/**
 * YouTube Data API v3 Helper Functions
 * Handles fetching playlist items and formatting responses
 */

import axios from "axios";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  publishedAt: string;
  publishedAtRaw: string;
  duration: string;
  views: string;
  likes: string;
  videoUrl: string;
  embedUrl: string;
  isShort: boolean;
}

export interface ChannelInfo {
  id: string;
  title: string;
  description: string;
  avatar: string;
  subscriberCount: string;
  subscriberCountRaw: number;
  videoCount: number;
  viewCount: number;
}

interface PlaylistItemResponse {
  items: Array<{
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        medium?: { url: string };
        default?: { url: string };
      };
      publishedAt: string;
    };
    contentDetails: {
      videoId: string;
      videoPublishedAt?: string;
    };
  }>;
  nextPageToken?: string;
}

interface VideoDetailsMap {
  [videoId: string]: {
    duration: string;
    viewCount: string;
    likeCount: string;
    privacyStatus: string;
    uploadStatus: string;
  };
}

/**
 * Fetch playlist items from YouTube API
 */
export async function fetchPlaylistItems(
  playlistId: string,
  apiKey: string,
  maxResults: number | null = null
): Promise<Video[]> {
  try {
    let allItems: PlaylistItemResponse["items"] = [];
    let nextPageToken: string | undefined;

    // Fetch all pages until no more results or maxResults is reached
    do {
      const response = await axios.get<PlaylistItemResponse>(
        `${YOUTUBE_API_BASE}/playlistItems`,
        {
          params: {
            part: "snippet,contentDetails",
            playlistId: playlistId,
            maxResults: 50,
            pageToken: nextPageToken,
            key: apiKey,
          },
        }
      );

      const items = response.data.items || [];
      allItems = allItems.concat(items);
      nextPageToken = response.data.nextPageToken;

      // If maxResults is specified and we have enough items, stop fetching
      if (maxResults && allItems.length >= maxResults) {
        allItems = allItems.slice(0, maxResults);
        break;
      }
    } while (nextPageToken);

    // Remove duplicates based on videoId (keep first occurrence)
    const seenVideoIds = new Set<string>();
    const uniqueItems = allItems.filter((item) => {
      const videoId = item.contentDetails.videoId;
      if (seenVideoIds.has(videoId)) {
        return false;
      }
      seenVideoIds.add(videoId);
      return true;
    });

    // Fetch video details in batches of 50 (YouTube API limit for video IDs)
    const allVideoDetails: VideoDetailsMap = {};
    const videoIds = uniqueItems.map((item) => item.contentDetails.videoId);

    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50);
      const batchIds = batch.join(",");
      const batchDetails = await fetchVideoDetails(batchIds, apiKey);
      Object.assign(allVideoDetails, batchDetails);
    }

    // Merge playlist items with video details and filter out non-public/non-processed videos
    return uniqueItems
      .map((item) => {
        const videoId = item.contentDetails.videoId;
        const details = allVideoDetails[videoId] || {
          duration: "",
          viewCount: "0",
          likeCount: "0",
          privacyStatus: "private",
          uploadStatus: "rejected",
        };

        return { item, details };
      })
      .filter(({ details }) => {
        // Filter out private videos
        if (details.privacyStatus !== "public") {
          console.log(`[YouTube API] Filtering out non-public video (status: ${details.privacyStatus})`);
          return false;
        }
        // Filter out scheduled/upcoming videos (not yet processed)
        if (details.uploadStatus !== "processed") {
          console.log(`[YouTube API] Filtering out non-processed video (upload status: ${details.uploadStatus})`);
          return false;
        }
        return true;
      })
      .map(({ item, details }) => formatVideoData(item, details));
  } catch (error) {
    console.error("[YouTube API] Error fetching playlist:", error);
    throw new Error(
      `Failed to fetch playlist: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Fetch video details (duration, statistics)
 */
async function fetchVideoDetails(
  videoIds: string,
  apiKey: string
): Promise<VideoDetailsMap> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        part: "contentDetails,statistics,status",
        id: videoIds,
        key: apiKey,
      },
    });

    const videoMap: VideoDetailsMap = {};

    (response.data.items || []).forEach(
      (video: {
        id: string;
        contentDetails: { duration: string };
        statistics: { viewCount: string; likeCount: string };
        status: { privacyStatus: string; uploadStatus: string };
      }) => {
        videoMap[video.id] = {
          duration: video.contentDetails.duration,
          viewCount: video.statistics.viewCount,
          likeCount: video.statistics.likeCount,
          privacyStatus: video.status.privacyStatus,
          uploadStatus: video.status.uploadStatus,
        };
      }
    );

    return videoMap;
  } catch (error) {
    console.error("[YouTube API] Error fetching video details:", error);
    return {};
  }
}

/**
 * Format video data for frontend consumption
 */
function formatVideoData(
  playlistItem: PlaylistItemResponse["items"][0],
  videoDetails: {
    duration: string;
    viewCount: string;
    likeCount: string;
    privacyStatus: string;
    uploadStatus: string;
  }
): Video {
  const snippet = playlistItem.snippet;
  const contentDetails = playlistItem.contentDetails;
  const videoId = contentDetails.videoId;

  // Use videoPublishedAt if available, fallback to snippet.publishedAt
  const videoPublishedAt =
    contentDetails.videoPublishedAt || snippet.publishedAt;

  return {
    id: videoId,
    title: snippet.title,
    description: snippet.description,
    thumbnail:
      snippet.thumbnails?.medium?.url ||
      snippet.thumbnails?.default?.url ||
      null,
    publishedAt: formatDate(videoPublishedAt),
    publishedAtRaw: videoPublishedAt,
    duration: formatDuration(videoDetails.duration),
    views: formatViews(videoDetails.viewCount),
    likes: formatNumber(videoDetails.likeCount),
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    isShort: isShortVideo(videoDetails.duration),
  };
}

/**
 * Parse ISO 8601 duration to seconds
 */
function parseDurationToSeconds(isoDuration: string): number {
  if (!isoDuration) return 0;

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format ISO 8601 duration to readable format (MM:SS or HH:MM:SS)
 */
function formatDuration(isoDuration: string): string {
  const totalSeconds = parseDurationToSeconds(isoDuration);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

/**
 * Check if video is a YouTube Short (< 60 seconds)
 */
function isShortVideo(isoDuration: string): boolean {
  const seconds = parseDurationToSeconds(isoDuration);
  return seconds > 0 && seconds <= 60;
}

/**
 * Format view count to readable format
 */
function formatViews(views: string | number): string {
  if (!views) return "0";

  const num = typeof views === "string" ? parseInt(views) : views;

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return num.toLocaleString();
}

/**
 * Format number to readable format
 */
function formatNumber(num: string | number): string {
  if (!num) return "0";
  return (typeof num === "string" ? parseInt(num) : num).toLocaleString();
}

/**
 * Polish pluralization helper
 */
function pluralize(count: number, one: string, few: string, many: string): string {
  if (count === 1) return one;
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  )
    return few;
  return many;
}

/**
 * Format ISO date to relative time (e.g., "2 days ago")
 */
function formatDate(isoDate: string): string {
  if (!isoDate) return "Unknown";

  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return "Przed chwilą";
  if (diffMinutes < 60)
    return `${diffMinutes} ${pluralize(diffMinutes, "minuta", "minuty", "minut")} temu`;
  if (diffHours < 24)
    return `${diffHours} ${pluralize(diffHours, "godzina", "godziny", "godzin")} temu`;
  if (diffDays === 1) return "Wczoraj";
  if (diffDays < 7)
    return `${diffDays} ${pluralize(diffDays, "dzień", "dni", "dni")} temu`;
  if (diffWeeks === 1) return "1 tydzień temu";
  if (diffWeeks < 4)
    return `${diffWeeks} ${pluralize(diffWeeks, "tydzień", "tygodnie", "tygodni")} temu`;
  if (diffMonths === 1) return "1 miesiąc temu";
  if (diffMonths < 12)
    return `${diffMonths} ${pluralize(diffMonths, "miesiąc", "miesiące", "miesięcy")} temu`;
  if (diffYears === 1) return "1 rok temu";
  return `${diffYears} ${pluralize(diffYears, "rok", "lata", "lat")} temu`;
}

/**
 * Fetch channel information (avatar, subscriber count, etc.)
 */
export async function fetchChannelInfo(
  channelId: string,
  apiKey: string
): Promise<ChannelInfo> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/channels`, {
      params: {
        part: "snippet,statistics",
        id: channelId,
        key: apiKey,
      },
    });

    const channel = response.data.items?.[0];
    if (!channel) {
      throw new Error("Channel not found");
    }

    return {
      id: channel.id,
      title: channel.snippet.title,
      description: channel.snippet.description,
      avatar:
        channel.snippet.thumbnails?.high?.url ||
        channel.snippet.thumbnails?.default?.url,
      subscriberCount: formatViews(channel.statistics.subscriberCount),
      subscriberCountRaw: parseInt(channel.statistics.subscriberCount),
      videoCount: parseInt(channel.statistics.videoCount),
      viewCount: parseInt(channel.statistics.viewCount),
    };
  } catch (error) {
    console.error("[YouTube API] Error fetching channel info:", error);
    throw new Error(
      `Failed to fetch channel info: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Filter out YouTube Shorts from video array
 */
export function filterOutShorts(videos: Video[]): Video[] {
  return videos.filter((video) => !video.isShort);
}

/**
 * Sort videos by view count (descending)
 */
export function sortByViewCount(videos: Video[]): Video[] {
  return [...videos].sort((a, b) => {
    // Extract numeric values from formatted view counts (e.g., "2.8K" -> 2800)
    const getNumericViews = (viewString: string): number => {
      if (!viewString) return 0;
      const str = viewString.toString();
      if (str.includes("M")) return parseFloat(str) * 1000000;
      if (str.includes("K")) return parseFloat(str) * 1000;
      return parseFloat(str.replace(/,/g, "")) || 0;
    };

    return getNumericViews(b.views) - getNumericViews(a.views);
  });
}

/**
 * Get the latest non-short video from array
 */
export function getLatestNonShortVideo(videos: Video[]): Video | null {
  const nonShorts = filterOutShorts(videos);
  return nonShorts.length > 0 ? nonShorts[0] : null;
}

/**
 * API type definitions
 */

// Generic API response
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// YouTube API responses
export interface YouTubeVideoResponse extends ApiResponse {
  videos: import("./video").Video[];
  fromCache?: boolean;
  cacheAge?: number;
}

export interface YouTubeChannelResponse extends ApiResponse {
  channel: import("./video").ChannelInfo;
}

// Announcements API responses
export interface AnnouncementsResponse extends ApiResponse {
  announcements: import("./announcement").Announcement[];
}

export interface AnnouncementResponse extends ApiResponse {
  announcement: import("./announcement").Announcement;
}

// FAQ API responses
export interface FAQResponse extends ApiResponse {
  faq: FAQItem[];
}

export interface FAQItemResponse extends ApiResponse {
  item: FAQItem;
}

// FAQ item
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  visible: boolean;
}

export type FAQCategory = "Ogólne/O Kanale" | "Streamy/Techniczne" | "Gry/Gameplay";

// Auth API responses
export interface LoginResponse extends ApiResponse {
  token?: string;
}

// JWT Token
export interface DecodedToken {
  admin: boolean;
  timestamp: number;
  iat: number;
  exp: number;
}

// Cache entry
export interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
}

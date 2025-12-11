"use client";

import { useState, useEffect, useCallback } from "react";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
  publishedAtRaw: string;
  embedUrl: string;
  videoUrl: string;
  isShort?: boolean;
}

export interface ChannelInfo {
  title: string;
  avatar: string;
  subscriberCount: string;
  description: string;
}

const API_BASE_URL = "/api";
const PLAYLIST_CATEGORIES = ["tr1", "tr1ub", "tr2", "tr2gold", "tr3", "tlolc"];

/**
 * Hook for fetching videos from a specific playlist
 */
export function useVideos(playlistKey: string) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${API_BASE_URL}/youtube?playlist=${playlistKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data.videos || []);
      } catch (err) {
        setError("Failed to fetch videos");
        console.error(`[useVideos] Error fetching ${playlistKey}:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [playlistKey]);

  return { videos, loading, error };
}

/**
 * Hook for fetching channel information
 */
export function useChannelInfo() {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChannelInfo() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/channel`);
        if (!response.ok) {
          throw new Error("Failed to fetch channel info");
        }
        const data = await response.json();
        setChannelInfo(data.channel);
      } catch (err) {
        setError("Failed to fetch channel info");
        console.error("[useChannelInfo] Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchChannelInfo();
  }, []);

  return { channelInfo, loading, error };
}

/**
 * Hook for fetching all gameplays (from all playlists)
 */
export function useAllGameplays() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllPlaylists() {
      try {
        setLoading(true);
        setError(null);

        const promises = PLAYLIST_CATEGORIES.map((cat) =>
          fetch(`${API_BASE_URL}/youtube?playlist=${cat}`)
            .then((res) => res.json())
            .then((data) => data.videos || [])
            .catch(() => [])
        );

        const results = await Promise.all(promises);
        const allVideos = results.flat();

        // Filter out shorts and sort by publication date (newest first)
        const gameplayVideos = allVideos
          .filter((v: Video) => !v.isShort)
          .sort(
            (a: Video, b: Video) =>
              new Date(b.publishedAtRaw).getTime() -
              new Date(a.publishedAtRaw).getTime()
          );

        setVideos(gameplayVideos);
      } catch (err) {
        setError("Failed to fetch gameplays");
        console.error("[useAllGameplays] Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPlaylists();
  }, []);

  return { videos, loading, error };
}

/**
 * Hook for fetching shorts/highlights
 */
export function useShorts() {
  const [shorts, setShorts] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShorts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/youtube?playlist=shorts`);
        if (!response.ok) {
          throw new Error("Failed to fetch shorts");
        }
        const data = await response.json();

        // Sort by views (most viewed first)
        const sortedShorts = (data.videos || []).sort(
          (a: Video, b: Video) => {
            const getNumericViews = (viewString: string) => {
              if (!viewString) return 0;
              const str = viewString.toString().toUpperCase();
              if (str.includes("M")) return parseFloat(str) * 1000000;
              if (str.includes("K")) return parseFloat(str) * 1000;
              return parseFloat(str.replace(/,/g, "")) || 0;
            };
            return getNumericViews(b.views) - getNumericViews(a.views);
          }
        );

        setShorts(sortedShorts);
      } catch (err) {
        setError("Failed to fetch shorts");
        console.error("[useShorts] Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchShorts();
  }, []);

  return { shorts, loading, error };
}

/**
 * Helper function to get numeric view count from formatted string
 */
export function parseViewCount(viewString: string): number {
  if (!viewString) return 0;
  const str = viewString.toString().toUpperCase().replace(/[^0-9.KM]/g, "");
  if (str.includes("M")) return parseFloat(str.replace("M", "")) * 1000000;
  if (str.includes("K")) return parseFloat(str.replace("K", "")) * 1000;
  return parseFloat(str) || 0;
}

/**
 * Hook for fetching announcements
 */
export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    platform: string;
    platformLink: string;
    features: string[];
    status: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/announcements`);
      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }
      const data = await response.json();
      setAnnouncements(data.announcements || []);
    } catch (err) {
      setError("Failed to fetch announcements");
      console.error("[useAnnouncements] Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return { announcements, loading, error, refetch: fetchAnnouncements };
}

/**
 * FAQ item interface
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  visible: boolean;
}

/**
 * Hook for fetching FAQ items
 */
export function useFAQ() {
  const [faq, setFaq] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFAQ() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/faq?visible=true`);
        if (!response.ok) {
          throw new Error("Failed to fetch FAQ");
        }
        const data = await response.json();
        setFaq(data.faq || []);
      } catch (err) {
        setError("Failed to fetch FAQ");
        console.error("[useFAQ] Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFAQ();
  }, []);

  return { faq, loading, error };
}

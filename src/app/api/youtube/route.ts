/**
 * YouTube API Route
 * GET /api/youtube?playlist=xxx or ?category=xxx
 * Fetches playlist videos with 24h caching
 */

import { NextRequest, NextResponse } from "next/server";
import { getPlaylistId, isValidCategory } from "@/config/playlists";
import { fetchPlaylistItems } from "@/lib/youtube-api";
import * as cache from "@/lib/cache";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const playlist = searchParams.get("playlist");
    const category = searchParams.get("category");

    // Validate input
    const categoryKey = playlist || category;

    if (!categoryKey) {
      return NextResponse.json(
        {
          error: "Bad request",
          message:
            'Please provide either "playlist" or "category" query parameter',
        },
        { status: 400 }
      );
    }

    // Validate category
    if (!isValidCategory(categoryKey)) {
      return NextResponse.json(
        {
          error: "Invalid category",
          message: `Category "${categoryKey}" does not exist`,
          validCategories: [
            "tr1",
            "tr1ub",
            "tr2",
            "tr2gold",
            "tr3",
            "tlolc",
            "trlegend",
            "gtav",
            "duke",
            "shorts",
          ],
        },
        { status: 400 }
      );
    }

    // Get playlist ID
    const playlistId = getPlaylistId(categoryKey);

    if (!playlistId) {
      return NextResponse.json(
        {
          error: "Playlist not found",
          message: `No playlist ID found for category "${categoryKey}"`,
        },
        { status: 404 }
      );
    }

    // Check cache first
    const cacheKey = cache.getPlaylistKey(playlistId);
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log(`[API] Cache hit for playlist: ${playlistId}`);
      return NextResponse.json({
        success: true,
        category: categoryKey,
        playlistId: playlistId,
        cached: true,
        videos: cachedData,
        count: Array.isArray(cachedData) ? cachedData.length : 0,
      });
    }

    // Get API key from environment
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error(
        "[API] YouTube API key not found in environment variables"
      );
      return NextResponse.json(
        {
          error: "Server configuration error",
          message: "YouTube API key is not configured",
        },
        { status: 500 }
      );
    }

    // Fetch from YouTube API (all items with pagination)
    console.log(`[API] Fetching playlist from YouTube: ${playlistId}`);
    const videos = await fetchPlaylistItems(playlistId, apiKey);

    // Store in cache
    cache.set(cacheKey, videos);

    console.log(
      `[API] Successfully fetched ${videos.length} videos for ${categoryKey}`
    );

    // Return response
    return NextResponse.json({
      success: true,
      category: categoryKey,
      playlistId: playlistId,
      cached: false,
      videos: videos,
      count: videos.length,
    });
  } catch (error) {
    console.error("[API] Error:", error);

    // Check if it's a YouTube API error
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status: number; data?: { error?: { message?: string } } };
      };
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;

      if (status === 403) {
        return NextResponse.json(
          {
            error: "YouTube API quota exceeded",
            message:
              "Daily API quota has been exceeded. Please try again tomorrow.",
            details: data?.error?.message,
          },
          { status: 403 }
        );
      }

      if (status === 404) {
        return NextResponse.json(
          {
            error: "Playlist not found",
            message: "The requested playlist does not exist or is private",
          },
          { status: 404 }
        );
      }
    }

    // Generic error
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

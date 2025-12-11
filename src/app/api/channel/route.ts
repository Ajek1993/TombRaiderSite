/**
 * YouTube Channel API Route
 * GET /api/channel
 * Fetches channel information (avatar, subscriber count, etc.)
 */

import { NextResponse } from "next/server";
import { fetchChannelInfo } from "@/lib/youtube-api";
import * as cache from "@/lib/cache";

// YouTube channel ID (Bruxa)
const CHANNEL_ID = "UCruOD_YzLm0q_Wy0xcVa5Dg";

export async function GET() {
  try {
    // Check cache first (24-hour cache for channel info)
    const cacheKey = `channel_${CHANNEL_ID}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      console.log("[Channel API] Returning cached channel info");
      return NextResponse.json({
        success: true,
        channel: cached,
        cached: true,
      });
    }

    // Get API key from environment
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error("[Channel API] YouTube API key not configured");
      return NextResponse.json(
        {
          success: false,
          error: "YouTube API key not configured",
        },
        { status: 500 }
      );
    }

    console.log(`[Channel API] Fetching channel info for: ${CHANNEL_ID}`);

    // Fetch channel info
    const channelData = await fetchChannelInfo(CHANNEL_ID, apiKey);

    // Cache for 24 hours (channel info doesn't change often)
    cache.set(cacheKey, channelData);

    console.log(
      `[Channel API] Successfully fetched channel: ${channelData.title}`
    );

    // Return response
    return NextResponse.json({
      success: true,
      channel: channelData,
      cached: false,
    });
  } catch (error) {
    console.error("[Channel API] Error:", error);

    // Check for quota exceeded error
    if (
      error instanceof Error &&
      error.message.includes("quotaExceeded")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "YouTube API quota exceeded. Please try again later.",
          quotaExceeded: true,
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

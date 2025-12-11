"use client";

import { useState, useEffect, useMemo } from "react";
import { ShortCard } from "@/components/ui/VideoCard";
import { useShorts, parseViewCount, Video } from "@/hooks/useVideos";

interface ShortsGridProps {
  onWatchVideo: (videoId: string, videoTitle: string) => void;
}

const INITIAL_VISIBLE = 12;
const SHORTS_PER_LOAD = 12;

export function ShortsGrid({ onWatchVideo }: ShortsGridProps) {
  const { shorts, loading } = useShorts();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Sort shorts by publication date (newest first)
  const sortedShorts = useMemo(() => {
    return [...shorts].sort(
      (a, b) =>
        new Date(b.publishedAtRaw).getTime() -
        new Date(a.publishedAtRaw).getTime()
    );
  }, [shorts]);

  // Find newest short (first in sorted array)
  const newestShort = sortedShorts[0] || null;

  // Find most popular short (highest views)
  const popularShort = useMemo(() => {
    if (sortedShorts.length === 0) return null;
    return sortedShorts.reduce((max, current) => {
      const maxViews = parseViewCount(max.views);
      const currentViews = parseViewCount(current.views);
      return currentViews > maxViews ? current : max;
    }, sortedShorts[0]);
  }, [sortedShorts]);

  const shortsToShow = sortedShorts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedShorts.length;

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + SHORTS_PER_LOAD, sortedShorts.length)
    );
  };

  if (loading) {
    return (
      <section className="highlights-section">
        <div className="container">
          <div className="shorts-grid">
            <div className="loading-message">Ładowanie shorts...</div>
          </div>
        </div>
      </section>
    );
  }

  if (sortedShorts.length === 0) {
    return (
      <section className="highlights-section">
        <div className="container">
          <div className="shorts-grid">
            <div className="no-videos-message">Brak shorts dostępnych</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="highlights-section">
      <div className="container">
        <div className="shorts-grid" id="shorts-grid">
          {shortsToShow.map((short) => (
            <ShortCard
              key={short.id}
              video={short}
              isNew={short.id === newestShort?.id}
              isPopular={short.id === popularShort?.id && short.id !== newestShort?.id}
              onWatch={onWatchVideo}
            />
          ))}
        </div>

        {hasMore && (
          <button className="load-more-btn" onClick={loadMore}>
            <span>Pokaż więcej</span>
            <span className="btn-icon">↓</span>
          </button>
        )}
      </div>
    </section>
  );
}

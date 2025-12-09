"use client";

import Link from "next/link";
import { VideoCard } from "@/components/ui/VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
}

interface HighlightsSectionProps {
  videos: Video[];
  onWatchVideo: (videoId: string, videoTitle: string) => void;
}

export function HighlightsSection({
  videos,
  onWatchVideo,
}: HighlightsSectionProps) {
  return (
    <section className="section section-highlights">
      <div className="container">
        <h2 className="section-title">
          <span className="title-icon">⭐</span>
          <span className="title-text">Highlights - Najlepsze Momenty</span>
        </h2>

        <div className="highlights-grid grid-4">
          {videos.length === 0 ? (
            <p className="loading-message">Ładowanie najlepszych momentów...</p>
          ) : (
            videos.slice(0, 4).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                variant="highlight"
                onWatch={onWatchVideo}
              />
            ))
          )}
        </div>

        <div className="section-cta">
          <Link href="/highlights" className="btn btn-primary">
            Zobacz Wszystkie Highlights →
          </Link>
        </div>
      </div>
    </section>
  );
}

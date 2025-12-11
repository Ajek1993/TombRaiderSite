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

interface LatestGameplaysProps {
  videos: Video[];
  onWatchVideo: (videoId: string, videoTitle: string) => void;
}

export function LatestGameplays({
  videos,
  onWatchVideo,
}: LatestGameplaysProps) {
  return (
    <section className="section section-gameplays">
      <div className="container">
        <h2 className="section-title">
          <span className="title-icon">🎮</span>
          <span className="title-text">Najnowsze Gameplay&apos;e - Tomb Raider</span>
        </h2>

        <div className="gameplay-grid grid-4">
          {videos.length === 0 ? (
            <p className="loading-message">Ładowanie najnowszych gameplay&apos;ów...</p>
          ) : (
            videos.slice(0, 4).map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                isNew={index === 0}
                onWatch={onWatchVideo}
              />
            ))
          )}
        </div>

        <div className="section-cta">
          <Link href="/gameplays" className="btn btn-primary">
            Zobacz Wszystkie Gameplay&apos;e →
          </Link>
        </div>
      </div>
    </section>
  );
}

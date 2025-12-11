"use client";

import { useEffect, useState, useCallback } from "react";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { LatestGameplays } from "@/components/home/LatestGameplays";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { StreamSection } from "@/components/home/StreamSection";
import { WidgetsSection } from "@/components/home/WidgetsSection";
import { VideoModal, useVideoModal } from "@/components/ui/VideoModal";
import {
  useAllGameplays,
  useShorts,
  useChannelInfo,
  useAnnouncements,
  parseViewCount,
  Video,
} from "@/hooks/useVideos";

export default function HomePage() {
  const { videos: gameplayVideos, loading: gameplaysLoading } = useAllGameplays();
  const { shorts, loading: shortsLoading } = useShorts();
  const { channelInfo } = useChannelInfo();
  const { announcements } = useAnnouncements();
  const { isOpen, videoId, videoTitle, openModal, closeModal } = useVideoModal();

  const [mostViewedVideo, setMostViewedVideo] = useState<Video | null>(null);

  // Find most viewed video
  useEffect(() => {
    if (gameplayVideos.length > 0) {
      const sorted = [...gameplayVideos].sort(
        (a, b) => parseViewCount(b.views) - parseViewCount(a.views)
      );
      setMostViewedVideo(sorted[0]);
    }
  }, [gameplayVideos]);

  const handleRandomGameplay = useCallback(() => {
    if (gameplayVideos.length === 0) {
      alert("Brak dostępnych gameplay'ów!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * gameplayVideos.length);
    const randomVideo = gameplayVideos[randomIndex];
    openModal(randomVideo.id, randomVideo.title);
  }, [gameplayVideos, openModal]);

  // Get upcoming stream from announcements
  const upcomingStream = announcements.find(
    (a) => a.status === "scheduled"
  );

  // Get past streams (completed or cancelled)
  const pastStreams = announcements.filter(
    (a) => a.status === "completed" || a.status === "cancelled"
  );

  return (
    <>
      {/* Hero Section */}
      <Hero latestVideo={gameplayVideos[0] || null} />

      {/* About/Intro Section */}
      <AboutSection channelInfo={channelInfo} />

      <div className="section-divider"></div>

      {/* Latest Gameplays Section */}
      <LatestGameplays
        videos={gameplaysLoading ? [] : gameplayVideos}
        onWatchVideo={openModal}
      />

      <div className="section-divider"></div>

      {/* Highlights Section */}
      <HighlightsSection
        videos={shortsLoading ? [] : shorts}
        onWatchVideo={openModal}
      />

      <div className="section-divider"></div>

      {/* Stream Section - always visible */}
      <StreamSection
        upcomingStream={upcomingStream}
        pastStreams={pastStreams}
      />

      <div className="section-divider"></div>

      {/* Gaming Widgets Section */}
      <WidgetsSection
        totalGameplays={gameplayVideos.length}
        totalHighlights={shorts.length}
        mostViewedVideo={mostViewedVideo}
        onRandomGameplay={handleRandomGameplay}
        onWatchVideo={openModal}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={isOpen}
        videoId={videoId}
        videoTitle={videoTitle}
        onClose={closeModal}
      />
    </>
  );
}

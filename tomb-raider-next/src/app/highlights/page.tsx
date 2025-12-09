"use client";

import { ShortsGrid } from "@/components/highlights/ShortsGrid";
import { VideoModal, useVideoModal } from "@/components/ui/VideoModal";

export default function HighlightsPage() {
  const { isOpen, videoId, videoTitle, openModal, closeModal } = useVideoModal();

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">
            <span className="title-icon">⭐</span>
            <span className="title-text">Highlights & Shorts</span>
          </h1>
          <p className="page-description">
            Najlepsze momenty, epickie walki i zabawne sytuacje z przygód Lary
            Croft - w krótkich, dynamicznych klipach!
          </p>
        </div>
      </section>

      {/* Shorts Grid */}
      <ShortsGrid onWatchVideo={openModal} />

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

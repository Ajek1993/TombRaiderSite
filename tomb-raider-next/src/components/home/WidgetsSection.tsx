"use client";

import Image from "next/image";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
}

interface WidgetsSectionProps {
  totalGameplays: number;
  totalHighlights: number;
  mostViewedVideo?: Video | null;
  onRandomGameplay: () => void;
  onWatchVideo: (videoId: string, videoTitle: string) => void;
}

export function WidgetsSection({
  totalGameplays,
  totalHighlights,
  mostViewedVideo,
  onRandomGameplay,
  onWatchVideo,
}: WidgetsSectionProps) {
  return (
    <section className="section section-widgets">
      <div className="container">
        <h2 className="section-title">
          <span className="title-icon">🎲</span>
          <span className="title-text">Gaming Widgets</span>
        </h2>

        <div className="widgets-grid grid-3">
          {/* Random Gameplay Widget */}
          <div className="widget-card card">
            <h3 className="widget-title">🎲 Losowy Gameplay</h3>
            <div className="widget-content">
              <div className="pixel-lara-small">
                <Image
                  src="/assets/images/pixel-art/tomb-widget.png"
                  alt="Tomb Entrance"
                  className="pixel-art-small"
                  width={96}
                  height={96}
                />
              </div>
              <p>Odkryj losowy grobowiec!</p>
              <button
                className="btn btn-primary btn-full"
                onClick={onRandomGameplay}
              >
                🎲 Odkryj Losowy Grób
              </button>
            </div>
          </div>

          {/* Stats Widget */}
          <div className="widget-card card">
            <h3 className="widget-title">🏺 Odkryte Artefakty</h3>
            <div className="widget-content">
              <div className="stat-box">
                <div className="stat-number">
                  {totalGameplays > 0 ? totalGameplays : "..."}
                </div>
                <div className="stat-label">Gameplay&apos;ów</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">
                  {totalHighlights > 0 ? totalHighlights : "..."}
                </div>
                <div className="stat-label">Highlights</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">247</div>
                <div className="stat-label">Sekretów</div>
              </div>
            </div>
          </div>

          {/* Most Viewed Widget */}
          <div className="widget-card card">
            <h3 className="widget-title">🏆 Najczęściej Oglądany</h3>
            <div className="widget-content">
              {mostViewedVideo ? (
                <>
                  <div
                    className="widget-video-thumbnail"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      onWatchVideo(mostViewedVideo.id, mostViewedVideo.title)
                    }
                  >
                    <Image
                      src={mostViewedVideo.thumbnail}
                      alt={`${mostViewedVideo.title} - Tomb Raider Gameplay PL`}
                      width={320}
                      height={180}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "12px",
                      }}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: "14px",
                      marginBottom: "8px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {mostViewedVideo.title}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      marginBottom: "12px",
                    }}
                  >
                    <span>👁 {mostViewedVideo.views}</span>
                    <span>🕐 {mostViewedVideo.duration}</span>
                  </div>
                  <button
                    className="btn btn-secondary btn-small btn-full"
                    onClick={() =>
                      onWatchVideo(mostViewedVideo.id, mostViewedVideo.title)
                    }
                  >
                    Oglądaj →
                  </button>
                </>
              ) : (
                <p className="loading-message">Ładowanie...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

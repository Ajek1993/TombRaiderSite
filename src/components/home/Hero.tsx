"use client";

import Link from "next/link";

interface Video {
  id: string;
  embedUrl: string;
  title: string;
}

interface HeroProps {
  latestVideo?: Video | null;
}

export function Hero({ latestVideo }: HeroProps) {
  return (
    <section className="hero" id="hero">
      {/* Parallax Background Layers */}
      <div className="parallax-container">
        <div className="parallax-layer parallax-layer-4" data-speed="0.1"></div>
        <div className="parallax-layer parallax-layer-3" data-speed="0.2"></div>
        <div className="parallax-layer parallax-layer-2" data-speed="0.5"></div>
        <div className="parallax-layer parallax-layer-1" data-speed="0.8"></div>
      </div>

      <div className="hero-content">
        <div className="container">
          {/* Hero Title */}
          <h1 className="hero-title fade-in">
            Witaj w Moim Grobowcu
            <br />
            Pełnym Przygód!
          </h1>

          <p className="hero-subtitle fade-in">
            Bruxa Gaming - Tomb Raider Adventures
          </p>

          {/* Featured Video */}
          <div className="featured-video fade-in">
            {latestVideo ? (
              <div className="video-embed-wrapper">
                <iframe
                  src={`${latestVideo.embedUrl}?rel=0&modestbranding=1`}
                  className="video-embed-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={latestVideo.title}
                />
              </div>
            ) : (
              <div className="video-placeholder">
                <div className="video-placeholder-content">
                  <span className="play-icon">▶</span>
                  <p>Najnowszy Gameplay</p>
                  <p className="video-title">Ładowanie...</p>
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta fade-in">
            <a
              href="https://www.youtube.com/@bruxa7656"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎮 Subskrybuj Kanał
            </a>
            <Link href="/gameplays" className="btn btn-secondary">
              📺 Zobacz Gameplay&apos;e
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

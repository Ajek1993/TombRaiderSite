"use client";

import Image from "next/image";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: string;
    publishedAt: string;
  };
  isNew?: boolean;
  variant?: "default" | "highlight" | "small";
  onWatch: (videoId: string, videoTitle: string) => void;
}

export function VideoCard({
  video,
  isNew = false,
  variant = "default",
  onWatch,
}: VideoCardProps) {
  const handleWatch = () => {
    onWatch(video.id, video.title);
  };

  if (variant === "highlight") {
    return (
      <article className="highlight-card card">
        <div className="card-thumbnail-wrapper">
          <Image
            src={video.thumbnail}
            alt={`${video.title} - Tomb Raider Highlights PL`}
            className="card-thumbnail thumbnail-small"
            width={320}
            height={180}
            loading="lazy"
          />
        </div>
        <div className="card-content">
          <h3 className="card-title">{video.title}</h3>
          <div className="card-metadata">
            <span>🕐 {video.duration}</span>
            <span>👁 {video.views}</span>
            <span>📅 {video.publishedAt}</span>
          </div>
          <button
            className="btn btn-secondary btn-small watch-highlight-btn"
            onClick={handleWatch}
          >
            Oglądaj →
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className={`gameplay-card card${isNew ? " featured" : ""}`}>
      <div className="card-thumbnail-wrapper">
        <Image
          src={video.thumbnail}
          alt={`${video.title} - Tomb Raider Gameplay PL`}
          className="card-thumbnail"
          width={320}
          height={180}
          loading="lazy"
        />
        {isNew && <span className="badge badge-new">NEW!</span>}
      </div>
      <div className="card-content">
        <h3 className="card-title">{video.title}</h3>
        <div className="card-metadata">
          <span>🕐 {video.duration}</span>
          <span>👁 {video.views}</span>
          <span>📅 {video.publishedAt}</span>
        </div>
        <button
          className="btn btn-secondary btn-small watch-video-btn"
          onClick={handleWatch}
        >
          Oglądaj →
        </button>
      </div>
    </article>
  );
}

interface ShortCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: string;
    publishedAt: string;
    videoUrl?: string;
  };
  isNew?: boolean;
  isPopular?: boolean;
  onWatch: (videoId: string, videoTitle: string) => void;
}

export function ShortCard({
  video,
  isNew = false,
  isPopular = false,
  onWatch,
}: ShortCardProps) {
  const handleClick = () => {
    onWatch(video.id, video.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onWatch(video.id, video.title);
    }
  };

  return (
    <div
      className="short-card"
      tabIndex={0}
      role="button"
      aria-label={`Watch: ${video.title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="short-thumbnail">
        {isNew && <div className="new-badge">NEW</div>}
        {isPopular && !isNew && <div className="popular-badge">POPULAR</div>}
        <Image
          src={video.thumbnail}
          alt={`${video.title} - Tomb Raider Highlights PL`}
          width={180}
          height={320}
          loading="lazy"
        />
        <div className="duration-badge">{video.duration}</div>
      </div>
      <div className="short-info">
        <h3 className="short-title">{video.title}</h3>
        <div className="short-meta">
          <div className="meta-item">
            <span className="meta-icon">👁️</span>
            <span>{video.views}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <span>{video.publishedAt}</span>
          </div>
        </div>
        <button
          className="watch-btn"
          onClick={(e) => {
            e.stopPropagation();
            onWatch(video.id, video.title);
          }}
        >
          ▶ Oglądaj
        </button>
      </div>
    </div>
  );
}

interface GameplayVideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: string;
    publishedAt: string;
  };
  isNew?: boolean;
  onWatch: (videoId: string, videoTitle: string) => void;
}

export function GameplayVideoCard({
  video,
  isNew = false,
  onWatch,
}: GameplayVideoCardProps) {
  return (
    <div className={`video-card${isNew ? " featured" : ""}`}>
      <div className="video-thumbnail">
        {isNew && <div className="new-badge">NEW</div>}
        <Image
          src={video.thumbnail}
          alt={`${video.title} - Tomb Raider Gameplay PL`}
          width={320}
          height={180}
          loading="lazy"
        />
        <div className="duration-badge">{video.duration}</div>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <div className="video-meta">
          <div className="video-meta-row">
            <span className="meta-item">
              <span className="meta-icon">👁️</span>
              {video.views} wyświetleń
            </span>
          </div>
          <div className="video-meta-row">
            <span className="meta-item">
              <span className="meta-icon">📅</span>
              {video.publishedAt}
            </span>
          </div>
        </div>
        <button
          className="watch-btn"
          onClick={() => onWatch(video.id, video.title)}
          aria-label={`Oglądaj ${video.title}`}
        >
          ▶ Oglądaj
        </button>
      </div>
    </div>
  );
}

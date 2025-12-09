"use client";

import { useEffect, useState } from "react";

interface StreamInfo {
  title: string;
  description: string;
  date: string;
  time: string;
  platform: string;
  platformLink: string;
  features: string[];
  status: string;
}

interface StreamSectionProps {
  streamInfo?: StreamInfo | null;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
}

export function StreamSection({ streamInfo }: StreamSectionProps) {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (!streamInfo?.date || !streamInfo?.time) return;

    const targetDate = new Date(`${streamInfo.date}T${streamInfo.time}`);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ days, hours, minutes });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [streamInfo]);

  if (!streamInfo) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="upcoming-stream-section" className="section section-stream">
      <div className="container">
        <h2 className="section-title">
          <span className="title-icon">🔴</span>
          <span className="title-text">Nadchodzący Stream</span>
        </h2>

        <div className="stream-card card featured-card">
          <div className="stream-badge">
            <span className="badge badge-live neon-pulse">🔴 LIVE SOON</span>
          </div>

          <div className="stream-grid">
            <div className="stream-thumbnail">
              <div className="thumbnail-placeholder thumbnail-large">
                <span className="thumbnail-icon">🏔️</span>
              </div>
              <div className="countdown" id="countdown">
                <div className="countdown-label">Zostało:</div>
                <div className="countdown-time">
                  <span>{String(countdown.days).padStart(2, "0")}</span>d{" "}
                  <span>{String(countdown.hours).padStart(2, "0")}</span>h{" "}
                  <span>{String(countdown.minutes).padStart(2, "0")}</span>m
                </div>
              </div>
            </div>

            <div className="stream-info">
              <h3>{streamInfo.title}</h3>
              <p className="stream-description">{streamInfo.description}</p>

              <div className="stream-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span>{formatDate(streamInfo.date)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🕐</span>
                  <span>{streamInfo.time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📱</span>
                  <span>{streamInfo.platform}</span>
                </div>
              </div>

              {streamInfo.features && streamInfo.features.length > 0 && (
                <div className="stream-features">
                  <h4>Co będzie podczas streamu:</h4>
                  <ul>
                    {streamInfo.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="stream-actions">
                <button className="btn btn-primary">🔔 Przypomij Mi</button>
                <button className="btn btn-secondary">
                  📅 Dodaj do Kalendarza
                </button>
                <a
                  href={streamInfo.platformLink || "https://www.tiktok.com/@xbruksiax"}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 Link do {streamInfo.platform}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

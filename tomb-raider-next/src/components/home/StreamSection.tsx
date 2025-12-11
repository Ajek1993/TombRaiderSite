"use client";

import { useEffect, useState } from "react";

interface StreamInfo {
  id: string;
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
  upcomingStream?: StreamInfo | null;
  pastStreams?: StreamInfo[];
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
}

export function StreamSection({ upcomingStream, pastStreams = [] }: StreamSectionProps) {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    if (!upcomingStream?.date || !upcomingStream?.time) return;

    const targetDate = new Date(`${upcomingStream.date}T${upcomingStream.time}`);

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
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, [upcomingStream]);

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
          <span className="title-text">Streamy</span>
        </h2>

        {/* Upcoming Stream */}
        {upcomingStream ? (
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
                <h3>{upcomingStream.title}</h3>
                <p className="stream-description">{upcomingStream.description}</p>

                <div className="stream-details">
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{formatDate(upcomingStream.date)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🕐</span>
                    <span>{upcomingStream.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📱</span>
                    <span>{upcomingStream.platform}</span>
                  </div>
                </div>

                {upcomingStream.features && upcomingStream.features.length > 0 && (
                  <div className="stream-features">
                    <h4>Co będzie podczas streamu:</h4>
                    <ul>
                      {upcomingStream.features.map((feature, index) => (
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
                    href={upcomingStream.platformLink || "https://www.tiktok.com/@xbruksiax"}
                    className="btn btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 Link do {upcomingStream.platform}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* No upcoming stream placeholder */
          <div className="stream-card card featured-card stream-placeholder">
            <div className="stream-placeholder-content">
              <div className="stream-placeholder-icon">📺</div>
              <h3>Brak zaplanowanych streamów</h3>
              <p>Aktualnie nie ma zaplanowanych transmisji na żywo. Śledź nasze media społecznościowe, aby być na bieżąco!</p>
              <a
                href="https://www.tiktok.com/@xbruksiax"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 Obserwuj na TikTok
              </a>
            </div>
          </div>
        )}

        {/* Past Streams History */}
        {pastStreams.length > 0 && (
          <div className="stream-history">
            <button
              className={`stream-history-toggle ${historyOpen ? "open" : ""}`}
              onClick={() => setHistoryOpen(!historyOpen)}
              aria-expanded={historyOpen}
            >
              <span className="toggle-icon">📜</span>
              <span className="toggle-text">Historia Streamów ({pastStreams.length})</span>
              <span className="toggle-arrow">{historyOpen ? "▲" : "▼"}</span>
            </button>

            <div className={`stream-history-content ${historyOpen ? "open" : ""}`}>
              <div className="stream-history-list">
                {pastStreams.map((stream) => (
                  <div key={stream.id} className="stream-history-item card">
                    <div className="stream-history-date">
                      <span className="history-icon">📅</span>
                      <span>{formatDate(stream.date)}</span>
                    </div>
                    <div className="stream-history-info">
                      <h4>{stream.title}</h4>
                      <p>{stream.description}</p>
                      <div className="stream-history-meta">
                        <span className="meta-item">
                          <span className="meta-icon">🕐</span> {stream.time}
                        </span>
                        <span className="meta-item">
                          <span className="meta-icon">📱</span> {stream.platform}
                        </span>
                        <span className={`meta-status status-${stream.status}`}>
                          {stream.status === "completed" ? "✅ Zakończony" :
                           stream.status === "cancelled" ? "❌ Anulowany" : stream.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

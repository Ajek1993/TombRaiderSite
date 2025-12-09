"use client";

import { useState } from "react";
import { GameAccordion } from "@/components/gameplays/GameAccordion";
import { VideoModal, useVideoModal } from "@/components/ui/VideoModal";

type GameType = "tomb-raider" | "other";

export default function GameplaysPage() {
  const [activeGame, setActiveGame] = useState<GameType>("tomb-raider");
  const { isOpen, videoId, videoTitle, openModal, closeModal } = useVideoModal();

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">
            <span className="title-icon">🎮</span>
            <span className="title-text">Wszystkie Gameplay&apos;e</span>
          </h1>
          <p className="page-description">
            Kompletna kolekcja przygód z Larą Croft - od pierwszych kroków w
            Tomb Raider 1 po epickie finały!
          </p>
        </div>
      </section>

      {/* Game Tabs */}
      <section className="game-tabs-section">
        <div className="container">
          <div className="game-tabs">
            <button
              className={`game-tab ${activeGame === "tomb-raider" ? "active" : ""}`}
              onClick={() => setActiveGame("tomb-raider")}
            >
              <span className="tab-icon">🏺</span>
              <span className="tab-text">Tomb Raider</span>
            </button>
            <button
              className={`game-tab ${activeGame === "other" ? "active" : ""}`}
              onClick={() => setActiveGame("other")}
            >
              <span className="tab-icon">🎮</span>
              <span className="tab-text">Inne Gry</span>
            </button>
          </div>
        </div>
      </section>

      {/* Game Accordion */}
      <GameAccordion game={activeGame} onWatchVideo={openModal} />

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

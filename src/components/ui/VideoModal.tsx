"use client";

import { useCallback, useEffect, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  videoId: string;
  videoTitle: string;
  onClose: () => void;
}

export function VideoModal({
  isOpen,
  videoId,
  videoTitle,
  onClose,
}: VideoModalProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="video-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="video-modal">
        <button
          className="video-modal-close"
          onClick={onClose}
          aria-label="Zamknij"
        >
          ×
        </button>
        <div className="video-modal-header">
          <h2 className="video-modal-title" id="video-modal-title">
            {videoTitle}
          </h2>
        </div>
        <div className="video-modal-content">
          <iframe
            className="video-modal-iframe"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={videoTitle}
          />
        </div>
      </div>
    </div>
  );
}

// Hook for managing video modal state
export function useVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const openModal = useCallback((id: string, title: string) => {
    setVideoId(id);
    setVideoTitle(title);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setVideoId("");
    setVideoTitle("");
  }, []);

  return {
    isOpen,
    videoId,
    videoTitle,
    openModal,
    closeModal,
  };
}

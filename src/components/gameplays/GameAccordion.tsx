"use client";

import { useState, useEffect } from "react";
import { GameplayVideoCard } from "@/components/ui/VideoCard";
import { PLAYLISTS } from "@/config/playlists";
import { Video } from "@/hooks/useVideos";

interface GameAccordionProps {
  game: "tomb-raider" | "other";
  onWatchVideo: (videoId: string, videoTitle: string) => void;
}

interface CategoryState {
  videos: Video[];
  loading: boolean;
  visibleCount: number;
  totalCount?: number;
}

const INITIAL_VISIBLE = 3;
const VIDEOS_PER_LOAD = 4;

function formatVideoCount(count: number): string {
  if (count === 1) return "1 film";
  const lastDigit = count % 10;
  const lastTwo = count % 100;
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14)) {
    return `${count} filmy`;
  }
  return `${count} filmów`;
}

export function GameAccordion({ game, onWatchVideo }: GameAccordionProps) {
  // Parent remounts this component (via `key`) when the game tab changes,
  // so initial state can be derived from props here
  const playlists = PLAYLISTS[game];
  const categories = Object.keys(playlists);

  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    categories[0] ?? null
  );
  const [categoryStates, setCategoryStates] = useState<
    Record<string, CategoryState>
  >(() =>
    Object.fromEntries(
      categories.map((cat) => [
        cat,
        {
          videos: [],
          loading: true,
          visibleCount: INITIAL_VISIBLE,
          totalCount: undefined,
        },
      ])
    )
  );

  // Load every category once: the same response gives both the video list
  // and the count shown in the header
  useEffect(() => {
    const categories = Object.keys(PLAYLISTS[game]);
    let cancelled = false;

    categories.forEach(async (category) => {
      let videos: Video[] = [];
      try {
        const response = await fetch(`/api/youtube?playlist=${category}`);
        const data = await response.json();
        videos = data.videos || [];
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      }
      if (cancelled) return;
      setCategoryStates((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          videos,
          loading: false,
          totalCount: videos.length,
        },
      }));
    });

    return () => {
      cancelled = true;
    };
  }, [game]);

  const toggleAccordion = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const loadMore = (category: string) => {
    setCategoryStates((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        visibleCount: prev[category].visibleCount + VIDEOS_PER_LOAD,
      },
    }));
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (!element) return;

    const navbar = document.getElementById("navbar");
    const quickNav = document.querySelector(".quick-nav");
    const offset =
      (navbar?.offsetHeight || 0) +
      ((quickNav as HTMLElement)?.offsetHeight || 0) +
      20;

    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Expand the category if collapsed
    if (expandedCategory !== categoryId) {
      toggleAccordion(categoryId);
    }
  };

  return (
    <>
      {/* Quick Navigation */}
      <section className="quick-nav">
        <div className="container">
          <div className="quick-nav-wrapper">
            <span className="quick-nav-label">Skocz do:</span>
            <div className="quick-nav-links">
              {categories.map((key) => {
                const playlist = playlists[key];
                return (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="quick-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToCategory(key);
                    }}
                  >
                    {playlist.shortName || playlist.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Accordions */}
      <section className="gameplays-section">
        <div className="container">
          <div id="categories-container">
            {categories.map((key) => {
              const playlist = playlists[key];
              const isExpanded = expandedCategory === key;
              const state = categoryStates[key] || {
                videos: [],
                loading: false,
                visibleCount: INITIAL_VISIBLE,
                totalCount: undefined,
              };
              const videosToShow = state.videos.slice(0, state.visibleCount);
              const hasMore = state.visibleCount < state.videos.length;
              const displayCount =
                state.totalCount !== undefined
                  ? formatVideoCount(state.totalCount)
                  : "Ładowanie...";

              return (
                <div className="category-accordion" id={key} key={key}>
                  <button
                    className="category-header"
                    data-category={key}
                    aria-expanded={isExpanded}
                    onClick={() => toggleAccordion(key)}
                  >
                    <div className="category-title">
                      <span className="category-icon">{playlist.icon}</span>
                      <div className="title-text">
                        <h2>{playlist.name}</h2>
                        <span className="video-count">
                          {displayCount}
                        </span>
                      </div>
                    </div>
                    <span className="accordion-icon">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`category-content${
                      isExpanded ? "" : " collapsed"
                    }`}
                    data-category-content={key}
                  >
                    <div className="videos-grid" data-videos-grid={key}>
                      {state.loading ? (
                        <div className="loading-message">
                          Ładowanie filmów...
                        </div>
                      ) : state.videos.length === 0 ? (
                        <div className="no-videos-message">
                          Brak filmów w tej kategorii
                        </div>
                      ) : (
                        videosToShow.map((video, idx) => (
                          <GameplayVideoCard
                            key={video.id}
                            video={video}
                            isNew={idx === 0}
                            onWatch={onWatchVideo}
                          />
                        ))
                      )}
                    </div>

                    {hasMore && (
                      <button
                        className="load-more-btn"
                        onClick={() => loadMore(key)}
                      >
                        <span>Pokaż więcej</span>
                        <span className="btn-icon">↓</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

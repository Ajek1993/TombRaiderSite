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

export function GameAccordion({ game, onWatchVideo }: GameAccordionProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [categoryStates, setCategoryStates] = useState<
    Record<string, CategoryState>
  >({});

  const playlists = PLAYLISTS[game];
  const categories = Object.keys(playlists);

  // Fetch count of videos for a category
  const fetchCategoryCount = async (category: string) => {
    try {
      const response = await fetch(`/api/youtube?playlist=${category}`);
      const data = await response.json();
      const count = data.count || 0;
      setCategoryStates((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          totalCount: count,
        },
      }));
    } catch (error) {
      console.error(`Error fetching count for ${category}:`, error);
    }
  };

  // Initialize category states
  useEffect(() => {
    // Calculate playlists and categories inside useEffect to use fresh game value
    const playlists = PLAYLISTS[game];
    const categories = Object.keys(playlists);

    const initialStates: Record<string, CategoryState> = {};
    categories.forEach((cat, index) => {
      initialStates[cat] = {
        videos: [],
        loading: index === 0, // Set loading true for first category
        visibleCount: INITIAL_VISIBLE,
        totalCount: undefined,
      };
    });
    setCategoryStates(initialStates);

    // Fetch counts for all categories
    categories.forEach((cat) => {
      fetchCategoryCount(cat);
    });

    // Expand first category by default
    if (categories.length > 0) {
      setExpandedCategory(categories[0]);
      fetchCategoryVideos(categories[0]);
    }
  }, [game]);

  const fetchCategoryVideos = async (category: string) => {
    if (categoryStates[category]?.videos.length > 0) {
      return; // Already loaded
    }

    setCategoryStates((prev) => ({
      ...prev,
      [category]: { ...prev[category], loading: true },
    }));

    try {
      const response = await fetch(`/api/youtube?playlist=${category}`);
      const data = await response.json();
      const videos = data.videos || [];

      setCategoryStates((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          videos,
          loading: false,
          totalCount: videos.length,
        },
      }));
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      setCategoryStates((prev) => ({
        ...prev,
        [category]: { ...prev[category], loading: false },
      }));
    }
  };

  const toggleAccordion = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
      fetchCategoryVideos(category);
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
            {categories.map((key, index) => {
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
const displayCount =                 state.totalCount !== undefined                   ? `${state.totalCount} filmów`                   : state.loading                   ? "Ładowanie..."                   : "Ładowanie...";

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

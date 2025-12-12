"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useAllGameplays, useShorts } from "@/hooks/useVideos";

interface SearchResult {
  id: string;
  title: string;
  type: "video" | "faq";
  category?: string;
  categoryName?: string;
  categoryIcon?: string;
  thumbnail?: string;
  question?: string;
  answer?: string;
}

interface SearchProps {
  onVideoSelect: (videoId: string, videoTitle: string) => void;
}

const DEBOUNCE_DELAY = 300;
const MAX_RESULTS_PER_CATEGORY = 5;

export function Search({ onVideoSelect }: SearchProps) {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { videos: gameplayVideos } = useAllGameplays();
  const { shorts } = useShorts();
  const [faqItems, setFaqItems] = useState<SearchResult[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch FAQ items
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await fetch("/api/faq?visible=true");
        const data = await response.json();
        if (data.success && data.faq) {
          const faqResults: SearchResult[] = data.faq.map((item: any) => ({
            id: item.id,
            title: item.question,
            type: "faq" as const,
            categoryName: "FAQ",
            categoryIcon: "❓",
            question: item.question,
            answer: item.answer,
          }));
          setFaqItems(faqResults);
        }
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      }
    };
    fetchFAQ();
  }, []);

  // Combine all videos for search (memoized to prevent infinite re-renders)
  const allVideos = useMemo<SearchResult[]>(() => [
    ...gameplayVideos.map((v) => ({
      id: v.id,
      title: v.title,
      type: "video" as const,
      categoryName: "Gameplay",
      categoryIcon: "🎮",
      thumbnail: v.thumbnail,
    })),
    ...shorts.map((v) => ({
      id: v.id,
      title: v.title,
      type: "video" as const,
      categoryName: "Highlights",
      categoryIcon: "⭐",
      thumbnail: v.thumbnail,
    })),
      ...faqItems,
  ], [gameplayVideos, shorts, faqItems]);

  // Normalize string for search
  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Highlight matched text
  const highlightMatch = (text: string, searchQuery: string): string => {
    if (!searchQuery || !text) return text;

    const normalizedText = normalizeString(text);
    const normalizedQuery = normalizeString(searchQuery);
    const index = normalizedText.indexOf(normalizedQuery);

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + searchQuery.length);
    const after = text.slice(index + searchQuery.length);

    return `${before}<span class="search-highlight">${match}</span>${after}`;
  };

  // Perform search
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      const normalizedQuery = normalizeString(searchQuery);

      const filteredResults = allVideos
        .filter((video) => {
          const title = normalizeString(video.title || "");
          const category = normalizeString(video.categoryName || "");
          const answer = video.type === "faq" ? normalizeString(video.answer || "") : "";
          return title.includes(normalizedQuery) || category.includes(normalizedQuery) || answer.includes(normalizedQuery);
        });

      // Limit results per category (5 videos + 5 FAQ = 10 total max)
      const videoResults = filteredResults.filter(r => r.type === "video").slice(0, MAX_RESULTS_PER_CATEGORY);
      const faqResults = filteredResults.filter(r => r.type === "faq").slice(0, MAX_RESULTS_PER_CATEGORY);
      const combinedResults = [...videoResults, ...faqResults];

      setResults(combinedResults);
      setIsLoading(false);
      setHighlightedIndex(-1);
    },
    [allVideos]
  );

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length === 0) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, performSearch]);

  // Open search
  const openSearch = () => {
    setIsActive(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  // Close search
  const closeSearch = useCallback(() => {
    setIsActive(false);
    setQuery("");
    setResults([]);
    setHighlightedIndex(-1);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isActive) return;

      const target = e.target as Node;
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(target)
      ) {
        closeSearch();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isActive, closeSearch]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, closeSearch]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      const selectedResult = results[highlightedIndex];
      if (selectedResult.type === "video") {
        onVideoSelect(selectedResult.id, selectedResult.title);
        closeSearch();
      } else if (selectedResult.type === "faq") {        window.location.href = `/faq#${selectedResult.id}`;        closeSearch();
      }
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    if (result.type === "video") {
      onVideoSelect(result.id, result.title);
      closeSearch();
    } else if (result.type === "faq") {      window.location.href = `/faq#${result.id}`;      closeSearch();
    }
  };

  return (
    <>
      {/* Search Container in Navbar */}
      <div className="search-container" ref={searchContainerRef}>
        <button className="search-btn" aria-label="Szukaj" onClick={openSearch}>
          <span>🔍</span>
        </button>

        {/* Search Input Wrapper */}
        <div className={`search-input-wrapper ${isActive ? "active" : ""}`}>
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Szukaj filmów..."
            aria-label="Wyszukiwarka"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="search-close-btn"
            aria-label="Zamknij wyszukiwarkę"
            onClick={closeSearch}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Search Dropdown Overlay */}
      <div
        className={`search-dropdown-overlay ${isActive ? "active" : ""}`}
        aria-hidden={!isActive}
        ref={searchResultsRef}
      >
        <div className={`search-results ${results.length > 0 || isLoading || query.length >= 2 ? "show" : ""}`}>
          {isLoading ? (
            <div className="search-loading">
              <div className="search-loading-spinner"></div>
              <div className="search-loading-text">Ładowanie...</div>
            </div>
          ) : results.length === 0 && query.length >= 2 ? (
            <div className="search-empty">
              <div className="search-empty-icon">🔍</div>
              <div className="search-empty-text">Nie znaleziono wyników</div>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="search-results-header">
                Znaleziono {results.length} wynik
                {results.length === 1 ? "" : results.length < 5 ? "i" : "ów"}
              </div>
              <div className="search-results-list">
                {results.filter(r => r.type === "video").length > 0 && (
                  <div className="search-category">
                    <div className="search-category-title">🎮 Filmy</div>
                    {results.filter(r => r.type === "video").map((result, index) => (
                      <div
                        key={result.id}
                        className={`search-result-item ${index === highlightedIndex ? "highlighted" : ""}`}
                        onClick={() => handleResultClick(result)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="search-result-icon">{result.categoryIcon}</div>
                        <div className="search-result-content">
                          <div
                            className="search-result-title"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(result.title, query),
                            }}
                          />
                          <div className="search-result-meta">
                            <span className="search-result-badge">{result.categoryName}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {results.filter(r => r.type === "faq").length > 0 && (
                  <div className="search-category">
                    <div className="search-category-title">❓ FAQ</div>
                    {results.filter(r => r.type === "faq").map((result, index) => (
                      <div
                        key={result.id}
                        className={`search-result-item ${index === highlightedIndex ? "highlighted" : ""}`}
                        onClick={() => handleResultClick(result)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="search-result-icon">{result.categoryIcon}</div>
                        <div className="search-result-content">
                          <div
                            className="search-result-title"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(result.title, query),
                            }}
                          />
                          <div className="search-result-meta">
                            <span className="search-result-badge">{result.categoryName}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

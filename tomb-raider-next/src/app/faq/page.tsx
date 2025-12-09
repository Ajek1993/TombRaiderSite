"use client";

import { useState, useMemo } from "react";
import { useFAQ, FAQItem } from "@/hooks/useVideos";

const FAQ_CATEGORIES = [
  { id: "all", label: "Wszystkie" },
  { id: "Ogólne/O Kanale", label: "Ogólne/O Kanale" },
  { id: "Streamy/Techniczne", label: "Streamy/Techniczne" },
  { id: "Gry/Gameplay", label: "Gry/Gameplay" },
];

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatAnswer(text: string): string {
  if (!text) return "";

  // Escape HTML first
  const escaped = escapeHtml(text);

  // Split by double line breaks for paragraphs
  const paragraphs = escaped.split(/\n\n+/);

  return paragraphs
    .map((p) => {
      // Convert single line breaks to <br>
      const withBreaks = p.replace(/\n/g, "<br>");
      return `<p>${withBreaks}</p>`;
    })
    .join("");
}

interface FAQItemProps {
  item: FAQItem;
  isExpanded: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ item, isExpanded, onToggle }: FAQItemProps) {
  return (
    <div className={`faq-item ${isExpanded ? "active" : ""}`}>
      <button
        className="faq-question"
        aria-expanded={isExpanded}
        onClick={onToggle}
      >
        <div className="faq-question-text">
          {item.question}
          <div className="faq-category-badge">{item.category}</div>
        </div>
        <span className="faq-icon">▼</span>
      </button>
      <div className="faq-answer">
        <div
          className="faq-answer-content"
          dangerouslySetInnerHTML={{ __html: formatAnswer(item.answer) }}
        />
      </div>
    </div>
  );
}

export default function FAQPage() {
  const { faq, loading, error } = useFAQ();
  const [currentCategory, setCurrentCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQ = useMemo(() => {
    if (currentCategory === "all") {
      return faq;
    }
    return faq.filter((item) => item.category === currentCategory);
  }, [faq, currentCategory]);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="faq-page">
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <h1>Często Zadawane Pytania</h1>
          <p>
            Znajdź odpowiedzi na najczęściej zadawane pytania o kanał i streamy
          </p>
        </div>

        {/* Category Filters */}
        <div className="faq-filters">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${currentCategory === category.id ? "active" : ""}`}
              onClick={() => setCurrentCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="faq-loading">
            <div className="loading-spinner"></div>
            <p>Ładowanie pytań...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="faq-empty">
            <p>Nie udało się załadować pytań. Spróbuj odświeżyć stronę.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredFAQ.length === 0 && (
          <div className="faq-empty">
            <p>Brak pytań w tej kategorii</p>
          </div>
        )}

        {/* FAQ Accordion */}
        {!loading && !error && filteredFAQ.length > 0 && (
          <div className="faq-accordion" id="faqAccordion">
            {filteredFAQ.map((item) => (
              <FAQItemComponent
                key={item.id}
                item={item}
                isExpanded={expandedId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

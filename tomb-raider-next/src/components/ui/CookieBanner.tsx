"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const COOKIE_NAME = "bruxa_cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check consent on mount
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_NAME);
    if (consent === null) {
      // Show banner with delay for animation
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 100);
    } else {
      // Apply stored consent
      applyConsent(consent === "accepted");
    }
  }, []);

  const applyConsent = useCallback((hasConsent: boolean) => {
    // Store consent state globally
    if (typeof window !== "undefined") {
      (window as unknown as { cookieConsentAccepted: boolean }).cookieConsentAccepted = hasConsent;
    }

    // Dispatch custom event for other components
    const event = new CustomEvent("cookieConsentChanged", {
      detail: { hasConsent },
    });
    document.dispatchEvent(event);
  }, []);

  const saveConsent = useCallback((consent: ConsentStatus) => {
    if (consent) {
      localStorage.setItem(COOKIE_NAME, consent);
      localStorage.setItem(`${COOKIE_NAME}_timestamp`, new Date().toISOString());
    }
  }, []);

  const hideBanner = useCallback(() => {
    setIsAnimating(false);
    // Wait for animation to complete
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  }, []);

  const handleAccept = useCallback(() => {
    saveConsent("accepted");
    applyConsent(true);
    hideBanner();
  }, [saveConsent, applyConsent, hideBanner]);

  const handleDecline = useCallback(() => {
    saveConsent("declined");
    applyConsent(false);
    hideBanner();
  }, [saveConsent, applyConsent, hideBanner]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`cookie-banner ${isAnimating ? "show" : ""}`}
      id="cookieBanner"
      role="dialog"
      aria-labelledby="cookieBannerTitle"
      aria-describedby="cookieBannerDesc"
    >
      <div className="cookie-banner-container">
        <div className="cookie-banner-content">
          <h3 className="cookie-banner-title" id="cookieBannerTitle">
            <span className="cookie-banner-icon">🍪</span>
            Ta strona używa ciasteczek
          </h3>
          <p className="cookie-banner-text" id="cookieBannerDesc">
            Używamy ciasteczek do osadzania filmów z YouTube oraz do zapisywania
            Twoich preferencji (np. motyw strony). Możesz je zaakceptować lub
            odrzucić.{" "}
            <Link href="/privacy">Dowiedz się więcej</Link> |{" "}
            <Link href="/cookies">Polityka cookies</Link>
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            className="cookie-banner-btn cookie-banner-btn-accept"
            onClick={handleAccept}
            aria-label="Zaakceptuj wszystkie ciasteczka"
          >
            ✓ Akceptuję
          </button>
          <button
            className="cookie-banner-btn cookie-banner-btn-decline"
            onClick={handleDecline}
            aria-label="Odrzuć nieobowiązkowe ciasteczka"
          >
            ✗ Tylko niezbędne
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook to get YouTube embed URL based on consent
export function useYouTubeEmbedUrl(videoId: string): string {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_NAME);
    setHasConsent(consent === "accepted");

    const handleConsentChange = (e: CustomEvent<{ hasConsent: boolean }>) => {
      setHasConsent(e.detail.hasConsent);
    };

    document.addEventListener(
      "cookieConsentChanged",
      handleConsentChange as EventListener
    );
    return () => {
      document.removeEventListener(
        "cookieConsentChanged",
        handleConsentChange as EventListener
      );
    };
  }, []);

  if (hasConsent === true) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

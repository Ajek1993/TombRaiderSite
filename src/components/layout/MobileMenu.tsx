"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
}

export function MobileMenu({ isOpen, onClose, activePage }: MobileMenuProps) {
  const isActive = (page: string) => (activePage === page ? "active" : "");

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`} id="mobile-menu">
        <ul className="mobile-menu-list">
          <li>
            <Link
              href="/"
              className={`mobile-menu-link ${isActive("home")}`}
              onClick={onClose}
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <Link
              href="/gameplays"
              className={`mobile-menu-link ${isActive("gameplays")}`}
              onClick={onClose}
            >
              🎮 Gameplay&apos;e
            </Link>
          </li>
          <li>
            <Link
              href="/highlights"
              className={`mobile-menu-link ${isActive("highlights")}`}
              onClick={onClose}
            >
              ⭐ Highlights
            </Link>
          </li>
          <li>
            <Link
              href="/#about"
              className={`mobile-menu-link ${isActive("about")}`}
              onClick={onClose}
            >
              👤 O Mnie
            </Link>
          </li>
        </ul>

        <div className="section-divider"></div>

        {/* Mobile Social Icons */}
        <div className="mobile-social">
          <h3>Social Media</h3>
          <div className="social-grid">
            <a
              href="https://www.youtube.com/@bruxa7656"
              className="mobile-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>▶</span> YouTube
            </a>
            <a
              href="https://www.tiktok.com/@xbruksiax"
              className="mobile-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>♪</span> TikTok
            </a>
            <a
              href="https://discord.com/invite/zjsA5Cw8G"
              className="mobile-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span> Discord
            </a>
          </div>
        </div>

        {/* Mobile Theme Section */}
        <ThemeSwitcher variant="mobile" />
      </div>
    </>
  );
}

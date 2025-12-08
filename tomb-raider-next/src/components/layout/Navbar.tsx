"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileMenu } from "./MobileMenu";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Determine active page based on pathname
  const getActivePage = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/gameplays")) return "gameplays";
    if (pathname.startsWith("/highlights")) return "highlights";
    if (pathname.includes("#about")) return "about";
    return "";
  };

  const activePage = getActivePage();
  const isActive = (page: string) => (activePage === page ? "active" : "");

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="container navbar-container">
          {/* Logo */}
          <Link href="/" className="logo">
            <span className="logo-icon">🏺</span>
            <div className="logo-text">
              <div className="logo-name">BRUXA GAMING</div>
              <div className="logo-tagline">Tomb Raider Adventures</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            <li>
              <Link href="/" className={`nav-link ${isActive("home")}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/gameplays" className={`nav-link ${isActive("gameplays")}`}>
                Gameplay&apos;e
              </Link>
            </li>
            <li>
              <Link href="/highlights" className={`nav-link ${isActive("highlights")}`}>
                Highlights
              </Link>
            </li>
            <li>
              <Link href="/#about" className={`nav-link ${isActive("about")}`}>
                O Mnie
              </Link>
            </li>
          </ul>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Social Icons */}
            <div className="social-icons">
              <a
                href="https://www.youtube.com/@bruxa7656"
                className="social-icon"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>▶</span>
              </a>
              <a
                href="https://www.tiktok.com/@xbruksiax"
                className="social-icon"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>♪</span>
              </a>
            </div>

            {/* Search Button */}
            <button className="search-btn" aria-label="Szukaj">
              <span>🔍</span>
            </button>

            {/* Theme Switcher Button */}
            <ThemeSwitcher variant="desktop" />

            {/* Hamburger Menu (Mobile) */}
            <button
              className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activePage={activePage}
      />
    </>
  );
}

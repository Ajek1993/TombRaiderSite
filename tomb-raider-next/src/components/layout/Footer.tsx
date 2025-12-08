import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 */}
          <div className="footer-column">
            <h4>O Stronie</h4>
            <ul className="footer-links">
              <li>
                <Link href="/#about">O Mnie</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/privacy">Polityka Prywatności</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-column">
            <h4>Nawigacja</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/gameplays">Gameplay&apos;e</Link>
              </li>
              <li>
                <Link href="/highlights">Highlights</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-column">
            <h4>Gameplay&apos;e</h4>
            <ul className="footer-links">
              <li>
                <Link href="/gameplays?game=tomb-raider">Tomb Raider</Link>
              </li>
              <li>
                <Link href="/gameplays?game=other">Inne Gry</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-column">
            <h4>Social Media</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://www.youtube.com/@bruxa7656"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶ YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@xbruksiax"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ♪ TikTok
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="footer-column">
            <h4>Kontakt</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:contact@example.com">📧 Email</a>
              </li>
              <li>
                <Link href="/business">💼 Współpraca</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-logo">
            <span className="logo-icon">🏺</span>
            <div className="pixel-lara-footer">
              <Image
                src="/assets/images/pixel-art/lara-croft-hero.png"
                alt="Lara Croft Logo"
                className="pixel-art-tiny"
                width={64}
                height={64}
                loading="lazy"
              />
            </div>
          </div>

          <div className="footer-info">
            <p>© 2025 Bruxa Gaming | Tomb Raider Fan Site</p>
            <p className="footer-tagline">Powered by passion for adventure 💎</p>
          </div>

          <div className="footer-credits">
            <p>
              Created by 🤖{" "}
              <a
                href="https://my-portoflio-mu.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arkadiusz Sarach
              </a>
            </p>
            <p>
              <Link href="/privacy">Privacy</Link> |{" "}
              <Link href="/terms">Terms</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

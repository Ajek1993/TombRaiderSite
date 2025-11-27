/**
 * Navbar Component
 * Renders the navigation bar with active page highlighting
 * @param {string} activePage - Current page identifier ('home', 'gameplays', 'highlights', 'about')
 * @returns {string} HTML string for navbar
 */
export function renderNavbar(activePage = '') {
  const isActive = (page) => activePage === page ? 'active' : '';

  return `
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
      <div class="container navbar-container">
        <!-- Logo -->
        <a href="/" class="logo">
          <span class="logo-icon">🏺</span>
          <div class="logo-text">
            <div class="logo-name">BRUXA GAMING</div>
            <div class="logo-tagline">Tomb Raider Adventures</div>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <ul class="nav-menu">
          <li><a href="/" class="nav-link ${isActive('home')}">Home</a></li>
          <li><a href="/gameplays.html" class="nav-link ${isActive('gameplays')}">Gameplay'e</a></li>
          <li><a href="/highlights.html" class="nav-link ${isActive('highlights')}">Highlights</a></li>
          <li><a href="/#about" class="nav-link ${isActive('about')}">O Mnie</a></li>
        </ul>

        <!-- Nav Actions -->
        <div class="nav-actions">
          <!-- Social Icons -->
          <div class="social-icons">
            <a
              href="https://www.youtube.com/@bruxa7656"
              class="social-icon"
              aria-label="YouTube"
              target="_blank"
              rel="noopener"
            >
              <span>▶</span>
            </a>
            <a
              href="https://www.tiktok.com/@xbruksiax"
              class="social-icon"
              aria-label="TikTok"
              target="_blank"
              rel="noopener"
            >
              <span>♪</span>
            </a>
            <!-- <a href="https://discord.gg/placeholder" class="social-icon" aria-label="Discord" target="_blank" rel="noopener">
            <span>💬</span>
          </a> -->
          </div>

          <!-- Search Button -->
          <button class="search-btn" aria-label="Szukaj">
            <span>🔍</span>
          </button>

          <!-- Theme Switcher Button -->
          <button
            class="theme-btn"
            aria-label="Change Theme"
            title="Change Theme"
          >
            <span class="theme-icon">🎨</span>
            <span class="theme-label">Original</span>
          </button>

          <!-- Hamburger Menu (Mobile) -->
          <button class="hamburger" aria-label="Menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>
    </nav>
  `;
}

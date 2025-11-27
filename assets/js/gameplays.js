/**
 * GAMEPLAYS PAGE - JavaScript
 * Handles accordion categories, video loading with YouTube API
 */

// ===================================
// CONFIGURATION
// ===================================

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? `http://${window.location.hostname}:${window.location.port}/api`  // Local development
  : '/api';  // Production

// ===================================
// GAME DETECTION & DYNAMIC CATEGORIES
// ===================================

/**
 * Get current game from URL parameter
 * @returns {string} Game key (tomb-raider or other)
 */
function getGameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const game = params.get('game');

  // Default to tomb-raider if not specified or invalid
  if (!game || !PLAYLISTS[game] || game === 'shorts') {
    return 'tomb-raider';
  }

  return game;
}

// Get current game and its categories dynamically
const currentGame = getGameFromUrl();
const CATEGORIES = Object.keys(PLAYLISTS[currentGame] || {});

console.log(`[Gameplays] Loading game: ${currentGame}, categories:`, CATEGORIES);

// ===================================
// STATE MANAGEMENT
// ===================================

// Initialize visibleVideos dynamically for current categories
const initialVisibleVideos = {};
CATEGORIES.forEach(cat => {
  initialVisibleVideos[cat] = 3; // Show 3 videos initially per category
});

const state = {
  videosData: {},  // Stores fetched videos per category
  videoCounts: {}, // Stores video counts per category
  visibleVideos: initialVisibleVideos,
  videosPerLoad: 4,
  loading: {}  // Track loading state per category
};

// ===================================
// API FUNCTIONS
// ===================================

/**
 * Fetch videos for a specific category from API
 * @param {string} category - Category key (tr1, tr2, etc.)
 * @returns {Promise<Array>} Array of video objects
 */
async function fetchCategoryVideos(category) {
  try {
    console.log(`[Gameplays] Fetching videos for category: ${category}`);

    const response = await fetch(`${API_BASE_URL}/youtube?playlist=${category}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch videos');
    }

    const data = await response.json();

    console.log(`[Gameplays] Received ${data.count} videos for ${category}`, data.cached ? '(cached)' : '(fresh)');

    return data.videos || [];

  } catch (error) {
    console.error(`[Gameplays] Error fetching ${category}:`, error);
    return [];
  }
}

/**
 * Fetch all category counts (lightweight - only fetch count, not full data)
 */
async function fetchAllCategoryCounts() {
  console.log('[Gameplays] Fetching counts for all categories...');

  const promises = CATEGORIES.map(async (category) => {
    try {
      const videos = await fetchCategoryVideos(category);
      state.videosData[category] = videos; // Store for later use
      state.videoCounts[category] = videos.length;
      return { category, count: videos.length };
    } catch (error) {
      console.error(`[Gameplays] Error fetching count for ${category}:`, error);
      return { category, count: 0 };
    }
  });

  const results = await Promise.all(promises);

  // Update UI with counts
  results.forEach(({ category, count }) => {
    const countSpan = document.querySelector(`[data-count="${category}"]`);
    if (countSpan) {
      countSpan.textContent = `${count} filmów`;
    }
  });

  console.log('[Gameplays] All counts loaded:', state.videoCounts);
}

// ===================================
// VIDEO CARD RENDERING
// ===================================

/**
 * Create HTML for a video card
 * @param {object} video - Video object from API
 * @param {boolean} isNew - Whether this is the newest video
 * @returns {HTMLElement} Video card element
 */
function createVideoCard(video, isNew = false) {
  const card = document.createElement('div');
  card.className = `video-card${isNew ? ' featured' : ''}`;

  card.innerHTML = `
    <div class="video-thumbnail">
      ${isNew ? '<div class="new-badge">NEW</div>' : ''}
      ${video.thumbnail ? `<img src="${video.thumbnail}" alt="${video.title}" loading="lazy">` : ''}
      <div class="duration-badge">${video.duration}</div>
    </div>
    <div class="video-info">
      <h3 class="video-title">${video.title}</h3>
      <div class="video-meta">
        <div class="video-meta-row">
          <span class="meta-item">
            <span class="meta-icon">👁️</span>
            ${video.views} wyświetleń
          </span>
        </div>
        <div class="video-meta-row">
          <span class="meta-item">
            <span class="meta-icon">📅</span>
            ${video.publishedAt}
          </span>
        </div>
      </div>
      <button
        class="watch-btn"
        data-video-id="${video.id}"
        data-video-title="${video.title}"
        aria-label="Oglądaj ${video.title}">
        ▶ Oglądaj
      </button>
    </div>
  `;

  // Add click event listener to open modal
  const watchBtn = card.querySelector('.watch-btn');
  if (watchBtn && window.VideoModal) {
    watchBtn.addEventListener('click', () => {
      const videoId = watchBtn.getAttribute('data-video-id');
      const videoTitle = watchBtn.getAttribute('data-video-title');
      window.VideoModal.open(videoId, videoTitle);
    });
  }

  return card;
}

/**
 * Render videos for a specific category
 * @param {string} category - Category key
 */
async function renderVideos(category) {
  const grid = document.querySelector(`[data-videos-grid="${category}"]`);
  const loadMoreBtn = document.querySelector(`[data-category="${category}"].load-more-btn`);
  const videoCountSpan = document.querySelector(`[data-count="${category}"]`);

  if (!grid) return;

  // Check if we already have data (will be pre-fetched by fetchAllCategoryCounts)
  if (!state.videosData[category]) {
    // Shouldn't happen if fetchAllCategoryCounts was called, but fallback just in case
    console.log(`[Gameplays] Data not pre-fetched for ${category}, fetching now...`);
    grid.innerHTML = '<div class="loading-message">Ładowanie filmów...</div>';
    state.loading[category] = true;

    const videos = await fetchCategoryVideos(category);
    state.videosData[category] = videos;
    state.loading[category] = false;

    if (videoCountSpan) {
      videoCountSpan.textContent = `${videos.length} filmów`;
    }
  }

  const videos = state.videosData[category] || [];
  const visibleCount = state.visibleVideos[category];
  const videosToShow = videos.slice(0, visibleCount);

  // Clear grid
  grid.innerHTML = '';

  if (videos.length === 0) {
    grid.innerHTML = '<div class="no-videos-message">Brak filmów w tej kategorii</div>';
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  // Add video cards
  videosToShow.forEach((video, index) => {
    const isNew = index === 0;  // First video is newest
    grid.appendChild(createVideoCard(video, isNew));
  });

  // Show/hide "Load More" button
  if (loadMoreBtn) {
    if (visibleCount < videos.length) {
      loadMoreBtn.style.display = 'flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
}

/**
 * Load more videos for a category
 * @param {string} category - Category key
 */
function loadMoreVideos(category) {
  const videos = state.videosData[category] || [];
  const currentVisible = state.visibleVideos[category];
  const newVisible = Math.min(currentVisible + state.videosPerLoad, videos.length);

  state.visibleVideos[category] = newVisible;
  renderVideos(category);
}

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================

/**
 * Toggle accordion category
 * @param {string} category - Category key
 */
function toggleAccordion(category) {
  const header = document.querySelector(`[data-category="${category}"].category-header`);
  const content = document.querySelector(`[data-category-content="${category}"]`);

  if (!header || !content) return;

  const isExpanded = header.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    // Collapse
    header.setAttribute('aria-expanded', 'false');
    content.classList.add('collapsed');
    header.querySelector('.accordion-icon').textContent = '+';
  } else {
    // Expand
    header.setAttribute('aria-expanded', 'true');
    content.classList.remove('collapsed');
    header.querySelector('.accordion-icon').textContent = '−';

    // Render videos if grid is empty (even if data is already loaded)
    const grid = document.querySelector(`[data-videos-grid="${category}"]`);
    if (grid && grid.children.length === 0 && state.videosData[category]) {
      renderVideos(category);
    }
  }
}

// ===================================
// SMOOTH SCROLL FOR QUICK NAV
// ===================================

/**
 * Smooth scroll to category
 * @param {string} categoryId - Category ID
 */
function scrollToCategory(categoryId) {
  const element = document.getElementById(categoryId);
  if (!element) return;

  const navbar = document.getElementById('navbar');
  const quickNav = document.querySelector('.quick-nav');
  const offset = (navbar?.offsetHeight || 0) + (quickNav?.offsetHeight || 0) + 20;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });

  // Expand the category if collapsed
  const header = document.querySelector(`[data-category="${categoryId}"].category-header`);
  if (header && header.getAttribute('aria-expanded') === 'false') {
    toggleAccordion(categoryId);
  }
}

// ===================================
// DYNAMIC ACCORDION BUILDER
// ===================================

/**
 * Build category accordions dynamically based on current game
 */
function buildCategoryAccordions() {
  const container = document.getElementById('categories-container');

  if (!container) {
    console.error('[Gameplays] Categories container not found');
    return;
  }

  const playlists = PLAYLISTS[currentGame];

  if (!playlists) {
    container.innerHTML = '<div class="no-content-message"><p>Nie znaleziono playlist dla tej kategorii</p></div>';
    return;
  }

  // Build HTML for each category
  const accordionsHTML = Object.keys(playlists).map((key, index) => {
    const playlist = playlists[key];
    const isExpanded = index === 0; // First one expanded by default

    return `
      <div class="category-accordion" id="${key}">
        <button class="category-header" data-category="${key}" aria-expanded="${isExpanded}">
          <div class="category-title">
            <span class="category-icon">${playlist.icon}</span>
            <h2>${playlist.name}</h2>
            <span class="video-count" data-count="${key}">Loading...</span>
          </div>
          <span class="accordion-icon">${isExpanded ? '−' : '+'}</span>
        </button>
        <div class="category-content${isExpanded ? '' : ' collapsed'}" data-category-content="${key}">
          <div class="videos-grid" data-videos-grid="${key}">
            <!-- Videos will be loaded by JavaScript -->
          </div>
          <button class="load-more-btn" data-category="${key}" style="display: none;">
            <span>Pokaż więcej</span>
            <span class="btn-icon">↓</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = accordionsHTML;

  // Build quick navigation
  buildQuickNavigation();
}

/**
 * Build quick navigation links dynamically
 */
function buildQuickNavigation() {
  const quickNavLinks = document.querySelector('.quick-nav-links');

  if (!quickNavLinks) return;

  const playlists = PLAYLISTS[currentGame];

  const linksHTML = Object.keys(playlists).map(key => {
    const playlist = playlists[key];
    // Use shortName property from playlist config
    const shortName = playlist.shortName || playlist.name;
    return `<a href="#${key}" class="quick-nav-link">${shortName}</a>`;
  }).join('');

  quickNavLinks.innerHTML = linksHTML;
}

/**
 * Update page header with game-specific content
 */
function updatePageHeader() {
  const metadata = getGameMetadata(currentGame);

  const titleElement = document.querySelector('.page-title h1');
  const descElement = document.querySelector('.page-description');

  if (titleElement) {
    titleElement.innerHTML = `
      <span class="title-icon">${metadata.icon}</span>
      ${metadata.title}
    `;
  }

  if (descElement) {
    descElement.textContent = metadata.description;
  }
}

// ===================================
// EVENT LISTENERS
// ===================================

document.addEventListener('DOMContentLoaded', async () => {

  // Build dynamic accordions based on URL param
  buildCategoryAccordions();
  updatePageHeader();

  // Fetch all category counts first (pre-load all data)
  await fetchAllCategoryCounts();

  // Render initial videos for first category (expanded by default)
  if (CATEGORIES.length > 0) {
    renderVideos(CATEGORIES[0]);
  }

  // Accordion headers
  document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
      const category = header.getAttribute('data-category');
      toggleAccordion(category);
    });
  });

  // Load More buttons
  document.querySelectorAll('.load-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      loadMoreVideos(category);
    });
  });

  // Quick navigation links
  document.querySelectorAll('.quick-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const categoryId = link.getAttribute('href').substring(1); // Remove #
      scrollToCategory(categoryId);
    });
  });

  // Keyboard navigation for accordions
  document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Quick-nav visibility is now managed by window.initializeNavbar() in main.js
  // This ensures consistent behavior across all navigation elements

});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderVideos,
    loadMoreVideos,
    toggleAccordion,
    scrollToCategory,
    fetchCategoryVideos
  };
}

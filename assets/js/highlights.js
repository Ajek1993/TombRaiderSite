/**
 * HIGHLIGHTS PAGE - JavaScript
 * Handles vertical short cards rendering with YouTube API
 */

// ===================================
// CONFIGURATION
// ===================================

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? `http://${window.location.hostname}:${window.location.port}/api`  // Local development
  : '/api';  // Production

// ===================================
// STATE MANAGEMENT
// ===================================

const state = {
  allShorts: [],
  visibleShorts: 12,
  shortsPerLoad: 12,
  newestShort: null,
  popularShort: null,
  loading: false
};

// ===================================
// API FUNCTIONS
// ===================================

/**
 * Fetch shorts from API
 * @returns {Promise<Array>} Array of short video objects
 */
async function fetchShorts() {
  try {
    console.log('[Highlights] Fetching shorts from API');

    const response = await fetch(`${API_BASE_URL}/youtube?playlist=shorts`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch shorts');
    }

    const data = await response.json();

    console.log(`[Highlights] Received ${data.count} shorts`, data.cached ? '(cached)' : '(fresh)');

    // Sortuj shortsy po dacie publikacji (od najnowszych do najstarszych)
    const sortedVideos = (data.videos || []).sort((a, b) => {
      return new Date(b.publishedAtRaw) - new Date(a.publishedAtRaw);
    });

    return sortedVideos;

  } catch (error) {
    console.error('[Highlights] Error fetching shorts:', error);
    throw error;
  }
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize shorts with badges
 */
async function initializeShorts() {
  try {
    state.loading = true;

    // Fetch shorts from API
    state.allShorts = await fetchShorts();

    if (state.allShorts.length === 0) {
      console.warn('[Highlights] No shorts found');
      return;
    }

    // Find newest short (first in array - most recent)
    state.newestShort = state.allShorts[0];

    // Find most popular short (highest views)
    state.popularShort = state.allShorts.reduce((max, current) => {
      const maxViews = parseViewCount(max.views);
      const currentViews = parseViewCount(current.views);
      return currentViews > maxViews ? current : max;
    }, state.allShorts[0]);

    state.loading = false;

    console.log('[Highlights] Initialized:', {
      total: state.allShorts.length,
      newest: state.newestShort.title,
      popular: state.popularShort.title
    });

  } catch (error) {
    state.loading = false;
    throw error;
  }
}

/**
 * Parse view count string to number
 * @param {string} viewString - View count string (e.g., "1.2K", "3.4M")
 * @returns {number} View count as number
 */
function parseViewCount(viewString) {
  if (!viewString) return 0;

  const str = viewString.toUpperCase().replace(/[^0-9.KM]/g, '');

  if (str.includes('M')) {
    return parseFloat(str.replace('M', '')) * 1000000;
  } else if (str.includes('K')) {
    return parseFloat(str.replace('K', '')) * 1000;
  }

  return parseFloat(str) || 0;
}

// ===================================
// SHORT CARD RENDERING
// ===================================

/**
 * Create HTML for a short card
 * @param {object} short - Short video object from API
 * @returns {HTMLElement} Short card element
 */
function createShortCard(short) {
  const card = document.createElement('div');
  card.className = 'short-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Watch: ${short.title}`);

  // Determine badge
  let badge = '';
  if (short.id === state.newestShort?.id) {
    badge = '<div class="new-badge">NEW</div>';
  } else if (short.id === state.popularShort?.id) {
    badge = '<div class="popular-badge">POPULAR</div>';
  }

  card.innerHTML = `
    <div class="short-thumbnail">
      ${badge}
      ${short.thumbnail ? `<img src="${short.thumbnail}" alt="${short.title} - Tomb Raider Highlights PL" loading="lazy">` : ''}
      <div class="duration-badge">${short.duration}</div>
    </div>
    <div class="short-info">
      <h3 class="short-title">${short.title}</h3>
      <div class="short-meta">
        <div class="meta-item">
          <span class="meta-icon">👁️</span>
          <span>${short.views}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">📅</span>
          <span>${short.publishedAt}</span>
        </div>
      </div>
      <button class="watch-btn" data-video-id="${short.id}" data-video-title="${short.title}">
        ▶ Oglądaj
      </button>
    </div>
  `;

  // Click on card or button opens modal
  const openModal = () => {
    if (window.VideoModal) {
      window.VideoModal.open(short.id, short.title);
    } else {
      // Fallback to YouTube if modal not available
      window.open(short.videoUrl, '_blank');
    }
  };

  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('watch-btn')) {
      e.preventDefault();
      openModal();
    } else if (!e.target.closest('a')) {
      // Allow clicking anywhere on card to open video
      openModal();
    }
  });

  // Keyboard support
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  return card;
}

/**
 * Render visible shorts to the grid
 */
function renderShorts() {
  const grid = document.getElementById('shorts-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');

  if (!grid) return;

  // Show loading state
  if (state.loading) {
    grid.innerHTML = '<div class="loading-message">Ładowanie shorts...</div>';
    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    return;
  }

  // No shorts available
  if (state.allShorts.length === 0) {
    grid.innerHTML = '<div class="no-videos-message">Brak shorts dostępnych</div>';
    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    return;
  }

  const shortsToShow = state.allShorts.slice(0, state.visibleShorts);

  // Clear grid
  grid.innerHTML = '';

  // Add loading state
  grid.classList.add('loading');

  // Simulate loading delay for smooth UX
  setTimeout(() => {
    // Add short cards
    shortsToShow.forEach(short => {
      grid.appendChild(createShortCard(short));
    });

    // Remove loading state
    grid.classList.remove('loading');

    // Scroll reveal animation
    const cards = grid.querySelectorAll('.short-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }, index * 30);
    });
  }, 100);

  // Show/hide "Load More" button
  if (loadMoreBtn) {
    if (state.visibleShorts < state.allShorts.length) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
  }
}

/**
 * Load more shorts
 */
function loadMoreShorts() {
  const newVisible = Math.min(
    state.visibleShorts + state.shortsPerLoad,
    state.allShorts.length
  );

  state.visibleShorts = newVisible;
  renderShorts();

  // Scroll to first new item
  setTimeout(() => {
    const grid = document.getElementById('shorts-grid');
    if (grid) {
      const cards = grid.querySelectorAll('.short-card');
      const firstNewCard = cards[newVisible - state.shortsPerLoad];
      if (firstNewCard) {
        firstNewCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, 200);
}

// ===================================
// EVENT LISTENERS
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Show loading
    renderShorts();

    // Initialize and render
    await initializeShorts();
    
    // Generate schema markup for SEO
    if (state.allShorts.length > 0 && window.SchemaGenerator) {
      const highlightsForSchema = state.allShorts.slice(0, 10);

      highlightsForSchema.forEach((video) => {
        const schema = window.SchemaGenerator.generateVideoSchema(video);
        window.SchemaGenerator.injectSchema(schema);
      });

      const listSchema = window.SchemaGenerator.generateVideoListSchema(
        highlightsForSchema,
        "Najlepsze Momenty z Tomb Raider"
      );
      window.SchemaGenerator.injectSchema(listSchema);
    }
    renderShorts();

    // Load More button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', loadMoreShorts);
    }

  } catch (error) {
    console.error('[Highlights] Initialization error:', error);

    const grid = document.getElementById('shorts-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="error-message">
          <p>❌ Nie udało się załadować shorts</p>
          <p>Spróbuj odświeżyć stronę</p>
        </div>
      `;
    }
  }
});

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderShorts,
    loadMoreShorts,
    initializeShorts,
    fetchShorts
  };
}

/**
 * HIGHLIGHTS PAGE - JavaScript
 * Handles vertical short cards rendering and mock data
 */

// ===================================
// MOCK DATA - YouTube Shorts (~30 clips)
// ===================================

const MOCK_SHORTS = [
  // Recent uploads (last week)
  {
    id: 'short-001',
    title: 'Epic T-Rex Dodge! 🦖',
    thumbnail: null,
    duration: '0:45',
    views: '15,234',
    publishedAt: '1 dzień temu',
    videoUrl: 'https://youtube.com/shorts/placeholder1'
  },
  {
    id: 'short-002',
    title: 'Perfect Backflip Into Water 💦',
    thumbnail: null,
    duration: '0:28',
    views: '48,567',
    publishedAt: '2 dni temu',
    videoUrl: 'https://youtube.com/shorts/placeholder2'
  },
  {
    id: 'short-003',
    title: 'Secret Room Discovery! 🔍',
    thumbnail: null,
    duration: '0:52',
    views: '12,890',
    publishedAt: '3 dni temu',
    videoUrl: 'https://youtube.com/shorts/placeholder3'
  },
  {
    id: 'short-004',
    title: 'Boss Fight One-Shot 💥',
    thumbnail: null,
    duration: '0:38',
    views: '23,456',
    publishedAt: '4 dni temu',
    videoUrl: 'https://youtube.com/shorts/placeholder4'
  },
  {
    id: 'short-005',
    title: 'Funny Ragdoll Physics 😂',
    thumbnail: null,
    duration: '0:15',
    views: '67,891',
    publishedAt: '5 dni temu',
    videoUrl: 'https://youtube.com/shorts/placeholder5'
  },
  {
    id: 'short-006',
    title: 'Impossible Jump Challenge 🎯',
    thumbnail: null,
    duration: '0:42',
    views: '19,234',
    publishedAt: '6 dni temu',
    videoUrl: 'https://youtube.com/shorts/placeholder6'
  },
  // Older content
  {
    id: 'short-007',
    title: 'All Secrets in 60 Seconds ⚡',
    thumbnail: null,
    duration: '0:59',
    views: '31,245',
    publishedAt: '1 tydzień temu',
    videoUrl: 'https://youtube.com/shorts/placeholder7'
  },
  {
    id: 'short-008',
    title: 'Speedrun World Record 🏆',
    thumbnail: null,
    duration: '0:55',
    views: '89,123',
    publishedAt: '1 tydzień temu',
    videoUrl: 'https://youtube.com/shorts/placeholder8'
  },
  {
    id: 'short-009',
    title: 'Epic Fail Compilation 🤦',
    thumbnail: null,
    duration: '0:48',
    views: '43,567',
    publishedAt: '1 tydzień temu',
    videoUrl: 'https://youtube.com/shorts/placeholder9'
  },
  {
    id: 'short-010',
    title: 'Hidden Artifact Location 💎',
    thumbnail: null,
    duration: '0:33',
    views: '28,901',
    publishedAt: '1 tydzień temu',
    videoUrl: 'https://youtube.com/shorts/placeholder10'
  },
  {
    id: 'short-011',
    title: 'Stealth Takedown Montage 🥷',
    thumbnail: null,
    duration: '0:51',
    views: '35,678',
    publishedAt: '2 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder11'
  },
  {
    id: 'short-012',
    title: 'Crazy Physics Glitch 🌀',
    thumbnail: null,
    duration: '0:22',
    views: '56,234',
    publishedAt: '2 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder12'
  },
  {
    id: 'short-013',
    title: 'Perfect Headshot Streak 🎯',
    thumbnail: null,
    duration: '0:44',
    views: '21,456',
    publishedAt: '2 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder13'
  },
  {
    id: 'short-014',
    title: 'Parkour Skills Showcase 🏃',
    thumbnail: null,
    duration: '0:37',
    views: '41,890',
    publishedAt: '2 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder14'
  },
  {
    id: 'short-015',
    title: 'Puzzle Solved in 10 Seconds 🧩',
    thumbnail: null,
    duration: '0:29',
    views: '18,765',
    publishedAt: '2 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder15'
  },
  {
    id: 'short-016',
    title: 'Ultimate Combo Move 🔥',
    thumbnail: null,
    duration: '0:41',
    views: '33,123',
    publishedAt: '3 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder16'
  },
  {
    id: 'short-017',
    title: 'Near Death Experience 💀',
    thumbnail: null,
    duration: '0:26',
    views: '52,890',
    publishedAt: '3 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder17'
  },
  {
    id: 'short-018',
    title: 'Easter Egg Discovery 🥚',
    thumbnail: null,
    duration: '0:47',
    views: '24,567',
    publishedAt: '3 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder18'
  },
  {
    id: 'short-019',
    title: 'Epic Explosion Escape 💣',
    thumbnail: null,
    duration: '0:35',
    views: '38,234',
    publishedAt: '3 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder19'
  },
  {
    id: 'short-020',
    title: 'Cinematic Moment Captured 🎬',
    thumbnail: null,
    duration: '0:53',
    views: '45,678',
    publishedAt: '3 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder20'
  },
  {
    id: 'short-021',
    title: 'Pro Gamer Move 🎮',
    thumbnail: null,
    duration: '0:31',
    views: '29,456',
    publishedAt: '4 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder21'
  },
  {
    id: 'short-022',
    title: 'Clutch Save Moment 🙌',
    thumbnail: null,
    duration: '0:43',
    views: '36,789',
    publishedAt: '4 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder22'
  },
  {
    id: 'short-023',
    title: 'Insane Parkour Route 🏔️',
    thumbnail: null,
    duration: '0:49',
    views: '27,123',
    publishedAt: '4 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder23'
  },
  {
    id: 'short-024',
    title: 'Weapon Mastery Display ⚔️',
    thumbnail: null,
    duration: '0:38',
    views: '32,567',
    publishedAt: '4 tygodnie temu',
    videoUrl: 'https://youtube.com/shorts/placeholder24'
  },
  {
    id: 'short-025',
    title: 'Beautiful Scenery Shot 🌄',
    thumbnail: null,
    duration: '0:25',
    views: '41,234',
    publishedAt: '1 miesiąc temu',
    videoUrl: 'https://youtube.com/shorts/placeholder25'
  },
  {
    id: 'short-026',
    title: 'Funny AI Behavior 🤖',
    thumbnail: null,
    duration: '0:36',
    views: '58,901',
    publishedAt: '1 miesiąc temu',
    videoUrl: 'https://youtube.com/shorts/placeholder26'
  },
  {
    id: 'short-027',
    title: 'Record Breaking Run 🏃‍♀️',
    thumbnail: null,
    duration: '0:54',
    views: '34,567',
    publishedAt: '1 miesiąc temu',
    videoUrl: 'https://youtube.com/shorts/placeholder27'
  },
  {
    id: 'short-028',
    title: 'Lara Croft Best Moments ⭐',
    thumbnail: null,
    duration: '0:58',
    views: '72,345',
    publishedAt: '1 miesiąc temu',
    videoUrl: 'https://youtube.com/shorts/placeholder28'
  },
  {
    id: 'short-029',
    title: 'Lucky Shot Collection 🍀',
    thumbnail: null,
    duration: '0:46',
    views: '39,876',
    publishedAt: '1 miesiąc temu',
    videoUrl: 'https://youtube.com/shorts/placeholder29'
  },
  {
    id: 'short-030',
    title: 'Epic Finale Cutscene 🎭',
    thumbnail: null,
    duration: '0:57',
    views: '51,234',
    publishedAt: '1 miesiąc temu',
    videoUrl: 'https://youtube.com/shorts/placeholder30'
  }
];

// ===================================
// STATE MANAGEMENT
// ===================================

const state = {
  visibleShorts: 12,
  shortsPerLoad: 12,
  allShorts: [],
  newestShort: null,
  popularShort: null
};

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize shorts with badges
 */
function initializeShorts() {
  state.allShorts = [...MOCK_SHORTS];

  // Find newest short (first in array)
  state.newestShort = state.allShorts[0];

  // Find most popular short (highest views)
  state.popularShort = state.allShorts.reduce((max, current) => {
    const maxViews = parseInt(max.views.replace(/,/g, ''));
    const currentViews = parseInt(current.views.replace(/,/g, ''));
    return currentViews > maxViews ? current : max;
  }, state.allShorts[0]);
}

// ===================================
// SHORT CARD RENDERING
// ===================================

/**
 * Create HTML for a short card
 */
function createShortCard(short) {
  const card = document.createElement('div');
  card.className = 'short-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Watch: ${short.title}`);

  // Determine badge
  let badge = '';
  if (short.id === state.newestShort.id) {
    badge = '<div class="new-badge">NEW</div>';
  } else if (short.id === state.popularShort.id) {
    badge = '<div class="popular-badge">POPULAR</div>';
  }

  card.innerHTML = `
    <div class="short-thumbnail">
      ${badge}
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
      <a href="${short.videoUrl}" class="watch-btn" target="_blank" rel="noopener">
        ▶ Oglądaj
      </a>
    </div>
  `;

  // Click on card = click on watch button
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('watch-btn')) return;
    const watchBtn = card.querySelector('.watch-btn');
    if (watchBtn) watchBtn.click();
  });

  // Keyboard support
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const watchBtn = card.querySelector('.watch-btn');
      if (watchBtn) watchBtn.click();
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

document.addEventListener('DOMContentLoaded', () => {
  // Initialize and render
  initializeShorts();
  renderShorts();

  // Load More button
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreShorts);
  }
});

// ===================================
// UTILITY: Future API Integration
// ===================================

/**
 * Fetch shorts from YouTube API (placeholder)
 */
async function fetchShortsFromAPI() {
  // TODO: Implement YouTube API integration
  // Filter by duration < 60 seconds
  // Example:
  // const response = await fetch('/api/shorts');
  // const data = await response.json();
  // return data.shorts.filter(short => short.duration < 60);

  return MOCK_SHORTS;
}

/**
 * Format API response to short structure
 */
function formatAPIShort(apiShort) {
  // TODO: Map YouTube API response
  // return {
  //   id: apiShort.id.videoId,
  //   title: apiShort.snippet.title,
  //   thumbnail: apiShort.snippet.thumbnails.medium.url,
  //   duration: formatDuration(apiShort.contentDetails.duration),
  //   views: formatViews(apiShort.statistics.viewCount),
  //   publishedAt: formatDate(apiShort.snippet.publishedAt),
  //   videoUrl: `https://youtube.com/shorts/${apiShort.id.videoId}`
  // };

  return apiShort;
}

/**
 * Parse ISO 8601 duration to seconds
 */
function parseDuration(isoDuration) {
  // Example: PT1M30S = 90 seconds
  const match = isoDuration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = parseInt(match[1] || 0);
  const seconds = parseInt(match[2] || 0);
  return minutes * 60 + seconds;
}

/**
 * Format duration to MM:SS
 */
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderShorts,
    loadMoreShorts,
    initializeShorts
  };
}

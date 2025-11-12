/**
 * GAMEPLAYS PAGE - JavaScript
 * Handles accordion categories, video loading, and mock data
 */

// ===================================
// MOCK DATA - Ready for YouTube API
// ===================================

const MOCK_VIDEOS = {
  tr1: [
    {
      id: 'mock-tr1-001',
      title: 'Tomb Raider 1 - Caves - Part 1',
      thumbnail: null,
      duration: '28:45',
      views: '2,456',
      publishedAt: '2 dni temu',
      isNew: true,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr1-002',
      title: 'Tomb Raider 1 - City of Vilcabamba - Part 2',
      thumbnail: null,
      duration: '32:18',
      views: '2,103',
      publishedAt: '5 dni temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr1-003',
      title: 'Tomb Raider 1 - Lost Valley - Part 3',
      thumbnail: null,
      duration: '25:52',
      views: '1,987',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr1-004',
      title: 'Tomb Raider 1 - Tomb of Qualopec - Part 4',
      thumbnail: null,
      duration: '30:15',
      views: '1,876',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr1-005',
      title: 'Tomb Raider 1 - St. Francis Folly - Part 5',
      thumbnail: null,
      duration: '35:42',
      views: '1,654',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr1-006',
      title: 'Tomb Raider 1 - Colosseum - Part 6',
      thumbnail: null,
      duration: '27:33',
      views: '1,543',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr1-007',
      title: 'Tomb Raider 1 - Palace Midas - Part 7',
      thumbnail: null,
      duration: '29:21',
      views: '1,432',
      publishedAt: '3 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr1-008',
      title: 'Tomb Raider 1 - Cistern - Part 8',
      thumbnail: null,
      duration: '24:18',
      views: '1,321',
      publishedAt: '3 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    }
  ],
  tr2: [
    {
      id: 'mock-tr2-001',
      title: 'Tomb Raider 2 - The Great Wall - Part 1',
      thumbnail: null,
      duration: '31:24',
      views: '3,245',
      publishedAt: '3 dni temu',
      isNew: true,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr2-002',
      title: 'Tomb Raider 2 - Venice - Part 2',
      thumbnail: null,
      duration: '28:56',
      views: '2,876',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr2-003',
      title: 'Tomb Raider 2 - Bartoli\'s Hideout - Part 3',
      thumbnail: null,
      duration: '26:42',
      views: '2,543',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr2-004',
      title: 'Tomb Raider 2 - Opera House - Part 4',
      thumbnail: null,
      duration: '33:18',
      views: '2,432',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr2-005',
      title: 'Tomb Raider 2 - Offshore Rig - Part 5',
      thumbnail: null,
      duration: '29:55',
      views: '2,234',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr2-006',
      title: 'Tomb Raider 2 - Diving Area - Part 6',
      thumbnail: null,
      duration: '27:12',
      views: '2,123',
      publishedAt: '3 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    }
  ],
  tr3: [
    {
      id: 'mock-tr3-001',
      title: 'Tomb Raider 3 - India - Jungle - Part 1',
      thumbnail: null,
      duration: '30:45',
      views: '2,987',
      publishedAt: '4 dni temu',
      isNew: true,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr3-002',
      title: 'Tomb Raider 3 - Temple Ruins - Part 2',
      thumbnail: null,
      duration: '32:33',
      views: '2,654',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr3-003',
      title: 'Tomb Raider 3 - River Ganges - Part 3',
      thumbnail: null,
      duration: '28:21',
      views: '2,432',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr3-004',
      title: 'Tomb Raider 3 - Caves of Kaliya - Part 4',
      thumbnail: null,
      duration: '31:18',
      views: '2,234',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    }
  ],
  tr4: [
    {
      id: 'mock-tr4-001',
      title: 'Tomb Raider 4 - Angkor Wat - Part 1',
      thumbnail: null,
      duration: '34:22',
      views: '3,543',
      publishedAt: '1 dzień temu',
      isNew: true,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr4-002',
      title: 'Tomb Raider 4 - Race for the Iris - Part 2',
      thumbnail: null,
      duration: '29:48',
      views: '3,234',
      publishedAt: '5 dni temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr4-003',
      title: 'Tomb Raider 4 - Tomb of Seth - Part 3',
      thumbnail: null,
      duration: '31:55',
      views: '2,987',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr4-004',
      title: 'Tomb Raider 4 - Burial Chambers - Part 4',
      thumbnail: null,
      duration: '28:36',
      views: '2,765',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    }
  ],
  tr5: [
    {
      id: 'mock-tr5-001',
      title: 'Tomb Raider Chronicles - Rome - Part 1',
      thumbnail: null,
      duration: '26:42',
      views: '2,654',
      publishedAt: '3 dni temu',
      isNew: true,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr5-002',
      title: 'Tomb Raider Chronicles - Trajan\'s Markets - Part 2',
      thumbnail: null,
      duration: '29:18',
      views: '2,432',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr5-003',
      title: 'Tomb Raider Chronicles - The Colosseum - Part 3',
      thumbnail: null,
      duration: '32:24',
      views: '2,234',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr5-004',
      title: 'Tomb Raider Chronicles - The Base - Part 4',
      thumbnail: null,
      duration: '27:51',
      views: '2,123',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    }
  ],
  tr6: [
    {
      id: 'mock-tr6-001',
      title: 'Tomb Raider: Angel of Darkness - Paris - Part 1',
      thumbnail: null,
      duration: '33:15',
      views: '3,876',
      publishedAt: '2 dni temu',
      isNew: true,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr6-002',
      title: 'Tomb Raider: Angel of Darkness - Derelict Apartment - Part 2',
      thumbnail: null,
      duration: '28:42',
      views: '3,543',
      publishedAt: '6 dni temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr6-003',
      title: 'Tomb Raider: Angel of Darkness - Industrial Rooftops - Part 3',
      thumbnail: null,
      duration: '31:28',
      views: '3,234',
      publishedAt: '1 tydzień temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    },
    {
      id: 'mock-tr6-004',
      title: 'Tomb Raider: Angel of Darkness - Margot Carvier - Part 4',
      thumbnail: null,
      duration: '29:36',
      views: '2,987',
      publishedAt: '2 tygodnie temu',
      isNew: false,
      videoUrl: 'https://youtube.com/watch?v=placeholder'
    }
  ]
};

// ===================================
// STATE MANAGEMENT
// ===================================

const state = {
  visibleVideos: {
    tr1: 4,
    tr2: 4,
    tr3: 4,
    tr4: 4,
    tr5: 4,
    tr6: 4
  },
  videosPerLoad: 4
};

// ===================================
// VIDEO RENDERING
// ===================================

/**
 * Create HTML for a video card
 */
function createVideoCard(video) {
  const card = document.createElement('div');
  card.className = `video-card${video.isNew ? ' featured' : ''}`;

  card.innerHTML = `
    <div class="video-thumbnail">
      ${video.isNew ? '<div class="new-badge">NEW</div>' : ''}
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
      <a href="${video.videoUrl}" class="watch-btn" target="_blank" rel="noopener">
        ▶ Oglądaj
      </a>
    </div>
  `;

  return card;
}

/**
 * Render videos for a specific category
 */
function renderVideos(category) {
  const grid = document.querySelector(`[data-videos-grid="${category}"]`);
  const loadMoreBtn = document.querySelector(`[data-category="${category}"].load-more-btn`);

  if (!grid) return;

  const videos = MOCK_VIDEOS[category] || [];
  const visibleCount = state.visibleVideos[category];
  const videosToShow = videos.slice(0, visibleCount);

  // Clear grid
  grid.innerHTML = '';

  // Add video cards
  videosToShow.forEach(video => {
    grid.appendChild(createVideoCard(video));
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
 */
function loadMoreVideos(category) {
  const videos = MOCK_VIDEOS[category] || [];
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

    // Load videos if not loaded yet
    const grid = content.querySelector('[data-videos-grid]');
    if (grid && grid.children.length === 0) {
      renderVideos(category);
    }
  }
}

// ===================================
// SMOOTH SCROLL FOR QUICK NAV
// ===================================

/**
 * Smooth scroll to category
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
  const categoryKey = categoryId; // tr1, tr2, etc.
  const header = document.querySelector(`[data-category="${categoryKey}"].category-header`);
  if (header && header.getAttribute('aria-expanded') === 'false') {
    toggleAccordion(categoryKey);
  }
}

// ===================================
// EVENT LISTENERS
// ===================================

document.addEventListener('DOMContentLoaded', () => {

  // Render initial videos for TR1 (first category, expanded by default)
  renderVideos('tr1');

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

  // Sync quick-nav visibility with main navbar
  const quickNav = document.querySelector('.quick-nav');
  const navbar = document.getElementById('navbar');
  let lastScrollTop = 0;
  const scrollThreshold = 100;

  if (quickNav && navbar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
          // Scrolling down - hide both navbar and quick-nav
          navbar.classList.add('hidden');
          quickNav.classList.add('hidden');
        } else {
          // Scrolling up - show both
          navbar.classList.remove('hidden');
          quickNav.classList.remove('hidden');
        }
      } else {
        // At top - always show both
        navbar.classList.remove('hidden');
        quickNav.classList.remove('hidden');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

});

// ===================================
// UTILITY: Future API Integration
// ===================================

/**
 * Function to fetch videos from YouTube API (placeholder)
 * Replace MOCK_VIDEOS with real API calls
 */
async function fetchVideosFromAPI(category) {
  // TODO: Implement YouTube API integration
  // Example:
  // const response = await fetch(`/api/videos?category=${category}`);
  // const data = await response.json();
  // return data.videos;

  // For now, return mock data
  return MOCK_VIDEOS[category] || [];
}

/**
 * Function to format API response to match our video structure
 */
function formatAPIVideo(apiVideo) {
  // TODO: Map YouTube API response to our video object structure
  // Example:
  // return {
  //   id: apiVideo.id.videoId,
  //   title: apiVideo.snippet.title,
  //   thumbnail: apiVideo.snippet.thumbnails.medium.url,
  //   duration: formatDuration(apiVideo.contentDetails.duration),
  //   views: formatViews(apiVideo.statistics.viewCount),
  //   publishedAt: formatDate(apiVideo.snippet.publishedAt),
  //   isNew: isRecent(apiVideo.snippet.publishedAt),
  //   videoUrl: `https://youtube.com/watch?v=${apiVideo.id.videoId}`
  // };

  return apiVideo;
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderVideos,
    loadMoreVideos,
    toggleAccordion,
    scrollToCategory
  };
}

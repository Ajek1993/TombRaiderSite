/* ============================================
   VIDEO MODAL CONTROLLER
   ============================================ */

(function () {
  'use strict';

  // Modal elements (will be initialized after DOM loads)
  let modalOverlay = null;
  let modalElement = null;
  let modalIframe = null;
  let modalTitle = null;
  let modalClose = null;

  /**
   * Initialize modal elements and event listeners
   */
  function initModal() {
    // Get modal elements
    modalOverlay = document.getElementById('videoModalOverlay');
    modalElement = document.getElementById('videoModal');
    modalIframe = document.getElementById('videoModalIframe');
    modalTitle = document.getElementById('videoModalTitle');
    modalClose = document.getElementById('videoModalClose');

    if (!modalOverlay || !modalElement || !modalIframe) {
      console.warn('Video modal elements not found in DOM');
      return;
    }

    // Event listeners
    setupEventListeners();

    // Listen for theme changes (integration with theme-switcher.js)
    document.addEventListener('themeChanged', handleThemeChange);

    console.log('Video modal initialized');
  }

  /**
   * Setup all event listeners for modal interactions
   */
  function setupEventListeners() {
    // Close button click
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    // ESC key to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  /**
   * Open modal with video
   * @param {string} videoId - YouTube video ID
   * @param {string} title - Video title
   */
  function openModal(videoId, title) {
    if (!modalOverlay || !modalIframe || !modalTitle) {
      console.error('Modal not initialized');
      return;
    }

    // Set video title
    modalTitle.textContent = title || 'Video';

    // Build YouTube embed URL with autoplay
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    // Set iframe source
    modalIframe.src = embedUrl;

    // Add loaded class when iframe loads
    modalIframe.onload = function () {
      modalIframe.classList.add('loaded');
    };

    // Show modal with animation
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');

    // Focus management for accessibility
    setTimeout(() => {
      if (modalClose) {
        modalClose.focus();
      }
    }, 300);
  }

  /**
   * Close modal and stop video playback
   */
  function closeModal() {
    if (!modalOverlay || !modalIframe) {
      return;
    }

    // Remove active class (triggers fade-out animation)
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');

    // Stop video by clearing iframe src after animation
    setTimeout(() => {
      modalIframe.src = '';
      modalIframe.classList.remove('loaded');
      if (modalTitle) {
        modalTitle.textContent = '';
      }
    }, 300);
  }

  /**
   * Handle theme changes
   * @param {CustomEvent} e - Theme change event
   */
  function handleThemeChange(e) {
    // Modal automatically updates via CSS variables
    // This handler is here for potential future custom logic
    console.log('Video modal detected theme change:', e.detail.theme);
  }

  /**
   * Public API - expose to window for use by other scripts
   */
  window.VideoModal = {
    open: openModal,
    close: closeModal,
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModal);
  } else {
    initModal();
  }
})();

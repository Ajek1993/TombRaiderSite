/**
 * Frontend: Stream Announcements
 * Dynamically loads and renders stream announcements from API
 * Handles countdown timers and automatic archiving of past streams
 */

// Configuration
const API_ENDPOINT = '/api/announcements';

// State
let upcomingAnnouncements = [];
let pastAnnouncements = [];
let countdownInterval = null;

/**
 * Initialize announcements on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  loadAndRenderAnnouncements();
});

/**
 * Load announcements from API
 */
async function loadAndRenderAnnouncements() {
  try {
    const response = await fetch(`${API_ENDPOINT}?upcoming=false`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to load announcements');
    }

    const announcements = data.announcements || [];

    // Split into upcoming and past
    const now = new Date();
    upcomingAnnouncements = [];
    pastAnnouncements = [];

    announcements.forEach(ann => {
      if (!ann.date) return;

      const streamDateTime = new Date(`${ann.date}T${ann.time || '00:00'}`);

      if (streamDateTime >= now && ann.status !== 'completed') {
        upcomingAnnouncements.push(ann);
      } else {
        pastAnnouncements.push(ann);
      }
    });

    // Sort upcoming by date (soonest first)
    upcomingAnnouncements.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
      const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
      return dateA - dateB;
    });

    // Sort past by date (most recent first)
    pastAnnouncements.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time || '00:00'}`);
      const dateB = new Date(`${b.date}T${b.time || '00:00'}`);
      return dateB - dateA;
    });

    // Render sections
    renderUpcomingStream();
    renderPastStreams();

    // Add loaded class to trigger fade-in animation
    const section = document.getElementById('upcoming-stream-section');
    if (section) {
      section.classList.add('loaded');
    }
  } catch (error) {
    console.error('Error loading announcements:', error);
    hideUpcomingSection();
  }
}

/**
 * Render upcoming stream section
 */
function renderUpcomingStream() {
  const section = document.getElementById('upcoming-stream-section');

  if (!section) {
    console.warn('Upcoming stream section not found');
    return;
  }

  // If no upcoming announcements, hide section
  if (upcomingAnnouncements.length === 0) {
    section.style.display = 'none';
    return;
  }

  // Show the next upcoming stream
  const announcement = upcomingAnnouncements[0];
  section.style.display = 'block';

  // Update title
  const titleElement = section.querySelector('.stream-info h3');
  if (titleElement) {
    titleElement.textContent = announcement.title || 'Nadchodzący Stream';
  }

  // Update description
  const descElement = section.querySelector('.stream-description');
  if (descElement) {
    descElement.textContent = announcement.description || '';
  }

  // Update date
  const dateElement = section.querySelector('.detail-item:nth-child(1) span:last-child');
  if (dateElement) {
    dateElement.textContent = formatDate(announcement.date);
  }

  // Update time
  const timeElement = section.querySelector('.detail-item:nth-child(2) span:last-child');
  if (timeElement) {
    timeElement.textContent = announcement.time || '--:--';
  }

  // Update platform
  const platformElement = section.querySelector('.detail-item:nth-child(3) span:last-child');
  if (platformElement) {
    platformElement.textContent = announcement.platform || 'TikTok';
  }

  // Update features list
  const featuresList = section.querySelector('.stream-features ul');
  if (featuresList && Array.isArray(announcement.features)) {
    featuresList.innerHTML = announcement.features
      .map(feature => `<li>✨ ${escapeHtml(feature)}</li>`)
      .join('');
  }

  // Update platform link
  const platformLink = section.querySelector('.btn-primary[href]');
  if (platformLink && announcement.platformLink) {
    platformLink.href = announcement.platformLink;
  }

  // Update status badge
  const badge = section.querySelector('.badge');
  if (badge) {
    if (announcement.status === 'live') {
      badge.textContent = 'LIVE NOW!';
      badge.className = 'badge badge-live';
    } else {
      badge.textContent = 'LIVE SOON';
      badge.className = 'badge badge-new';
    }
  }

  // Initialize countdown
  if (announcement.status !== 'live') {
    initializeCountdown(announcement.date, announcement.time);
  } else {
    // Hide countdown if live
    const countdown = section.querySelector('.countdown');
    if (countdown) {
      countdown.style.display = 'none';
    }
  }

  // Setup "Przypomij Mi" (Remind Me) button
  setupReminderButton(announcement);

  // Setup "Dodaj do Kalendarza" (Add to Calendar) button
  setupCalendarButton(announcement);
}

/**
 * Setup reminder button functionality
 */
function setupReminderButton(announcement) {
  const reminderButton = document.querySelector('.stream-actions .btn-primary');
  if (!reminderButton) return;

  // Add class for styling
  reminderButton.classList.add('btn-reminder');

  // Check if reminder already exists
  if (typeof hasReminder === 'function' && hasReminder(announcement.id)) {
    updateReminderButtonState(announcement.id, true);
  }

  // Add click event listener
  reminderButton.onclick = async (e) => {
    e.preventDefault();

    // Check if reminder already exists
    if (typeof hasReminder === 'function' && hasReminder(announcement.id)) {
      // Remove reminder
      if (typeof removeReminder === 'function') {
        removeReminder(announcement.id);
      }
    } else {
      // Add reminder
      if (typeof addReminder === 'function') {
        await addReminder(announcement);
      } else {
        console.warn('Reminder functionality not loaded');
        alert('Funkcja przypomnień nie jest dostępna. Sprawdź czy skrypt stream-reminders.js jest załadowany.');
      }
    }
  };
}

/**
 * Setup calendar button functionality
 */
function setupCalendarButton(announcement) {
  const calendarButtons = document.querySelectorAll('.stream-actions .btn-secondary');

  // Find the calendar button (first btn-secondary)
  const calendarButton = calendarButtons[0];
  if (!calendarButton) return;

  // Add class for styling
  calendarButton.classList.add('btn-calendar');

  // Add click event listener
  calendarButton.onclick = (e) => {
    e.preventDefault();

    if (typeof handleAddToCalendar === 'function') {
      handleAddToCalendar(announcement);
    } else {
      console.warn('Calendar export functionality not loaded');
      alert('Funkcja kalendarza nie jest dostępna. Sprawdź czy skrypt calendar-export.js jest załadowany.');
    }
  };
}

/**
 * Initialize countdown timer
 */
function initializeCountdown(date, time) {
  // Clear any existing interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  const targetDate = new Date(`${date}T${time || '00:00'}`);

  // Update countdown every second
  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      // Stream has started
      clearInterval(countdownInterval);
      loadAndRenderAnnouncements(); // Reload to update status
      return;
    }

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Update countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');

    if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
  }, 1000);

  // Run once immediately
  const now = new Date();
  const diff = targetDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');

  if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
  if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
  if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
}

/**
 * Render past streams section
 */
function renderPastStreams() {
  const section = document.getElementById('past-streams-section');

  if (!section) {
    // Section doesn't exist yet - we'll create it if there are past streams
    if (pastAnnouncements.length > 0) {
      createPastStreamsSection();
    }
    return;
  }

  // If no past announcements, hide section
  if (pastAnnouncements.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  const grid = section.querySelector('.highlights-grid');
  if (!grid) return;

  // Render past streams as cards (max 6)
  grid.innerHTML = pastAnnouncements.slice(0, 6).map(ann => `
    <div class="card highlight-card">
      <div class="card-thumbnail-wrapper">
        ${ann.thumbnail
          ? `<img src="${escapeHtml(ann.thumbnail)}" alt="${escapeHtml(ann.title)}" style="width: 100%; height: auto;">`
          : `<div class="thumbnail-placeholder"><span class="thumbnail-icon">📺</span></div>`
        }
      </div>
      <div class="card-content">
        <h3 class="card-title-small">${escapeHtml(ann.title)}</h3>
        <div class="card-metadata-small">
          <span>📅 ${formatDate(ann.date)}</span>
          <span>⏰ ${ann.time || '--:--'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Create past streams section dynamically
 */
function createPastStreamsSection() {
  const upcomingSection = document.getElementById('upcoming-stream-section');
  if (!upcomingSection) return;

  const pastSection = document.createElement('section');
  pastSection.id = 'past-streams-section';
  pastSection.className = 'section section-highlights';

  pastSection.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">📺</span>
          Poprzednie Streamy
        </h2>
        <p class="section-description">
          Archiwum zakończonych streamów
        </p>
      </div>
      <div class="highlights-grid"></div>
    </div>
  `;

  // Insert after upcoming stream section
  upcomingSection.parentNode.insertBefore(pastSection, upcomingSection.nextSibling);

  // Render content
  renderPastStreams();
}

/**
 * Hide upcoming stream section
 */
function hideUpcomingSection() {
  const section = document.getElementById('upcoming-stream-section');
  if (section) {
    section.style.display = 'none';
  }
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  if (!dateString) return 'Brak daty';

  const date = new Date(dateString);
  const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  const months = [
    'Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca',
    'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia'
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

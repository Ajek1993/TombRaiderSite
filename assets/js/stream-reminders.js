/**
 * Stream Reminders
 * Manages browser notifications for upcoming streams using localStorage
 */

// Constants
const REMINDER_STORAGE_KEY = 'stream_reminders';
const REMINDER_CHECK_INTERVAL = 60000; // Check every 60 seconds
const REMINDER_ADVANCE_TIME = 30 * 60 * 1000; // Notify 30 minutes before stream

// State
let reminderCheckInterval = null;
let notificationPermission = 'default';

/**
 * Initialize the reminders system
 */
function initStreamReminders() {
  // Check if browser supports notifications
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return;
  }

  // Get current permission status
  notificationPermission = Notification.permission;

  // Start checking for due reminders
  startReminderChecker();

  // Clean up old/past reminders on init
  cleanupOldReminders();
}

/**
 * Request notification permission from user
 */
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Twoja przeglądarka nie obsługuje powiadomień.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    alert('Powiadomienia są zablokowane. Zmień ustawienia przeglądarki, aby włączyć przypomnienia.');
    return false;
  }

  // Request permission
  const permission = await Notification.requestPermission();
  notificationPermission = permission;

  if (permission === 'granted') {
    return true;
  } else {
    alert('Musisz zezwolić na powiadomienia, aby otrzymać przypomnienie.');
    return false;
  }
}

/**
 * Add reminder for a stream
 * @param {Object} streamData - Stream announcement data
 */
async function addReminder(streamData) {
  // Request permission if not already granted
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    return false;
  }

  // Get existing reminders
  const reminders = getReminders();

  // Check if reminder already exists
  if (reminders.some(r => r.id === streamData.id)) {
    showReminderFeedback('Przypomnienie już ustawione!', 'info');
    return true;
  }

  // Create reminder object
  const reminder = {
    id: streamData.id,
    title: streamData.title,
    description: streamData.description,
    date: streamData.date,
    time: streamData.time,
    platform: streamData.platform,
    platformLink: streamData.platformLink,
    createdAt: new Date().toISOString(),
    notified: false,
  };

  // Add to reminders array
  reminders.push(reminder);

  // Save to localStorage
  saveReminders(reminders);

  // Update button UI
  updateReminderButtonState(streamData.id, true);

  // Show success message
  showReminderFeedback('✓ Przypomnienie ustawione!', 'success');

  return true;
}

/**
 * Remove reminder for a stream
 * @param {String} streamId - Stream ID
 */
function removeReminder(streamId) {
  const reminders = getReminders();
  const filtered = reminders.filter(r => r.id !== streamId);
  saveReminders(filtered);

  // Update button UI
  updateReminderButtonState(streamId, false);

  showReminderFeedback('Przypomnienie anulowane', 'info');
}

/**
 * Get all reminders from localStorage
 */
function getReminders() {
  try {
    const data = localStorage.getItem(REMINDER_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading reminders from localStorage:', error);
    return [];
  }
}

/**
 * Save reminders to localStorage
 */
function saveReminders(reminders) {
  try {
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(reminders));
  } catch (error) {
    console.error('Error saving reminders to localStorage:', error);
  }
}

/**
 * Start interval to check for due reminders
 */
function startReminderChecker() {
  // Clear any existing interval
  if (reminderCheckInterval) {
    clearInterval(reminderCheckInterval);
  }

  // Check immediately
  checkReminders();

  // Then check every minute
  reminderCheckInterval = setInterval(checkReminders, REMINDER_CHECK_INTERVAL);
}

/**
 * Check if any reminders are due and show notifications
 */
function checkReminders() {
  const reminders = getReminders();
  const now = new Date();

  reminders.forEach(reminder => {
    // Skip if already notified
    if (reminder.notified) {
      return;
    }

    // Parse stream date/time
    const streamDateTime = new Date(`${reminder.date}T${reminder.time}`);
    const timeDiff = streamDateTime - now;

    // Check if we should notify (30 minutes before or less)
    if (timeDiff <= REMINDER_ADVANCE_TIME && timeDiff > 0) {
      showStreamNotification(reminder);

      // Mark as notified
      reminder.notified = true;
      saveReminders(reminders);
    }
  });
}

/**
 * Show browser notification for stream
 */
function showStreamNotification(reminder) {
  if (Notification.permission !== 'granted') {
    return;
  }

  const minutes = Math.floor((new Date(`${reminder.date}T${reminder.time}`) - new Date()) / 60000);

  const notification = new Notification(`🔴 Stream za ${minutes} minut!`, {
    body: `${reminder.title}\n${reminder.platform} - ${reminder.time}`,
    icon: '/assets/images/logo.png', // Optional: Add your logo
    badge: '/assets/images/badge.png', // Optional
    tag: `stream-reminder-${reminder.id}`, // Prevents duplicate notifications
    requireInteraction: false,
    vibrate: [200, 100, 200], // Vibration pattern for mobile
  });

  // Handle notification click - open stream link
  notification.onclick = function() {
    if (reminder.platformLink) {
      window.open(reminder.platformLink, '_blank');
    }
    notification.close();
  };

  // Auto-close after 10 seconds
  setTimeout(() => {
    notification.close();
  }, 10000);
}

/**
 * Clean up old/past reminders
 */
function cleanupOldReminders() {
  const reminders = getReminders();
  const now = new Date();

  // Remove reminders for streams that have already passed
  const active = reminders.filter(reminder => {
    const streamDateTime = new Date(`${reminder.date}T${reminder.time}`);
    return streamDateTime > now;
  });

  if (active.length !== reminders.length) {
    saveReminders(active);
  }
}

/**
 * Check if reminder exists for stream
 */
function hasReminder(streamId) {
  const reminders = getReminders();
  return reminders.some(r => r.id === streamId);
}

/**
 * Update reminder button UI state
 */
function updateReminderButtonState(streamId, hasReminder) {
  const button = document.querySelector('.btn-reminder');
  if (!button) return;

  if (hasReminder) {
    button.textContent = '✓ Przypomnienie Ustawione';
    button.classList.add('reminder-active');
    button.onclick = () => removeReminder(streamId);
  } else {
    button.textContent = '🔔 Przypomij Mi';
    button.classList.remove('reminder-active');
    // Will be set by announcements.js
  }
}

/**
 * Show feedback message to user
 */
function showReminderFeedback(message, type = 'info') {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#3b82f6'};
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    font-family: var(--font-primary);
    font-size: 14px;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
  if (reminderCheckInterval) {
    clearInterval(reminderCheckInterval);
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initStreamReminders();
});

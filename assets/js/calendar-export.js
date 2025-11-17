/**
 * Calendar Export
 * Generates .ics calendar files for stream events
 */

/**
 * Generate .ics file content for stream event
 * @param {Object} streamData - Stream announcement data
 * @returns {String} .ics file content
 */
function generateICS(streamData) {
  // Parse stream date and time
  const streamDate = new Date(`${streamData.date}T${streamData.time}`);

  // Estimate stream duration (2 hours by default)
  const streamEnd = new Date(streamDate.getTime() + (2 * 60 * 60 * 1000));

  // Format dates to iCal format (YYYYMMDDTHHmmssZ)
  const formatICalDate = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  };

  const dtStart = formatICalDate(streamDate);
  const dtEnd = formatICalDate(streamEnd);
  const dtStamp = formatICalDate(new Date());

  // Generate unique ID
  const uid = `stream-${streamData.id}@xbruksiax.com`;

  // Build description
  let description = streamData.description || '';
  if (streamData.platformLink) {
    description += `\\n\\nLink do streamu: ${streamData.platformLink}`;
  }
  if (streamData.features && streamData.features.length > 0) {
    description += `\\n\\nCo będzie podczas streamu:\\n${streamData.features.map(f => `- ${f}`).join('\\n')}`;
  }

  // Escape special characters for iCal format
  const escapeICalText = (text) => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  };

  // Build .ics content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//xBruksiax Stream Calendar//PL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:xBruksiax Stream',
    'X-WR-TIMEZONE:Europe/Warsaw',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeICalText(streamData.title || 'Stream xBruksiax')}`,
    `DESCRIPTION:${escapeICalText(description)}`,
    `LOCATION:${escapeICalText(streamData.platformLink || `${streamData.platform} Live`)}`,
    `URL:${streamData.platformLink || 'https://www.tiktok.com/@xbruksiax'}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M', // 15 minutes before
    'ACTION:DISPLAY',
    `DESCRIPTION:Stream "${escapeICalText(streamData.title || 'xBruksiax')}" starts in 15 minutes!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

/**
 * Trigger download of .ics file
 * @param {String} content - .ics file content
 * @param {String} filename - Filename for download
 */
function downloadICS(content, filename) {
  // Create blob from content
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });

  // Create temporary download link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Handle "Add to Calendar" button click
 * @param {Object} streamData - Stream announcement data
 */
function handleAddToCalendar(streamData) {
  try {
    // Generate .ics content
    const icsContent = generateICS(streamData);

    // Create filename from stream title and date
    const safeTitle = (streamData.title || 'stream')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const filename = `${safeTitle}-${streamData.date}.ics`;

    // Trigger download
    downloadICS(icsContent, filename);

    // Show success feedback
    showCalendarFeedback('✓ Plik kalendarza pobrany!', 'success');
  } catch (error) {
    console.error('Error generating calendar file:', error);
    showCalendarFeedback('Błąd podczas tworzenia pliku kalendarza', 'error');
  }
}

/**
 * Show feedback message to user
 */
function showCalendarFeedback(message, type = 'info') {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
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
 * Alternative: Generate Google Calendar URL
 * Can be used as an additional option
 */
function generateGoogleCalendarURL(streamData) {
  const streamDate = new Date(`${streamData.date}T${streamData.time}`);
  const streamEnd = new Date(streamDate.getTime() + (2 * 60 * 60 * 1000));

  // Format for Google Calendar
  const formatGoogleDate = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: streamData.title || 'Stream xBruksiax',
    dates: `${formatGoogleDate(streamDate)}/${formatGoogleDate(streamEnd)}`,
    details: streamData.description || '',
    location: streamData.platformLink || streamData.platform || 'TikTok Live',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Alternative: Generate Outlook Calendar URL
 */
function generateOutlookCalendarURL(streamData) {
  const streamDate = new Date(`${streamData.date}T${streamData.time}`);
  const streamEnd = new Date(streamDate.getTime() + (2 * 60 * 60 * 1000));

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: streamData.title || 'Stream xBruksiax',
    startdt: streamDate.toISOString(),
    enddt: streamEnd.toISOString(),
    body: streamData.description || '',
    location: streamData.platformLink || streamData.platform || 'TikTok Live',
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

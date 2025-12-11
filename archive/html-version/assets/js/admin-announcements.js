/**
 * Admin Panel - Stream Announcements Management
 * Handles JWT authentication, form submission, and announcement CRUD operations
 */

// Configuration
const API_BASE = "/api/announcements";
const API_LOGIN = "/api/auth/login";

// State
let authToken = localStorage.getItem("adminToken");
let currentEditId = null;
let announcements = [];

// DOM Elements
const loginScreen = document.getElementById("loginScreen");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");
const announcementForm = document.getElementById("announcementForm");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const formMessage = document.getElementById("formMessage");
const refreshBtn = document.getElementById("refreshBtn");
const loadingSpinner = document.getElementById("loadingSpinner");
const announcementsTable = document.getElementById("announcementsTable");
const announcementsTableBody = document.getElementById(
  "announcementsTableBody"
);
const emptyState = document.getElementById("emptyState");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  setupEventListeners();
});

/**
 * Check if user is authenticated
 */
function checkAuth() {
  const token = localStorage.getItem("adminToken");
  if (token) {
    authToken = token;
    showAdminPanel();
    loadAnnouncements();
  } else {
    showLoginScreen();
  }
}

/**
 * Show login screen
 */
function showLoginScreen() {
  loginScreen.style.display = "flex";
  adminPanel.style.display = "none";
}

/**
 * Show admin panel
 */
function showAdminPanel() {
  loginScreen.style.display = "none";
  adminPanel.style.display = "block";
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Login
  loginForm.addEventListener("submit", handleLogin);

  // Logout
  logoutBtn.addEventListener("click", handleLogout);

  // Form submission
  announcementForm.addEventListener("submit", handleFormSubmit);

  // Cancel edit
  cancelEditBtn.addEventListener("click", cancelEdit);

  // Refresh
  refreshBtn.addEventListener("click", () => loadAnnouncements());

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.dataset.tab;
      switchTab(tabName);
    });
  });
}

/**
 * Switch between tabs
 */
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.toggle("active", content.id === `${tabName}Tab`);
  });
}

/**
 * Handle login with JWT
 */
async function handleLogin(e) {
  e.preventDefault();
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (data.success && data.token) {
      authToken = data.token;
      localStorage.setItem("adminToken", authToken);
      loginError.textContent = "";
      showAdminPanel();
      loadAnnouncements();
    } else {
      loginError.textContent = data.message || "Nieprawidłowe hasło!";
      setTimeout(() => {
        loginError.textContent = "";
      }, 3000);
    }
  } catch (error) {
    console.error("Login error:", error);
    loginError.textContent = "Błąd logowania!";
    setTimeout(() => {
      loginError.textContent = "";
    }, 3000);
  }
}

/**
 * Handle logout
 */
function handleLogout() {
  authToken = null;
  localStorage.removeItem("adminToken");
  showLoginScreen();
  loginForm.reset();
}

/**
 * Get authentication headers
 */
function getAuthHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  return headers;
}

/**
 * Load all announcements from API
 */
async function loadAnnouncements() {
  try {
    showLoading();

    // Add cache-busting to always get fresh data
    const response = await fetch(`${API_BASE}?_t=${Date.now()}`);
    const data = await response.json();

    if (data.success) {
      announcements = data.announcements || [];
      renderAnnouncementsTable();
    } else {
      throw new Error(data.message || "Failed to load announcements");
    }
  } catch (error) {
    console.error("Error loading announcements:", error);
    showMessage("Błąd podczas ładowania zapowiedzi: " + error.message, "error");
    hideLoading();
  }
}

/**
 * Show loading spinner
 */
function showLoading() {
  loadingSpinner.style.display = "block";
  announcementsTable.style.display = "none";
  emptyState.style.display = "none";
}

/**
 * Hide loading spinner
 */
function hideLoading() {
  loadingSpinner.style.display = "none";
}

/**
 * Render announcements table
 */
function renderAnnouncementsTable() {
  hideLoading();

  if (announcements.length === 0) {
    announcementsTable.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  announcementsTable.style.display = "table";
  emptyState.style.display = "none";

  announcementsTableBody.innerHTML = announcements
    .map(
      (ann) => `
    <tr>
      <td>
        <div class="announcement-title">${escapeHtml(ann.title)}</div>
      </td>
      <td>
        <div class="announcement-datetime">
          <span class="announcement-date">${formatDate(ann.date)}</span>
          <span class="announcement-time">${ann.time || "--:--"}</span>
        </div>
      </td>
      <td>
        <span class="announcement-platform">${escapeHtml(ann.platform)}</span>
      </td>
      <td>
        <span class="announcement-status ${ann.status}">${formatStatus(
        ann.status
      )}</span>
      </td>
      <td>
        <div class="announcement-actions">
          <button class="btn btn-secondary btn-small" onclick="editAnnouncement('${
            ann.id
          }')">
            Edytuj
          </button>
          <button class="btn btn-warning btn-small" onclick="changeStatus('${
            ann.id
          }', '${ann.status}')">
            Status
          </button>
          <button class="btn btn-danger btn-small" onclick="deleteAnnouncement('${
            ann.id
          }')">
            Usuń
          </button>
        </div>
      </td>
    </tr>
  `
    )
    .join("");
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  if (!dateString) return "Brak daty";
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format status for display
 */
function formatStatus(status) {
  const statusMap = {
    scheduled: "Zaplanowany",
    live: "Na Żywo",
    completed: "Zakończony",
  };
  return statusMap[status] || status;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Handle form submission (add or update)
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(announcementForm);

  // Build announcement object
  const announcement = {
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    time: formData.get("time"),
    platform: formData.get("platform"),
    platformLink: formData.get("platformLink"),
    features: formData.get("features")
      ? formData
          .get("features")
          .split("\n")
          .map((f) => f.trim())
          .filter((f) => f)
      : [],
    status: formData.get("status"),
    thumbnail: formData.get("thumbnail"),
  };

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Zapisywanie...";

    let response;
    if (currentEditId) {
      // Update existing
      announcement.id = currentEditId;
      response = await fetch(API_BASE, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(announcement),
      });
    } else {
      // Create new
      response = await fetch(API_BASE, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(announcement),
      });
    }

    const data = await response.json();

    if (data.success) {
      showMessage(
        currentEditId ? "Zapowiedź zaktualizowana!" : "Zapowiedź dodana!",
        "success"
      );
      announcementForm.reset();
      cancelEdit();
      loadAnnouncements();
    } else {
      throw new Error(data.message || "Failed to save announcement");
    }
  } catch (error) {
    console.error("Error saving announcement:", error);
    showMessage("Błąd: " + error.message, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = currentEditId ? "Zapisz zmiany" : "Dodaj Zapowiedź";
  }
}

/**
 * Edit announcement
 */
function editAnnouncement(id) {
  const announcement = announcements.find((a) => a.id === id);
  if (!announcement) return;

  // Set form to edit mode
  currentEditId = id;
  formTitle.textContent = "Edytuj Zapowiedź";
  submitBtn.textContent = "Zapisz zmiany";
  cancelEditBtn.style.display = "inline-block";

  // Fill form with announcement data
  document.getElementById("title").value = announcement.title || "";
  document.getElementById("description").value = announcement.description || "";
  document.getElementById("date").value = announcement.date || "";
  document.getElementById("time").value = announcement.time || "";
  document.getElementById("platform").value = announcement.platform || "TikTok";
  document.getElementById("platformLink").value =
    announcement.platformLink || "";
  document.getElementById("features").value = Array.isArray(
    announcement.features
  )
    ? announcement.features.join("\n")
    : "";
  document.getElementById("status").value = announcement.status || "scheduled";
  document.getElementById("thumbnail").value = announcement.thumbnail || "";

  // Scroll to form
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Cancel edit mode
 */
function cancelEdit() {
  currentEditId = null;
  formTitle.textContent = "Dodaj Nową Zapowiedź";
  submitBtn.textContent = "Dodaj Zapowiedź";
  cancelEditBtn.style.display = "none";
  announcementForm.reset();
}

/**
 * Change announcement status (cycle through statuses)
 */
async function changeStatus(id, currentStatus) {
  const statusCycle = {
    scheduled: "live",
    live: "completed",
    completed: "scheduled",
  };

  const newStatus = statusCycle[currentStatus] || "scheduled";

  try {
    const response = await fetch(API_BASE, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ id, status: newStatus }),
    });

    const data = await response.json();

    if (data.success) {
      showMessage(`Status zmieniony na: ${formatStatus(newStatus)}`, "success");
      loadAnnouncements();
    } else {
      throw new Error(data.message || "Failed to update status");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    showMessage("Błąd: " + error.message, "error");
  }
}

/**
 * Delete announcement
 */
async function deleteAnnouncement(id) {
  if (!confirm("Czy na pewno chcesz usunąć tę zapowiedź?")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}?id=${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (data.success) {
      showMessage("Zapowiedź usunięta!", "success");
      loadAnnouncements();
    } else {
      throw new Error(data.message || "Failed to delete announcement");
    }
  } catch (error) {
    console.error("Error deleting announcement:", error);
    showMessage("Błąd: " + error.message, "error");
  }
}

/**
 * Show message (success or error)
 */
function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = "block";

  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
}

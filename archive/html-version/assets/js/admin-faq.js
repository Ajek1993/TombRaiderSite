/**
 * Admin Panel - FAQ Management
 * Handles FAQ CRUD operations with JWT authentication
 */

// Configuration
const FAQ_API_BASE = "/api/faq";

// State
let currentEditFaqId = null;
let faqList = [];

// Get auth token from localStorage (shared with admin-announcements.js)
function getAuthToken() {
  return localStorage.getItem("adminToken");
}

// DOM Elements
const faqForm = document.getElementById("faqForm");
const faqFormTitle = document.getElementById("faqFormTitle");
const faqSubmitBtn = document.getElementById("faqSubmitBtn");
const cancelFaqEditBtn = document.getElementById("cancelFaqEditBtn");
const faqFormMessage = document.getElementById("faqFormMessage");
const refreshFaqBtn = document.getElementById("refreshFaqBtn");
const faqLoadingSpinner = document.getElementById("faqLoadingSpinner");
const faqTable = document.getElementById("faqTable");
const faqTableBody = document.getElementById("faqTableBody");
const faqEmptyState = document.getElementById("faqEmptyState");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupFaqEventListeners();
  // Load FAQ when tab becomes active
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.tab === "faq" && faqList.length === 0) {
        loadFAQ();
      }
    });
  });
});

/**
 * Get authentication headers
 */
function getFaqAuthHeaders() {
  const headers = { "Content-Type": "application/json" };
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Setup event listeners for FAQ
 */
function setupFaqEventListeners() {
  // Form submission
  faqForm.addEventListener("submit", handleFaqFormSubmit);

  // Cancel edit
  cancelFaqEditBtn.addEventListener("click", cancelFaqEdit);

  // Refresh
  refreshFaqBtn.addEventListener("click", () => loadFAQ());
}

/**
 * Handle FAQ form submission
 */
async function handleFaqFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(faqForm);
  const faqData = {
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category"),
    order: parseInt(formData.get("order")) || 0,
    visible: document.getElementById("faqVisible").checked,
  };

  try {
    faqSubmitBtn.disabled = true;
    faqSubmitBtn.textContent = "Zapisywanie...";

    let response;
    if (currentEditFaqId) {
      // Update existing FAQ
      response = await fetch(FAQ_API_BASE, {
        method: "PUT",
        headers: getFaqAuthHeaders(),
        body: JSON.stringify({ id: currentEditFaqId, ...faqData }),
      });
    } else {
      // Create new FAQ
      response = await fetch(FAQ_API_BASE, {
        method: "POST",
        headers: getFaqAuthHeaders(),
        body: JSON.stringify(faqData),
      });
    }

    const result = await response.json();

    if (result.success) {
      showFaqMessage(
        currentEditFaqId ? "FAQ zaktualizowane!" : "FAQ dodane!",
        "success"
      );
      faqForm.reset();
      document.getElementById("faqVisible").checked = true;
      cancelFaqEdit();
      loadFAQ();
    } else {
      showFaqMessage(
        result.error || result.message || "Wystąpił błąd",
        "error"
      );
    }
  } catch (error) {
    console.error("Error submitting FAQ:", error);
    showFaqMessage("Błąd połączenia z serwerem", "error");
  } finally {
    faqSubmitBtn.disabled = false;
    faqSubmitBtn.textContent = currentEditFaqId
      ? "Zaktualizuj FAQ"
      : "Dodaj FAQ";
  }
}

/**
 * Load all FAQ items
 */
async function loadFAQ() {
  try {
    faqLoadingSpinner.style.display = "block";
    faqTable.style.display = "none";
    faqEmptyState.style.display = "none";

    const response = await fetch(FAQ_API_BASE);
    const result = await response.json();

    if (result.success) {
      faqList = result.faq || [];
      displayFAQ(faqList);
    } else {
      showFaqMessage("Błąd ładowania FAQ", "error");
    }
  } catch (error) {
    console.error("Error loading FAQ:", error);
    showFaqMessage("Błąd połączenia z serwerem", "error");
  } finally {
    faqLoadingSpinner.style.display = "none";
  }
}

/**
 * Display FAQ in table
 */
function displayFAQ(faqs) {
  faqTableBody.innerHTML = "";

  if (faqs.length === 0) {
    faqTable.style.display = "none";
    faqEmptyState.style.display = "block";
    return;
  }

  faqTable.style.display = "table";
  faqEmptyState.style.display = "none";

  faqs.forEach((faq) => {
    const row = document.createElement("tr");

    // Truncate question if too long
    const questionText =
      faq.question.length > 60
        ? faq.question.substring(0, 60) + "..."
        : faq.question;

    row.innerHTML = `
      <td>
        <strong>${escapeHtml(questionText)}</strong>
      </td>
      <td>
        <span class="badge badge-${getCategoryColor(faq.category)}">
          ${escapeHtml(faq.category)}
        </span>
      </td>
      <td>${faq.order}</td>
      <td>
        <span class="badge badge-${faq.visible ? "success" : "secondary"}">
          ${faq.visible ? "Tak" : "Nie"}
        </span>
      </td>
      <td>
        <div class="announcement-actions">
          <button class="btn btn-sm btn-primary" onclick="editFaq('${faq.id}')">
            Edytuj
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteFaq('${
            faq.id
          }')">
            Usuń
          </button>
        </div>
      </td>
    `;

    faqTableBody.appendChild(row);
  });
}

/**
 * Get badge color for category
 */
function getCategoryColor(category) {
  switch (category) {
    case "Ogólne/O Kanale":
      return "primary";
    case "Streamy/Techniczne":
      return "warning";
    case "Gry/Gameplay":
      return "success";
    default:
      return "secondary";
  }
}

/**
 * Edit FAQ
 */
function editFaq(id) {
  const faq = faqList.find((f) => f.id === id);
  if (!faq) return;

  currentEditFaqId = id;

  // Fill form
  document.getElementById("faqId").value = faq.id;
  document.getElementById("faqQuestion").value = faq.question;
  document.getElementById("faqAnswer").value = faq.answer;
  document.getElementById("faqCategory").value = faq.category;
  document.getElementById("faqOrder").value = faq.order;
  document.getElementById("faqVisible").checked = faq.visible;

  // Update UI
  faqFormTitle.textContent = "Edytuj FAQ";
  faqSubmitBtn.textContent = "Zaktualizuj FAQ";
  cancelFaqEditBtn.style.display = "inline-block";

  // Scroll to form
  faqForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Cancel FAQ edit
 */
function cancelFaqEdit() {
  currentEditFaqId = null;
  faqForm.reset();
  document.getElementById("faqVisible").checked = true;
  faqFormTitle.textContent = "Dodaj Nowe FAQ";
  faqSubmitBtn.textContent = "Dodaj FAQ";
  cancelFaqEditBtn.style.display = "none";
}

/**
 * Delete FAQ
 */
async function deleteFaq(id) {
  const faq = faqList.find((f) => f.id === id);
  if (!faq) return;

  const confirmed = confirm(
    `Czy na pewno chcesz usunąć to FAQ?\n\nPytanie: ${faq.question}`
  );

  if (!confirmed) return;

  try {
    const response = await fetch(`${FAQ_API_BASE}?id=${id}`, {
      method: "DELETE",
      headers: getFaqAuthHeaders(),
    });

    const result = await response.json();

    if (result.success) {
      showFaqMessage("FAQ usunięte!", "success");

      // If we're editing the deleted FAQ, cancel edit
      if (currentEditFaqId === id) {
        cancelFaqEdit();
      }

      loadFAQ();
    } else {
      showFaqMessage(
        result.error || result.message || "Błąd usuwania FAQ",
        "error"
      );
    }
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    showFaqMessage("Błąd połączenia z serwerem", "error");
  }
}

/**
 * Show message
 */
function showFaqMessage(message, type = "info") {
  faqFormMessage.textContent = message;
  faqFormMessage.className = `form-message ${type}`;
  faqFormMessage.style.display = "block";

  setTimeout(() => {
    faqFormMessage.style.display = "none";
  }, 5000);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Make functions globally accessible for onclick handlers
window.editFaq = editFaq;
window.deleteFaq = deleteFaq;

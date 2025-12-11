"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";

// Types
interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  platform: string;
  platformLink: string;
  features: string[];
  status: "scheduled" | "live" | "completed";
  thumbnail?: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  visible: boolean;
}

type TabType = "announcements" | "faq";

const API_BASE = "/api/announcements";
const API_FAQ = "/api/faq";
const API_LOGIN = "/api/auth/login";

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString: string): string {
  if (!dateString) return "Brak daty";
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    scheduled: "Zaplanowany",
    live: "Na Żywo",
    completed: "Zakończony",
  };
  return statusMap[status] || status;
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>("announcements");

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Announcement form state
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    platform: "TikTok",
    platformLink: "",
    features: "",
    status: "scheduled",
    thumbnail: "",
  });

  // FAQ state
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [currentFaqEditId, setCurrentFaqEditId] = useState<string | null>(null);
  const [faqFormMessage, setFaqFormMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // FAQ form state
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "Ogólne/O Kanale",
    order: 0,
    visible: true,
  });

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAnnouncements();
      loadFAQ();
    }
  }, [isAuthenticated]);

  // Auth headers helper
  const getAuthHeaders = useCallback(() => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    return headers;
  }, [authToken]);

  // Handle login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        setAuthToken(data.token);
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError(data.message || "Nieprawidłowe hasło!");
        setTimeout(() => setLoginError(""), 3000);
      }
    } catch {
      setLoginError("Błąd logowania!");
      setTimeout(() => setLoginError(""), 3000);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setPassword("");
  };

  // Load announcements
  const loadAnnouncements = async () => {
    try {
      setAnnouncementsLoading(true);
      const response = await fetch(`${API_BASE}?_t=${Date.now()}`);
      const data = await response.json();

      if (data.success) {
        setAnnouncements(data.announcements || []);
      }
    } catch (error) {
      console.error("Error loading announcements:", error);
      showFormMessage("Błąd podczas ładowania zapowiedzi", "error");
    } finally {
      setAnnouncementsLoading(false);
    }
  };

  // Load FAQ
  const loadFAQ = async () => {
    try {
      setFaqLoading(true);
      const response = await fetch(`${API_FAQ}?_t=${Date.now()}`);
      const data = await response.json();

      if (data.success) {
        setFaqItems(data.faq || []);
      }
    } catch (error) {
      console.error("Error loading FAQ:", error);
      showFaqFormMessage("Błąd podczas ładowania FAQ", "error");
    } finally {
      setFaqLoading(false);
    }
  };

  // Show message helpers
  const showFormMessage = (text: string, type: "success" | "error") => {
    setFormMessage({ text, type });
    setTimeout(() => setFormMessage(null), 5000);
  };

  const showFaqFormMessage = (text: string, type: "success" | "error") => {
    setFaqFormMessage({ text, type });
    setTimeout(() => setFaqFormMessage(null), 5000);
  };

  // Handle announcement form submit
  const handleAnnouncementSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const announcement = {
      ...announcementForm,
      features: announcementForm.features
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f),
    };

    try {
      let response;
      if (currentEditId) {
        response = await fetch(API_BASE, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ ...announcement, id: currentEditId }),
        });
      } else {
        response = await fetch(API_BASE, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(announcement),
        });
      }

      const data = await response.json();

      if (data.success) {
        showFormMessage(
          currentEditId ? "Zapowiedź zaktualizowana!" : "Zapowiedź dodana!",
          "success"
        );
        resetAnnouncementForm();
        loadAnnouncements();
      } else {
        throw new Error(data.message || "Failed to save announcement");
      }
    } catch (error) {
      console.error("Error saving announcement:", error);
      showFormMessage("Błąd: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    }
  };

  // Edit announcement
  const editAnnouncement = (id: string) => {
    const announcement = announcements.find((a) => a.id === id);
    if (!announcement) return;

    setCurrentEditId(id);
    setAnnouncementForm({
      title: announcement.title || "",
      description: announcement.description || "",
      date: announcement.date || "",
      time: announcement.time || "",
      platform: announcement.platform || "TikTok",
      platformLink: announcement.platformLink || "",
      features: Array.isArray(announcement.features) ? announcement.features.join("\n") : "",
      status: announcement.status || "scheduled",
      thumbnail: announcement.thumbnail || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset announcement form
  const resetAnnouncementForm = () => {
    setCurrentEditId(null);
    setAnnouncementForm({
      title: "",
      description: "",
      date: "",
      time: "",
      platform: "TikTok",
      platformLink: "",
      features: "",
      status: "scheduled",
      thumbnail: "",
    });
  };

  // Change announcement status
  const changeStatus = async (id: string, currentStatus: string) => {
    const statusCycle: Record<string, string> = {
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
        showFormMessage(`Status zmieniony na: ${formatStatus(newStatus)}`, "success");
        loadAnnouncements();
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showFormMessage("Błąd: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    }
  };

  // Delete announcement
  const deleteAnnouncement = async (id: string) => {
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
        showFormMessage("Zapowiedź usunięta!", "success");
        loadAnnouncements();
      } else {
        throw new Error(data.message || "Failed to delete announcement");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
      showFormMessage("Błąd: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    }
  };

  // Handle FAQ form submit
  const handleFaqSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let response;
      if (currentFaqEditId) {
        response = await fetch(API_FAQ, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ ...faqForm, id: currentFaqEditId }),
        });
      } else {
        response = await fetch(API_FAQ, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(faqForm),
        });
      }

      const data = await response.json();

      if (data.success) {
        showFaqFormMessage(
          currentFaqEditId ? "FAQ zaktualizowane!" : "FAQ dodane!",
          "success"
        );
        resetFaqForm();
        loadFAQ();
      } else {
        throw new Error(data.message || "Failed to save FAQ");
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      showFaqFormMessage("Błąd: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    }
  };

  // Edit FAQ
  const editFaq = (id: string) => {
    const faq = faqItems.find((f) => f.id === id);
    if (!faq) return;

    setCurrentFaqEditId(id);
    setFaqForm({
      question: faq.question || "",
      answer: faq.answer || "",
      category: faq.category || "Ogólne/O Kanale",
      order: faq.order || 0,
      visible: faq.visible !== false,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset FAQ form
  const resetFaqForm = () => {
    setCurrentFaqEditId(null);
    setFaqForm({
      question: "",
      answer: "",
      category: "Ogólne/O Kanale",
      order: 0,
      visible: true,
    });
  };

  // Delete FAQ
  const deleteFaq = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć to FAQ?")) {
      return;
    }

    try {
      const response = await fetch(`${API_FAQ}?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (data.success) {
        showFaqFormMessage("FAQ usunięte!", "success");
        loadFAQ();
      } else {
        throw new Error(data.message || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      showFaqFormMessage("Błąd: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    }
  };

  // Render login screen
  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="login-header">
            <span className="logo-icon">🏺</span>
            <h1>Panel Admina</h1>
            <p>Zarządzanie zapowiedziami streamów</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Wprowadź hasło admina"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Zaloguj się
            </button>
            {loginError && <p className="login-error">{loginError}</p>}
          </form>
        </div>
      </div>
    );
  }

  // Render admin panel
  return (
    <div className="admin-panel">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <span className="logo-icon">🏺</span>
            <div>
              <h1>Panel Admina</h1>
              <p>Zarządzanie zapowiedziami</p>
            </div>
          </div>
          <div className="admin-actions">
            <a href="/" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Podgląd strony
            </a>
            <button onClick={handleLogout} className="btn btn-danger">
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "announcements" ? "active" : ""}`}
          onClick={() => setActiveTab("announcements")}
        >
          Zapowiedzi Streamów
        </button>
        <button
          className={`tab-btn ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
      </nav>

      <div className="admin-container">
        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="tab-content active" id="announcementsTab">
            {/* Form Section */}
            <section className="admin-section">
              <div className="section-header">
                <h2>{currentEditId ? "Edytuj Zapowiedź" : "Dodaj Nową Zapowiedź"}</h2>
                {currentEditId && (
                  <button onClick={resetAnnouncementForm} className="btn btn-secondary">
                    Anuluj edycję
                  </button>
                )}
              </div>

              <form onSubmit={handleAnnouncementSubmit} className="announcement-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">
                      Tytuł Streamu <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="np. Rise of Tomb Raider - Episode 23"
                      required
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="description">Opis Streamu</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Krótki opis tego co będzie się działo na streamie..."
                      value={announcementForm.description}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label htmlFor="date">
                      Data Streamu <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={announcementForm.date}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">
                      Godzina Streamu <span className="required">*</span>
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      required
                      value={announcementForm.time}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label htmlFor="platform">Platforma</label>
                    <select
                      id="platform"
                      name="platform"
                      value={announcementForm.platform}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, platform: e.target.value })}
                    >
                      <option value="TikTok">TikTok</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Twitch">Twitch</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="platformLink">Link do Streamu</label>
                    <input
                      type="url"
                      id="platformLink"
                      name="platformLink"
                      placeholder="https://..."
                      value={announcementForm.platformLink}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, platformLink: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="features">
                      Funkcje/Atrakcje Streamu
                      <span className="label-hint">(każda w nowej linii)</span>
                    </label>
                    <textarea
                      id="features"
                      name="features"
                      rows={5}
                      placeholder="Kontynuacja głównej fabuły&#10;Eksploracja opcjonalnych grobowców&#10;Q&A z widzami&#10;Giveaway dla społeczności!"
                      value={announcementForm.features}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, features: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={announcementForm.status}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, status: e.target.value })}
                    >
                      <option value="scheduled">Zaplanowany</option>
                      <option value="live">Na Żywo</option>
                      <option value="completed">Zakończony</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="thumbnail">URL Miniatury (opcjonalnie)</label>
                    <input
                      type="url"
                      id="thumbnail"
                      name="thumbnail"
                      placeholder="https://..."
                      value={announcementForm.thumbnail}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, thumbnail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {currentEditId ? "Zapisz zmiany" : "Dodaj Zapowiedź"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={resetAnnouncementForm}>
                    Wyczyść formularz
                  </button>
                </div>
              </form>

              {formMessage && (
                <div className={`form-message ${formMessage.type}`}>
                  {formMessage.text}
                </div>
              )}
            </section>

            {/* List Section */}
            <section className="admin-section">
              <div className="section-header">
                <h2>Wszystkie Zapowiedzi</h2>
                <button onClick={loadAnnouncements} className="btn btn-secondary">
                  🔄 Odśwież
                </button>
              </div>

              <div className="announcements-table-wrapper">
                {announcementsLoading && (
                  <div className="loading-spinner">Ładowanie zapowiedzi...</div>
                )}

                {!announcementsLoading && announcements.length === 0 && (
                  <div className="empty-state">
                    <p>Brak zapowiedzi. Dodaj pierwszą zapowiedź używając formularza powyżej.</p>
                  </div>
                )}

                {!announcementsLoading && announcements.length > 0 && (
                  <table className="announcements-table">
                    <thead>
                      <tr>
                        <th>Tytuł</th>
                        <th>Data & Czas</th>
                        <th>Platforma</th>
                        <th>Status</th>
                        <th>Akcje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {announcements.map((ann) => (
                        <tr key={ann.id}>
                          <td>
                            <div className="announcement-title">{escapeHtml(ann.title)}</div>
                          </td>
                          <td>
                            <div className="announcement-datetime">
                              <span className="announcement-date">{formatDate(ann.date)}</span>
                              <span className="announcement-time">{ann.time || "--:--"}</span>
                            </div>
                          </td>
                          <td>
                            <span className="announcement-platform">{escapeHtml(ann.platform)}</span>
                          </td>
                          <td>
                            <span className={`announcement-status ${ann.status}`}>
                              {formatStatus(ann.status)}
                            </span>
                          </td>
                          <td>
                            <div className="announcement-actions">
                              <button
                                className="btn btn-secondary btn-small"
                                onClick={() => editAnnouncement(ann.id)}
                              >
                                Edytuj
                              </button>
                              <button
                                className="btn btn-warning btn-small"
                                onClick={() => changeStatus(ann.id, ann.status)}
                              >
                                Status
                              </button>
                              <button
                                className="btn btn-danger btn-small"
                                onClick={() => deleteAnnouncement(ann.id)}
                              >
                                Usuń
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="tab-content active" id="faqTab">
            {/* FAQ Form Section */}
            <section className="admin-section">
              <div className="section-header">
                <h2>{currentFaqEditId ? "Edytuj FAQ" : "Dodaj Nowe FAQ"}</h2>
                {currentFaqEditId && (
                  <button onClick={resetFaqForm} className="btn btn-secondary">
                    Anuluj edycję
                  </button>
                )}
              </div>

              <form onSubmit={handleFaqSubmit} className="announcement-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="faqQuestion">
                      Pytanie <span className="required">*</span>
                    </label>
                    <textarea
                      id="faqQuestion"
                      name="question"
                      rows={2}
                      placeholder="np. Jak często są streamy?"
                      required
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="faqAnswer">
                      Odpowiedź <span className="required">*</span>
                    </label>
                    <textarea
                      id="faqAnswer"
                      name="answer"
                      rows={4}
                      placeholder="Wpisz odpowiedź na pytanie..."
                      required
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label htmlFor="faqCategory">
                      Kategoria <span className="required">*</span>
                    </label>
                    <select
                      id="faqCategory"
                      name="category"
                      required
                      value={faqForm.category}
                      onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                    >
                      <option value="Ogólne/O Kanale">Ogólne/O Kanale</option>
                      <option value="Streamy/Techniczne">Streamy/Techniczne</option>
                      <option value="Gry/Gameplay">Gry/Gameplay</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="faqOrder">Kolejność</label>
                    <input
                      type="number"
                      id="faqOrder"
                      name="order"
                      placeholder="0"
                      min={0}
                      value={faqForm.order}
                      onChange={(e) => setFaqForm({ ...faqForm, order: parseInt(e.target.value) || 0 })}
                    />
                    <small>Niższa liczba = wyższa pozycja</small>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        id="faqVisible"
                        name="visible"
                        checked={faqForm.visible}
                        onChange={(e) => setFaqForm({ ...faqForm, visible: e.target.checked })}
                      />
                      Widoczne na stronie
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {currentFaqEditId ? "Zapisz zmiany" : "Dodaj FAQ"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={resetFaqForm}>
                    Wyczyść formularz
                  </button>
                </div>
              </form>

              {faqFormMessage && (
                <div className={`form-message ${faqFormMessage.type}`}>
                  {faqFormMessage.text}
                </div>
              )}
            </section>

            {/* FAQ List Section */}
            <section className="admin-section">
              <div className="section-header">
                <h2>Wszystkie FAQ</h2>
                <button onClick={loadFAQ} className="btn btn-secondary">
                  🔄 Odśwież
                </button>
              </div>

              <div className="announcements-table-wrapper">
                {faqLoading && (
                  <div className="loading-spinner">Ładowanie FAQ...</div>
                )}

                {!faqLoading && faqItems.length === 0 && (
                  <div className="empty-state">
                    <p>Brak FAQ. Dodaj pierwsze pytanie używając formularza powyżej.</p>
                  </div>
                )}

                {!faqLoading && faqItems.length > 0 && (
                  <table className="announcements-table">
                    <thead>
                      <tr>
                        <th>Pytanie</th>
                        <th>Kategoria</th>
                        <th>Kolejność</th>
                        <th>Widoczne</th>
                        <th>Akcje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqItems.map((faq) => (
                        <tr key={faq.id}>
                          <td>
                            <div className="announcement-title">{escapeHtml(faq.question)}</div>
                          </td>
                          <td>{faq.category}</td>
                          <td>{faq.order}</td>
                          <td>{faq.visible ? "Tak" : "Nie"}</td>
                          <td>
                            <div className="announcement-actions">
                              <button
                                className="btn btn-secondary btn-small"
                                onClick={() => editFaq(faq.id)}
                              >
                                Edytuj
                              </button>
                              <button
                                className="btn btn-danger btn-small"
                                onClick={() => deleteFaq(faq.id)}
                              >
                                Usuń
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

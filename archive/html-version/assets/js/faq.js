/**
 * FAQ Page - Frequently Asked Questions
 * Handles fetching, filtering, and accordion functionality
 */

// State
let allFAQ = [];
let currentCategory = 'all';

// DOM Elements
const faqLoading = document.getElementById('faqLoading');
const faqEmpty = document.getElementById('faqEmpty');
const faqAccordion = document.getElementById('faqAccordion');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadFAQ();
  setupFilterButtons();
});

/**
 * Setup filter buttons
 */
function setupFilterButtons() {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      filterByCategory(category);

      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/**
 * Load FAQ from API
 */
async function loadFAQ() {
  try {
    showLoading();

    const response = await fetch('/api/faq?visible=true');
    const result = await response.json();

    if (result.success) {
      allFAQ = result.faq || [];

      if (allFAQ.length === 0) {
        showEmpty();
      } else {
        renderFAQ(allFAQ);
      }
    } else {
      console.error('Error loading FAQ:', result.error);
      showEmpty();
    }
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    showEmpty();
  }
}

/**
 * Render FAQ items
 */
function renderFAQ(faqList) {
  faqAccordion.innerHTML = '';
  faqLoading.style.display = 'none';
  faqEmpty.style.display = 'none';

  if (faqList.length === 0) {
    faqEmpty.style.display = 'block';
    return;
  }

  faqList.forEach(faq => {
    const item = createFAQItem(faq);
    faqAccordion.appendChild(item);
  });

  // Setup accordion click handlers
  setupAccordion();
  
  // Generate FAQPage schema for SEO
  if (faqList.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqList.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };

    // Wstrzyknij schema do DOM
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqSchema, null, 2);
    document.head.appendChild(script);
  }
}

/**
 * Create FAQ item element
 */
function createFAQItem(faq) {
  const item = document.createElement('div');
  item.className = 'faq-item';
  item.dataset.category = faq.category;

  const question = escapeHtml(faq.question);
  const answer = formatAnswer(faq.answer);
  const category = escapeHtml(faq.category);

  item.innerHTML = `
    <button class="faq-question" aria-expanded="false">
      <div class="faq-question-text">
        ${question}
        <div class="faq-category-badge">${category}</div>
      </div>
      <span class="faq-icon">▼</span>
    </button>
    <div class="faq-answer">
      <div class="faq-answer-content">
        ${answer}
      </div>
    </div>
  `;

  return item;
}

/**
 * Format answer text (convert line breaks to paragraphs)
 */
function formatAnswer(text) {
  if (!text) return '';

  // Escape HTML
  const escaped = escapeHtml(text);

  // Split by double line breaks for paragraphs
  const paragraphs = escaped.split(/\n\n+/);

  return paragraphs
    .map(p => {
      // Convert single line breaks to <br>
      const withBreaks = p.replace(/\n/g, '<br>');
      return `<p>${withBreaks}</p>`;
    })
    .join('');
}

/**
 * Setup accordion functionality
 */
function setupAccordion() {
  const questions = faqAccordion.querySelectorAll('.faq-question');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all items
      faqAccordion.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Filter FAQ by category
 */
function filterByCategory(category) {
  currentCategory = category;

  if (category === 'all') {
    renderFAQ(allFAQ);
  } else {
    const filtered = allFAQ.filter(faq => faq.category === category);
    renderFAQ(filtered);
  }
}

/**
 * Show loading state
 */
function showLoading() {
  faqLoading.style.display = 'block';
  faqAccordion.innerHTML = '';
  faqEmpty.style.display = 'none';
}

/**
 * Show empty state
 */
function showEmpty() {
  faqLoading.style.display = 'none';
  faqAccordion.innerHTML = '';
  faqEmpty.style.display = 'block';
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

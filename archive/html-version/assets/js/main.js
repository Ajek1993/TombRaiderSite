/* ===================================================================
   Main JavaScript
   Tomb Raider Gaming Website
   =================================================================== */

// ===================================================================
// MOBILE MENU
// ===================================================================
// NOTE: Mobile menu is initialized after navbar is rendered
// See initializeNavbar() function below

// ===================================================================
// PARALLAX SCROLLING
// ===================================================================

const parallaxLayers = document.querySelectorAll(".parallax-layer");

function updateParallax() {
  const scrolled = window.pageYOffset;

  parallaxLayers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed) || 0;
    const yPos = -(scrolled * speed);
    layer.style.transform = `translateY(${yPos}px)`;
  });
}

// Throttle parallax for performance
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

// ===================================================================
// STICKY NAVIGATION
// ===================================================================
// NOTE: Sticky navigation is initialized after navbar is rendered
// See initializeNavbar() function below

// ===================================================================
// RANDOM QUOTE GENERATOR
// ===================================================================

const quotes = [
  "I make my own luck.",
  "When I get an objective, I never let anything stand in my way.",
  "Puzzles. Why did it have to be puzzles?",
  "I'd rather trust my own intellect, thanks.",
  "The extraordinary is in what we do, not who we are.",
  "I don't need to be rescued.",
  "I'm not afraid of dying. I'm afraid I won't get the chance to do everything I want.",
  "Sometimes you have to take a leap of faith.",
  "Everything lost is meant to be found.",
  "A famous explorer once said that the extraordinary is in what we do, not who we are.",
];

const quoteText = document.getElementById("quote-text");
const randomQuoteBtn = document.getElementById("random-quote-btn");

if (randomQuoteBtn && quoteText) {
  randomQuoteBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];

    // Fade out
    quoteText.style.opacity = "0";

    setTimeout(() => {
      quoteText.textContent = `"${newQuote}"`;
      // Fade in
      quoteText.style.opacity = "1";
    }, 300);
  });
}

// ===================================================================
// COUNTDOWN TIMER
// ===================================================================

const countdownElement = document.getElementById("countdown");

if (countdownElement) {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");

  // Set target date (example: 7 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  targetDate.setHours(12, 0, 0, 0);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysElement.textContent = "0";
      hoursElement.textContent = "0";
      minutesElement.textContent = "0";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Animate number change
    if (daysElement.textContent !== days.toString()) {
      daysElement.classList.add("changing");
      setTimeout(() => {
        daysElement.textContent = days;
        daysElement.classList.remove("changing");
      }, 300);
    } else {
      daysElement.textContent = days;
    }

    if (hoursElement.textContent !== hours.toString()) {
      hoursElement.classList.add("changing");
      setTimeout(() => {
        hoursElement.textContent = hours;
        hoursElement.classList.remove("changing");
      }, 300);
    } else {
      hoursElement.textContent = hours;
    }

    if (minutesElement.textContent !== minutes.toString()) {
      minutesElement.classList.add("changing");
      setTimeout(() => {
        minutesElement.textContent = minutes;
        minutesElement.classList.remove("changing");
      }, 300);
    } else {
      minutesElement.textContent = minutes;
    }
  }

  // Update countdown every minute
  updateCountdown();
  setInterval(updateCountdown, 60000);
}

// ===================================================================
// RANDOM GAMEPLAY BUTTON
// ===================================================================

const randomGameplayBtn = document.getElementById("random-gameplay-btn");

if (randomGameplayBtn) {
  randomGameplayBtn.addEventListener("click", () => {
    // In production, this would navigate to a random gameplay
    // For now, just show an alert
    randomGameplayBtn.textContent = "🎲 Losowanie...";
    randomGameplayBtn.disabled = true;

    setTimeout(() => {
      randomGameplayBtn.textContent = "🎲 Odkryj Losowy Grób";
      randomGameplayBtn.disabled = false;
    }, 1000);
  });
}

// ===================================================================
// SCROLL REVEAL ANIMATIONS
// ===================================================================

const revealElements = document.querySelectorAll(
  ".fade-in-up, .fade-in-left, .fade-in-right, .scale-in"
);

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translate(0, 0) scale(1)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    revealObserver.observe(element);
  });
}

// ===================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================================================
// NOTE: This is initialized globally but uses dynamic navbar height
// See initializeSmoothScroll() function below

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navbar = document.getElementById("navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize smooth scroll once DOM is ready
initializeSmoothScroll();

// ===================================================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===================================================================

const navLinks = document.querySelectorAll(".nav-link");
const currentPath = window.location.pathname;

navLinks.forEach((link) => {
  if (
    link.getAttribute("href") === currentPath ||
    (currentPath === "/" && link.getAttribute("href") === "/") ||
    (currentPath.includes(link.getAttribute("href")) &&
      link.getAttribute("href") !== "/")
  ) {
    link.classList.add("active");
  }
});

// ===================================================================
// KEYBOARD NAVIGATION
// ===================================================================
// NOTE: Keyboard navigation is initialized after navbar is rendered
// See initializeNavbar() function below

// ===================================================================
// PERFORMANCE OPTIMIZATIONS
// ===================================================================

// Lazy load images when they're about to enter viewport
const lazyImages = document.querySelectorAll("img[data-src]");

if (lazyImages.length > 0) {
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px",
    }
  );

  lazyImages.forEach((img) => imageObserver.observe(img));
}

// ===================================================================
// CONSOLE EASTER EGG
// ===================================================================

console.log(
  "%c🏺 Tomb Raider Gaming Website",
  "color: #FFD700; font-size: 24px; font-weight: bold;"
);
console.log("%cWitaj, odkrywco!", "color: #00FFFF; font-size: 16px;");
console.log(
  "%cJeśli szukasz sekretów w konsoli, gratulacje! 🎮",
  "color: #FF1493; font-size: 14px;"
);

// ===================================================================
// NAVBAR INITIALIZATION
// ===================================================================

/**
 * Initialize navbar functionality after navbar is rendered
 * This function should be called after the navbar component is inserted into the DOM
 */
window.initializeNavbar = function () {
  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const body = document.body;

  // Check if elements exist
  if (!navbar) {
    console.error("❌ Navbar element not found");
    return;
  }

  // ===================================================================
  // MOBILE MENU HANDLERS
  // ===================================================================

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent any default behavior
      e.stopPropagation(); // Stop event bubbling

      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";

      // Update aria-expanded
      const isExpanded = hamburger.classList.contains("active");
      hamburger.setAttribute("aria-expanded", isExpanded);
    });

    // Close menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
        body.style.overflow = "";
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
        body.style.overflow = "";
        hamburger.setAttribute("aria-expanded", "false");
      }
    });

    // Escape key closes mobile menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (mobileMenu.classList.contains("open")) {
          hamburger.classList.remove("active");
          mobileMenu.classList.remove("open");
          body.style.overflow = "";
          hamburger.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // ===================================================================
  // STICKY NAVIGATION
  // ===================================================================

  let lastScrollTop = 0;
  const scrollThreshold = 100;

  // Check if quick-nav exists (used on gameplays page)
  const quickNav = document.querySelector(".quick-nav");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down - hide navbar (and quick-nav if exists)
        navbar.classList.add("hidden");
        if (quickNav) quickNav.classList.add("hidden");
      } else {
        // Scrolling up - show navbar (and quick-nav if exists)
        navbar.classList.remove("hidden");
        if (quickNav) quickNav.classList.remove("hidden");
      }
    } else {
      // At top - always show
      navbar.classList.remove("hidden");
      if (quickNav) quickNav.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
};

// ===================================================================
// INITIALIZE
// ===================================================================

# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2025-11-11

### Fixed
- **Reduced text-shadow blur** on all headings (h1, h2, hero-title, section-title)
  - Changed from heavy glow to subtle `0 0 8px rgba(color, 0.4)` for better readability
  - Less bleeding/blurring effect on text

- **Centered section titles** with emoji icons
  - Added `display: flex` + `justify-content: center` to `.section-title`
  - Icons now properly centered with text horizontally

- **Fixed button hover color conflicts**
  - Secondary buttons now properly show dark text on cyan background
  - Added `!important` to prevent color mixing on hover
  - Fixed z-index stacking for ::before pseudo-element

- **Disabled animations on mobile** (< 768px)
  - Float animations turned off for: `.pixel-art-container`, `.logo-icon`, `.quote-icon`
  - Improves performance on mobile devices
  - Better UX - no distracting movements on small screens

### Improved
- Visual clarity of all headings across the site
- Mobile performance and user experience
- Button interaction feedback consistency

---

## [1.0.0] - 2025-11-11

### Added
- Initial release of Tomb Raider Gaming Website
- Complete frontend implementation with HTML, CSS, JavaScript
- Neo-gaming aesthetic with Tomb Raider theme
- Responsive design (mobile, tablet, desktop)
- Interactive features:
  - Parallax scrolling
  - Random quote generator
  - Countdown timer
  - Mobile hamburger menu
  - Scroll reveal animations
- Accessibility features (WCAG AA compliance)
- Performance optimizations
- Complete documentation (README, QUICKSTART, CUSTOMIZATION)

### Features
- Hero section with featured video
- Latest gameplay cards grid
- Highlights section
- Stream announcements with countdown
- Gaming widgets (random gameplay, stats, latest upload)
- Responsive navigation
- Mobile-optimized menu
- Footer with social links

---

## Format
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Types of changes
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities
- `Improved` for enhancements to existing features

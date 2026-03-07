# 💍 Alejandra & Alexander — Wedding Website

A fully custom, multilingual wedding invitation website built with Astro, Tailwind CSS, and Node.js. Designed to be elegant, responsive, and feature-rich — from RSVP form submission to a live countdown timer and interactive galleries.

---

## ✨ Features

- **Multilingual support** — Spanish, English, and German via a JSON-based i18n system
- **RSVP form** — Guests can confirm attendance with name, allergies, and event selection
- **Live countdown timer** — Real-time countdown to the wedding date
- **Interactive galleries** — Draggable/scrollable photo and hotel suggestion sliders
- **Animated sections** — Scroll-triggered entrance animations using IntersectionObserver
- **Animated vinyl disc** — Looping CSS animation on the Playlist section
- **Slide-out navigation menu** — Smooth panel with overlay and icon toggle
- **Fully responsive** — Mobile-first design, capped at 1000px for tablet/desktop
- **Custom typography** — Hand-picked calligraphy and serif fonts (Amoresa, WeddingSerif)
- **SSR + API routes** — Server-side rendering with a `/api/confirmar` endpoint for form handling

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [Astro](https://astro.build/) | SSR framework and component architecture |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) | Node.js SSR adapter |
| TypeScript | Type safety across components |
| CSS Animations | Custom keyframe and IntersectionObserver animations |
| JSON i18n | Lightweight translation system (no external library) |

---

## 📁 Project Structure

```
/
├── public/
├── src/
│   ├── assets/
│   │   ├── fonts/          # Custom fonts (Amoresa, WeddingSerif)
│   │   ├── icons/          # SVG icons (WhatsApp, Instagram)
│   │   └── images/         # All section images
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── SectionPrincipal.astro
│   │   ├── SectionGaleria.astro
│   │   ├── SectionPreWeding.astro
│   │   ├── SectionCelebration.astro
│   │   ├── SectionDressCode.astro
│   │   ├── SectionPlaylist.astro
│   │   ├── SectionHospedaje.astro
│   │   ├── SectionSugerencia.astro
│   │   ├── SectionContact.astro
│   │   ├── SectionGift.astro
│   │   └── SectionForm.astro
│   ├── i18n/
│   │   ├── index.ts        # Translation helper
│   │   ├── es.json         # Spanish
│   │   ├── en.json         # English
│   │   └── de.json         # German
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro     # Spanish (default)
│   │   ├── en/
│   │   │   └── index.astro # English
│   │   ├── de/
│   │   │   └── index.astro # German
│   │   └── api/
│   │       └── confirmar.ts # RSVP API endpoint
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/wedding-website.git
cd wedding-website

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:4321`.

### Production Build

```bash
npm run build
```

This generates:
- `dist/client/` — Static assets (CSS, JS, images)
- `dist/server/` — Node.js server entry point

### Start Production Server

```bash
node dist/server/entry.mjs
```

---

## 🌍 Internationalization (i18n)

Translations are stored in `src/i18n/`:

```
src/i18n/
  es.json   # Spanish (default)
  en.json   # English
  de.json   # German
  index.ts  # Helper functions
```

### How it works

Each page passes a `lang` prop to every component:

```astro
// src/pages/en/index.astro
<Header lang="en" />
<SectionPrincipal lang="en" />
```

Each component loads its translations:

```astro
---
import { useTranslations, type Lang } from '../i18n/index.ts';
const { lang = 'es' } = Astro.props;
const t = useTranslations(lang);
---
<h1>{t.historia.titulo}</h1>
```

To add a new language, create a new JSON file in `src/i18n/`, register it in `index.ts`, and add a new page under `src/pages/[lang]/`.

---

## 📋 Sections

| Section | Description |
|---|---|
| **Principal** | Names, wedding date, and love story |
| **Gallery** | Draggable photo slider |
| **Pre-Wedding** | Pre-wedding event details with floral decorations |
| **Celebration** | Timeline of the wedding day events with illustrated line |
| **Dress Code** | Attire guidelines with couple illustration |
| **Playlist** | Animated vinyl disc with link to music playlist |
| **Accommodation** | Main hotel and draggable hotel suggestions slider |
| **Suggestions** | Make-up and suit rental recommendations |
| **Contact** | Wedding planner, bride contact, and live countdown |
| **Gifts** | Gift message |
| **RSVP Form** | Attendance confirmation form with framed background |

---

## 🎨 Customization

### Fonts
Custom fonts are loaded from `src/assets/fonts/` via `@font-face` in `Layout.astro`. Replace the `.otf` files to change the typography.

### Wedding Date
The countdown timer target date is set in `SectionContact.astro`:
```javascript
const weddingDate = new Date('2026-10-22T17:00:00');
```

### Translations
Edit the JSON files in `src/i18n/` to update any text across all languages simultaneously.

---

## 📄 License

This project is private and intended for personal use. All images and fonts are used with appropriate rights.

---

*Made with ❤️ for Alejandra & Alexander — October 22, 2026*
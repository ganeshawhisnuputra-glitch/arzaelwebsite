# ARZAEL — Official Artist World (V0 Foundation)

This is the official web world foundation for **ARZAEL**, designed as an expandable, intimate, atmospheric digital experience.

---

## 1. Architectural Overview

- **Framework**: React 19 + TypeScript + Vite
- **Routing**: Single-page application using `react-router-dom` v7 with persistent layout wrapping
- **Styling**: Tailwind CSS with custom semantic design tokens (`petrol-teal` & `flesh-pink` dialectic)
- **Audio System**: Top-level persistent `AudioContext` with zero autoplay and non-blocking layout placement
- **Asset Protocol**: Strict non-negotiable policy with centralized, typed placeholders in `src/data/placeholderRegistry.ts`

---

## 2. Directory Structure

```
/
├── public/
│   ├── favicon.svg
│   └── assets/
│       └── brand/                  # Web-safe brand assets
├── src/
│   ├── components/
│   │   ├── audio/
│   │   │   └── MusicPlayer.tsx     # Persistent audio engine
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── MediaPlaceholder.tsx# Centralized placeholder renderer
│   │   │   └── OuroborosMotif.tsx  # Cyclical interactive motif
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── MobileNavigation.tsx
│   │   │   └── PrimaryNavigation.tsx
│   │   ├── letters/
│   │   │   └── LettersModal.tsx    # Direct correspondence modal
│   │   └── quiz/
│   │       └── QuizPreviewCard.tsx # "How Do You Self Sabotage?" reflection
│   ├── context/
│   │   ├── AudioContext.tsx
│   │   └── ModalContext.tsx
│   ├── data/
│   │   ├── archiveEras.ts
│   │   ├── navigation.ts
│   │   ├── placeholderRegistry.ts
│   │   ├── products.ts
│   │   ├── quizData.ts
│   │   ├── selfSabotageEra.ts
│   │   └── videos.ts
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── ArchivePage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LettersPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── SelfSabotagePage.tsx
│   │   ├── ShopPage.tsx
│   │   └── WatchPage.tsx
│   ├── tokens/
│   │   └── theme.ts
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
```

---

## 3. Development Commands

Run all scripts using `npm.cmd` (or `npm` if your execution policy allows):

```bash
# Start local development server
npm.cmd run dev

# Run TypeScript type checks
npm.cmd run type-check

# Build optimized production bundle
npm.cmd run build

# Preview production build locally
npm.cmd run preview
```

---

## 4. Brand Color Tokens & Philosophy

- **Deep Petrol Teal (`#030c0e` to `#147287`)**: Represents numbness, control, intelligence, distance, and outsiderhood.
- **Flesh Pink / Dirty Coral (`#d97e78` to `#f09f9a`)**: Represents exposed emotion, humanity, vulnerability, shame, and tenderness beneath numbness.
- **Contrast & Accessibility**: All body typography adheres to WCAG AA contrast guidelines with strict `@media (prefers-reduced-motion)` fallbacks.

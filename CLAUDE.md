# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run deploy    # Build + deploy to GitHub Pages (gh-pages -d dist)
```

## Architecture

Vue 3 (Composition API `<script setup>`) + Vite 5 + Vue Router 4 blog. Zero backend — Markdown files in `posts/` are the data source. The app is deployed to GitHub Pages at `https://DGAL831143.github.io/dgal-blog/`.

### Content pipeline (the core)

`src/utils/loadPosts.js` — the engine. Works as follows:

1. `import.meta.glob('/posts/*.md', { as: 'raw', eager: true })` auto-scans all `.md` files at build time
2. `parseFrontmatter(raw)` — regex-based YAML frontmatter parser (title, date, tags, category, summary). No gray-matter dependency.
3. `renderMath(raw)` — KaTeX preprocessor: renders `$...$` inline and `$$...$$` block formulas to HTML **before** markdown-it runs
4. Custom markdown-it heading plugin — auto-adds `id` attributes to h2/h3 via `md.renderer.rules.heading_open` override; `slugify()` handles Chinese+English mixed text
5. `highlight.js` code blocks — checked with `hljs.getLanguage(lang)` before highlighting
6. `loadPosts()` returns sorted article list (no HTML rendering — lazy/deferred). `getPostBySlug(slug)` returns a single article with rendered `contentHTML` + `headings[]` array.

### Layout hierarchy

```
App.vue
├── NavBar.vue        (fixed, glass effect, max-width: 960px)
├── <router-view>
│   ├── Home.vue      (single column, max-width: 720px centered)
│   └── Article.vue   (grid: 1fr 160px, TOC sidebar + float panels)
└── FooterBar.vue
```

### Key design tokens (CSS custom properties)

- `--max-width: 960px` — widest container (article + sidebar)
- `--content-width: 720px` — single-column content (home, article body)
- `--nav-height: 64px` — used for scroll-margin and sticky offsets
- Background: `#F5F7FA`, text: `#1F2937`, accent: `#2563EB`

### Two critical deployment constants

Both must stay in sync — the repo name is `dgal-blog`:

- **`vite.config.js`**: `base: '/dgal-blog/'`
- **`src/router/index.js`**: `createWebHistory('/dgal-blog/')`

If either is wrong, assets/links break on GitHub Pages.

### Article.vue unique features

- **Float translation panels**: `<details>` elements in markdown that contain `.float-panel` divs are extracted via `onMounted` + `querySelectorAll`. Content is Teleported to `<body>` as draggable windows. The panel's visibility is synced to the parent `<details>` toggle event.
- **`.wide` class**: CSS breakout from 720px content width to fill the full 960px (article + sidebar gap) — used for wide code blocks and compare layouts.
- **`.compare` grid**: two-column `1fr 1fr` layout inside `.wide`, collapses at 680px.
- **TOC**: desktop sidebar (sticky, 160px column), mobile `<details>` above the article title.

### Markdown writing conventions

Frontmatter format:
```yaml
---
title: 文章标题
date: 2026-05-11
tags: [InSAR, GIS]
category: 科研笔记
summary: 简短摘要
---
```

Special CSS classes available in markdown:
- `.wide` — content breakout to full 960px width
- `.compare` + `.compare-panel` — side-by-side comparison grid
- `.float-panel` — content moved to draggable floating window (inside `<details>`)
- `.details-content` — styled padding inside `<details>` bodies

### Key constraints

- No gray-matter, no Tailwind, no backend, no auth — pure Vue 3 + essential libs
- KaTeX and highlight.js are bundled client-side (~1.3MB uncompressed in loadPosts.js)
- `markdown-it` config: `html: true` (required for KaTeX output), `typographer: true`
- Inter font loaded from Google Fonts CDN in `index.html`

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **single-page promotional landing site** for **트레이너 헬퍼 (Trainer Helper)** — a separate SaaS product
(source: `github.com/gus99688460-svg/Trainer_helper`, a Flask + Claude AI web app for PT trainers). This repo only
contains the marketing page; it does not contain the product itself. Copy and feature claims here must stay faithful
to that product's actual features — do not invent features, statistics, or testimonials (an enforced project rule;
the original in-app landing's unverifiable stats were intentionally removed).

Pure HTML/CSS/JS. **No build step, no bundler, no package manager, no tests, no lint.**

## Commands

```bash
# Local preview (recommended over double-clicking — font CDN + JS need a server origin)
cd /mnt/c/Users/user/projects/homepage
python3 -m http.server 8000        # then open http://localhost:8000
```

There is nothing to build or compile — edit a file, reload the browser.

## Architecture / things to know before editing

- **`APP_URL` is the single source of truth for all outbound links.** It lives at the top of `main.js`
  (`const APP_URL = "#"`). On load, `injectAppLinks()` rewrites the `href` of:
  - `<a data-app-link>` → `APP_URL` (main CTAs, login, "시작하기")
  - `<a data-app-path="/terms">` → `APP_URL` + path (footer 약관/개인정보/환불); falls back to `#` while `APP_URL === "#"`.
  So **never hardcode the app URL into `index.html`** — add the attribute and let `main.js` inject it. Changing the
  one constant updates every link. Current value: `https://web-production-237fa.up.railway.app` (Railway). Mapping:
  `data-app-link` → `APP_URL + "/app"`; `data-app-path="/x"` → `APP_URL + "/x"` (login `/login`, footer `/terms`
  `/privacy` `/refund`). Setting `APP_URL` back to `"#"` makes everything fall back to `#`.

- **All styling goes through design tokens.** `style.css` declares colors, spacing, radius, shadows, and a `clamp()`
  type scale as CSS custom properties in `:root`. Use the variables (e.g. `var(--gold)`, `var(--sp-5)`); avoid
  one-off pixel/hex values. The dark + gold palette and Pretendard font are deliberately inherited from the source
  product for brand consistency.

- **Responsive: three breakpoints**, mobile-first. ≤768px = 1 column + hamburger menu; 769–1024px = 2–3 columns;
  ≥1025px = 3 columns. The 7-card "핵심 기능" grid spans the 7th card across 2 columns on desktop to avoid an orphan.
  Target: no breakage 360–1440px.

- **`main.js` is plain IIFE vanilla JS, defensively coded** (each init early-returns if its DOM nodes are absent).
  It handles only link injection, the hamburger menu (aria + ESC/overlay/link-click close + scroll lock), and
  IntersectionObserver scroll-reveal (which adds `.show` to `.reveal` elements; respects `prefers-reduced-motion`).

- **FAQ uses native `<details>`** — it works without JS (progressive enhancement). Don't replace it with a
  JS-only accordion.

- Accessibility is a maintained baseline: `<html lang="ko">`, semantic landmarks, visible focus rings, 44px touch
  targets, `.sr-only` labels (e.g. 포함/미포함 in the pricing list so meaning isn't color-only). Preserve these when editing.

- The footer pricing section shows **feature comparison only, no prices** (a product decision). Footer business info
  (상호/대표자/사업자등록번호 etc.) is real, live data — verify before changing.

- `.kkirikkiri/` is the agent-team workspace from the `/kkirikkiri` build session (planning docs, copy/design specs,
  review reports). It is **not part of the shipped site** — ignore it when editing the page.

See `README.md` for the file-by-file layout, the exact `APP_URL` replacement steps, and the tech-stack notes.

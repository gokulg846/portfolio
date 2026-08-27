# Gokul Gopalakrishnan — Portfolio

Personal portfolio for Gokul Gopalakrishnan, featuring product and engineering
case studies across AI evaluation, industrial vision, connected telemetry, and
autonomous robotics.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build:pages
```

The production build is a static export in `dist/client`.

## GitHub Pages

- Pushes to `main` deploy through `.github/workflows/pages.yml`.
- The public site is available at
  `https://gokulg846.github.io/portfolio/`.
- GitHub Pages serves the static files uploaded from `dist/client`.

## Project Structure

- `app/` — portfolio page, metadata, and styles
- `public/` — résumé and social-preview assets
- `tests/` — checks for the exported static site

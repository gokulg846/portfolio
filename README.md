# Gokul Gopalakrishnan — Portfolio

Personal portfolio for Gokul Gopalakrishnan, featuring PM/TPM case studies and
product-operating artifacts across manufacturing traceability, industrial
anomaly detection, continuous compliance, and semiconductor yield analytics.

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

- `app/` — homepage, static project routes, metadata, and styles
- `content/projects/` — typed case studies, PRDs, technical designs, program
  plans, validation packs, and recording guides
- `docs/demo-recording-handoff.md` — recording priority, capture standard, and
  YouTube handoff format
- `public/` — résumé and social-preview assets
- `tests/` — exported-route, asset, content-boundary, and forbidden-language checks

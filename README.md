# portfolio

Personal developer portfolio for **Yafis Yasar A** — built with React + Vite.

## Stack

- **React** + **Vite**
- Vanilla CSS (no Tailwind)

## Features

- Terminal-inspired aesthetic with monospace type (JetBrains Mono)
- Pitch black background with GitHub blue accent (`#58a6ff`)
- Grid background with mouse-following glow
- Boot-sequence loading screen with progress bar
- Word-by-word text scramble effect on logo and name
- GitHub integration — live language stats & project data
- Certificate viewer with modal PDF preview
- Fully responsive

## Sections

- Hero
- Projects
- Skills
- Certifications (5 certs with inline PDF viewer)
- Languages (fetched from GitHub API)
- Experience
- Contact (includes Resume download link)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

Site will be available at `https://yafisyasar.github.io/portfolio/`.  
Go to repo **Settings → Pages** and set the source to the `gh-pages` branch.

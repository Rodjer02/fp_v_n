# Portfolio — Rodjer

Personal portfolio. Next.js (App Router) with static export, plain CSS, Three.js for the WebGL scenes.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # static site in out/
npm start          # preview out/ locally
```

`out/` can be deployed as-is to any static host (Vercel, GitHub Pages, Netlify, nginx).

## Where things live

- `src/content/site.ts` — all content: contacts, experience, projects, marquee stack.
- `src/app/page.tsx` — page markup (sections from the design).
- `src/app/globals.css` — styles and animations.
- `src/components/Effects.tsx` — client-only effects: WebGL scenes (hero sphere, agent network, torus knot), card tilt, cursor spotlight.
- `public/` — photo, CV (`CV_2.pdf`).

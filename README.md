# Tezeon Services Limited — Website

Company website for Tezeon Services Limited, a water engineering company in
Lagos, Nigeria — borehole drilling, water filtration, reservoir construction
and plumbing.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion**,
ported pixel-faithfully from the original static HTML template (which is
preserved in [`legacy/`](./legacy) for reference).

## Getting started

```bash
pnpm install     # install dependencies
pnpm dev         # run the dev server at http://localhost:3000
pnpm build       # production build (all routes prerender statically)
pnpm start       # serve the production build
pnpm lint        # eslint
npx tsc --noEmit # typecheck
```

## Project structure

```
app/            # routes: /, /about, /services, /team, /projects, /gallery, /contact
components/     # layout/, sections/, shared/, ui/ — legacy-mirrored building blocks
lib/            # data.ts (single source of company content), animations.ts, chat.ts
legacy/         # original static HTML/CSS/JS template, kept for reference
public/assets/  # local media (site video, filtration tanks image)
scripts/        # blur-placeholder generation (sharp)
types/          # shared TypeScript contracts
```

## Content & theming

- All company copy, images, videos and contact details live in `lib/data.ts`
  (transcribed verbatim from the legacy template).
- Design tokens (brand gold `#fdbe33`, navy `#030f27`, cyan accent `#33d0fd` …)
  are defined in `app/globals.css` and match the legacy stylesheet exactly.
- Contact form currently hands messages to the visitor's email client
  (`mailto:`); wire it to a mail transport for server-side sending.

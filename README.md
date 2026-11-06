# See Image 1.0 — Official Launch Site

Official launch website for **See Image 1.0** by See AI.
Two image models, both in intensive training and not yet released:

- **See Image 1.0 Mini** — for drafts
- **See Image 1.0 Large** — for final images

Access will be available through third-party providers or the See AI API only.
The API is not live yet.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push this project to GitHub (see the `LICENSE` file in the project root).
2. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
3. The framework preset **Next.js** is auto-detected (see `vercel.json` in the
   project root: framework `nextjs`, build command `npm run build`, install
   command `npm install`). Do not set an output directory — Vercel reads
   `.next` natively for Next.js.
4. Settings to confirm:
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next` (Vercel default — do not override)
   - Install Command: `npm install`
   - Node.js version: **20**
5. Click **Deploy**.

### How deployments work

- Every push to `main` creates a **production** deployment.
- Every pull request creates a **preview** deployment with its own URL.
- Environment variables, if ever needed, are set in the Vercel dashboard
  (Project → Settings → Environment Variables) — never commit `.env` files.
  This project needs no environment variables today.

### Custom domain

Add `seeai.xyz` in the Vercel dashboard (Project → Settings → Domains) and
point its DNS to Vercel as instructed there. Vercel provisions SSL for the
domain automatically, with automatic renewal.

## Project structure

```
app/            App Router pages (one route per page)
  page.tsx      Home
  studio/       Generation studio (front-end preview)
  capabilities/ Capabilities
  gallery/      Gallery (13 images)
  models/       Models — Mini and Large
  pricing/      Pricing (prices to be announced)
  api/          API access
  company/      Company, founder and contact
components/     Shared UI: HeaderPill, Footer, LanguageToggle,
                ModelCard, GalleryGrid, StudioPreview
lib/            i18n dictionaries and site data
public/         logo.png and gallery images
```

## Contact

Official email: See@seeai.xyz

## License

See `LICENSE` — SEE AI – EXCLUSIVE PROPRIETARY LICENSE, Version 1.0.
All Rights Reserved. Copyright (c) 2026 See AI.

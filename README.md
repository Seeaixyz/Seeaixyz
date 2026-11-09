# See Image 1.0 — Next.js

Real Next.js 15 + React 19 + TypeScript (App Router) conversion of the See Image
site. Same design, same copy, same behaviour as the plain static source
(`~/workspace/see-new/`).

## Run

```bash
npm install
npm run dev      # development server
npm run build    # production build
npm start        # production server
```

## Deploy (Vercel)

```bash
vercel --prod
```

The project deploys into the existing `seeaixyz` Vercel project (domains
`seeai.xyz`, `www.seeai.xyz`). `vercel.json` keeps clean URLs and the security
headers; the Edge Middleware (`src/middleware.ts`) and the waitlist API route
(`src/app/api/waitlist/route.ts`) run on Vercel.

## Structure

- `src/app/` — App Router pages: `/`, `/waitlist`, `/privacy`, `/terms`,
  `/about`, `/updates`, `/decoy`, plus `api/waitlist` (POST route handler).
  The site chrome (top bar, menu sheet, footer, VPN block, analytics) lives
  in `src/app/(site)/layout.tsx`; `/decoy` is a plain unbranded page outside
  that group.
- `src/content.json` — the single source of ALL texts (ar + en). Copy is never
  hardcoded into components. Default language is Arabic (`defaultLang: "ar"`);
  flip it to `"en"` after the Arabic version is approved.
- `src/components/` — React components: `LangProvider` (language state,
  `?lang=` / localStorage, instant switch, no reload), `TopBar`, `MenuSheet`,
  `SiteFooter`, `WaitlistForm`, `ModelCard` (expandable), `ShowcaseGrid`
  (lightbox), `VpnBlock` (client-side ipwho.is check, fail-open), `Reveal`
  (scroll reveal).
- `src/middleware.ts` — Edge Middleware: AI-bot UA 403, ip-api.com
  VPN/proxy check (cached 1h, fail-open) rewriting flagged IPs to `/decoy`.
- `public/` — assets (grayscale logo, og-image, showcase webp, gallery jpg),
  `robots.txt`, `sitemap.xml`.

## Notes

- The static site's CSP meta tag (`script-src 'self'`) would block Next.js's
  own inline bootstrap scripts, so the CSP is set in `next.config.ts` with
  `'unsafe-inline'` for scripts and styles; external fetches stay limited to
  `ipwho.is` and `formsubmit.co`. All other security headers stay in
  `vercel.json`, unchanged.
- The waitlist consent line (`wlConsent`) links to `/privacy` (Next.js route)
  instead of the static `privacy.html`.
- `DEFAULT_LANG` is `'ar'` (see `src/content.json` → `defaultLang`).

# See Image Next.js migration

Convert every functional site page to a real Next.js App Router application in English-only React/TypeScript. Preserve the supplied original archive exactly as inert reference files. Retain images, product copy, responsive styling, gallery interactions, model cards, email signup and search metadata.

The active UI is under `src/app/(site)` and shared React components under `src/components`. English-only text and SEO data live in `src/data` and `src/lib`. Original public image assets live under `public/assets`. The whole extracted archive remains at `archive/original`, outside public paths.

Apply server-side security in `src/proxy.ts`: verify crawler IPs against the Google-published common crawler CIDR feed; block spoofed crawler agents and other bots; require a trusted canonical Vercel client IP; classify VPN/proxy/Tor/hosting networks using a server-side HTTPS provider; fail closed on missing or ambiguous IP information, provider failures and invalid/quota responses. Add strict security headers, basic abuse limits and origin checks. Rate limiting in serverless memory is only a backstop and must be supplemented with Vercel WAF rules for production scale. Keep email submission server-side with validation, request-size bounds and explicit upstream success. Do not expose or add any secret key to Git.

Deliver by adding a new commit to the current repository default branch, replacing the active tree without rewriting Git history. Test TypeScript and production build. Deployment requires a Next.js framework configuration and a working security-provider API key in the Vercel project environment.

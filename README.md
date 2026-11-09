# See Image — Next.js App Router

This is a real Next.js App Router application written in TypeScript and React TSX, not an HTML site relabeled as Next.js or embedded in an iframe. The active website is English-only. Original source material, including its Arabic text, remains in the inert archive for preservation only.

## Requirements and startup

Use Node.js 22 LTS or a later supported LTS release and npm. Next.js requires Node.js 20.9 or newer. Versions are pinned to Next.js **16.4.5**, React / React DOM **19.3.1**, and TypeScript **5.9.3**. The Next.js version was checked against the npm registry's stable `latest` tag during migration. TypeScript 5.9 is intentionally pinned for compatibility rather than following the TypeScript major-version tag automatically.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. For production-mode verification:

```sh
npm run typecheck
npm run build
npm start
```

`next.config.ts` limits build workers with `experimental.cpus: 2`. This is a server-capable Next.js deployment; do not add `output: 'export'`, a static-export step, or a static-only server. The waitlist API and request protection need a server runtime. Keep the npm-generated `package-lock.json` in source control after installation; later clean installations can use `npm ci`.

## Source and preservation

`src/app` contains App Router pages, layouts, metadata and the actual `api/waitlist/route.ts` endpoint. React components live in `src/components`, and imported content lives in `src/data` and `src/lib`. `public/assets` holds browser-served images and other public assets.

`archive/original` preserves every supplied original file, byte-for-byte. It is outside `public`, excluded from TypeScript compilation, and is not imported, executed, routed or served as an application. Original HTML, JavaScript, middleware and hosting configuration there are historical reference material, not active code. Do not move the archive into `public` or create a route that exposes it. The project does not depend on raw HTML injection to render its original pages.

The legacy paths `/index.html`, `/about.html`, `/waitlist.html`, `/privacy.html`, `/terms.html`, `/updates.html` and `/decoy.html` permanently redirect to their App Router counterparts. Existing bookmarks and query parameters remain usable.

## Waitlist: server-side FormSubmit

The browser sends JSON only to `POST /api/waitlist`:

```json
{"email":"person@example.com"}
```

The route validates the JSON media type, bounds the request body to 4 KiB, checks the email type, syntax and 254-character maximum, and then calls FormSubmit from the server. There is no direct client-side FormSubmit fallback. `WAITLIST_TARGET` is server-only and defaults to `See@seeai.xyz`; change it in the hosting environment if needed. Do not use a `NEXT_PUBLIC_` variable for the recipient.

**Activate the FormSubmit recipient before relying on submissions.** FormSubmit sends an activation message to the configured mailbox; someone with access must follow its activation link. This migration cannot activate that mailbox, guarantee email delivery, or prove that an upstream service has retained a subscriber. Test with an address you control after deployment and confirm actual receipt. Acceptance by FormSubmit is not an independently verified delivery receipt.

The API returns `{ "ok": true }` only after an HTTP-successful upstream response explicitly reports success. Invalid input returns `400`, an oversized body `413`, an unsupported media type `415`, unsupported methods `405`, upstream rejection/network/invalid-response errors `502`, and the eight-second upstream timeout `504`. Invalid recipient configuration returns `503`. Responses are not cached. Failure does not display a false success or silently send the email through another path. No local database or durable subscriber list is included; production abuse prevention and operational delivery monitoring are separate concerns.

## Request security and limitations

Request protection belongs in the active Next.js Proxy file, not the archived middleware. The production policy is to block VPN/proxy traffic and bots, with an exception only for a genuinely verified Google crawler. A Google-looking User-Agent is not sufficient verification: the implementation must check the connecting IP against Google's published crawler ranges. Do not treat header matching, a `robots.txt` declaration, or this marketing frontend as a security boundary.

Only trust Vercel-supplied client IP headers when actually deployed on Vercel. Do not set `VERCEL` manually on local or self-hosted environments. A reverse proxy in front of Vercel may cause the observed IP to identify that proxy instead of the original visitor. VPN and hosting classifications can produce false positives for corporate gateways, shared networks, privacy relays and data centers. Strict production checks can also deny legitimate visitors if the provider times out, is unavailable, reaches its plan quota, or cannot classify an IP. Use an HTTPS-capable provider and a plan licensed for the deployment's traffic and commercial usage; do not use the original free HTTP-only ip-api endpoint for a commercial production service. Provider-specific variables and the final enforcement behavior are defined by the active Proxy implementation. Configure a server-side `PROXYCHECK_API_KEY` for sustainable provider access. Without it, ProxyCheck documents a limit of 100 IP queries per day. The implementation fails closed on outages and quota exhaustion. No provider key was supplied with this migration.

`/decoy` is an English-only, unbranded, noindex unavailable page suitable for a `NextResponse.rewrite`. Its visible `ERR_503` label is presentation text, not proof of the HTTP response status. A rewritten unavailable page does not hide the hosting provider: DNS, network addresses and platform response headers can still identify Vercel. Bot detection and published Google ranges are imperfect and require maintenance.

Security headers are configured using Next.js's supported `headers()` API. `Permissions-Policy` uses valid directives: `camera=(), microphone=(), geolocation=()`. There is deliberately no copied static CSP that would reject Next.js hydration scripts. A strict CSP would need a tested nonce/hash-aware implementation for the runtime. HSTS is intended for HTTPS deployment; review the include-subdomains/preload commitment before enabling it across a domain with non-HTTPS subdomains.

## Deploy to an existing Vercel project

Use this directory as the project's **Root Directory**. `vercel.json` explicitly sets `framework: "nextjs"`, installs with npm, runs `npm run build`, and leaves the output directory to the Next.js integration.

In an existing Vercel project, open **Settings → Build and Deployment** and explicitly select **Next.js** if the project was previously classified as “Other” or as a static site. Clear old Output Directory overrides such as `.`, `public`, `dist` or `out`; the Next.js preset must control the output. Also remove legacy static-only build commands, install overrides, rewrites or dashboard settings that bypass Next.js. A changed repository configuration does not necessarily clear every existing dashboard override. Do not set an output directory merely to make a static preview deploy.

Set `WAITLIST_TARGET` and all required production security-provider environment variables in the intended Production and Preview environments, then redeploy. Verify the home and informational pages, a legacy `.html` redirect, `/robots.txt`, `/sitemap.xml`, a real waitlist submission, and the production protection policy. Local success is not enough to validate Vercel IP headers or an external provider's production quota. No credentials or repository connection are included in this migration.

## Product scope

This is the See Image marketing and waitlist experience. **There is no actual AI image-model backend, image-generation API, inference service, payment system or user account service in this project.** Sample images and product copy are not evidence that generation is implemented. Connecting a real model requires a separate authenticated, rate-limited server integration and appropriate usage, privacy and billing controls.

## References

- [Next.js Proxy convention](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
- [Vercel request headers](https://vercel.com/docs/headers/request-headers)
- [Original ip-api endpoint limits and licensing](https://ip-api.com/docs/api:json)
- [FormSubmit documentation and activation](https://formsubmit.co/)

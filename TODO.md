# Outcomes

- [x] Convert the original static HTML site to English-only Next.js App Router pages using TypeScript and TSX React components; remove Arabic from all active interface text and metadata.
- [x] Preserve the complete extracted original file set without modification at `archive/original`, outside public routing.
- [x] Preserve the existing visual design, assets, English copy, gallery, interactive model cards and waitlist UI.
- [x] Add a server-side email signup API with request validation, body limits, same-origin checking, rate limits and no client-side FormSubmit fallback.
- [x] Add strict server-side VPN/proxy/Tor/hosting deny-by-default checks, CIDR-based Google crawler verification, bot blocking and security headers.
- [ ] Confirm an API key for the HTTPS IP-classification provider is configured on Vercel before enabling public production traffic; fail-closed checking intentionally denies access on provider errors or quota exhaustion.
- [ ] Pass TypeScript validation and production build.
- [ ] Push a commit to `Seeaixyz/Seeaixyz` via the GitHub API and verify the commit and repository tree.
- [ ] Revoke/delete the exposed GitHub credential and recommend replacing it with a new least-privilege credential.

import type { NextConfig } from 'next';

// CSP, adapted for Next.js. The static site's CSP meta tag used
// `script-src 'self'` with no 'unsafe-inline', which would block Next.js's own
// inline bootstrap scripts, so 'unsafe-inline' is required for scripts and
// styles. External fetches stay limited to ipwho.is and formsubmit.co.
// All other security headers (nosniff, HSTS, X-Frame-Options, Referrer-Policy,
// Permissions-Policy, /assets immutable cache) live in vercel.json, unchanged.
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob:; connect-src 'self' https://ipwho.is https://formsubmit.co; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

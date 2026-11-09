import { NextResponse, type NextRequest } from 'next/server';

// See Image — Vercel Edge Middleware (server-side security, runs before the cache).
// 1. AI-training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot,
//    Applebot-Extended, Meta-ExternalAgent, Bytespider, ...) get 403. They never
//    fetch the site. Search-engine crawlers (Googlebot, Bingbot) are ALLOWED so
//    the site stays findable.
// 2. VPN / proxy / hosting (datacenter) exits are checked via ip-api.com (free
//    tier, server-side HTTP call, fields proxy+hosting). Results are cached per
//    IP for 1h; any error or rate-limit FAILS OPEN so the site never goes down
//    because of the check. A flagged IP is REWRITTEN to /decoy — a plain,
//    unbranded "site unavailable" page served with status 200, so the visitor
//    thinks the site is down instead of knowing they were blocked.
// 3. Everything else passes through untouched.
// NOTE: no server-side check can hide that the site is hosted on Vercel —
// DNS/IP lookup always reveals the host. This stops bots from fetching the
// site and hides the block itself behind a decoy page, which is the strongest
// practical measure short of a Cloudflare proxy in front.
const AI_BOTS =
  /GPTBot|ChatGPT-User|ClaudeBot|anthropic-ai|CCBot|Google-Extended|PerplexityBot|Applebot-Extended|Meta-ExternalAgent|Bytespider|cohere-ai|AI2Bot|YouBot|DuckAssistBot|Omgilibot|FacebookBot|Amazonbot|Seekr/i;

const cache = new Map<string, { v: boolean; t: number }>();

function clientIp(req: NextRequest): string {
  const f = req.headers.get('x-forwarded-for');
  if (f) return f.split(',')[0].trim();
  return req.headers.get('x-real-ip') || '';
}

async function vpnBlocked(ip: string): Promise<boolean> {
  const now = Date.now();
  const hit = cache.get(ip);
  if (hit && now - hit.t < 3600e3) return hit.v;
  let v = false;
  try {
    const r = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,proxy,hosting`,
      { signal: AbortSignal.timeout(1500) },
    );
    const j = (await r.json()) as {
      status?: string;
      proxy?: boolean;
      hosting?: boolean;
    };
    v = j.status === 'success' && (j.proxy === true || j.hosting === true);
  } catch {
    v = false;
  }
  if (cache.size > 5000) {
    const k = cache.keys().next().value;
    if (k) cache.delete(k);
  }
  cache.set(ip, { v, t: now });
  return v;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/decoy'
  ) {
    return NextResponse.next();
  }
  const ua = req.headers.get('user-agent') || '';
  if (AI_BOTS.test(ua)) {
    return new Response('Forbidden', { status: 403 });
  }
  const ip = clientIp(req);
  if (ip && (await vpnBlocked(ip))) {
    return NextResponse.rewrite(new URL('/decoy', req.url));
  }
  return NextResponse.next();
}

export const config = {
  // Runs for pages, assets and the API route — same coverage as the static
  // site's middleware. Only Next.js internals are excluded.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

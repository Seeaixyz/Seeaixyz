import { NextResponse, type NextRequest } from 'next/server';

// See Image — Vercel Edge Middleware (lowered protection, 2026-11-12).
// 1. ALL bots are welcome — any crawler that indexes the site passes
//    straight through, no verification, so the site shows up in search
//    engines as fast as possible. This also lets AI-training crawlers
//    (GPTBot, ClaudeBot, ...) fetch the site.
// 2. Datacenter / hosting IPs are NOT blocked. Only real VPN/proxy exits
//    (ip-api.com `proxy`) are rewritten to /decoy.
// 3. The only hard block left is spam: one IP making more than 120
//    requests a minute (non-bot traffic) gets HTTP 429 for 10 minutes.
//    The counters are in-memory per edge instance, so this is best-effort,
//    not a guarantee.
// 4. Any ip-api.com error or timeout FAILS OPEN, so the site never goes
//    down because of the check.
const BOT_UA = /bot|crawler|spider|slurp|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot/i;

const vpnCache = new Map<string, { v: boolean; t: number }>();
const rateCache = new Map<string, { n: number; start: number; blockedUntil: number }>();

const RATE_LIMIT = 120; // requests per minute per IP
const RATE_WINDOW_MS = 60_000;
const BLOCK_MS = 10 * 60_000;

function clientIp(req: NextRequest): string {
  const f = req.headers.get('x-forwarded-for');
  if (f) return f.split(',')[0].trim();
  return req.headers.get('x-real-ip') || '';
}

async function isVpn(ip: string): Promise<boolean> {
  const now = Date.now();
  const hit = vpnCache.get(ip);
  if (hit && now - hit.t < 3600e3) return hit.v;
  let v = false;
  try {
    const r = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,proxy`,
      { signal: AbortSignal.timeout(1500) },
    );
    const j = (await r.json()) as { status?: string; proxy?: boolean };
    v = j.status === 'success' && j.proxy === true;
  } catch {
    v = false;
  }
  if (vpnCache.size > 5000) {
    const k = vpnCache.keys().next().value;
    if (k) vpnCache.delete(k);
  }
  vpnCache.set(ip, { v, t: now });
  return v;
}

function isSpamming(ip: string): boolean {
  const now = Date.now();
  const hit = rateCache.get(ip);
  if (hit && now < hit.blockedUntil) return true;
  if (!hit || now - hit.start >= RATE_WINDOW_MS) {
    rateCache.set(ip, { n: 1, start: now, blockedUntil: 0 });
    return false;
  }
  hit.n += 1;
  if (hit.n > RATE_LIMIT) {
    hit.blockedUntil = now + BLOCK_MS;
    return true;
  }
  return false;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/decoy' ||
    // Google Search Console verification files (google<token>.html) must
    // always be fetchable by Google, or ownership verification fails.
    (pathname.startsWith('/google') && pathname.endsWith('.html'))
  ) {
    return NextResponse.next();
  }
  const ua = req.headers.get('user-agent') || '';
  const ip = clientIp(req);
  // Every bot passes, unverified — indexing speed comes first.
  if (BOT_UA.test(ua)) return NextResponse.next();
  if (!ip) return NextResponse.next();
  // Spam guard: too many requests from one IP in a minute.
  if (isSpamming(ip)) {
    return new Response('Too many requests', { status: 429 });
  }
  // Block VPN/proxy exits only — datacenter IPs pass.
  if (await isVpn(ip)) {
    return NextResponse.rewrite(new URL('/decoy', req.url));
  }
  return NextResponse.next();
}

export const config = {
  // Runs for pages, assets and the API route — same coverage as the static
  // site's middleware. Only Next.js internals are excluded.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

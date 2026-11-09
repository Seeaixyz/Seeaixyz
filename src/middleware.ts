import { NextResponse, type NextRequest } from 'next/server';

// See Image — Vercel Edge Middleware (server-side security, runs before the cache).
// 1. AI-training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot,
//    Applebot-Extended, Meta-ExternalAgent, Bytespider, ...) get 403. They never
//    fetch the site. Search-engine crawlers (Googlebot, Bingbot) are ALLOWED so
//    the site stays findable.
// 2. VERIFIED search-engine crawlers get through WITHOUT the VPN/proxy check.
//    A crawler is verified by reverse DNS (PTR must end in the engine's domain)
//    plus a forward DNS lookup back to the same IP — Google's own recommended
//    method. A spoofed "Googlebot" User-Agent from a random datacenter fails
//    this check and falls through to the VPN/proxy check, so it is still
//    blocked. This does NOT weaken protection: real search bots are let in,
//    everyone else faces the same checks as before.
// 3. VPN / proxy / hosting (datacenter) exits are checked via ip-api.com (free
//    tier, server-side HTTP call, fields proxy+hosting). Results are cached per
//    IP for 1h; any error or rate-limit FAILS OPEN so the site never goes down
//    because of the check. A flagged IP is REWRITTEN to /decoy — a plain,
//    unbranded "site unavailable" page served with status 200, so the visitor
//    thinks the site is down instead of knowing they were blocked.
// 4. Everything else passes through untouched.
// NOTE: no server-side check can hide that the site is hosted on Vercel —
// DNS/IP lookup always reveals the host. This stops bots from fetching the
// site and hides the block itself behind a decoy page, which is the strongest
// practical measure short of a Cloudflare proxy in front.
const AI_BOTS =
  /GPTBot|ChatGPT-User|ClaudeBot|anthropic-ai|CCBot|Google-Extended|PerplexityBot|Applebot-Extended|Meta-ExternalAgent|Bytespider|cohere-ai|AI2Bot|YouBot|DuckAssistBot|Omgilibot|FacebookBot|Amazonbot|Seekr/i;

// Known search-engine crawlers: User-Agent pattern + the reverse-DNS suffix
// the IP's PTR record must end with. (Googlebot and Bingbot are the ones
// that matter most for indexing.)
const SEARCH_BOTS: { ua: RegExp; ptr: RegExp }[] = [
  { ua: /Googlebot/i, ptr: /\.googlebot\.com\.?$/i },
  { ua: /bingbot/i, ptr: /\.search\.msn\.com\.?$/i },
  { ua: /DuckDuckBot/i, ptr: /\.duckduckgo\.com\.?$/i },
  { ua: /YandexBot/i, ptr: /\.(yandex\.com|yandex\.net|yandex\.ru)\.?$/i },
  { ua: /Baiduspider/i, ptr: /\.crawl\.baidu\.com\.?$/i },
];

const cache = new Map<string, { v: boolean; t: number }>();
const botCache = new Map<string, { v: boolean; t: number }>();

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

// Reverse-DNS name for an IP (IPv4 -> in-addr.arpa, IPv6 -> ip6.arpa).
function reverseDnsName(ip: string): string | null {
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length !== 4 || parts.some((p) => !/^\d{1,3}$/.test(p))) return null;
    return `${parts.reverse().join('.')}.in-addr.arpa`;
  }
  if (ip.includes(':')) {
    // Expand :: then reverse every hex nibble.
    const [head, tail] = ip.split('::');
    const h = head ? head.split(':').filter(Boolean) : [];
    const t = tail ? tail.split(':').filter(Boolean) : [];
    const missing = 8 - h.length - t.length;
    if (missing < 0) return null;
    const groups = [...h, ...Array<string>(missing).fill('0'), ...t];
    if (groups.length !== 8 || groups.some((g) => !/^[0-9a-fA-F]{1,4}$/.test(g))) return null;
    const hex = groups.map((g) => g.padStart(4, '0')).join('');
    return `${hex.split('').reverse().join('.')}.ip6.arpa`;
  }
  return null;
}

type DohAnswer = { data?: string };
type DohJson = { Answer?: DohAnswer[] };

async function doh(name: string, type: string): Promise<DohJson | null> {
  try {
    const r = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`,
      { signal: AbortSignal.timeout(2000) },
    );
    if (!r.ok) return null;
    return (await r.json()) as DohJson;
  } catch {
    return null;
  }
}

// True only when the IP provably belongs to a real search-engine crawler:
// PTR record ends with the engine's domain AND a forward lookup of that
// hostname returns the same IP. Cached per IP for 1h. Any failure (DNS
// error, timeout, mismatch) returns false — the request then faces the
// normal VPN/proxy check instead of being let through.
async function isVerifiedSearchBot(ip: string, ua: string): Promise<boolean> {
  const bot = SEARCH_BOTS.find((b) => b.ua.test(ua));
  if (!bot || !ip) return false;
  const now = Date.now();
  const hit = botCache.get(ip);
  if (hit && now - hit.t < 3600e3) return hit.v;
  let v = false;
  try {
    const revName = reverseDnsName(ip);
    if (revName) {
      const ptr = await doh(revName, 'PTR');
      const hostname = ptr?.Answer?.[0]?.data?.replace(/\.$/, '') ?? '';
      if (hostname && bot.ptr.test(hostname)) {
        const fwd = await doh(hostname, ip.includes(':') ? 'AAAA' : 'A');
        const ips = (fwd?.Answer ?? [])
          .map((a) => (a.data ?? '').toLowerCase())
          .filter(Boolean);
        v = ips.includes(ip.toLowerCase());
      }
    }
  } catch {
    v = false;
  }
  if (botCache.size > 5000) {
    const k = botCache.keys().next().value;
    if (k) botCache.delete(k);
  }
  botCache.set(ip, { v, t: now });
  return v;
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
  if (AI_BOTS.test(ua)) {
    return new Response('Forbidden', { status: 403 });
  }
  const ip = clientIp(req);
  // A verified search-engine crawler skips the VPN/proxy check entirely,
  // so Google/Bing can crawl and index the site. Anything that merely
  // pretends to be a crawler fails verification and is checked normally.
  if (ip && (await isVerifiedSearchBot(ip, ua))) {
    return NextResponse.next();
  }
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

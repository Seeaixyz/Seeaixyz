import { randomBytes } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { BLOCKED_AGENT, GOOGLE_SEARCH_AGENT, isGoogleCrawler, limited, networkDecision, trustedClientIp } from '@/lib/security';

const json = (message: string, status: number) => new Response(message, {
  status,
  headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow' },
});
function decoy(request: NextRequest) {
  return NextResponse.rewrite(new URL('/decoy', request.url), { headers: { 'X-Robots-Tag': 'noindex, nofollow' } });
}
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get('user-agent') || '';
  // Keep security and index endpoints available; still limit abusive endpoint requests separately.
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname === '/decoy') return NextResponse.next();
  const ip = trustedClientIp(request);
  if (!ip) {
    if (process.env.NODE_ENV !== 'production') return NextResponse.next();
    return decoy(request); // Fail closed when deployed without a trusted IP signal.
  }
  if (limited(ip, 'global', 360)) return json('Too Many Requests', 429);
  // User-Agent is never sufficient by itself: Google eligibility is verified using official IP ranges.
  const genuineGoogle = GOOGLE_SEARCH_AGENT.test(ua) && await isGoogleCrawler(ip);
  if (GOOGLE_SEARCH_AGENT.test(ua) && !genuineGoogle) return json('Forbidden', 403);
  if (!genuineGoogle && BLOCKED_AGENT.test(ua)) return json('Forbidden', 403);
  // Search-engine Googlebot is the only network-scanner exemption; verified tools such as
  // InspectionTool are also covered by Google ranges, but should not be grouped with bots above.
  if (genuineGoogle) return NextResponse.next();
  const decision = await networkDecision(ip);
  if (decision !== 'allow') return decoy(request); // Unknown, API-down, VPN, proxy, Tor or hosting => deny.
  if (pathname.startsWith('/api/')) {
    if (limited(ip, 'api', 20)) return json('Too Many Requests', 429);
    const origin = request.headers.get('origin');
    if (origin && origin !== request.nextUrl.origin) return json('Forbidden', 403);
  }
  const nonce = randomBytes(18).toString('base64');
  const policy = `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://proxycheck.io https://vitals.vercel-insights.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', policy);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Content-Security-Policy', policy);
  return response;
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };

import { BlockList, isIP } from 'node:net';
import type { NextRequest } from 'next/server';
import snapshot from '@/data/google-crawlers.json';

const GOOGLE_RANGES = 'https://developers.google.com/static/crawling/ipranges/common-crawlers.json';
type Prefix = { ipv4Prefix?: string; ipv6Prefix?: string };
function blockList(prefixes: Prefix[]) {
  const list = new BlockList();
  for (const item of prefixes) {
    const cidr = item.ipv4Prefix || item.ipv6Prefix;
    if (!cidr) continue;
    const [address, prefix] = cidr.split('/');
    list.addSubnet(address, Number(prefix), isIP(address) === 6 ? 'ipv6' : 'ipv4');
  }
  return list;
}
let googleRanges = blockList(snapshot.prefixes);
let refreshedAt = 0;
let refresh: Promise<void> | null = null;
export async function isGoogleCrawler(ip: string) {
  if (Date.now() - refreshedAt > 3600000) {
    refresh ??= (async () => {
      try {
        const response = await fetch(GOOGLE_RANGES, { signal: AbortSignal.timeout(2500), cache: 'no-store' });
        if (!response.ok) throw new Error('Unavailable');
        const data = await response.json();
        if (!Array.isArray(data.prefixes) || !data.prefixes.length) throw new Error('Invalid ranges');
        googleRanges = blockList(data.prefixes);
      } catch { /* Official bundled snapshot remains available during outages. */ }
      finally { refreshedAt = Date.now(); refresh = null; }
    })();
    await refresh;
  }
  return !!isIP(ip) && googleRanges.check(ip, isIP(ip) === 6 ? 'ipv6' : 'ipv4');
}
/** Vercel documents x-vercel-forwarded-for as the public visitor IP header. */
export function trustedClientIp(request: NextRequest): string | null {
  const header = process.env.VERCEL === '1' ? 'x-vercel-forwarded-for' : process.env.TRUSTED_PROXY_IP_HEADER;
  if (!header) return null;
  const raw = request.headers.get(header)?.trim() || '';
  // A single canonical IP only; never trust forwarded chains or untrusted aliases.
  if (!isIP(raw)) return null;
  return raw.startsWith('::ffff:') && isIP(raw.slice(7)) === 4 ? raw.slice(7) : raw;
}
export type NetworkDecision = 'allow' | 'block' | 'unavailable';
const decisions = new Map<string, { value: NetworkDecision; expires: number }>();
const pending = new Map<string, Promise<NetworkDecision>>();
export async function networkDecision(ip: string): Promise<NetworkDecision> {
  const cached = decisions.get(ip);
  if (cached && cached.expires > Date.now()) return cached.value;
  const existing = pending.get(ip);
  if (existing) return existing;
  const work = (async (): Promise<NetworkDecision> => {
    let value: NetworkDecision = 'unavailable';
    try {
      const url = new URL(`https://proxycheck.io/v2/${encodeURIComponent(ip)}`);
      url.searchParams.set('vpn', '1'); url.searchParams.set('asn', '1');
      url.searchParams.set('risk', '1'); url.searchParams.set('tag', '0');
      if (process.env.PROXYCHECK_API_KEY) url.searchParams.set('key', process.env.PROXYCHECK_API_KEY);
      const response = await fetch(url, { signal: AbortSignal.timeout(3500), cache: 'no-store' });
      if (!response.ok) throw new Error('Network check unavailable');
      const body = await response.json();
      const item = body[ip];
      if (body.status !== 'ok' || !item || !['yes', 'no'].includes(item.proxy)) throw new Error('Incomplete network check');
      const type = String(item.type || '');
      const risk = Number(item.risk ?? 0);
      value = item.proxy === 'yes' || /vpn|proxy|tor|hosting|datacenter|data center/i.test(type) || risk >= 34 ? 'block' : 'allow';
    } catch { /* Fail closed: outage, invalid/quota response, or malformed JSON => deny. */ }
    if (decisions.size >= 10000) decisions.delete(decisions.keys().next().value!);
    decisions.set(ip, { value, expires: Date.now() + (value === 'unavailable' ? 10000 : 300000) });
    return value;
  })();
  pending.set(ip, work);
  try { return await work; } finally { pending.delete(ip); }
}
const limits = new Map<string, { count: number; reset: number }>();
/** Local instance backstop only; configure Vercel WAF distributed rate limits for scale. */
export function limited(ip: string, bucket: string, maximum: number, window = 60000): boolean {
  const key = `${bucket}:${ip}`;
  let value = limits.get(key);
  if (!value || value.reset <= Date.now()) { value = { count: 0, reset: Date.now() + window }; limits.set(key, value); }
  value.count++;
  if (limits.size > 20000) limits.delete(limits.keys().next().value!);
  return value.count > maximum;
}
export const GOOGLE_SEARCH_AGENT = /Googlebot|Google-InspectionTool/i;
export const BLOCKED_AGENT = /bot\b|crawler|spider|GPTBot|ChatGPT|Claude|anthropic|CCBot|Google-Extended|GoogleOther|Perplexity|Applebot|Meta-External|Bytespider|cohere|AI2Bot|YouBot|DuckAssist|Omgili|FacebookBot|Amazonbot|Seekr|Headless|PhantomJS|Playwright|Puppeteer|Selenium|curl|wget|python|httpclient|go-http-client|scrapy|aiohttp|axios|node-fetch|libwww|scanner|sqlmap|nikto/i;

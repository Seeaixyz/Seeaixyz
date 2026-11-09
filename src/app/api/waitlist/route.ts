import { NextResponse } from 'next/server';
import { limited, networkDecision, trustedClientIp } from '@/lib/security';

export const runtime = 'nodejs';
export const maxDuration = 15;

const MAX_BODY_BYTES = 4096;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function reply(status: number, error?: string) {
  return NextResponse.json(error ? { ok: false, error } : { ok: true }, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

/** Bound streamed requests too; Content-Length alone is not a reliable limit. */
async function readBody(request: Request): Promise<string | null> {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const ip = trustedClientIp(request as import('next/server').NextRequest);
  if (!ip) return reply(403, 'forbidden');
  if (limited(ip, 'waitlist', 3, 3600000)) return reply(429, 'rate_limit');
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) return reply(403, 'origin');
  if (await networkDecision(ip) !== 'allow') return reply(403, 'network');
  const mediaType = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if (mediaType !== 'application/json') return reply(415, 'content_type');
  const declaredSize = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredSize) && declaredSize > MAX_BODY_BYTES) return reply(413, 'body_too_large');

  let body: unknown;
  try {
    const raw = await readBody(request);
    if (raw === null) return reply(413, 'body_too_large');
    body = JSON.parse(raw);
  } catch {
    return reply(400, 'body');
  }
  if (!body || typeof body !== 'object' || Array.isArray(body) || !('email' in body)) {
    return reply(400, 'email');
  }
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) return reply(400, 'email');

  const target = (process.env.WAITLIST_TARGET || 'See@seeai.xyz').trim();
  if (!EMAIL_PATTERN.test(target)) return reply(503, 'configuration');

  try {
    const upstream = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(target)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, _subject: 'See Image waitlist', _template: 'table' }),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) return reply(502, 'upstream');
    const result: unknown = await upstream.json();
    if (!result || typeof result !== 'object' || !('success' in result)
      || (result.success !== 'true' && result.success !== true)) {
      return reply(502, 'upstream');
    }
    return reply(200);
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      return reply(504, 'timeout');
    }
    return reply(502, 'upstream');
  }
}

function methodNotAllowed() {
  return NextResponse.json({ ok: false, error: 'method' }, {
    status: 405,
    headers: { Allow: 'POST', 'Cache-Control': 'no-store' },
  });
}

export const GET = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;

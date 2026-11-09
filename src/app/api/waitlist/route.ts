import { NextResponse, type NextRequest } from 'next/server';

// POST /api/waitlist {email} — stores a waitlist signup by emailing it to
// See@seeai.xyz via FormSubmit (server-side, so the destination address is
// never exposed to the browser). Set WAITLIST_TARGET in Vercel env vars to
// change the destination.
const TARGET = process.env.WAITLIST_TARGET || 'See@seeai.xyz';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const email = String(
    (body as { email?: unknown } | null)?.email ?? '',
  ).trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'email' }, { status: 400 });
  }
  try {
    const r = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(TARGET)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          _subject: 'See Image waitlist',
          _template: 'table',
        }),
      },
    );
    if (!r.ok) {
      return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
    }
    const j = (await r.json()) as { success?: string };
    if (j.success !== 'true') {
      return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}

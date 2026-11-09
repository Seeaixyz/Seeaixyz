'use client';

import { useState, type FormEvent } from 'react';
import { useLang } from './LangProvider';

// Waitlist: POST to the site's own /api/waitlist (Next.js route handler);
// fall back to a direct FormSubmit call, where no /api exists.
// Both are real server round-trips — never localStorage.
const WL_FALLBACK = 'https://formsubmit.co/ajax/See@seeai.xyz';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [msgColor, setMsgColor] = useState('');
  const [msgVisible, setMsgVisible] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) {
      setMsgVisible(true);
      setMsgColor('#ff6b6b');
      setMsg(t('wlBad'));
      return;
    }
    setSending(true);
    setMsgVisible(true);
    setMsgColor('');
    setMsg(t('wlSending'));
    let ok = false;
    try {
      const r = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      });
      ok = r.ok;
    } catch {
      /* fall through to the direct FormSubmit fallback */
    }
    if (!ok) {
      try {
        const r = await fetch(WL_FALLBACK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: v,
            _subject: 'See Image waitlist',
            _template: 'table',
          }),
        });
        ok = r.ok;
      } catch {
        /* ignore */
      }
    }
    if (ok) {
      setMsg(t('wlOk'));
      setMsgColor('#7dd3a8');
      setEmail('');
    } else {
      setMsg(t('wlErr'));
      setMsgColor('#ff6b6b');
    }
    setSending(false);
  }

  return (
    <>
      <form className="wl wl-form" onSubmit={onSubmit}>
        <div className="wl-row">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t('wlPh')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn light" type="submit" disabled={sending}>
            {t('wlBtn')}
          </button>
        </div>
        <p
          className="wl-msg mu"
          hidden={!msgVisible}
          style={msgColor ? { color: msgColor } : undefined}
        >
          {msg}
        </p>
      </form>
      <p
        className="wl-consent"
        dangerouslySetInnerHTML={{ __html: t('wlConsent') }}
      />
    </>
  );
}

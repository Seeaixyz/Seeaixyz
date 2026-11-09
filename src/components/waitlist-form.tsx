'use client';

import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { useLanguage } from './language-provider';

export function WaitlistForm() {
  const { t } = useLanguage();
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'invalid'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setStatus('invalid'); return; }
    setStatus('sending');
    try {
      const response = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim() }), signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!response.ok || data.ok !== true) throw new Error('Submission failed');
      setStatus('success'); setEmail('');
    } catch { setStatus('error'); }
  }
  const messageKey = { idle: '', sending: 'wlSending', success: 'wlOk', error: 'wlErr', invalid: 'wlBad' }[status];
  return <>
    <form className="wl wl-form" onSubmit={submit} noValidate>
      <div className="wl-row">
        <label className="sr-only" htmlFor={id}>{t('wlPh')}</label>
        <input id={id} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} placeholder={t('wlPh')} aria-describedby={`${id}-message`} disabled={status === 'sending'} />
        <button className="btn light" type="submit" disabled={status === 'sending'}>{t('wlBtn')}</button>
      </div>
      <p id={`${id}-message`} className="wl-msg mu" role="status" aria-live="polite" hidden={status === 'idle'} style={{ color: status === 'success' ? '#7dd3a8' : status === 'error' || status === 'invalid' ? '#ff6b6b' : undefined }}>{messageKey && t(messageKey)}</p>
    </form>
    <p className="wl-consent"><>By signing up you agree to our <Link href="/privacy">Privacy Policy</Link> — we use your email only to notify you at launch.</></p>
  </>;
}

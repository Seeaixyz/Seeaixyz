'use client';

import { useState, type KeyboardEvent } from 'react';
import { useLang } from './LangProvider';
import { useReveal } from './Reveal';

export default function ModelCard({ kind }: { kind: 'mini' | 'large' }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useReveal<HTMLElement>();

  const name = kind === 'mini' ? t('miniName') : t('largeName');
  const desc = kind === 'mini' ? t('miniDesc') : t('largeDesc');
  const more = kind === 'mini' ? t('miniMore') : t('largeMore');
  const badge = kind === 'mini' ? 'Mini' : 'Large';

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((o) => !o);
    }
  }

  return (
    <article
      ref={ref}
      className={`model-card ${kind} reveal${open ? ' open' : ''}`}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={onKey}
    >
      <span className="expand">
        <svg
          className="ic"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
      <span className="badge">{badge}</span>
      <h3>{name}</h3>
      <p>{desc}</p>
      <p className="more">{more}</p>
    </article>
  );
}

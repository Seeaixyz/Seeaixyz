'use client';

import { useState, type KeyboardEvent } from 'react';
import { useLang } from './LangProvider';
import { useReveal } from './Reveal';

export default function ModelCard() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [ref, visible] = useReveal<HTMLElement>();

  const name = t('miniName');
  const desc = t('miniDesc');
  const more = t('miniMore');
  const badge = 'Mini';

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((o) => !o);
    }
  }

  return (
    <article
      ref={ref}
      className={`model-card mini reveal${visible ? ' in' : ''}${open ? ' open' : ''}`}
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

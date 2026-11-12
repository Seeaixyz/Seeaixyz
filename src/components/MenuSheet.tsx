'use client';

import Link from 'next/link';
import { LANGS, useLang } from './LangProvider';

const CHEVRON = (
  <svg
    className="ic flip"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export default function MenuSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang, setLang } = useLang();

  const links: Array<[string, string]> = [
    ['/#models', t('navModels')],
    ['/pricing', t('navPricing')],
    ['/chat', t('navChat')],
    ['/waitlist', t('navWaitlist')],
    ['/about', t('navAbout')],
    ['/privacy', t('navPrivacy')],
    ['/terms', t('navTerms')],
    ['/refund', t('navRefund')],
    ['/updates', t('navUpdates')],
  ];

  return (
    <section
      id="menuSheet"
      className={`menu-sheet${open ? ' on' : ''}`}
      aria-label="Menu"
    >
      <div className="menu-sheet-in">
        <div className="ms-head">
          <img src="/assets/logo.png" alt="" draggable={false} />
          <b>{t('brand')}</b>
          <button
            className="icon-btn"
            id="menuX"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              className="ic"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {links.map(([href, label]) => (
          <Link key={href} className="ms-link" href={href} onClick={onClose}>
            <span>{label}</span>
            {CHEVRON}
          </Link>
        ))}
        <div className="ms-foot">
          <div className="seg lang-switch" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l.id}
                className={lang === l.id ? 'on' : ''}
                onClick={() => setLang(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <span className="ms-lock">
            <span>{t('loginClosed')}</span>
            <span className="tag">{t('closedTag')}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

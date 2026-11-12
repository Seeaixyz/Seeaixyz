'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from './LangProvider';
import GoogleSignIn from './GoogleSignIn';

export default function TopBar({
  menuOpen,
  onOpenMenu,
}: {
  menuOpen: boolean;
  onOpenMenu: () => void;
}) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`topbar${scrolled ? ' scrolled' : ''}`} id="topbar">
      <div className="topbar-in">
        <button
          className="brand"
          id="brandBtn"
          aria-expanded={menuOpen}
          aria-controls="menuSheet"
          onClick={onOpenMenu}
        >
          <img src="/assets/logo.png" alt="" draggable={false} />
          <b>{t('brand')}</b>
        </button>
        <nav className="topnav" aria-label="Main">
          <Link href="/#models">{t('navModels')}</Link>
          <Link href="/pricing">{t('navPricing')}</Link>
          <Link href="/chat">{t('navChat')}</Link>
          <Link href="/about">{t('navAbout')}</Link>
        </nav>
        <div className="spacer" />
        <GoogleSignIn />
        <Link href="/waitlist" className="btn light top-cta">
          {t('heroCta')}
        </Link>
        <button
          className="menu-btn"
          id="menuBtn"
          aria-expanded={menuOpen}
          aria-controls="menuSheet"
          aria-label="Menu"
          onClick={onOpenMenu}
        >
          <svg
            className="ic"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

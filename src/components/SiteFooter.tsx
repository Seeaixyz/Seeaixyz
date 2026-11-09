'use client';

import Link from 'next/link';
import { useLang } from './LangProvider';

export default function SiteFooter() {
  const { t } = useLang();
  return (
    <footer>
      <div className="ftr-in">
        <nav className="ftr-links">
          <Link href="/about">{t('navAbout')}</Link>
          <Link href="/privacy">{t('navPrivacy')}</Link>
          <Link href="/terms">{t('navTerms')}</Link>
          <Link href="/updates">{t('navUpdates')}</Link>
        </nav>
        <div className="ftr-meta">
          <span>{t('footerRights')}</span>
          <a href="mailto:See@seeai.xyz">{t('footerContact')}</a>
        </div>
      </div>
    </footer>
  );
}

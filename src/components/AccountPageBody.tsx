'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from './LangProvider';

interface DemoUser {
  name: string;
  email: string;
}

export default function AccountPageBody() {
  const { t } = useLang();
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('see-demo-user');
      if (raw) setUser(JSON.parse(raw) as DemoUser);
    } catch {
      /* storage unavailable */
    }
  }, []);

  return (
    <div className="doc wrap">
      <h1>{t('accountTitle')}</h1>
      {user ? (
        <>
          <p className="lead" style={{ color: 'var(--mu)', fontSize: 18, marginBottom: 28 }}>
            {t('accountSignedIn')} <b style={{ color: '#fff' }}>{user.name}</b> ({user.email})
          </p>
          <div className="price-grid">
            <article className="price-card">
              <h3>{t('accountPlan')}</h3>
              <div className="price">{t('accountFree')}</div>
              <p style={{ color: 'var(--mu)' }}>{t('accountToday')}: 0</p>
            </article>
            <article className="price-card">
              <h3>{t('pricingTitle')}</h3>
              <p style={{ color: 'var(--mu)', marginBottom: 16 }}>{t('pricingSub')}</p>
              <Link className="btn light" href="/pricing">
                {t('accountUpgrade')}
              </Link>
            </article>
          </div>
          <p className="wl-consent" style={{ marginTop: 20 }}>
            {t('demoSignInNote')}
          </p>
        </>
      ) : (
        <p className="lead" style={{ color: 'var(--mu)', fontSize: 18 }}>
          {t('loginClosed')}
        </p>
      )}
    </div>
  );
}

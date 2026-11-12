'use client';

import Link from 'next/link';
import { useLang } from './LangProvider';

export default function PricingPageBody() {
  const { t } = useLang();
  const plans = [
    {
      name: t('starterName'),
      price: t('starterPrice'),
      total: t('starterTotal'),
      desc: t('starterDesc'),
      features: [
        'Text to Image',
        'Free images every day',
        'Standard queue',
        'Up to 1024px',
        'Personal use',
      ],
    },
    {
      name: t('proName'),
      price: t('proPrice'),
      total: t('proTotal'),
      desc: t('proDesc'),
      features: [
        'Everything in Starter',
        'Image to Image',
        'Higher daily limits',
        'Priority queue',
        'Up to 2K',
        'Commercial use of images you create',
      ],
    },
  ];
  return (
    <div className="doc wrap">
      <h1>{t('pricingTitle')}</h1>
      <p className="lead" style={{ color: 'var(--mu)', fontSize: 18, maxWidth: '34em', marginBottom: 40 }}>
        {t('pricingSub')}
      </p>
      <div className="price-grid">
        {plans.map((p) => (
          <article key={p.name} className="price-card">
            <h3>{p.name}</h3>
            <div className="price">
              {p.price}
              <span>/month</span>
            </div>
            <div className="price-total">{p.total}</div>
            <p>{p.desc}</p>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link href="/waitlist" className="btn light" style={{ width: '100%', marginTop: 24 }}>
              {t('pricingCta')}
            </Link>
          </article>
        ))}
      </div>
      <p className="price-note">{t('pricingNote')}</p>
      <p className="price-note">{t('pricingLaunch')}</p>
    </div>
  );
}

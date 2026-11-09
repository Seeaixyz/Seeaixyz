'use client';

import Link from 'next/link';
import { useLang } from './LangProvider';
import Reveal from './Reveal';
import ModelCard from './ModelCard';
import ShowcaseGrid from './ShowcaseGrid';
import WaitlistForm from './WaitlistForm';

export default function HomePage() {
  const { t } = useLang();
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="kicker">
            <i className="dot" />
            <span>{t('heroNote')}</span>
          </span>
          <h1>
            <span>{t('heroTitle')}</span>{' '}
            <span className="accent">{t('heroTitleAccent')}</span>
          </h1>
          <p className="sub">{t('heroSub')}</p>
          <Link className="btn light big" href="/waitlist">
            {t('heroCta')}
          </Link>
          <Reveal className="hero-media">
            <img
              src="/assets/gallery/nile-night.jpg"
              alt="The Nile at night — Cairo"
              draggable={false}
            />
          </Reveal>
        </div>
      </section>

      <section className="sec" id="showcase">
        <div className="wrap">
          <Reveal>
            <h2>{t('showTitle')}</h2>
          </Reveal>
          <Reveal>
            <p className="lead">{t('showSub')}</p>
          </Reveal>
          <ShowcaseGrid />
        </div>
      </section>

      <section className="sec" id="models">
        <div className="wrap">
          <Reveal>
            <h2>{t('modelsTitle')}</h2>
          </Reveal>
          <Reveal>
            <p className="lead">{t('modelsNote')}</p>
          </Reveal>
          <div className="model-grid">
            <ModelCard kind="mini" />
            <ModelCard kind="large" />
          </div>
          <Reveal>
            <p className="api-note">{t('apiNote')}</p>
          </Reveal>
        </div>
      </section>

      <section className="sec" id="waitlist">
        <div className="wrap">
          <Reveal className="wl-sec">
            <h2>{t('wlTitle')}</h2>
            <p>{t('wlSub')}</p>
            <WaitlistForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

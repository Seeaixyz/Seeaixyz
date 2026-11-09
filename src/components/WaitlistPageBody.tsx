'use client';

import { useLang } from './LangProvider';
import WaitlistForm from './WaitlistForm';

export default function WaitlistPageBody() {
  const { t } = useLang();
  return (
    <section className="wl-page wrap">
      <img
        className="logo-big"
        src="/assets/logo.png"
        alt="See Image"
        draggable={false}
      />
      <h1>{t('wlPageTitle')}</h1>
      <p className="sub">{t('wlPageSub')}</p>
      <WaitlistForm />
    </section>
  );
}

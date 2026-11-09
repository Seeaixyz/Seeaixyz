'use client';

import { Fragment } from 'react';
import { getSections, type DocumentKind } from '@/lib/content';
import { useLanguage } from './language-provider';
import { WaitlistForm } from './waitlist-form';

export function DocumentContent({ kind }: { kind: DocumentKind }) {
  const { t } = useLanguage();
  return <article className="doc wrap"><h1>{t(`${kind}Title`)}</h1><div>{getSections(kind).map(([heading, body]) => <Fragment key={heading}><h2>{heading}</h2><p>{body}</p></Fragment>)}</div></article>;
}
export function WaitlistContent() {
  const { t } = useLanguage();
  return <section className="wl-page wrap"><img className="logo-big" src="/assets/logo.png" alt="See Image" draggable={false} /><h1>{t('wlPageTitle')}</h1><p className="sub">{t('wlPageSub')}</p><WaitlistForm /></section>;
}

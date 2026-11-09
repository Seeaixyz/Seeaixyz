'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getShowcase, type ShowcaseItem } from '@/lib/content';
import { useLanguage } from './language-provider';
import { WaitlistForm } from './waitlist-form';
import { Icon } from './site-shell';

function ModelCard({ model }: { model: 'mini' | 'large' }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return <article className={`model-card ${model} reveal in${open ? ' open' : ''}`} tabIndex={0} role="button" aria-expanded={open} onClick={() => setOpen(!open)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(!open); } }}><span className="expand"><Icon kind="down" /></span><span className="badge">{model === 'mini' ? 'Mini' : 'Large'}</span><h3>{t(`${model}Name`)}</h3><p>{t(`${model}Desc`)}</p><p className="more">{t(`${model}More`)}</p></article>;
}

export function HomeContent() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<ShowcaseItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (selected) dialog.current?.showModal(); else dialog.current?.close(); }, [selected]);
  return <>
    <section className="hero"><div className="wrap"><span className="kicker"><i className="dot" /><span>{t('heroNote')}</span></span><h1>{t('heroTitle')} <span className="accent">{t('heroTitleAccent')}</span></h1><p className="sub">{t('heroSub')}</p><Link className="btn light big" href="/waitlist">{t('heroCta')}</Link><div className="hero-media reveal in"><img src="/assets/gallery/nile-night.jpg" alt={'The Nile at night — Cairo'} draggable={false} fetchPriority="high" /></div></div></section>
    <section className="sec" id="showcase"><div className="wrap"><h2 className="reveal in">{t('showTitle')}</h2><p className="lead reveal in">{t('showSub')}</p><div className="show-grid" id="showGrid">{getShowcase().map(item => <figure className="show-card reveal in" key={item.src} role="button" tabIndex={0} aria-label={item.cap} onClick={() => setSelected(item)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(item); } }}><img src={`/${item.src}`} alt={item.cap} loading="lazy" draggable={false} /><figcaption><b>{item.cap}</b><span>{item.sub} · {item.model}</span></figcaption></figure>)}</div></div></section>
    <section className="sec" id="models"><div className="wrap"><h2 className="reveal in">{t('modelsTitle')}</h2><p className="lead reveal in">{t('modelsNote')}</p><div className="model-grid"><ModelCard model="mini" /><ModelCard model="large" /></div><p className="api-note reveal in">{t('apiNote')}</p></div></section>
    <section className="sec" id="waitlist"><div className="wrap"><div className="wl-sec reveal in"><h2>{t('wlTitle')}</h2><p>{t('wlSub')}</p><WaitlistForm /></div></div></section>
    <dialog ref={dialog} id="lb" aria-label={selected?.cap || t('showTitle')} onClose={() => setSelected(null)} onClick={event => { if (event.target === dialog.current) setSelected(null); }}>{selected && <><img src={`/${selected.src}`} alt={selected.cap} /><p>{selected.cap}</p><small className="mu">{selected.sub} · {selected.model}</small><div className="row"><button className="btn" autoFocus onClick={() => setSelected(null)} aria-label={'Close'}><Icon kind="close" /></button></div></>}</dialog>
  </>;
}

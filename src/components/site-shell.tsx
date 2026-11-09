'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from './language-provider';

export function Icon({ kind = 'arrow' }: { kind?: 'arrow' | 'menu' | 'close' | 'down' }) {
  const path = { arrow: 'm9 6 6 6-6 6', menu: 'M4 7h16M4 12h16M4 17h16', close: 'M18 6 6 18M6 6l12 12', down: 'm6 9 6 6 6-6' }[kind];
  return <svg className={`ic ${kind === 'arrow' ? 'flip' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}
const links = [['/#models', 'navModels'], ['/waitlist', 'navWaitlist'], ['/about', 'navAbout'], ['/privacy', 'navPrivacy'], ['/terms', 'navTerms'], ['/updates', 'navUpdates']];

export function SiteShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const sheet = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 8);
    scroll(); window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) sheet.current?.querySelector<HTMLButtonElement>('button')?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
      if (open && event.key === 'Tab') {
        const nodes = sheet.current?.querySelectorAll<HTMLElement>('a, button');
        if (!nodes?.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', keydown); };
  }, [open]);
  return <>
    <header className={`topbar${scrolled ? ' scrolled' : ''}`} id="topbar"><div className="topbar-in">
      <button className="brand" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menuSheet"><img src="/assets/logo.png" alt="" draggable={false} /><b>{t('brand')}</b></button>
      <nav className="topnav" aria-label={'Main navigation'}>{links.slice(0, 3).map(([href, key]) => <Link key={key} href={href}>{t(key)}</Link>)}</nav>
      <div className="spacer" /><button ref={trigger} className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menuSheet" aria-label={t('menuTitle')}><Icon kind="menu" /></button>
    </div></header>
    <div id="scrim" className={open ? 'on' : ''} onClick={() => setOpen(false)} aria-hidden="true" />
    <section ref={sheet} id="menuSheet" className={`menu-sheet${open ? ' on' : ''}`} role="dialog" aria-modal={open || undefined} aria-label={t('menuTitle')} inert={!open} aria-hidden={!open}><div className="menu-sheet-in">
      <div className="ms-head"><img src="/assets/logo.png" alt="" draggable={false} /><b>{t('brand')}</b><button className="icon-btn" onClick={() => { setOpen(false); trigger.current?.focus(); }} aria-label={'Close'}><Icon kind="close" /></button></div>
      {links.map(([href, key]) => <Link className="ms-link" key={key} href={href} onClick={() => setOpen(false)}><span>{t(key)}</span><Icon /></Link>)}
      <div className="ms-foot"><span className="ms-lock"><span>{t('loginClosed')}</span><span className="tag">{t('closedTag')}</span></span></div>
    </div></section>
    <main>{children}</main>
    <footer><div className="ftr-in"><nav className="ftr-links">{links.slice(2).map(([href, key]) => <Link key={key} href={href}>{t(key)}</Link>)}</nav><div className="ftr-meta"><span>{t('footerRights')}</span><a href="mailto:See@seeai.xyz">{t('footerContact')}</a></div></div></footer>
  </>;
}

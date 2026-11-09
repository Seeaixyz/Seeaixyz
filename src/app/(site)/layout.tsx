'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { LangProvider } from '@/components/LangProvider';
import TopBar from '@/components/TopBar';
import MenuSheet from '@/components/MenuSheet';
import SiteFooter from '@/components/SiteFooter';
import VpnBlock from '@/components/VpnBlock';

// Shared site chrome: fixed glass top bar, dropdown menu sheet, footer,
// toast, client-side VPN block, Vercel Analytics. The decoy page does not
// use this layout (it is a plain unbranded page).
export default function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <LangProvider>
      <TopBar menuOpen={menuOpen} onOpenMenu={openMenu} />
      <div
        id="scrim"
        className={menuOpen ? 'on' : ''}
        onClick={closeMenu}
      />
      <MenuSheet open={menuOpen} onClose={closeMenu} />
      <main>{children}</main>
      <SiteFooter />
      <div id="toast" />
      <VpnBlock />
      <Analytics />
    </LangProvider>
  );
}

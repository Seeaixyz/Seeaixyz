import type { ReactNode } from 'react';
import { LanguageProvider } from '@/components/language-provider';
import { SiteShell } from '@/components/site-shell';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <LanguageProvider><SiteShell>{children}</SiteShell></LanguageProvider>;
}

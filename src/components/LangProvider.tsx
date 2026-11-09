'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LANG,
  lookup,
  lookupSections,
  lookupShowcase,
  type ContentLang,
  type Lang,
  type Section,
  type ShowcaseItem,
} from '@/content';

export interface LangContextValue {
  lang: Lang;
  t: (key: keyof ContentLang) => string;
  sections: (key: 'privacy' | 'terms' | 'about' | 'updates') => Section[];
  showcase: ShowcaseItem[];
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang: Lang = DEFAULT_LANG;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      t: (key) => lookup(lang, key as string),
      sections: (key) => lookupSections(lang, key),
      showcase: lookupShowcase(lang),
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
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
  setLang: (lang: Lang) => void;
  t: (key: keyof ContentLang) => string;
  sections: (key: 'privacy' | 'terms' | 'about' | 'updates' | 'refund') => Section[];
  showcase: ShowcaseItem[];
}

const LangContext = createContext<LangContextValue | null>(null);

export const LANGS: Array<{ id: Lang; label: string }> = [
  { id: 'en', label: 'English' },
  { id: 'jawi', label: 'جاوي' },
  { id: 'thaana', label: 'ދިވެހި' },
];

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('see-lang');
      if (saved === 'jawi' || saved === 'thaana' || saved === 'en') setLangState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem('see-lang', next);
    } catch {
      /* storage unavailable */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'jawi' ? 'ms-Arab' : lang === 'thaana' ? 'dv' : 'en';
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
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

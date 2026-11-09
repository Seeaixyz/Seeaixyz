import raw from './content.json';

export type Lang = 'en';

export interface ShowcaseItem {
  cap: string;
  model: string;
  src: string;
  sub: string;
}

export type Section = [string, string];

export interface ContentLang {
  about: Section[];
  aboutTitle: string;
  apiNote: string;
  back: string;
  brand: string;
  closedTag: string;
  decoySub: string;
  decoyTitle: string;
  footerContact: string;
  footerRights: string;
  heroCta: string;
  heroKicker: string;
  heroNote: string;
  heroSub: string;
  heroTitle: string;
  heroTitleAccent: string;
  largeDesc: string;
  largeMore: string;
  largeName: string;
  loginClosed: string;
  menuTitle: string;
  miniDesc: string;
  miniMore: string;
  miniName: string;
  modelsNote: string;
  modelsTitle: string;
  navAbout: string;
  navModels: string;
  navPrivacy: string;
  navTerms: string;
  navUpdates: string;
  navWaitlist: string;
  privacy: Section[];
  privacyTitle: string;
  showSub: string;
  showTitle: string;
  showcase: ShowcaseItem[];
  terms: Section[];
  termsTitle: string;
  updates: Section[];
  updatesTitle: string;
  vpnRetry: string;
  vpnSub: string;
  vpnT: string;
  wlBad: string;
  wlBtn: string;
  wlConsent: string;
  wlErr: string;
  wlOk: string;
  wlPageSub: string;
  wlPageTitle: string;
  wlPh: string;
  wlSending: string;
  wlSub: string;
  wlTitle: string;
}

export interface Content {
  en: ContentLang;
  defaultLang: Lang;
}

// content.json is the single source of ALL texts (ar + en). It is imported
// typed; copy is never hardcoded into components.
const content = raw as unknown as Content;
export const CONTENT: Content = content;
export const DEFAULT_LANG: Lang = 'en';

/** String lookup (English only). */
export function lookup(lang: Lang, key: string): string {
  const cur = (CONTENT[lang] as unknown as Record<string, unknown>)[key];
  if (typeof cur === 'string') return cur;
  return '';
}

export function lookupSections(lang: Lang, key: string): Section[] {
  const cur = (CONTENT[lang] as unknown as Record<string, unknown>)[key];
  if (Array.isArray(cur)) return cur as Section[];
  return [];
}

export function lookupShowcase(lang: Lang): ShowcaseItem[] {
  const cur = CONTENT[lang].showcase;
  if (Array.isArray(cur)) return cur;
  return [];
}

import raw from './content.json';

export type Lang = 'en' | 'jawi' | 'thaana';

export interface ShowcaseItem {
  cap: string;
  model: string;
  src: string;
  sub: string;
}

export type Section = [string, string];

export interface ContentLang {
  about: Section[];
  chatModeImage: string;
  chatModeImg2Img: string;
  chatNoImage: string;
  chatPhImage: string;
  chatPhImg2Img: string;
  chatProTag: string;
  chatReply: string;
  chatSend: string;
  chatSoon: string;
  chatSub: string;
  chatTitle: string;
  chatUpload: string;
  chooseAccount: string;
  demoAccountName: string;
  demoSignInNote: string;
  footerOperator: string;
  footerPayments: string;
  signInGoogle: string;
  signOut: string;
  navChat: string;
  navPricing: string;
  navRefund: string;
  pricingCta: string;
  pricingLaunch: string;
  pricingNote: string;
  pricingSub: string;
  pricingTitle: string;
  proDesc: string;
  proFeatures: string[];
  proName: string;
  proPrice: string;
  proTotal: string;
  refund: Section[];
  refundTitle: string;
  starterDesc: string;
  starterFeatures: string[];
  starterName: string;
  starterPrice: string;
  starterTotal: string;
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
  // Jawi (Malay in Jawi script) and Thaana (Dhivehi) are partial translations:
  // any missing key falls back to English, which stays the official language.
  jawi: Partial<ContentLang>;
  thaana: Partial<ContentLang>;
  defaultLang: Lang;
}

// content.json is the single source of ALL texts (ar + en). It is imported
// typed; copy is never hardcoded into components.
const content = raw as unknown as Content;
export const CONTENT: Content = content;
export const DEFAULT_LANG: Lang = 'en';

/** String lookup. English is the official language and the fallback. */
export function lookup(lang: Lang, key: string): string {
  const cur = (CONTENT[lang] as unknown as Record<string, unknown>)[key];
  if (typeof cur === 'string') return cur;
  const en = (CONTENT.en as unknown as Record<string, unknown>)[key];
  if (typeof en === 'string') return en;
  return '';
}

export function lookupSections(lang: Lang, key: string): Section[] {
  const cur = (CONTENT[lang] as unknown as Record<string, unknown>)[key];
  if (Array.isArray(cur)) return cur as Section[];
  const en = (CONTENT.en as unknown as Record<string, unknown>)[key];
  if (Array.isArray(en)) return en as Section[];
  return [];
}

export function lookupShowcase(lang: Lang): ShowcaseItem[] {
  const cur = (CONTENT[lang] as unknown as Record<string, unknown>).showcase;
  if (Array.isArray(cur)) return cur as ShowcaseItem[];
  return CONTENT.en.showcase;
}

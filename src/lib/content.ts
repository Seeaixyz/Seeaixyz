import content from '@/data/content.json';

export type DocumentKind = 'about' | 'privacy' | 'terms' | 'updates';
export interface ShowcaseItem { src: string; cap: string; sub: string; model: string }
export function getText(key: string): string {
  const value = content[key as keyof typeof content];
  return typeof value === 'string' ? value : '';
}
export function getSections(key: DocumentKind): string[][] { return content[key]; }
export function getShowcase(): ShowcaseItem[] { return content.showcase; }
